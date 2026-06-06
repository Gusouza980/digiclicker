import type { SaveData } from "@/types";

import { SAVE_STORAGE_KEY } from "./constants";
import { migrateSave } from "./migrations";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function isSaveData(value: unknown): value is SaveData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<SaveData>;
  return (
    typeof candidate.saveVersion === "number" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string" &&
    typeof candidate.player === "object" &&
    candidate.player !== null &&
    typeof candidate.settings === "object" &&
    candidate.settings !== null
  );
}

export function loadSave(): SaveData | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = localStorage.getItem(SAVE_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isSaveData(parsed)) {
      return null;
    }

    return migrateSave(parsed);
  } catch {
    return null;
  }
}
