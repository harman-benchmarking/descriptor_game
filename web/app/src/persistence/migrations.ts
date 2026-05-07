import { defaultSaveData, intensityRange, type SaveDataV1 } from "./saveData";

export function migrateSaveData(value: unknown): SaveDataV1 {
  if (!value || typeof value !== "object") return defaultSaveData;
  const maybeSave = value as Partial<SaveDataV1>;
  const maybeSettings = maybeSave.settings as
    | (Partial<SaveDataV1["settings"]> & {
        practiceIntensity?: number;
        ratingIntensity?: number;
      })
    | undefined;

  if (maybeSave.schemaVersion !== 1) return defaultSaveData;

  const migratedIntensity =
    typeof maybeSettings?.intensity === "number"
      ? maybeSettings.intensity
      : typeof maybeSettings?.practiceIntensity === "number"
        ? maybeSettings.practiceIntensity
        : defaultSaveData.settings.intensity;
  const safeIntensity = Math.min(intensityRange.max, Math.max(intensityRange.min, migratedIntensity));

  return {
    ...defaultSaveData,
    ...maybeSave,
    unlockedDiscoveryIds: Array.isArray(maybeSave.unlockedDiscoveryIds) ? maybeSave.unlockedDiscoveryIds : [],
    unlockedAliasIds: Array.isArray(maybeSave.unlockedAliasIds) ? maybeSave.unlockedAliasIds : [],
    learnedBasicIds: Array.isArray(maybeSave.learnedBasicIds) ? maybeSave.learnedBasicIds : [],
    completedChallenges:
      maybeSave.completedChallenges && typeof maybeSave.completedChallenges === "object"
        ? maybeSave.completedChallenges
        : {},
    settings: {
      reducedMotion: typeof maybeSettings?.reducedMotion === "boolean" ? maybeSettings.reducedMotion : defaultSaveData.settings.reducedMotion,
      intensity: safeIntensity,
      preferHints: typeof maybeSettings?.preferHints === "boolean" ? maybeSettings.preferHints : defaultSaveData.settings.preferHints
    }
  };
}
