"use client";

import { useGameStore } from "@/stores/game-store";
import type { BattleEnemyState } from "@/game/battle";

type EnemyCardProps = {
  enemy: BattleEnemyState;
};

export function EnemyCard({ enemy }: EnemyCardProps) {
  const t = useGameStore((state) => state.t);
  const hpPercent = enemy.maxHp > 0 ? (enemy.currentHp / enemy.maxHp) * 100 : 0;

  return (
    <article
      className={`rounded-xl border bg-[var(--bg-card)] p-3 transition-opacity ${
        enemy.isDefeated
          ? "border-red-500/20 opacity-40"
          : "border-red-500/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-bold text-red-300 ring-2 ring-red-500/40">
          {t(enemy.nameKey).charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium text-[var(--text-primary)]">
              {t(enemy.nameKey)}
            </h3>
            {enemy.isBoss && (
              <span className="shrink-0 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                {t("battle.boss_tag")}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
            {t(`digimon.attribute.${enemy.attribute}`)} ·{" "}
            {t(`digimon.element.${enemy.element}`)}
          </p>
          <div className="mt-2">
            <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
              <span>{t("stat.hp")}</span>
              <span>
                {enemy.currentHp}/{enemy.maxHp}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-primary)]">
              <div
                className="h-full rounded-full bg-red-500 transition-all"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <dt className="text-[var(--text-muted)]">{t("stat.atk")}</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{enemy.atk}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">{t("stat.def")}</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{enemy.def}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">{t("stat.spd")}</dt>
          <dd className="font-semibold text-[var(--text-primary)]">{enemy.spd}</dd>
        </div>
      </dl>
    </article>
  );
}
