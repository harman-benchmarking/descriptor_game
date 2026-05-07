import { describe, expect, it } from "vitest";
import { toggleBasicCard } from "../cards/cardReducer";

describe("card reducer", () => {
  it("toggles a card off when selected twice", () => {
    expect(toggleBasicCard(["rumble"], "rumble")).toEqual([]);
  });

  it("replaces conflicting descriptors in both directions", () => {
    expect(toggleBasicCard(["rumble", "warm"], "thin")).toEqual(["thin"]);
    expect(toggleBasicCard(["thin"], "rumble")).toEqual(["rumble"]);
  });

  it("replaces opposing dynamic descriptors", () => {
    expect(toggleBasicCard(["snappy"], "softened")).toEqual(["softened"]);
    expect(toggleBasicCard(["loose"], "tight")).toEqual(["tight"]);
  });

  it("treats hollow as opposite to midrange body and coloration cards", () => {
    expect(toggleBasicCard(["warm", "boxy", "honky"], "hollow")).toEqual(["hollow"]);
    expect(toggleBasicCard(["hollow"], "boxy")).toEqual(["boxy"]);
    expect(toggleBasicCard(["hollow"], "honky")).toEqual(["honky"]);
  });

  it("keeps compatible descriptors sorted by catalog order", () => {
    expect(toggleBasicCard(["bright", "rumble"], "thump")).toEqual(["rumble", "thump", "bright"]);
  });
});
