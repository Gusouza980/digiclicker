"use client";

import { useEffect } from "react";

import { useBattleStore } from "@/stores/battle-store";
import { useGameStore } from "@/stores/game-store";

const VICTORY_DELAY_MS = 1200;

export function useBattleLoop() {
  const save = useGameStore((state) => state.save);
  const config = useGameStore((state) => state.config);
  const initBattle = useBattleStore((state) => state.initBattle);
  const tick = useBattleStore((state) => state.tick);
  const continueAfterVictory = useBattleStore((state) => state.continueAfterVictory);
  const reset = useBattleStore((state) => state.reset);
  const phase = useBattleStore((state) => state.snapshot?.phase);

  useEffect(() => {
    if (!save || !config) return;

    initBattle(save, config);
    return () => reset();
  }, [save, config, initBattle, reset]);

  useEffect(() => {
    if (!config || phase !== "fighting") return;

    const intervalId = window.setInterval(() => {
      tick(config.battle.tickMs);
    }, config.battle.tickMs);

    return () => window.clearInterval(intervalId);
  }, [config, phase, tick]);

  useEffect(() => {
    if (phase !== "victory") return;

    const timeoutId = window.setTimeout(() => {
      continueAfterVictory();
    }, VICTORY_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase, continueAfterVictory]);
}
