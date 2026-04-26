import type { Locale } from "../i18n/i18n";

export type PlaybackMode = "flat" | "processed";
export type IntensityMode = "practice" | "rating";

export type SaveDataV1 = {
  schemaVersion: 1;
  locale: Locale;
  unlockedDiscoveryIds: string[];
  learnedBasicIds: string[];
  completedChallenges: Record<string, number>;
  settings: {
    reducedMotion: boolean;
    practiceIntensity: number;
    ratingIntensity: number;
    preferHints: boolean;
  };
};

export const defaultSaveData: SaveDataV1 = {
  schemaVersion: 1,
  locale: "en",
  unlockedDiscoveryIds: [],
  learnedBasicIds: [],
  completedChallenges: {},
  settings: {
    reducedMotion: false,
    practiceIntensity: 1.8,
    ratingIntensity: 1.0,
    preferHints: true
  }
};
