"use client";

import { useState } from "react";

import { getCatalogEntry, getGlobalConfig } from "@/catalogs/loader";
import { useIslandTimer } from "@/hooks/useIslandTimer";
import {
  formatRemainingMs,
  getActionProgress,
  getActionsByType,
  getOccupiedSlots,
  getRemainingMs,
  getStatTargets,
  getTypeXpTargets,
  isActionReady,
} from "@/game/island";
import { getItemQuantity } from "@/game/inventory/operations";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { IslandAction, IslandActionFeedback, IslandActionType, StatKey } from "@/types";

const ACTION_TYPES: IslandActionType[] = [
  "stat_training",
  "friendship_training",
  "type_xp",
  "item_search",
  "auto_mission",
];

const FEEDBACK_STYLES: Record<IslandActionFeedback["variant"], string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  fail: "border-red-500/40 bg-red-500/10 text-red-300",
  info: "border-amber-500/40 bg-amber-500/10 text-amber-200",
};

function formatFeedback(
  t: (key: string, params?: Record<string, string>) => string,
  feedback: IslandActionFeedback,
): string {
  const params = { ...feedback.params };
  if (params.type?.includes("_")) {
    params.type = t(`island.action_type.${params.type}`);
  }
  if (params.type && !params.type.includes(" ")) {
    const typeKey = `digimon_type.${params.type}`;
    params.type = t(typeKey);
  }
  return t(feedback.messageKey, params);
}

type ActionSlotCardProps = {
  action: IslandAction;
  now: number;
  onCollect: (actionId: string) => void;
};

