import { describe, expect, it } from "vitest";
import { buildCurvePoints } from "../audio/dsp/curveResponse";
import {
  bassBoostIntensityCapByBucketStackCount,
  buildEffectiveFilters,
  boostIntensityCapByGroup,
  clampFrequency,
  effectiveIntensityForActiveSpectralBuckets,
  effectiveIntensityRangeForActiveSpectralBuckets,
  headroomIntensityForActiveSpectralBuckets,
  intensityCapByBucketStackCount,
  maxIntensityForBucketStackCount,
  normalizeFilter,
  scaleIntensityForBucketStackCount,
  trebleBoostIntensityCapByBucketStackCount
} from "../audio/dsp/eqFilters";
import { masterTrimForIntensity } from "../audio/dsp/loudness";

describe("eq dsp helpers", () => {
  it("clamps frequency, gain, and q", () => {
    const filter = normalizeFilter({ frequencyHz: 50000, gainDb: 20, q: 30 }, 48000, 2);
    expect(filter.frequencyHz).toBe(22800);
    expect(filter.gainDb).toBe(24);
    expect(filter.q).toBe(18);
    expect(clampFrequency(1, 48000)).toBe(20);
  });

  it("builds finite curve points", () => {
    const filters = buildEffectiveFilters(["rumble", "thump", "bright"], 1.8);
    const points = buildCurvePoints(filters);
    expect(points).toHaveLength(96);
    expect(points.every((point) => Number.isFinite(point.frequencyHz) && Number.isFinite(point.gainDb))).toBe(true);
  });

  it("uses the updated airy boost", () => {
    const [filter] = buildEffectiveFilters(["airy"], 1);
    expect(filter.gainDb).toBe(4);
  });

  it("uses softened bass boosts for rumble and thump", () => {
    const [rumble] = buildEffectiveFilters(["rumble"], 1);
    const [thump] = buildEffectiveFilters(["thump"], 1);

    expect(rumble.gainDb).toBe(4);
    expect(thump.gainDb).toBe(3);
  });

  it("caps selected intensity by spectral bucket stack count", () => {
    expect(maxIntensityForBucketStackCount(1)).toBe(2);
    expect(maxIntensityForBucketStackCount(2)).toBe(1.8);
    expect(maxIntensityForBucketStackCount(3)).toBe(1.6);
    expect(maxIntensityForBucketStackCount(4)).toBe(1.4);
    expect(maxIntensityForBucketStackCount(5)).toBe(1.2);
    expect(maxIntensityForBucketStackCount(6)).toBe(1.2);
    expect(maxIntensityForBucketStackCount(9)).toBe(1.2);
    expect(bassBoostIntensityCapByBucketStackCount.map((cap) => cap.maxIntensity)).toEqual([2, 1.75, 1.5, 1.25, 1]);
    expect(trebleBoostIntensityCapByBucketStackCount.map((cap) => cap.maxIntensity)).toEqual([2, 1.75, 1.5, 1.25, 1]);
    expect(boostIntensityCapByGroup.mid).toBe(intensityCapByBucketStackCount);
    expect(boostIntensityCapByGroup.treble).toBe(trebleBoostIntensityCapByBucketStackCount);
    expect(scaleIntensityForBucketStackCount(3, 2)).toBe(1.6);
    expect(scaleIntensityForBucketStackCount(3, 2, "bass:boost")).toBe(1.5);
    expect(scaleIntensityForBucketStackCount(4, 2, "treble:boost")).toBe(1.25);
    expect(scaleIntensityForBucketStackCount(3, 1.2)).toBe(1.2);
    expect(effectiveIntensityForActiveSpectralBuckets(["boomy", "bright"], 2)).toBe(2);
    expect(effectiveIntensityForActiveSpectralBuckets(["boomy", "thump"], 2)).toBe(1.75);
    expect(effectiveIntensityRangeForActiveSpectralBuckets(["boomy", "thump", "bright"], 2)).toEqual({ min: 1.75, max: 2 });
  });

  it("keeps cross-bucket boosts full strength while softening same-bucket stacks", () => {
    const [boomy, bright] = buildEffectiveFilters(["boomy", "bright"], 2);
    expect(boomy.gainDb).toBeCloseTo(9);
    expect(bright.gainDb).toBeCloseTo(7);

    const [stackedBoomy, stackedThump, freeBright] = buildEffectiveFilters(["boomy", "thump", "bright"], 2);
    expect(stackedBoomy.gainDb).toBeCloseTo(7.875);
    expect(stackedThump.gainDb).toBeCloseTo(5.25);
    expect(freeBright.gainDb).toBeCloseTo(7);

    const [harsh, sibilant, glassy, airy] = buildEffectiveFilters(["harsh", "sibilant", "glassy", "airy"], 2);
    expect(harsh.gainDb).toBeCloseTo(5.625);
    expect(sibilant.gainDb).toBeCloseTo(6.25);
    expect(glassy.gainDb).toBeCloseTo(5.625);
    expect(airy.gainDb).toBeCloseTo(5);
  });

  it("adds output headroom for same-bucket boost stacks", () => {
    expect(headroomIntensityForActiveSpectralBuckets(["boomy", "bright"], 2)).toBe(2);
    expect(headroomIntensityForActiveSpectralBuckets(["boomy", "muddy"], 2)).toBeCloseTo(2.2);
    expect(headroomIntensityForActiveSpectralBuckets(["boomy", "muddy", "dull"], 2)).toBeCloseTo(2.45);
    expect(masterTrimForIntensity(2)).toBe(0.72);
    expect(masterTrimForIntensity(2.2)).toBe(0.72);
    expect(masterTrimForIntensity(2.45)).toBe(0.64);
  });
});
