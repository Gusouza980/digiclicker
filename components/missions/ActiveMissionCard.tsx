"use client";

import { getCatalogEntry } from "@/catalogs/loader";
import { getActiveMission, getCompletedMission } from "@/game/missions";
import { getLocationName, useGameStore } from "@/stores/game-store";
import type { MissionObjective } from "@/types";

function formatObjective(
  t: (key: string, params?: Record<string, string>) => string,
  objective: MissionObjective,
  locale: string,
): string {
  const params: Record<string, string> = {
    current: String(objective.current),
    required: String(objective.required),
  };

  if (objective.targetId) {
    if (objective.type === "reach_location" || objective.type === "defeat_enemies") {
      params.target = getLocationName(objective.targetId, locale as "pt" | "en" | "es");
    } else {
      params.target = objective.targetId;
    }
  }

  return t(`mission.objective.${objective.type}`, params);
}

export function ActiveMissionCard() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const claimMissionReward = useGameStore((state) => state.claimMissionReward);

  if (!save) return null;

  const active = getActiveMission(save);
  const completed = getCompletedMission(save);
  const missionProgress = active ?? completed;

  if (!missionProgress) return null;

  const catalog = getCatalogEntry("mission", missionProgress.missionId);
  if (!catalog) return null;

  return (
    <section className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-sky-400">
            {t("mission.active_label")}
          </p>
          <h3 className="font-semibold text-[var(--text-primary)]">
            {t(catalog.nameKey)}
          </h3>
        </div>
        {missionProgress.status === "completed" && (
          <button
            type="button"
            onClick={() => claimMissionReward(missionProgress.missionId)}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("mission.claim")}
          </button>
        )}
      </div>

      <p className="mt-1 text-sm text-[var(--text-muted)]">{t(catalog.descriptionKey)}</p>

      <ul className="mt-3 space-y-1">
        {missionProgress.objectives.map((objective, index) => (
          <li
            key={`${missionProgress.missionId}_${objective.type}_${index}`}
            className={`text-sm ${
              objective.current >= objective.required
                ? "text-emerald-400 line-through"
                : "text-[var(--text-primary)]"
            }`}
          >
            {formatObjective(t, objective, save.settings.locale)}
          </li>
        ))}
      </ul>
    </section>
  );
}
