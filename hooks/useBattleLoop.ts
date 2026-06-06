"use client";

import { useEffect, useRef } from "react";

import {
  getBattleTickIntervalMs,
  getVictoryDelayMs,
} from "@/game/battle/speed";
import { useBattleStore } from "@/stores/battle-store";
import { useGameStore } from "@/stores/game-store";

const BATTLE_INTERVAL_DELAY_MS = 1000;

export function useBattleLoop() {
  const config = useGameStore((state) => state.config);
  const replaceSave = useGameStore((state) => state.replaceSave);
  const initBattle = useBattleStore((state) => state.initBattle);
  const tick = useBattleStore((state) => state.tick);
  const continueAfterVictory = useBattleStore((state) => state.continueAfterVictory);
  const applyVictoryRewards = useBattleStore((state) => state.applyVictoryRewards);
  const setLoadingNextBattle = useBattleStore((state) => state.setLoadingNextBattle);
  const reset = useBattleStore((state) => state.reset);
  const phase = useBattleStore((state) => state.snapshot?.phase);
  const save = useGameStore((state) => state.save);
  const battleSpeed = save?.settings.battleSpeed ?? 1;
  const victoryHandledRef = useRef(false);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  useEffect(() => {
    if (!save || !config) return;

    const engine = useBattleStore.getState().engine;
    if (!engine) {
      initBattle(save, config);
      victoryHandledRef.current = false;
    }
  }, [save, config, initBattle]);

  useEffect(() => {
    if (!config || phase !== "fighting") return;

    const intervalMs = getBattleTickIntervalMs(battleSpeed, config.battle.tickMs);

    const intervalId = window.setInterval(() => {
      tick(config.battle.tickMs);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [config, phase, tick, battleSpeed]);

  useEffect(() => {
    if (phase !== "victory" || !config) {
      if (phase !== "victory") {
        victoryHandledRef.current = false;
      }
      return;
    }

    if (victoryHandledRef.current) return;
    victoryHandledRef.current = true;

    const currentSave = useGameStore.getState().save;
    if (!currentSave) return;

    const updatedSave = applyVictoryRewards(currentSave, config);
    if (updatedSave) {
      replaceSave(updatedSave);
    }

    const saveToContinue = updatedSave ?? currentSave;

    setLoadingNextBattle(true);

    const victoryDelayMs = getVictoryDelayMs(battleSpeed, BATTLE_INTERVAL_DELAY_MS);

    const timeoutId = window.setTimeout(() => {
      continueAfterVictory(saveToContinue);
    }, victoryDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      setLoadingNextBattle(false);
    };
  }, [
    phase,
    config,
    applyVictoryRewards,
    replaceSave,
    continueAfterVictory,
    setLoadingNextBattle,
    battleSpeed,
  ]);
}
