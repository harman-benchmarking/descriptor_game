export type DescriptorGroup = "bass" | "mid" | "treble";

export type EqFilterSpec = {
  frequencyHz: number;
  gainDb: number;
  q: number;
};

export type DescriptorCard = {
  id: string;
  role: "basic";
  group: DescriptorGroup;
  aliases: string[];
  filters: EqFilterSpec[];
  conflictsWith: string[];
  icon: {
    src: string;
    altKey: string;
  };
  learning: {
    recommendedStartIntensity: number;
    revealCurveAfterCompletions: number;
    headphoneRecommended: boolean;
  };
  textKeys: {
    label: string;
    summary: string;
  };
};

export type DiscoveryTier = "combo" | "big_combo" | "mega_combo";

export type DiscoveryCard = {
  id: string;
  role: "discovery";
  tier: DiscoveryTier;
  ingredientIds: string[];
  priority: number;
  icon: {
    src: string;
    lockedSrc?: string;
    altKey: string;
  };
  unlock: {
    hintLevel: "hidden" | "family_hint" | "partial_recipe" | "revealed";
    playableAfterUnlock: boolean;
  };
  textKeys: {
    label: string;
    explanation: string;
    hint: string;
  };
};

export type CardId = DescriptorCard["id"] | DiscoveryCard["id"];
