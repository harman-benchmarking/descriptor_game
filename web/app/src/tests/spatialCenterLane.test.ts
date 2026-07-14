import { describe, expect, it } from "vitest";
import { centerLaneEncodeGain, sideDecodeGainsForWidth } from "../audio/dsp/spatialCenterLane";

function renderMidSideSample(left: number, right: number, width: number) {
  const center = (left + right) * centerLaneEncodeGain;
  const gains = sideDecodeGainsForWidth(width);

  return {
    left: center + left * gains.lToL + right * gains.rToL,
    right: center + left * gains.lToR + right * gains.rToR
  };
}

describe("spatial center lane math", () => {
  it("reconstructs the original stereo sample at neutral width", () => {
    const output = renderMidSideSample(0.8, -0.2, 1);

    expect(output.left).toBeCloseTo(0.8);
    expect(output.right).toBeCloseTo(-0.2);
  });

  it("collapses the side lane at zero width while preserving the center", () => {
    const output = renderMidSideSample(0.8, -0.2, 0);

    expect(output.left).toBeCloseTo(0.3);
    expect(output.right).toBeCloseTo(0.3);
  });

  it("allows wider-than-original side gain with clamping", () => {
    const wideOutput = renderMidSideSample(0.8, -0.2, 2);
    const clampedOutput = renderMidSideSample(0.8, -0.2, 9);

    expect(wideOutput.left).toBeCloseTo(1.3);
    expect(wideOutput.right).toBeCloseTo(-0.7);
    expect(clampedOutput).toEqual(wideOutput);
  });
});
