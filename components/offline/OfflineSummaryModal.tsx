"use client";

import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function OfflineSummaryModal() {
  const summary = useUiStore((state) => state.offlineSummary);
  const setOfflineSummary = useUiStore((state) => state.setOfflineSummary);
  const dismissOfflineSummary = useGameStore((state) => state.dismissOfflineSummary);
  const t = useGameStore((state) => state.t);

  if (!summary) return null;

  const handleDismiss = () => {
    dismissOfflineSummary();
    setOfflineSummary(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {t("offline.title")}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {t("offline.subtitle", { time: formatDuration(summary.awayMs) })}
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-[var(--text-muted)]">{t("offline.battles")}</span>
            <span className="font-medium text-[var(--text-primary)]">
              {summary.battlesSimulated}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--text-muted)]">{t("offline.bits")}</span>
            <span className="font-medium text-amber-300">+{summary.bitsGained}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--text-muted)]">{t("offline.digimon_xp")}</span>
            <span className="font-medium text-sky-300">+{summary.digimonXpGained}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--text-muted)]">{t("offline.trainer_xp")}</span>
            <span className="font-medium text-violet-300">+{summary.trainerXpGained}</span>
          </li>
        </ul>

        {summary.itemsDropped.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
              {t("offline.items")}
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {summary.itemsDropped.map((drop) => (
                <li key={drop.itemId} className="text-[var(--text-primary)]">
                  {t(`item.${drop.itemId}.name`)} x{drop.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleDismiss}
          className="mt-6 w-full rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          {t("offline.dismiss")}
        </button>
      </div>
    </div>
  );
}
