"use client";

import { useGameStore } from "@/stores/game-store";
import type { LevelUpEvent, RewardDisplayEntry } from "@/game/rewards";

type RecentRewardsProps = {
  rewards: RewardDisplayEntry[];
  levelUps: LevelUpEvent[];
};

function formatEntry(
  t: (key: string, params?: Record<string, string>) => string,
  entry: RewardDisplayEntry,
): string {
  const params: Record<string, string> = {};

  if (entry.actorNameKey) {
    params.name = t(entry.actorNameKey);
  }

  if (entry.amount !== undefined && entry.messageKey === "battle.reward.level_up") {
    params.level = String(entry.amount);
  }

  if (entry.amount !== undefined && entry.messageKey === "battle.reward.trainer_level_up") {
    params.level = String(entry.amount);
  }

  return Object.keys(params).length > 0
    ? t(entry.messageKey, params)
    : entry.amount !== undefined
      ? `${t(entry.messageKey)} +${entry.amount}`
      : t(entry.messageKey);
}

export function RecentRewards({ rewards, levelUps }: RecentRewardsProps) {
  const t = useGameStore((state) => state.t);

  if (rewards.length === 0 && levelUps.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <h3 className="text-xs font-medium uppercase tracking-wide text-emerald-400">
        {t("battle.rewards.title")}
      </h3>
      <ul className="mt-2 space-y-1">
        {rewards.map((entry) => (
          <li
            key={entry.id}
            className={`text-sm ${
              entry.messageKey === "battle.reward.level_up"
                ? "font-semibold text-amber-300"
                : "text-[var(--text-primary)]"
            }`}
          >
            {formatEntry(t, entry)}
          </li>
        ))}
      </ul>
    </section>
  );
}
