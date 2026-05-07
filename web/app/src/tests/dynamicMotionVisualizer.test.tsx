import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DynamicMotionVisualizer } from "../ui/components/visualizers/DynamicMotionVisualizer";

function outputPointsFor(activeDescriptorIds: string[]) {
  const { container } = render(<DynamicMotionVisualizer activeDescriptorIds={activeDescriptorIds} />);
  const output = container.querySelector(".dynamic-output");
  if (!output) {
    throw new Error("Missing dynamic output polyline");
  }

  return (output.getAttribute("points") ?? "").split(" ").map((point) => {
    const [x, y] = point.split(",").map(Number);
    return { x, y };
  });
}

function hasFlatCeilingPlateau(points: Array<{ x: number; y: number }>) {
  return points.some((point, index) => index > 0 && point.y < 190 && point.y === points[index - 1].y && point.x > points[index - 1].x);
}

describe("DynamicMotionVisualizer", () => {
  it("renders clipped peaks as true flat ceiling plateaus", () => {
    expect(hasFlatCeilingPlateau(outputPointsFor(["clipped"]))).toBe(true);
  });

  it("keeps clipping visible when combined with compressed or flat descriptors", () => {
    expect(hasFlatCeilingPlateau(outputPointsFor(["compressed", "clipped"]))).toBe(true);
    expect(hasFlatCeilingPlateau(outputPointsFor(["flat-dynamics", "clipped"]))).toBe(true);
  });

  it("shows loose recovery as trailing tails rather than clipping-like plateaus", () => {
    const { container } = render(<DynamicMotionVisualizer activeDescriptorIds={["loose"]} />);
    const recoveryTails = [...container.querySelectorAll(".dynamic-recovery-tail")];

    expect(recoveryTails.length).toBeGreaterThan(0);
    expect(recoveryTails.some((tail) => tail.getAttribute("d")?.includes("598"))).toBe(true);
    expect(hasFlatCeilingPlateau(outputPointsFor(["loose"]))).toBe(false);
  });

  it("does not render the removed GR meter", () => {
    const { container } = render(<DynamicMotionVisualizer activeDescriptorIds={["compressed"]} />);

    expect(container.querySelector(".dynamic-meter")).toBeNull();
    expect(container.querySelector(".dynamic-peak-history")).toBeNull();
    expect(container.querySelector(".dynamic-state-badge")).toBeNull();
  });

  it("keeps distortion marks visible when another descriptor reduces the output peak", () => {
    const { container } = render(<DynamicMotionVisualizer activeDescriptorIds={["flat-dynamics", "distorted"]} />);

    expect(container.querySelectorAll(".dynamic-distortion").length).toBeGreaterThan(0);
  });

  it("keeps compression markers aligned for combined attack and compression states", () => {
    const { container } = render(<DynamicMotionVisualizer activeDescriptorIds={["softened", "compressed"]} />);

    expect(container.querySelectorAll(".dynamic-gain-reduction").length).toBeGreaterThan(0);
  });
});
