import { create } from "zustand";

import { getCatalogEntry, getGlobalConfig, loadCatalogRegistry } from "@/catalogs/loader";
import { clampBattleSpeed, isBattleSpeedUnlocked } from "@/game/battle/speed";
import {
  selectLocation as selectLocationInSave,
  syncUnlockedLocations,
} from "@/game/locations";
import { claimMission, updateMissionProgressOnLocationChange } from "@/game/missions";
import { moveDigimonToIsland, moveDigimonToTeam } from "@/game/collection";
import { degenerateDigimon, evolveDigimon } from "@/game/evolution";
import { canChallengeBoss, recordBossDailyAttempt } from "@/game/boss";
import { useMeatOnDigimon, useTraitResetCore, useXpBoost } from "@/game/items/use";
import { collectIslandAction, startIslandAction } from "@/game/island";
import { clearOfflineSummary, processOfflineProgress } from "@/game/offline";
import { setAutoProgressEnabled } from "@/game/progression/auto-progress";
import { createSave, loadSave, migrateSave, persistSave, resetSave } from "@/game/save";
import { buyItem, sellItem } from "@/game/shop";
import { normalizeSave } from "@/game/save/normalize";
import { ensureStarterTeam } from "@/game/save/starter-team";
import {
  hatchEgg,
  insertEssence,
  scanEgg,
} from "@/game/hatching";
import { unlockTrait } from "@/game/traits/unlock";
import { translate } from "@/i18n";
import { useBattleStore } from "@/stores/battle-store";
import type {
  BattleSpeed,
  CollectionFeedback,
  EvolutionFeedback,
  GlobalConfig,
  IslandActionFeedback,
  IslandActionType,
  ItemUseFeedback,
  ShopFeedback,
  StatKey,
  HatchDestination,
  HatchingFeedback,
  SaveData,
  SupportedLocale,
} from "@/types";
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
  performScanEgg: (eggInstanceId: string) => HatchingFeedback | null;
  performInsertEssence: (eggInstanceId: string, useStabilizer?: boolean) => HatchingFeedback | null;
  performHatchEgg: (eggInstanceId: string, destination: HatchDestination) => HatchingFeedback | null;
  moveToTeam: (islandDigimonId: string, swapWithTeamMemberId?: string) => CollectionFeedback | null;
  moveToIsland: (teamDigimonId: string) => CollectionFeedback | null;
  performEvolve: (digimonInstanceId: string, transitionId: string) => EvolutionFeedback | null;
  performDegenerate: (digimonInstanceId: string, transitionId: string) => EvolutionFeedback | null;
  startIslandAction: (params: {
    digimonInstanceId: string;
    actionType: IslandActionType;
    statTarget?: StatKey;
    typeXpTarget?: string;
    missionId?: string;
    useTrainingChip?: boolean;
  }) => IslandActionFeedback | null;
  collectIslandAction: (actionId: string) => IslandActionFeedback | null;
  buyShopItem: (itemId: string, quantity?: number) => ShopFeedback | null;
  sellInventoryItem: (itemId: string, quantity?: number) => ShopFeedback | null;
  useItemOnDigimon: (itemId: string, digimonInstanceId: string) => ItemUseFeedback | null;
  useInventoryItem: (itemId: string) => ItemUseFeedback | null;
  toggleAutoProgress: (enabled: boolean) => void;
  challengeBoss: (bossId: string) => boolean;
  dismissOfflineSummary: () => void;
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
    const rawSave = migrateSave(existing ?? createSave(DEFAULT_LOCALE));
    const withTeam = ensureStarterTeam(rawSave);
    const normalized = normalizeSave(withTeam);
    const synced = syncUnlockedLocations(normalized);
    const clampedSpeed = clampBattleSpeed(synced, synced.settings.battleSpeed ?? 1);
    const withSpeed =
      clampedSpeed === synced.settings.battleSpeed
        ? synced
        : { ...synced, settings: { ...synced.settings, battleSpeed: clampedSpeed } };
    const offlineResult = processOfflineProgress(withSpeed, config);
    const save = persistSave(offlineResult.save);

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

  performScanEgg: (eggInstanceId) => {
    const { save } = get();
    if (!save) return null;

    const result = scanEgg(save, eggInstanceId);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  performInsertEssence: (eggInstanceId, useStabilizer = false) => {
    const { save } = get();
    if (!save) return null;

    const result = insertEssence(save, eggInstanceId, useStabilizer);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  moveToTeam: (islandDigimonId, swapWithTeamMemberId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    const result = moveDigimonToTeam(save, islandDigimonId, swapWithTeamMemberId, config);
    if (result.ok) {
      const persisted = persistSave(result.save);
      set({ save: persisted });

      const battle = useBattleStore.getState();
      battle.reset();
      battle.initBattle(persisted, config);
    }
    return result.feedback;
  },

  moveToIsland: (teamDigimonId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    const result = moveDigimonToIsland(save, teamDigimonId, config);
    if (result.ok) {
      const persisted = persistSave(result.save);
      set({ save: persisted });

      const battle = useBattleStore.getState();
      battle.reset();
      battle.initBattle(persisted, config);
    }
    return result.feedback;
  },

  performEvolve: (digimonInstanceId, transitionId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    const result = evolveDigimon(save, digimonInstanceId, transitionId);
    if (result.ok) {
      const persisted = persistSave(result.save);
      set({ save: persisted });

      const battle = useBattleStore.getState();
      battle.reset();
      battle.initBattle(persisted, config);
    }
    return result.feedback;
  },

  performDegenerate: (digimonInstanceId, transitionId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    const result = degenerateDigimon(save, digimonInstanceId, transitionId);
    if (result.ok) {
      const persisted = persistSave(result.save);
      set({ save: persisted });

      const battle = useBattleStore.getState();
      battle.reset();
      battle.initBattle(persisted, config);
    }
    return result.feedback;
  },

  startIslandAction: (params) => {
    const { save, config } = get();
    if (!save || !config) return null;

    const result = startIslandAction(save, params, config);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  collectIslandAction: (actionId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    const result = collectIslandAction(save, actionId, config);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  buyShopItem: (itemId, quantity = 1) => {
    const { save } = get();
    if (!save) return null;

    const result = buyItem(save, itemId, quantity);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  sellInventoryItem: (itemId, quantity = 1) => {
    const { save } = get();
    if (!save) return null;

    const result = sellItem(save, itemId, quantity);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  useItemOnDigimon: (itemId, digimonInstanceId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    if (itemId !== "meat") {
      return { messageKey: "item.error.unsupported", variant: "fail" };
    }

    const result = useMeatOnDigimon(save, digimonInstanceId, config);
    if (result.ok) {
      set({ save: persistSave(result.save) });
    }
    return result.feedback;
  },

  useInventoryItem: (itemId) => {
    const { save, config } = get();
    if (!save || !config) return null;

    let result;
    if (itemId === "xp_boost") {
      result = useXpBoost(save, config);
    } else if (itemId === "trait_reset_core") {
      result = useTraitResetCore(save);
    } else {
      return { messageKey: "item.error.unsupported", variant: "fail" };
    }

    if (result.ok) {
      const persisted = persistSave(result.save);
      set({ save: persisted });

      if (itemId === "trait_reset_core") {
        const battle = useBattleStore.getState();
        if (config && battle.engine) {
          battle.reset();
          battle.initBattle(persisted, config);
        }
      }
    }
    return result.feedback;
  },

  toggleAutoProgress: (enabled) => {
    const { save } = get();
    if (!save) return;

    const updated = persistSave(setAutoProgressEnabled(save, enabled));
    set({ save: updated });
  },

  challengeBoss: (bossId) => {
    const { save } = get();
    if (!save || !canChallengeBoss(save, bossId)) return false;

    const updated = persistSave(recordBossDailyAttempt(save, bossId));
    set({ save: updated });

    useBattleStore.getState().requestBossBattle(bossId);
    return true;
  },

  dismissOfflineSummary: () => {
    const { save } = get();
    if (!save) return;

    const updated = persistSave(clearOfflineSummary(save));
    set({ save: updated });
  },

  performHatchEgg: (eggInstanceId, destination) => {
    const { save, config } = get();
    if (!save) return null;

    const result = hatchEgg(save, eggInstanceId, destination);
    if (result.ok) {
      const persisted = persistSave(result.save);
      set({ save: persisted });

      if (config && destination === "team") {
        const battle = useBattleStore.getState();
        battle.reset();
        battle.initBattle(persisted, config);
      }
    }
    return result.feedback;
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
