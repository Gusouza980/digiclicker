"use client";

import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { RewardDisplayEntry } from "@/game/rewards";

function formatReward(
  t: (key: string, params?: Record<string, string>) => string,
  entry: RewardDisplayEntry,
): string {
  const params: Record<string, string> = {};

  if (entry.actorNameKey) {
    params.name = t(entry.actorNameKey);
  }

  if (entry.amount !== undefined && entry.messageKey.includes("level_up")) {
    params.level = String(entry.amount);
  }

  return Object.keys(params).length > 0
    ? t(entry.messageKey, params)
    : entry.amount !== undefined
      ? `${t(entry.messageKey)} +${entry.amount}`
      : t(entry.messageKey);
}

export function BossVictoryModal() {
  const summary = useUiStore((state) => state.bossVictorySummary);
  const setBossVictorySummary = useUiStore((state) => state.setBossVictorySummary);
  const t = useGameStore((state) => state.t);

  if (!summary) return null;

  const handleDismiss = () => {
    setBossVictorySummary(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/40 bg-[var(--bg-card)] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-amber-300">
          {t("boss.victory.title")}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {t("boss.victory.subtitle", { name: t(summary.bossNameKey) })}
        </p>

        {summary.rewards.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
              {t("boss.victory.rewards")}
            </p>
            <ul className="mt-2 space-y-1">
              {summary.rewards.map((entry) => (
                <li key={entry.id} className="text-sm text-[var(--text-primary)]">
                  {formatReward(t, entry)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {summary.levelUps.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-violet-400">
              {t("boss.victory.level_ups")}
            </p>
            <ul className="mt-2 space-y-1">
              {summary.levelUps.map((event) => (
                <li key={event.digimonInstanceId} className="text-sm text-amber-300">
                  {t("battle.reward.level_up", {
                    name: t(event.nameKey),
                    level: String(event.newLevel),
                  })}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleDismiss}
          className="mt-6 w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90"
        >
          {t("boss.victory.dismiss")}
        </button>
      </div>
    </div>
  );
}
