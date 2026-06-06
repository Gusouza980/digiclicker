import { create } from "zustand";

import { BattleEngine, type BattleSnapshot } from "@/game/battle";
import type { GlobalConfig, SaveData } from "@/types";

type BattleStore = {
  snapshot: BattleSnapshot | null;
  engine: BattleEngine | null;
  initBattle: (save: SaveData, config: GlobalConfig) => void;
  tick: (deltaMs: number) => void;
  click: () => void;
  retry: () => void;
  continueAfterVictory: () => void;
  reset: () => void;
};

export const useBattleStore = create<BattleStore>((set, get) => ({
  snapshot: null,
  engine: null,

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
  },

  retry: () => {
    const { engine } = get();
    if (!engine) return;
    set({ snapshot: engine.retry() });
  },

  continueAfterVictory: () => {
    const { engine } = get();
    if (!engine) return;
    set({ snapshot: engine.continueAfterVictory() });
  },

  reset: () => {
    set({ engine: null, snapshot: null });
  },
}));
