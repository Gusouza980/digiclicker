import { create } from "zustand";

import { getCatalogEntry, getGlobalConfig, loadCatalogRegistry } from "@/catalogs/loader";
import { clampBattleSpeed, isBattleSpeedUnlocked } from "@/game/battle/speed";
import {
  selectLocation as selectLocationInSave,
  syncUnlockedLocations,
} from "@/game/locations";
import { claimMission, updateMissionProgressOnLocationChange } from "@/game/missions";
import { createSave, loadSave, persistSave, resetSave } from "@/game/save";
import { ensureStarterTeam } from "@/game/save/starter-team";
import { unlockTrait } from "@/game/traits/unlock";
import { translate } from "@/i18n";
import { useBattleStore } from "@/stores/battle-store";
import type { BattleSpeed, GlobalConfig, SaveData, SupportedLocale } from "@/types";
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
  replaceSave: (save: SaveData) => void;
  selectLocation: (locationId: string) => boolean;
  claimMissionReward: (missionId: string) => boolean;
  unlockTraitById: (traitId: string) => boolean;
  setBattleSpeed: (speed: BattleSpeed) => boolean;
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
    const withTeam = ensureStarterTeam(rawSave);
    const synced = syncUnlockedLocations(withTeam);
    const clampedSpeed = clampBattleSpeed(synced, synced.settings.battleSpeed ?? 1);
    const save =
      clampedSpeed === synced.settings.battleSpeed
        ? synced
        : { ...synced, settings: { ...synced.settings, battleSpeed: clampedSpeed } };
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

  replaceSave: (save) => {
    const updated = persistSave(save);
    set({ save: updated });
  },

  selectLocation: (locationId) => {
    const { save, config } = get();
    if (!save || !config) return false;

    const selected = selectLocationInSave(save, locationId);
    if (!selected) return false;

    let updated = updateMissionProgressOnLocationChange(selected, locationId);
    updated = syncUnlockedLocations(updated);
    const persisted = persistSave(updated);
    set({ save: persisted });

    useBattleStore.getState().reset();
    useBattleStore.getState().initBattle(persisted, config);

    return true;
  },

  claimMissionReward: (missionId) => {
    const { save, config } = get();
    if (!save || !config) return false;

    const result = claimMission(save, missionId, config);
    if (!result) return false;

    let updated = syncUnlockedLocations(result.save);
    const persisted = persistSave(updated);
    set({ save: persisted });
    return true;
  },

  unlockTraitById: (traitId) => {
    const { save } = get();
    if (!save) return false;

    const result = unlockTrait(save, traitId);
    if (!result.success) return false;

    const persisted = persistSave(result.save);
    set({ save: persisted });

    const { config } = get();
    const battle = useBattleStore.getState();
    if (config && battle.engine) {
      battle.reset();
      battle.initBattle(persisted, config);
    }

    return true;
  },

  setBattleSpeed: (speed) => {
    const { save } = get();
    if (!save || !isBattleSpeedUnlocked(save, speed)) return false;
    if (save.settings.battleSpeed === speed) return true;

    const updated = persistSave({
      ...save,
      settings: { ...save.settings, battleSpeed: speed },
    });
    set({ save: updated });
    return true;
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