function ActionSlotCard({ action, now, onCollect }: ActionSlotCardProps) {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const digimon = save?.digimons[action.digimonInstanceId];
  const catalog = digimon ? getCatalogEntry("digimon", digimon.catalogId) : null;
  const ready = isActionReady(action, now);
  const remaining = formatRemainingMs(getRemainingMs(action, now));
  const progress = Math.round(getActionProgress(action, now) * 100);
  const mission = action.missionId
    ? getGlobalConfig().island.autoMissions.find((entry) => entry.id === action.missionId)
    : null;

  return (
    <li className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
      <p className="font-medium text-[var(--text-primary)]">
        {catalog ? t(catalog.nameKey) : action.digimonInstanceId}
      </p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        {t(`island.action_type.${action.actionType}`)}
        {action.statTarget && ` · ${action.statTarget.toUpperCase()}`}
        {action.typeXpTarget && ` · ${t(`digimon_type.${action.typeXpTarget}`)}`}
        {mission && ` · ${t(mission.nameKey)}`}
      </p>
      {action.usedTrainingChip && (
        <p className="mt-1 text-xs text-sky-300">{t("island.training_chip_used")}</p>
      )}
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
          <span>{ready ? t("island.timer.ready") : t("island.timer.remaining", { time: remaining })}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-primary)]">
          <div
            className={`h-full rounded-full transition-all ${ready ? "bg-emerald-500" : "bg-[var(--accent)]"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {ready && (
        <button
          type="button"
          onClick={() => onCollect(action.id)}
          className="mt-3 w-full rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40 hover:bg-emerald-500/30"
        >
          {t("island.action.collect")}
        </button>
      )}
    </li>
  );
}

export function IslandActionsPanel() {
  const save = useGameStore((state) => state.save);
  const config = useGameStore((state) => state.config);
  const t = useGameStore((state) => state.t);
  const startAction = useGameStore((state) => state.startIslandAction);
  const collectAction = useGameStore((state) => state.collectIslandAction);
  const islandFeedback = useUiStore((state) => state.islandActionFeedback);
  const setIslandActionFeedback = useUiStore((state) => state.setIslandActionFeedback);

  const now = useIslandTimer();
  const [activeType, setActiveType] = useState<IslandActionType>("stat_training");
  const [selectedDigimonId, setSelectedDigimonId] = useState("");
  const [statTarget, setStatTarget] = useState<StatKey>("atk");
  const [typeXpTarget, setTypeXpTarget] = useState("reptile");
  const [missionId, setMissionId] = useState("");
  const [useTrainingChip, setUseTrainingChip] = useState(false);

  if (!save || !config) return null;

  const globalConfig = getGlobalConfig();
  const slotsMax = config.island.slotsPerAction;
  const actions = getActionsByType(save, activeType);
  const occupied = getOccupiedSlots(save, activeType);
  const availableDigimons = save.island.storedDigimonIds
    .map((id) => save.digimons[id])
    .filter((digimon) => digimon && !save.island.actions.some((a) => a.digimonInstanceId === digimon.instanceId));

  const trainingChips = getItemQuantity(save.inventory, "training_chip");

  const handleStart = () => {
    if (!selectedDigimonId) return;
    const feedback = startAction({
      digimonInstanceId: selectedDigimonId,
      actionType: activeType,
      statTarget: activeType === "stat_training" ? statTarget : undefined,
      typeXpTarget: activeType === "type_xp" ? typeXpTarget : undefined,
      missionId: activeType === "auto_mission" ? missionId : undefined,
      useTrainingChip,
    });
    if (feedback) setIslandActionFeedback(feedback);
  };

  const handleCollect = (actionId: string) => {
    const feedback = collectAction(actionId);
    if (feedback) setIslandActionFeedback(feedback);
  };

  const missions = globalConfig.island.autoMissions;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          {t("island.actions_title")}
        </h3>
        <p className="text-xs text-[var(--text-muted)]">{t("island.actions_subtitle")}</p>
      </div>

      {islandFeedback && (
        <div className={`rounded-xl border p-3 text-sm ${FEEDBACK_STYLES[islandFeedback.variant]}`}>
          {formatFeedback(t, islandFeedback)}
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {ACTION_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
              activeType === type
                ? "bg-[var(--accent)]/20 text-[var(--accent)] font-medium"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-card)]"
            }`}
          >
            {t(`island.action_type.${type}`)}
          </button>
        ))}
      </div>

      <p className="text-xs text-amber-300/90">
        {t("island.slots_usage", {
          used: String(occupied),
          max: String(slotsMax),
        })}
      </p>

      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <ActionSlotCard key={action.id} action={action} now={now} onCollect={handleCollect} />
        ))}
        {occupied < slotsMax &&
          Array.from({ length: slotsMax - occupied }).map((_, index) => (
            <li
              key={`empty-${index}`}
              className="rounded-xl border border-dashed border-[var(--border)] p-3 text-center text-xs text-[var(--text-muted)]"
            >
              {t("island.slot_empty")}
            </li>
          ))}
      </ul>

      {occupied < slotsMax && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-primary)]">
            {t("island.start_action")}
          </h4>

          <label className="block text-xs text-[var(--text-muted)]">
            {t("island.select_digimon")}
            <select
              value={selectedDigimonId}
              onChange={(e) => setSelectedDigimonId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)]"
            >
              <option value="">{t("island.select_placeholder")}</option>
              {availableDigimons.map((digimon) => {
                const catalog = getCatalogEntry("digimon", digimon.catalogId);
                return (
                  <option key={digimon.instanceId} value={digimon.instanceId}>
                    {catalog ? t(catalog.nameKey) : digimon.catalogId}
                  </option>
                );
              })}
            </select>
          </label>

          {activeType === "stat_training" && (
            <label className="block text-xs text-[var(--text-muted)]">
              {t("island.select_stat")}
              <select
                value={statTarget}
                onChange={(e) => setStatTarget(e.target.value as StatKey)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm"
              >
                {getStatTargets().map((stat) => (
                  <option key={stat} value={stat}>
                    {stat.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          )}

          {activeType === "type_xp" && (
            <label className="block text-xs text-[var(--text-muted)]">
              {t("island.select_type_xp")}
              <select
                value={typeXpTarget}
                onChange={(e) => setTypeXpTarget(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm"
              >
                {getTypeXpTargets().map((type) => (
                  <option key={type} value={type}>
                    {t(`digimon_type.${type}`)}
                  </option>
                ))}
              </select>
            </label>
          )}

          {activeType === "auto_mission" && (
            <label className="block text-xs text-[var(--text-muted)]">
              {t("island.select_mission")}
              <select
                value={missionId}
                onChange={(e) => setMissionId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm"
              >
                <option value="">{t("island.select_placeholder")}</option>
                {missions.map((mission) => (
                  <option key={mission.id} value={mission.id}>
                    {t(mission.nameKey)} (Nv. {mission.minLevel}+)
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <input
              type="checkbox"
              checked={useTrainingChip}
              onChange={(e) => setUseTrainingChip(e.target.checked)}
              disabled={trainingChips < 1}
            />
            {t("island.use_training_chip", { count: String(trainingChips) })}
          </label>

          <button
            type="button"
            disabled={
              !selectedDigimonId ||
              (activeType === "auto_mission" && !missionId) ||
              availableDigimons.length === 0
            }
            onClick={handleStart}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("island.action.start")}
          </button>
        </div>
      )}
    </section>
  );
}
