import type { Locale } from "../i18n/i18n";

export type PlaybackMode = "flat" | "processed";

export const intensityRange = { min: 0.5, max: 2.0, step: 0.05 };

export type SaveDataV1 = {
  schemaVersion: 1;
  locale: Locale;
  unlockedDiscoveryIds: string[];
  unlockedAliasIds: string[];
  learnedBasicIds: string[];
  completedChallenges: Record<string, number>;
  settings: {
    reducedMotion: boolean;
    intensity: number;
    preferHints: boolean;
  };
};

export const defaultSaveData: SaveDataV1 = {
  schemaVersion: 1,
  locale: "en",
  unlockedDiscoveryIds: [],
  unlockedAliasIds: [],
  learnedBasicIds: [],
  completedChallenges: {},
  settings: {
    reducedMotion: false,
    intensity: 2.0,
    preferHints: true
  }
};
