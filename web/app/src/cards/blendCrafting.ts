import type { DiscoveryCard } from "./cardTypes";
import { discoveryCards } from "./discoveryRecipes";
import { exactMatchedDiscovery, matchedDiscoveries } from "./recipeMatcher";

export type BlendCraftStatus = "empty" | "unlocked" | "known" | "overloaded" | "near" | "miss";

export type BlendCraftResult = {
  status: BlendCraftStatus;
  activeIds: string[];
  blendKey: string;
  discovery?: DiscoveryCard;
  nearestDiscovery?: DiscoveryCard;
  containedDiscoveries: DiscoveryCard[];
};

const thunderstepOrder = ["rumble", "thump", "punchy", "bright", "airy"];
const thunderstepOrderIndex = new Map(thunderstepOrder.map((id, index) => [id, index]));

export function sortBlendIds(ids: string[]): string[] {
  return [...new Set(ids)].sort((a, b) => {
    const aIndex = thunderstepOrderIndex.get(a) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = thunderstepOrderIndex.get(b) ?? Number.MAX_SAFE_INTEGER;
    if (aIndex !== bIndex) return aIndex - bIndex;
    return a.localeCompare(b);
  });
}

export function blendKeyFor(ids: string[]): string {
  return sortBlendIds(ids).join("+") || "empty";
}

export function evaluateDiscoveryBlend(activeIds: string[], unlockedDiscoveryIds: string[]): BlendCraftResult {
  const sortedActiveIds = sortBlendIds(activeIds);
  const blendKey = blendKeyFor(sortedActiveIds);
  const unlocked = new Set(unlockedDiscoveryIds);

  if (sortedActiveIds.length === 0) {
    return {
      status: "empty",
      activeIds: sortedActiveIds,
      blendKey,
      containedDiscoveries: []
    };
  }

  const exactDiscovery = exactMatchedDiscovery(sortedActiveIds);
  if (exactDiscovery) {
    return {
      status: unlocked.has(exactDiscovery.id) ? "known" : "unlocked",
      activeIds: sortedActiveIds,
      blendKey,
      discovery: exactDiscovery,
      containedDiscoveries: []
    };
  }

  const containedDiscoveries = matchedDiscoveries(sortedActiveIds);
  if (containedDiscoveries.length > 0) {
    return {
      status: "overloaded",
      activeIds: sortedActiveIds,
      blendKey,
      nearestDiscovery: containedDiscoveries[0],
      containedDiscoveries
    };
  }

  const active = new Set(sortedActiveIds);
  const nearestDiscovery = discoveryCards
    .map((recipe, index) => ({
      recipe,
      index,
      presentCount: recipe.ingredientIds.filter((id) => active.has(id)).length,
      missingCount: recipe.ingredientIds.filter((id) => !active.has(id)).length
    }))
    .filter(({ presentCount, recipe }) => presentCount > 0 && presentCount < recipe.ingredientIds.length)
    .sort((a, b) => {
      if (a.presentCount !== b.presentCount) return b.presentCount - a.presentCount;
      if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount;
      if (a.recipe.priority !== b.recipe.priority) return b.recipe.priority - a.recipe.priority;
      return a.index - b.index;
    })[0]?.recipe;

  if (!nearestDiscovery) {
    return {
      status: "miss",
      activeIds: sortedActiveIds,
      blendKey,
      containedDiscoveries: []
    };
  }

  const presentCount = nearestDiscovery.ingredientIds.filter((id) => active.has(id)).length;
  const isNear = nearestDiscovery.ingredientIds.length === 2 ? presentCount >= 1 : presentCount >= 2;

  return {
    status: isNear ? "near" : "miss",
    activeIds: sortedActiveIds,
    blendKey,
    nearestDiscovery,
    containedDiscoveries: []
  };
}
