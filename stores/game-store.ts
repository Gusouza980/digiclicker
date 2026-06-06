import { create } from "zustand";

import { getCatalogEntry, getGlobalConfig, loadCatalogRegistry } from "@/catalogs/loader";
import { createSave, loadSave, persistSave, resetSave } from "@/game/save";
import { ensureStarterTeam } from "@/game/save/starter-team";
import { translate } from "@/i18n";
import type { GlobalConfig, SaveData, SupportedLocale } from "@/types";
import { DEFAULT_LOCALE } from "@/types/locale";

type GameStore = {
  save: SaveData | null;
  config: GlobalConfig | null;
  isHydrated: boolean;
  statusMessage: string | null;
  hydrate: () => void;
  setLocale: (locale: SupportedLocale) => void;
  createNewSave: () => void;
  resetCurrentSave: () => void;
  touchSave: () => void;
  t: (key: string, params?: Record<string, string>) => string;
};

export const useGameStore = create<GameStore>((set, get) => ({
  save: null,
  config: null,
  isHydrated: false,
  statusMessage: null,

  hydrate: () => {
    loadCatalogRegistry();
    const config = getGlobalConfig();
    const existing = loadSave();
    const rawSave = existing ?? createSave(DEFAULT_LOCALE);
    const save = ensureStarterTeam(rawSave);
    persistSave(save);

    set({
      save,
      config,
      isHydrated: true,
      statusMessage: existing ? "save.persisted" : "save.new_created",
    });
  },

  setLocale: (locale) => {
    const { save } = get();
    if (!save) return;

    const updated = persistSave({
      ...save,
      settings: { ...save.settings, locale },
    });

    set({ save: updated });
  },

  createNewSave: () => {
    const locale = get().save?.settings.locale ?? DEFAULT_LOCALE;
    const save = resetSave(locale);
    set({ save, statusMessage: "save.new_created" });
  },

  resetCurrentSave: () => {
    const locale = get().save?.settings.locale ?? DEFAULT_LOCALE;
    const save = resetSave(locale);
    set({ save, statusMessage: "save.reset_done" });
  },

  touchSave: () => {
    const { save } = get();
    if (!save) return;
    const updated = persistSave(save);
    set({ save: updated, statusMessage: "save.persisted" });
  },

  t: (key, params) => {
    const locale = get().save?.settings.locale ?? DEFAULT_LOCALE;
    return translate(key, locale, undefined, params);
  },
}));

export function getLocationName(locationId: string, locale: SupportedLocale): string {
  const entry = getCatalogEntry("location", locationId);
  if (!entry) return locationId;
  return translate(entry.nameKey, locale);
}
