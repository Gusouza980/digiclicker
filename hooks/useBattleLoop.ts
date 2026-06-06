"use client";

import { useEffect, useRef } from "react";

import {
  getBattleTickIntervalMs,
  getVictoryDelayMs,
} from "@/game/battle/speed";
import { getCatalogEntry } from "@/catalogs/loader";
import { pauseAutoProgress, tryAutoAdvanceLocation } from "@/game/progression/auto-progress";
import { persistSave } from "@/game/save";
import { useBattleStore } from "@/stores/battle-store";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";

const BATTLE_INTERVAL_DELAY_MS = 1000;

export function useBattleLoop() {
  const config = useGameStore((state) => state.config);
  const replaceSave = useGameStore((state) => state.replaceSave);
  const ensureBattleEngine = useBattleStore((state) => state.ensureBattleEngine);
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
    if (!save || !config) return;

    ensureBattleEngine(save, config);
  }, [save, config, ensureBattleEngine]);

  useEffect(() => {
    if (phase !== "defeat") return;

    const currentSave = useGameStore.getState().save;
    if (!currentSave) return;

    const paused = pauseAutoProgress(currentSave);
    if (paused !== currentSave) {
      replaceSave(paused);
    }
  }, [phase, replaceSave]);

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

    const snapshotBeforeContinue = useBattleStore.getState().snapshot;
    const updatedSave = applyVictoryRewards(currentSave, config);
    let saveToContinue = updatedSave ?? currentSave;

    if (snapshotBeforeContinue?.isBossBattle && snapshotBeforeContinue.bossChallengeId) {
      const boss = getCatalogEntry("boss", snapshotBeforeContinue.bossChallengeId);
      const snapshotAfterRewards = useBattleStore.getState().snapshot;

      if (updatedSave) {
        replaceSave(updatedSave);
      }

      useUiStore.getState().setBossVictorySummary({
        bossNameKey: boss?.nameKey ?? snapshotBeforeContinue.bossChallengeId,
        rewards: snapshotAfterRewards?.recentRewards ?? [],
        levelUps: snapshotAfterRewards?.levelUpEvents ?? [],
      });
      useUiStore.getState().setActiveScreen("map");

      const victoryDelayMs = getVictoryDelayMs(battleSpeed, BATTLE_INTERVAL_DELAY_MS);
      const timeoutId = window.setTimeout(() => {
        reset();
      }, victoryDelayMs);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const advanced = tryAutoAdvanceLocation(saveToContinue);
    if (advanced) {
      saveToContinue = persistSave(advanced);
      replaceSave(saveToContinue);
      setLoadingNextBattle(true);

      const victoryDelayMs = getVictoryDelayMs(battleSpeed, BATTLE_INTERVAL_DELAY_MS);
      const timeoutId = window.setTimeout(() => {
        useBattleStore.getState().initBattle(saveToContinue, config);
        setLoadingNextBattle(false);
      }, victoryDelayMs);

      return () => {
        window.clearTimeout(timeoutId);
        setLoadingNextBattle(false);
      };
    }

    if (updatedSave) {
      replaceSave(updatedSave);
      saveToContinue = updatedSave;
    }

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
