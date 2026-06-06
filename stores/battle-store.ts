import { create } from "zustand";

import { BattleEngine, type BattleSnapshot } from "@/game/battle";
import { applyClickFriendship } from "@/game/friendship";
import { processBattleVictory } from "@/game/progression/victory";
import { useGameStore } from "@/stores/game-store";
import type { GlobalConfig, SaveData } from "@/types";

type BattleStore = {
  snapshot: BattleSnapshot | null;
  engine: BattleEngine | null;
  isLoadingNextBattle: boolean;
  setLoadingNextBattle: (loading: boolean) => void;
  initBattle: (save: SaveData, config: GlobalConfig) => void;
  tick: (deltaMs: number) => void;
  click: () => void;
  useSpecial: (allyInstanceId: string) => void;
  retry: () => void;
  continueAfterVictory: (save?: SaveData) => void;
  applyVictoryRewards: (save: SaveData, config: GlobalConfig) => SaveData | null;
  reset: () => void;
};

export const useBattleStore = create<BattleStore>((set, get) => ({
  snapshot: null,
  engine: null,
  isLoadingNextBattle: false,

  setLoadingNextBattle: (loading) => {
    set({ isLoadingNextBattle: loading });
  },

  initBattle: (save, config) => {
    const engine = new BattleEngine(save, config);
    set({ engine, snapshot: engine.getSnapshot() });
  },

  tick: (deltaMs) => {
    const { engine } = get();
    if (!engine) return;
    set({ snapshot: engine.tick(deltaMs) });
  },

  click: () => {
    const { engine } = get();
    if (!engine) return;
    set({ snapshot: engine.click() });

    const save = useGameStore.getState().save;
    const config = useGameStore.getState().config;
    if (!save || !config) return;

    const livingIds = engine.getLivingAllyInstanceIds();
    const updated = applyClickFriendship(save, livingIds, config);
    if (updated !== save) {
      useGameStore.getState().replaceSave(updated);
    }
  },

  useSpecial: (allyInstanceId) => {
    const { engine } = get();
    if (!engine) return;
    set({ snapshot: engine.useSpecial(allyInstanceId) });
  },

  retry: () => {
    const { engine } = get();
    if (!engine) return;
    set({ snapshot: engine.retry() });
  },

  continueAfterVictory: (save) => {
    const { engine } = get();
    if (!engine) return;
    set({
      snapshot: engine.continueAfterVictory(save),
      isLoadingNextBattle: false,
    });
  },

  applyVictoryRewards: (save, config) => {
    const { engine } = get();
    if (!engine || engine.getSnapshot().phase !== "victory") return null;

    const result = processBattleVictory(
      save,
      config,
      engine.getLocationId(),
      engine.getDefeatedEnemyIds(),
      engine.getLivingAllyInstanceIds(),
    );

    engine.setVictoryRewards(result.display, result.levelUps);
    set({ snapshot: engine.getSnapshot() });

    return result.save;
  },

  reset: () => {
    set({ engine: null, snapshot: null, isLoadingNextBattle: false });
  },
}));
