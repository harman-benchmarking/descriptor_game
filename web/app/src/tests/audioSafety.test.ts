import { describe, expect, it } from "vitest";
import {
  clampToFinalSafetyCeiling,
  configureFinalSafetyLimiter,
  connectFinalSafetyChain,
  decibelsToLinear,
  estimateFinalLimiterSteadyStateDb,
  finalSafetySettings,
  isHeadphoneRecommended,
  makeFinalSafetyCeilingCurve
} from "../audio/engine/AudioSafety";

describe("audio safety", () => {
  it("recommends headphones for extreme bands", () => {
    expect(isHeadphoneRecommended([35, 1000])).toBe(true);
    expect(isHeadphoneRecommended([1000, 17000])).toBe(true);
    expect(isHeadphoneRecommended([500, 1000])).toBe(false);
  });

  it("configures a fast hard-knee limiter without makeup gain", () => {
    const makeParam = () => ({ value: Number.NaN }) as AudioParam;
    const limiter = {
      threshold: makeParam(),
      knee: makeParam(),
      ratio: makeParam(),
      attack: makeParam(),
      release: makeParam()
    } as DynamicsCompressorNode;

    configureFinalSafetyLimiter(limiter);

    expect(limiter.threshold.value).toBe(-2);
    expect(limiter.knee.value).toBe(0);
    expect(limiter.ratio.value).toBe(20);
    expect(limiter.attack.value).toBe(0.001);
    expect(limiter.release.value).toBe(0.08);
  });

  it("keeps the audited maximum-stack level below the final ceiling after steady-state limiting", () => {
    const auditedMaximumStackDb = 5.25;

    expect(estimateFinalLimiterSteadyStateDb(-6)).toBe(-6);
    expect(estimateFinalLimiterSteadyStateDb(auditedMaximumStackDb)).toBeLessThan(finalSafetySettings.ceilingDb);
  });

  it("builds an identity-until-ceiling emergency clamp", () => {
    const ceiling = decibelsToLinear(finalSafetySettings.ceilingDb);
    const curve = makeFinalSafetyCeilingCurve();
    const largestMagnitude = curve.reduce((largest, sample) => Math.max(largest, Math.abs(sample)), 0);
    const halfScaleIndex = Math.round(0.75 * (curve.length - 1));
    const halfScaleInput = (halfScaleIndex / (curve.length - 1)) * 2 - 1;

    expect(largestMagnitude).toBeLessThanOrEqual(ceiling);
    expect(curve[halfScaleIndex]).toBeCloseTo(halfScaleInput, 6);
    expect(clampToFinalSafetyCeiling(2)).toBeCloseTo(ceiling, 6);
    expect(clampToFinalSafetyCeiling(-2)).toBeCloseTo(-ceiling, 6);
  });

  it("wires the master through both safety stages before the destination", () => {
    const connections: string[] = [];
    const makeNode = (name: string) => ({
      name,
      connect: (target: { name: string }) => connections.push(`${name}->${target.name}`)
    });
    const master = makeNode("master") as unknown as AudioNode;
    const limiter = makeNode("limiter") as unknown as DynamicsCompressorNode;
    const ceiling = makeNode("ceiling") as unknown as WaveShaperNode;
    const destination = makeNode("destination") as unknown as AudioNode;

    connectFinalSafetyChain(master, limiter, ceiling, destination);

    expect(connections).toEqual(["master->limiter", "limiter->ceiling", "ceiling->destination"]);
  });
});
