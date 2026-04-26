import { migrateSaveData } from "./migrations";
import { defaultSaveData, type SaveDataV1 } from "./saveData";

const saveKey = "descriptor-cards-save-v1";

export function loadSaveData(): SaveDataV1 {
  if (typeof localStorage === "undefined") return defaultSaveData;

  const raw = localStorage.getItem(saveKey);
  if (!raw) return defaultSaveData;

  try {
    return migrateSaveData(JSON.parse(raw));
  } catch {
    return defaultSaveData;
  }
}

export function storeSaveData(saveData: SaveDataV1) {
  localStorage.setItem(saveKey, JSON.stringify(saveData));
}

export function clearSaveData() {
  localStorage.removeItem(saveKey);
}
