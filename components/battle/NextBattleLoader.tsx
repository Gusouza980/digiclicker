"use client";

import { useGameStore } from "@/stores/game-store";

export function NextBattleLoader() {
  const t = useGameStore((state) => state.t);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--bg-primary)]/75 backdrop-blur-sm">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--accent)]/30 border-t-[var(--accent)]"
        aria-hidden
      />
      <p className="text-sm font-medium text-[var(--text-primary)]">
        {t("battle.loading_next")}
      </p>
    </div>
  );
}
