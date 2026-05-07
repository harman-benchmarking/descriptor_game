import { describe, expect, it } from "vitest";
import { allBasicIds, basicIdsForModule, descriptorById, descriptorCatalog, spectralBasicIds } from "../cards/descriptorCatalog";
import { discoveryCards } from "../cards/discoveryRecipes";
import { aliasVocabularyCards } from "../cards/aliasVocabulary";
import { exactMatchedDiscovery, matchedDiscoveries } from "../cards/recipeMatcher";
import { gateDefinitions, playableRegionContent, regionDefinitions } from "../data/regions";

describe("descriptor and recipe data", () => {
  it("has unique descriptor and recipe ids", () => {
    expect(new Set(descriptorCatalog.map((card) => card.id)).size).toBe(descriptorCatalog.length);
    expect(new Set(discoveryCards.map((card) => card.id)).size).toBe(discoveryCards.length);
  });

  it("keeps basic aliases distinct from discovery ids", () => {
    const discoveryIds = new Set(discoveryCards.map((card) => card.id));
    const aliasCollisions = descriptorCatalog.flatMap((card) =>
      card.aliases
        .map((alias) => alias.toLowerCase().trim().replace(/[-\s]+/g, "_"))
        .filter((aliasId) => discoveryIds.has(aliasId))
        .map((aliasId) => `${card.id}:${aliasId}`)
    );

    expect(aliasCollisions).toEqual([]);
  });

  it("retires Shrill as a basic while keeping it as a Sibilant alias", () => {
    const sibilant = descriptorById.get("sibilant");
    const glassy = descriptorById.get("glassy");
    const dull = descriptorById.get("dull");

    expect(allBasicIds).toContain("glassy");
    expect(allBasicIds).not.toContain("shrill");
    expect(sibilant?.aliases).toContain("Shrill");
    expect(descriptorById.get("shrill")?.id).toBe("sibilant");
    expect(glassy?.filters).toEqual([{ frequencyHz: 6300, gainDb: 4.5, q: 1.15 }]);
    expect(dull?.conflictsWith).toContain("glassy");
    expect(dull?.conflictsWith).not.toContain("shrill");
  });

  it("keeps alias vocabulary anchored to existing basic or discovery cards", () => {
    const basicIds = new Set(allBasicIds);
    const discoveryIds = new Set(discoveryCards.map((card) => card.id));
    const aliasIds = aliasVocabularyCards.map((card) => card.id);

    expect(new Set(aliasIds).size).toBe(aliasIds.length);
    expect(aliasIds.some((id) => discoveryIds.has(id))).toBe(false);
    expect(aliasVocabularyCards.flatMap((card) => card.contexts)).toHaveLength(aliasVocabularyCards.length);

    for (const alias of aliasVocabularyCards) {
      const anchorModuleIds = alias.anchorIds.map((id) => descriptorById.get(id)?.moduleId);
      expect(alias.anchorIds.every((id) => basicIds.has(id))).toBe(true);
      expect(anchorModuleIds.every((moduleId) => moduleId === alias.moduleId)).toBe(true);
      expect((alias.discoveryAnchorIds ?? []).every((id) => discoveryIds.has(id))).toBe(true);
      expect(alias.icon.src).toBe(`/icons/descriptors/${alias.id}.png`);
      expect(alias.icon.src).not.toContain("0000");
      expect(alias.contexts).toHaveLength(1);
      expect(alias.contexts.every((context) => context.answerIds.length > 0)).toBe(true);
      expect(alias.contexts.every((context) => context.answerIds.every((id) => context.optionIds.includes(id)))).toBe(true);
      expect(alias.contexts.every((context) => context.optionIds.length === 4)).toBe(true);

      if (alias.kind === "single_anchor") {
        expect(alias.anchorIds).toHaveLength(1);
        expect(alias.contexts.every((context) => context.answerIds.every((id) => basicIds.has(id)))).toBe(true);
        expect(alias.contexts.every((context) => context.optionIds.every((id) => basicIds.has(id)))).toBe(true);
        expect(alias.contexts.every((context) => context.answerIds.every((id) => alias.anchorIds.includes(id)))).toBe(true);
      } else if (alias.kind === "ambiguous") {
        expect(alias.anchorIds.length).toBeGreaterThan(1);
        expect(alias.contexts.every((context) => context.answerIds.every((id) => basicIds.has(id)))).toBe(true);
        expect(alias.contexts.every((context) => context.optionIds.every((id) => basicIds.has(id)))).toBe(true);
        expect(alias.contexts.every((context) => context.answerIds.every((id) => alias.anchorIds.includes(id)))).toBe(true);
      } else {
        expect(alias.anchorIds).toHaveLength(0);
        expect(alias.discoveryAnchorIds?.length).toBeGreaterThan(0);
        expect(alias.contexts.every((context) => context.answerIds.every((id) => alias.discoveryAnchorIds?.includes(id)))).toBe(true);
        expect(alias.contexts.every((context) => context.optionIds.every((id) => discoveryIds.has(id)))).toBe(true);
      }
    }

    expect(aliasVocabularyCards.some((card) => card.id === "bassy")).toBe(false);
    const electrical = aliasVocabularyCards.find((card) => card.id === "electrical");
    expect(electrical?.contexts.every((context) => context.answerIds.includes("hum") && context.answerIds.includes("buzz"))).toBe(true);
    const shrill = aliasVocabularyCards.find((card) => card.id === "shrill");
    expect(shrill?.anchorIds).toEqual(["sibilant"]);
    expect(shrill?.contexts.every((context) => context.answerIds.includes("sibilant"))).toBe(true);
    const squawky = aliasVocabularyCards.find((card) => card.id === "squawky");
    expect(squawky?.anchorIds).toEqual([]);
    expect(squawky?.discoveryAnchorIds).toEqual(["brassy"]);
    expect(squawky?.contexts[0].answerIds).toEqual(["brassy"]);

    const firstOptionIsCorrect = aliasVocabularyCards.map((alias) => {
      const context = alias.contexts[0];
      return context.answerIds.includes(context.optionIds[0]);
    });
    expect(firstOptionIsCorrect.every(Boolean)).toBe(false);
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

    for (const descriptor of descriptorCatalog) {
      expect(descriptor.conflictsWith.every((id) => basicIds.has(id))).toBe(true);
    }
  });

  it("places every discovery recipe in a playable region with its required ingredients", () => {
    const basicIds = new Set(allBasicIds);
    const discoveryIds = new Set(discoveryCards.map((card) => card.id));
    const playableRegionIds = new Set(regionDefinitions.filter((region) => region.playable).map((region) => region.id));
    const listedDiscoveryIds = Object.values(playableRegionContent).flatMap((content) => content.discoveryIds);

    for (const [regionId, content] of Object.entries(playableRegionContent)) {
      expect(playableRegionIds.has(regionId), regionId).toBe(true);
      expect(content.ingredientIds.every((id) => basicIds.has(id)), regionId).toBe(true);
      expect(content.discoveryIds.every((id) => discoveryIds.has(id)), regionId).toBe(true);

      for (const discoveryId of content.discoveryIds) {
        const recipe = discoveryCards.find((card) => card.id === discoveryId)!;
        expect(recipe.ingredientIds.every((id) => content.ingredientIds.includes(id)), `${regionId}.${discoveryId}`).toBe(true);
      }

      for (const discovery of discoveryCards) {
        if (discovery.ingredientIds.every((id) => content.ingredientIds.includes(id))) {
          expect(content.discoveryIds, `${regionId}.${discovery.id}`).toContain(discovery.id);
        }
      }
    }

    for (const discovery of discoveryCards) {
      expect(listedDiscoveryIds, discovery.id).toContain(discovery.id);
      const validRegion = Object.values(playableRegionContent).some(
        (content) =>
          content.discoveryIds.includes(discovery.id) &&
          discovery.ingredientIds.every((id) => content.ingredientIds.includes(id))
      );
      expect(validRegion, discovery.id).toBe(true);
      expect(exactMatchedDiscovery(discovery.ingredientIds)?.id, discovery.id).toBe(discovery.id);
    }
  });

  it("keeps Boomy plus Bright anchored to Emberbody Valley only", () => {
    const regionsWithBoomyAndBright = Object.entries(playableRegionContent)
      .filter(([, content]) => content.ingredientIds.includes("boomy") && content.ingredientIds.includes("bright"))
      .map(([regionId]) => regionId);

    expect(regionsWithBoomyAndBright).toEqual(["b"]);
  });

  it("matches Region A discoveries by longest recipe first", () => {
    const matches = matchedDiscoveries(["rumble", "thump", "bright", "airy"]);
    expect(matches.map((recipe) => recipe.id)).toEqual(["exciting", "energetic", "powerful", "shimmering"]);
  });

  it("only uses an exact recipe as the active discovery identity", () => {
    expect(exactMatchedDiscovery(["rumble", "thump"])?.id).toBe("powerful");
    expect(exactMatchedDiscovery(["bright", "airy"])?.id).toBe("shimmering");
    expect(exactMatchedDiscovery(["warm", "bright"])?.id).toBe("full");
    expect(exactMatchedDiscovery(["warm", "boxy", "dull"])?.id).toBe("vintage");
    expect(exactMatchedDiscovery(["boomy", "boxy"])?.id).toBe("bassy");
    expect(exactMatchedDiscovery(["boomy", "bright"])?.id).toBe("vivid");
    expect(exactMatchedDiscovery(["boomy", "muddy"])?.id).toBe("bloated");
    expect(exactMatchedDiscovery(["muddy", "dull"])?.id).toBe("muffled");
    expect(exactMatchedDiscovery(["muddy", "boxy"])?.id).toBe("cloudy");
    expect(exactMatchedDiscovery(["boomy", "muddy", "dull"])?.id).toBe("woolly");
    expect(exactMatchedDiscovery(["muddy", "boxy", "dull"])?.id).toBe("veiled");
    expect(exactMatchedDiscovery(["muddy", "boxy", "honky", "dull"])?.id).toBe("congested");
    expect(exactMatchedDiscovery(["boomy", "muddy", "boxy", "honky", "dull"])?.id).toBe("buried");
    expect(exactMatchedDiscovery(["boxy", "honky"])?.id).toBe("cupped");
    expect(exactMatchedDiscovery(["honky", "nasal"])?.id).toBe("pinched");
    expect(exactMatchedDiscovery(["boxy", "nasal"])?.id).toBe("tubular");
    expect(exactMatchedDiscovery(["nasal", "harsh"])?.id).toBe("brassy");
    expect(exactMatchedDiscovery(["honky", "harsh"])).toBeUndefined();
    expect(exactMatchedDiscovery(["boxy", "honky", "nasal"])?.id).toBe("canned");
    expect(exactMatchedDiscovery(["boxy", "nasal", "harsh"])?.id).toBe("reedy");
    expect(exactMatchedDiscovery(["honky", "nasal", "harsh"])).toBeUndefined();
    expect(exactMatchedDiscovery(["thin", "harsh"])?.id).toBe("tinny");
    expect(exactMatchedDiscovery(["thin", "sibilant"])?.id).toBe("spitty");
    expect(exactMatchedDiscovery(["harsh", "glassy"])?.id).toBe("metallic");
    expect(exactMatchedDiscovery(["shouty", "harsh"])?.id).toBe("aggressive");
    expect(exactMatchedDiscovery(["bright", "harsh"])?.id).toBe("sharp");
    expect(exactMatchedDiscovery(["bright", "glassy"])?.id).toBe("crisp");
    expect(exactMatchedDiscovery(["hollow", "airy"])?.id).toBe("scooped");
    expect(exactMatchedDiscovery(["hollow", "dull"])?.id).toBe("distant");
    expect(exactMatchedDiscovery(["thin", "bright"])?.id).toBe("lean");
    expect(exactMatchedDiscovery(["thin", "hollow"])?.id).toBe("empty");
    expect(exactMatchedDiscovery(["thin", "dull"])?.id).toBe("faded");
    expect(exactMatchedDiscovery(["boomy", "hollow", "airy"])).toBeUndefined();
    expect(exactMatchedDiscovery(["boomy", "hollow", "airy", "sibilant"])).toBeUndefined();
    expect(exactMatchedDiscovery(["thin", "bright", "sibilant"])?.id).toBe("brittle");
    expect(exactMatchedDiscovery(["thin", "hollow", "airy"])?.id).toBe("cold");
    expect(exactMatchedDiscovery(["shouty", "harsh", "sibilant"])?.id).toBe("fatiguing");
    expect(exactMatchedDiscovery(["thin", "hollow", "harsh", "glassy"])?.id).toBe("plasticky");
    expect(exactMatchedDiscovery(["thin", "hollow", "shouty", "harsh", "sibilant"])?.id).toBe("piercing");
    expect(exactMatchedDiscovery(["centered", "focused"])?.id).toBe("precise");
    expect(exactMatchedDiscovery(["wide", "blurred"])?.id).toBe("diffuse");
    expect(exactMatchedDiscovery(["near", "dry"])?.id).toBe("intimate");
    expect(exactMatchedDiscovery(["far", "reverberant"])?.id).toBe("set_back");
    expect(exactMatchedDiscovery(["wide", "reverberant"])?.id).toBe("spacious");
    expect(exactMatchedDiscovery(["softened", "loose"])?.id).toBe("sluggish");
    expect(exactMatchedDiscovery(["compressed", "pumping"])?.id).toBe("surging");
    expect(exactMatchedDiscovery(["clipped", "distorted"])?.id).toBe("overdriven");
    expect(exactMatchedDiscovery(["harsh", "sibilant"])).toBeUndefined();
    expect(exactMatchedDiscovery(["bright", "sibilant"])).toBeUndefined();
    expect(exactMatchedDiscovery(["rumble", "thump", "airy"])).toBeUndefined();
  });

  it("covers all 18 spectral basics through the three spectral gates", () => {
    const gateIds = new Set(
      gateDefinitions
        .filter((gate) => gate.moduleId === "spectral")
        .flatMap((gate) => [...gate.giftCards, gate.firstCatch, ...gate.laterUnlocks])
    );
    expect(gateIds.size).toBe(18);
    expect(spectralBasicIds.every((id) => gateIds.has(id))).toBe(true);
  });

  it("assigns every basic card to a learn gate", () => {
    const gateIds = new Set(gateDefinitions.flatMap((gate) => [...gate.giftCards, gate.firstCatch, ...gate.laterUnlocks]));
    const gateUnlockIds = gateDefinitions.flatMap((gate) => [...gate.giftCards, gate.firstCatch, ...gate.laterUnlocks]);
    expect(new Set(gateUnlockIds).size).toBe(gateUnlockIds.length);
    expect(gateUnlockIds.every((id) => allBasicIds.includes(id))).toBe(true);
    expect(allBasicIds.every((id) => gateIds.has(id))).toBe(true);
  });

  it("splits the active spatial basics into two physical learn gates", () => {
    expect(basicIdsForModule("spatial")).toHaveLength(11);
    expect(gateDefinitions.filter((gate) => gate.moduleId === "spatial").map((gate) => gate.id)).toEqual([
      "spatial-position",
      "spatial-image"
    ]);
  });

  it("splits the active integrity basics into contamination and glitch learn gates", () => {
    expect(basicIdsForModule("integrity")).toHaveLength(11);
    expect(gateDefinitions.filter((gate) => gate.moduleId === "integrity").map((gate) => gate.id)).toEqual([
      "integrity-contamination",
      "integrity-glitch"
    ]);
  });

  it("uses existing cards as gate challenge anchors", () => {
    const basicIds = new Set(allBasicIds);

    for (const gate of gateDefinitions) {
      const anchors = [
        ...gate.anchors,
        ...Object.values(gate.challengeAnchors ?? {}).flatMap((ids) => ids ?? [])
      ];
      expect(anchors.every((id) => basicIds.has(id))).toBe(true);
    }
  });

  it("defines atlas regions for all four descriptor modules", () => {
    expect(new Set(regionDefinitions.map((region) => region.id)).size).toBe(regionDefinitions.length);
    expect(regionDefinitions.filter((region) => region.moduleId === "spectral")).toHaveLength(6);
    expect(regionDefinitions.filter((region) => region.moduleId === "spectral").map((region) => region.id)).toEqual([
      "a",
      "b",
      "c",
      "d",
      "g",
      "e"
    ]);
    expect(regionDefinitions.filter((region) => region.moduleId === "spatial")).toHaveLength(2);
    expect(regionDefinitions.filter((region) => region.moduleId === "dynamic")).toHaveLength(2);
    expect(regionDefinitions.filter((region) => region.moduleId === "integrity")).toHaveLength(1);
    expect(regionDefinitions.find((region) => region.id === "a")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "b")?.playable).toBe(true);
    expect(regionDefinitions.every((region) => region.imageSrc.startsWith("/icons/regions/"))).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "c")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "d")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "e")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "f")).toBeUndefined();
    expect(regionDefinitions.find((region) => region.id === "g")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "spatial-1")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "spatial-2")).toBeUndefined();
    expect(regionDefinitions.find((region) => region.id === "spatial-3")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "dynamic-1")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "dynamic-2")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "dynamic-3")).toBeUndefined();
    expect(regionDefinitions.find((region) => region.id === "integrity-1")?.playable).toBe(true);
    expect(regionDefinitions.find((region) => region.id === "integrity-2")).toBeUndefined();
    expect(regionDefinitions.find((region) => region.id === "integrity-3")).toBeUndefined();
  });
});
