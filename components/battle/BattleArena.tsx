"use client";

import { useGameStore } from "@/stores/game-store";
import { useBattleStore } from "@/stores/battle-store";
import type { BattleEnemyState, DamageType } from "@/game/battle";

import { EnemyCard } from "./EnemyCard";
import { NextBattleLoader } from "./NextBattleLoader";

type BattleArenaProps = {
  enemies: BattleEnemyState[];
  phase: string;
  lastDamage: number | null;
  lastDamageType: DamageType | null;
};

function damageFlashClass(damageType: DamageType | null): string {
  if (damageType === "special") return "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]";
  if (damageType === "click") return "text-[var(--accent)]";
  return "text-sky-300";
}

export function BattleArena({ enemies, phase, lastDamage, lastDamageType }: BattleArenaProps) {
  const t = useGameStore((state) => state.t);
  const click = useBattleStore((state) => state.click);
  const retry = useBattleStore((state) => state.retry);
  const isLoadingNextBattle = useBattleStore((state) => state.isLoadingNextBattle);

  const livingEnemies = enemies.filter((enemy) => !enemy.isDefeated);
  const canClick = phase === "fighting" && livingEnemies.length > 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
      {isLoadingNextBattle && <NextBattleLoader />}
      <button
        type="button"
        onClick={() => canClick && click()}
        disabled={!canClick}
        className={`relative w-full p-6 text-left transition-colors ${
          canClick
            ? "cursor-pointer hover:bg-[var(--accent)]/5 active:bg-[var(--accent)]/10"
            : "cursor-default"
        }`}
        aria-label={t("battle.click_area")}
      >
        <div className="pointer-events-none flex min-h-48 flex-col items-center justify-center gap-4">
          {enemies.length > 0 ? (
            <>
              <div className="w-full">
                <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                  {t("battle.enemy_team")} ({livingEnemies.length}/{enemies.length})
                </p>
                <div
                  className={`grid gap-3 ${
                    enemies.length === 1
                      ? "grid-cols-1 max-w-xs mx-auto"
                      : enemies.length === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-3"
                  }`}
                >
                  {enemies.map((enemy) => (
                    <EnemyCard key={enemy.instanceId} enemy={enemy} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">{t("battle.no_enemy")}</p>
          )}

          {lastDamage !== null && lastDamage > 0 && phase === "fighting" && (
            <span
              className={`animate-pulse text-2xl font-bold ${damageFlashClass(lastDamageType)}`}
            >
              -{lastDamage}
              {lastDamageType === "special" && (
                <span className="ml-2 text-sm uppercase tracking-widest text-amber-200/80">
                  SP
                </span>
              )}
            </span>
          )}

          {phase === "victory" && (
            <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">
              {t("battle.victory")}
            </span>
          )}

          {phase === "defeat" && (
            <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400">
              {t("battle.defeat")}
            </span>
          )}
        </div>

        {canClick && (
          <p className="pointer-events-none mt-4 text-center text-xs text-[var(--text-muted)]">
            {t("battle.click_hint")}
          </p>
        )}
      </button>

      {phase === "defeat" && (
        <div className="border-t border-[var(--border)] p-4 text-center">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg-primary)] hover:opacity-90"
          >
            {t("battle.retry")}
          </button>
        </div>
      )}
    </section>
  );
}
