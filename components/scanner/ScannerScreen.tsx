"use client";

import { useEffect, useState } from "react";

import {
  canAddToIsland,
  canAddToTeam,
  canHatchEgg,
  getEssenceInsertCost,
  getNextInsertionChances,
  getNextInsertionSlot,
  getScanCost,
} from "@/game/hatching";
import { getEssenceIdForType } from "@/game/inventory";
import { getEssenceQuantity, getItemQuantity } from "@/game/inventory/operations";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { HatchingFeedback } from "@/types";

function formatFeedback(
  t: (key: string, params?: Record<string, string>) => string,
  feedback: HatchingFeedback,
): string {
  const params = { ...feedback.params };

  if (params.name?.startsWith("digimon.")) {
    params.name = t(params.name);
  }

  if (params.personality?.startsWith("personality.")) {
    params.personality = t(params.personality);
  }

  if (params.destination?.startsWith("hatching.")) {
    params.destination = t(params.destination);
  }

  return t(feedback.messageKey, params);
}

const FEEDBACK_STYLES: Record<HatchingFeedback["variant"], string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  fail: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  break: "border-red-500/40 bg-red-500/10 text-red-300",
  info: "border-sky-500/40 bg-sky-500/10 text-sky-200",
};

export function ScannerScreen() {
  const save = useGameStore((state) => state.save);
  const config = useGameStore((state) => state.config);
  const t = useGameStore((state) => state.t);
  const performScanEgg = useGameStore((state) => state.performScanEgg);
  const performInsertEssence = useGameStore((state) => state.performInsertEssence);
  const performHatchEgg = useGameStore((state) => state.performHatchEgg);

  const selectedEggId = useUiStore((state) => state.selectedEggId);
  const setSelectedEggId = useUiStore((state) => state.setSelectedEggId);
  const hatchingFeedback = useUiStore((state) => state.hatchingFeedback);
  const setHatchingFeedback = useUiStore((state) => state.setHatchingFeedback);

  const [useStabilizer, setUseStabilizer] = useState(false);

  const egg = save?.inventory.eggs.find((entry) => entry.instanceId === selectedEggId);

  useEffect(() => {
    if (selectedEggId && save && !egg) {
      setSelectedEggId(null);
      setHatchingFeedback(null);
    }
  }, [selectedEggId, save, egg, setSelectedEggId, setHatchingFeedback]);

  if (!save || !config || !egg) return null;

  const scanCost = getScanCost(egg.rarity, config);
  const essenceCost = getEssenceInsertCost(egg.rarity, config);
  const essenceId = getEssenceIdForType(egg.digimonType);
  const essenceOwned = getEssenceQuantity(save.inventory, essenceId);
  const stabilizerOwned = getItemQuantity(save.inventory, "hatch_stabilizer");
  const chances = getNextInsertionChances(save, egg.instanceId);
  const canInsert = egg.scanned && egg.insertions < egg.maxInsertions;
  const readyToHatch = canHatchEgg(save, egg.instanceId);
  const teamHasSlot = canAddToTeam(save, config);
  const islandHasSlot = canAddToIsland(save, config);

  const runAction = (feedback: HatchingFeedback | null) => {
    if (feedback) setHatchingFeedback(feedback);
  };

  return (
    <div className="space-y-6">
      <section>
        <button
          type="button"
          onClick={() => {
            setSelectedEggId(null);
            setHatchingFeedback(null);
          }}
          className="mb-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          {t("scanner.back")}
        </button>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {t("scanner.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("scanner.subtitle")}</p>
      </section>

      <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium text-[var(--text-primary)]">
            {t(`egg.${egg.rarity}.name`)}
          </h3>
          <span className="text-xs text-amber-300">
            {t(`egg.rarity.${egg.rarity}`)} · {t(`digimon_type.${egg.digimonType}`)}
          </span>
        </div>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {t("scanner.progress", {
            current: String(egg.insertions),
            max: String(egg.maxInsertions),
          })}
        </p>

        {!egg.scanned ? (
          <p className="mt-2 text-sm text-amber-400/90">{t("scanner.unscanned")}</p>
        ) : (
          <p className="mt-2 text-sm text-emerald-400">
            {t("scanner.revealed", {
              name: t(`digimon.${egg.revealedDigimonId ?? egg.containedDigimonId}.name`),
            })}
          </p>
        )}
      </section>

      {hatchingFeedback && (
        <div
          className={`rounded-xl border p-4 text-sm ${FEEDBACK_STYLES[hatchingFeedback.variant]}`}
        >
          {formatFeedback(t, hatchingFeedback)}
        </div>
      )}

      {!egg.scanned && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
          <p className="text-sm text-[var(--text-muted)]">
            {t("scanner.scan_cost", { cost: String(scanCost) })}
          </p>
          <button
            type="button"
            disabled={save.player.bits < scanCost}
            onClick={() => runAction(performScanEgg(egg.instanceId))}
            className="mt-3 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("scanner.scan_action")}
          </button>
        </section>
      )}

      {egg.scanned && canInsert && chances && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-[var(--text-primary)]">
              {t("scanner.risk_title", {
                slot: String(getNextInsertionSlot(egg.insertions)),
              })}
            </h3>
            <ul className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
              <li className="rounded-lg bg-emerald-500/10 p-2 text-emerald-300">
                {t("scanner.chance.success")}<br />
                <strong>{Math.round(chances.success * 100)}%</strong>
              </li>
              <li className="rounded-lg bg-amber-500/10 p-2 text-amber-200">
                {t("scanner.chance.fail")}<br />
                <strong>{Math.round(chances.fail * 100)}%</strong>
              </li>
              <li className="rounded-lg bg-red-500/10 p-2 text-red-300">
                {t("scanner.chance.break")}<br />
                <strong>{Math.round(chances.break * 100)}%</strong>
              </li>
            </ul>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            {t("scanner.essence_cost", {
              cost: String(essenceCost),
              owned: String(essenceOwned),
            })}
          </p>

          <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <input
              type="checkbox"
              checked={useStabilizer}
              onChange={(event) => setUseStabilizer(event.target.checked)}
              disabled={stabilizerOwned < 1}
            />
            {t("scanner.use_stabilizer", { count: String(stabilizerOwned) })}
          </label>

          <button
            type="button"
            disabled={essenceOwned < essenceCost}
            onClick={() =>
              runAction(performInsertEssence(egg.instanceId, useStabilizer))
            }
            className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("scanner.insert_action")}
          </button>
        </section>
      )}

      {egg.scanned && readyToHatch && (
        <section className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
          <h3 className="text-sm font-medium text-emerald-300">
            {t("scanner.hatch_ready", { quality: String(egg.insertions) })}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            {t("scanner.hatch_bonus", {
              bonus: String(
                Math.round(
                  (config.hatching.qualityBaseBonus[String(egg.insertions) as "3" | "4" | "5"] ??
                    0) * 100,
                ),
              ),
            })}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!teamHasSlot}
              onClick={() => {
                const feedback = performHatchEgg(egg.instanceId, "team");
                runAction(feedback);
                if (feedback?.variant === "success") setSelectedEggId(null);
              }}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("scanner.hatch_team")}
            </button>
            <button
              type="button"
              disabled={!islandHasSlot}
              onClick={() => {
                const feedback = performHatchEgg(egg.instanceId, "island");
                runAction(feedback);
                if (feedback?.variant === "success") setSelectedEggId(null);
              }}
              className="rounded-lg border border-emerald-500/50 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors enabled:hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("scanner.hatch_island")}
            </button>
          </div>
        </section>
      )}

      {egg.scanned && egg.insertions >= egg.maxInsertions && (
        <p className="text-sm text-[var(--text-muted)]">{t("scanner.max_quality")}</p>
      )}
    </div>
  );
}
