import type { DiscoveryCard, DiscoveryTier } from "./cardTypes";

const iconFileById: Record<string, string> = {
  powerful: "powerful.png",
  impactful: "impactful.png",
  energetic: "energetic.png",
  exciting: "exciting.png"
};

const discovery = (
  id: string,
  tier: DiscoveryTier,
  ingredientIds: string[],
  priority: number
): DiscoveryCard => ({
  id,
  role: "discovery",
  tier,
  ingredientIds,
  priority,
  icon: {
    src: `/icons/discoveries/${iconFileById[id]}`,
    altKey: `recipe.${id}.alt`
  },
  unlock: {
    hintLevel: "family_hint",
    playableAfterUnlock: true
  },
  textKeys: {
    label: `recipe.${id}.label`,
    explanation: `recipe.${id}.explanation`,
    hint: `recipe.${id}.hint`
  }
});

export const discoveryCards: DiscoveryCard[] = [
  discovery("powerful", "combo", ["rumble", "thump"], 70),
  discovery("impactful", "combo", ["thump", "punchy"], 70),
  discovery("energetic", "big_combo", ["rumble", "thump", "bright"], 80),
  discovery("exciting", "mega_combo", ["rumble", "thump", "bright", "airy"], 110)
];

export const discoveryById = new Map(discoveryCards.map((recipe) => [recipe.id, recipe]));
