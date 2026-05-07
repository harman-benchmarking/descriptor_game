import { describe, expect, it } from "vitest";
import { blendKeyFor, evaluateDiscoveryBlend } from "../cards/blendCrafting";

describe("blend crafting", () => {
  it("unlocks only exact discovery recipes", () => {
    expect(evaluateDiscoveryBlend(["rumble", "thump"], []).status).toBe("unlocked");
    expect(evaluateDiscoveryBlend(["rumble", "thump"], []).discovery?.id).toBe("powerful");

    const overloaded = evaluateDiscoveryBlend(["rumble", "thump", "bright", "airy", "punchy"], []);
    expect(overloaded.status).toBe("overloaded");
    expect(overloaded.discovery).toBeUndefined();
  });

  it("does not reopen discoveries already in the collection", () => {
    const result = evaluateDiscoveryBlend(["thump", "punchy"], ["impactful"]);
    expect(result.status).toBe("known");
    expect(result.discovery?.id).toBe("impactful");
  });

  it("normalizes attempted blends for de-duplication", () => {
    expect(blendKeyFor(["bright", "rumble", "thump"])).toBe("rumble+thump+bright");
    expect(blendKeyFor(["thump", "rumble", "thump"])).toBe("rumble+thump");
  });

  it("distinguishes close trails from unrelated misses", () => {
    expect(evaluateDiscoveryBlend(["rumble"], []).status).toBe("near");
    expect(evaluateDiscoveryBlend(["warm"], []).status).toBe("near");
    expect(evaluateDiscoveryBlend(["glassy"], []).status).toBe("near");
    expect(evaluateDiscoveryBlend(["shrill"], []).status).toBe("miss");
  });
});
