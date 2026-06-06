import type { SaveData } from "@/types";

import { SAVE_STORAGE_KEY } from "./constants";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function persistSave(save: SaveData): SaveData {
  if (!isBrowser()) {
    return save;
  }

  const payload: SaveData = {
    ...save,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}
