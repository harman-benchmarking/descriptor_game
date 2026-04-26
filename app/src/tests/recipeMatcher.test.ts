import { describe, expect, it } from "vitest";
import { allBasicIds, descriptorCatalog } from "../cards/descriptorCatalog";
import { discoveryCards } from "../cards/discoveryRecipes";
import { exactMatchedDiscovery, matchedDiscoveries } from "../cards/recipeMatcher";
import { gateDefinitions } from "../data/regions";

describe("descriptor and recipe data", () => {
  it("has unique descriptor and recipe ids", () => {
    expect(new Set(descriptorCatalog.map((card) => card.id)).size).toBe(descriptorCatalog.length);
    expect(new Set(discoveryCards.map((card) => card.id)).size).toBe(discoveryCards.length);
  });

  it("uses existing non-conflicting ingredients", () => {
    const basicIds = new Set(allBasicIds);

    for (const recipe of discoveryCards) {
      expect(recipe.ingredientIds.every((id) => basicIds.has(id))).toBe(true);
      for (const id of recipe.ingredientIds) {
        const descriptor = descriptorCatalog.find((card) => card.id === id)!;
        const conflicts = new Set(descriptor.conflictsWith);
        expect(recipe.ingredientIds.some((candidate) => conflicts.has(candidate))).toBe(false);
      }
    }
  });

  it("matches Region A discoveries by longest recipe first", () => {
    const matches = matchedDiscoveries(["rumble", "thump", "bright", "airy"]);
    expect(matches.map((recipe) => recipe.id)).toEqual(["exciting", "energetic", "powerful"]);
  });

  it("only uses an exact recipe as the active discovery identity", () => {
    expect(exactMatchedDiscovery(["rumble", "thump"])?.id).toBe("powerful");
    expect(exactMatchedDiscovery(["rumble", "thump", "airy"])).toBeUndefined();
  });

  it("covers all 18 basics through the three gates", () => {
    const gateIds = new Set(gateDefinitions.flatMap((gate) => [...gate.giftCards, gate.firstCatch, ...gate.laterUnlocks]));
    expect(gateIds.size).toBe(18);
    expect(allBasicIds.every((id) => gateIds.has(id))).toBe(true);
  });
});
