import { defaultSaveData, type SaveDataV1 } from "./saveData";

export function migrateSaveData(value: unknown): SaveDataV1 {
  if (!value || typeof value !== "object") return defaultSaveData;
  const maybeSave = value as Partial<SaveDataV1>;

  if (maybeSave.schemaVersion !== 1) return defaultSaveData;

  return {
    ...defaultSaveData,
    ...maybeSave,
    unlockedDiscoveryIds: Array.isArray(maybeSave.unlockedDiscoveryIds) ? maybeSave.unlockedDiscoveryIds : [],
    learnedBasicIds: Array.isArray(maybeSave.learnedBasicIds) ? maybeSave.learnedBasicIds : [],
    completedChallenges:
      maybeSave.completedChallenges && typeof maybeSave.completedChallenges === "object"
        ? maybeSave.completedChallenges
        : {},
    settings: {
      ...defaultSaveData.settings,
      ...(maybeSave.settings ?? {})
    }
  };
}
