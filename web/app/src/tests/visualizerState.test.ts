import { describe, expect, it } from "vitest";
import { dynamicStateFromIds, integrityStateFromIds, spatialStateFromIds } from "../ui/components/visualizers/visualizerState";

describe("module visualizer state", () => {
  it("maps spatial combinations to a plus-stage coordinate", () => {
    expect(spatialStateFromIds(["left", "near"])).toMatchObject({ x: -1, y: 1 });
    expect(spatialStateFromIds(["right", "far"])).toMatchObject({ x: 1, y: -1 });
    expect(spatialStateFromIds(["centered"])).toMatchObject({ x: 0, y: 0 });
  });

  it("maps dynamic descriptors to envelope motion", () => {
    expect(dynamicStateFromIds(["compressed", "pumping"])).toEqual({
      attack: "neutral",
      recovery: "neutral",
      compression: "compressed",
      motion: "pumping",
      contrast: "normal",
      overload: "none"
    });
    expect(dynamicStateFromIds(["snappy", "tight", "flat-dynamics", "clipped", "distorted"])).toEqual({
      attack: "snappy",
      recovery: "tight",
      compression: "none",
      motion: "neutral",
      contrast: "flat",
      overload: "overdriven"
    });
  });

  it("maps integrity descriptors to timeline artifacts", () => {
    expect(integrityStateFromIds(["hiss", "buzz", "click", "dropout"])).toEqual({
      noise: "hiss",
      tone: "buzz",
      events: ["click", "dropout"]
    });
  });
});
