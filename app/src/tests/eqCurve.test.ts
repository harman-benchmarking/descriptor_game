import { describe, expect, it } from "vitest";
import { buildCurvePoints } from "../audio/dsp/curveResponse";
import { buildEffectiveFilters, clampFrequency, normalizeFilter } from "../audio/dsp/eqFilters";

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
});
