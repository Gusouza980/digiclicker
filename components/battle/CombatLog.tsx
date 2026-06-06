"use client";

import { useGameStore } from "@/stores/game-store";
import type { CombatLogEntry } from "@/game/battle";

type CombatLogProps = {
  entries: CombatLogEntry[];
};

function formatLogMessage(
  t: (key: string, params?: Record<string, string>) => string,
  entry: CombatLogEntry,
): string {
  if (entry.actorNameKey) {
    return t(entry.messageKey, { name: t(entry.actorNameKey) });
  }

  return t(entry.messageKey);
}

export function CombatLog({ entries }: CombatLogProps) {
  const t = useGameStore((state) => state.t);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/50 p-3">
        <p className="text-xs text-[var(--text-muted)]">{t("battle.log.empty")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/50 p-3">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
        {t("battle.log.title")}
      </h3>
      <ul className="space-y-1">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center justify-between gap-2 text-xs text-[var(--text-primary)]"
          >
            <span>{formatLogMessage(t, entry)}</span>
            {entry.damage > 0 && (
              <span className="font-mono font-semibold text-[var(--accent)]">
                -{entry.damage}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
