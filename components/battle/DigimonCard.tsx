"use client";

import { useGameStore } from "@/stores/game-store";
import type { BattleAllyState } from "@/game/battle";

const STAGE_COLORS: Record<string, string> = {
  rookie: "#38bdf8",
  champion: "#a78bfa",
  in_training: "#34d399",
  baby: "#fbbf24",
};

type DigimonCardProps = {
  ally: BattleAllyState;
};

export function DigimonCard({ ally }: DigimonCardProps) {
  const t = useGameStore((state) => state.t);
  const hpPercent = ally.maxHp > 0 ? (ally.currentHp / ally.maxHp) * 100 : 0;
  const color = STAGE_COLORS.rookie;

  return (
    <article
      className={`rounded-xl border bg-[var(--bg-card)] p-3 transition-opacity ${
        ally.isDefeated
          ? "border-red-500/30 opacity-50"
          : "border-[var(--border)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          {t(ally.nameKey).charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-medium text-[var(--text-primary)]">
              {t(ally.nameKey)}
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              {t("battle.level")} {ally.level}
            </span>
          </div>
          <div className="mt-2">
            <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
              <span>HP</span>
              <span>
                {ally.currentHp}/{ally.maxHp}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-primary)]">
              <div
                className={`h-full rounded-full transition-all ${
                  ally.isDefeated ? "bg-red-500/60" : "bg-emerald-500"
                }`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <dt className="text-[var(--text-muted)]">ATK</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.atk}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">DEF</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.def}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">SPD</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{ally.spd}</dd>
        </div>
      </dl>
      {ally.isDefeated && (
        <p className="mt-2 text-center text-xs font-medium text-red-400">
          {t("battle.defeated")}
        </p>
      )}
    </article>
  );
}
