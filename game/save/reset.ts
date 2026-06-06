import type { SaveData, SupportedLocale } from "@/types";

import { createSave } from "./create";
import { persistSave } from "./persist";
import { SAVE_STORAGE_KEY } from "./constants";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function resetSave(locale?: SupportedLocale): SaveData {
  if (isBrowser()) {
    localStorage.removeItem(SAVE_STORAGE_KEY);
  }

  const freshSave = createSave(locale);
  return persistSave(freshSave);
}
