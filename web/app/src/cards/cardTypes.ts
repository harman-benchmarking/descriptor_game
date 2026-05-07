export type DescriptorModuleId = "spectral" | "spatial" | "dynamic" | "integrity";

export type DescriptorGroup =
  | "bass"
  | "mid"
  | "treble"
  | "spatial-position"
  | "spatial-image"
  | "dynamic-snapback"
  | "dynamic-pressureflow"
  | "integrity-contamination"
  | "integrity-glitch";

export type EqFilterSpec = {
  frequencyHz: number;
  gainDb: number;
  q: number;
};

export type SpatialProfileId =
  | "left"
  | "right"
  | "centered"
  | "near"
  | "far"
  | "dry"
  | "reverberant"
  | "focused"
  | "blurred"
  | "wide"
  | "narrow"
  | "separated"
  | "crowded";
export type DynamicProfileId =
  | "snappy"
  | "softened"
  | "tight"
  | "loose"
  | "compressed"
  | "pumping"
  | "flat"
  | "clipped"
  | "distorted";
export type IntegrityProfileId =
  | "hiss"
  | "static"
  | "hum"
  | "buzz"
  | "whine"
  | "dirty"
  | "click"
  | "pop"
  | "crackle"
  | "dropout"
  | "squeak";

export type AudioProfile =
  | {
      kind: "spectralEq";
      filters: EqFilterSpec[];
    }
  | {
      kind: "spatial";
      profileId: SpatialProfileId;
    }
  | {
      kind: "dynamic";
      profileId: DynamicProfileId;
    }
  | {
      kind: "integrity";
      profileId: IntegrityProfileId;
    };

export type DescriptorCard = {
  id: string;
  role: "basic";
  moduleId: DescriptorModuleId;
  group: DescriptorGroup;
  aliases: string[];
  filters: EqFilterSpec[];
  audioProfile: AudioProfile;
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
