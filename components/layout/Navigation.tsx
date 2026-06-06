"use client";

import { useGameStore } from "@/stores/game-store";

const NAV_ITEMS = [
  "nav.battle",
  "nav.map",
  "nav.inventory",
  "nav.traits",
  "nav.island",
] as const;

export function Navigation() {
  const t = useGameStore((state) => state.t);

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {NAV_ITEMS.map((key, index) => (
          <button
            key={key}
            type="button"
            disabled={index > 0}
            className={`rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
              index === 0
                ? "bg-[var(--accent)]/20 text-[var(--accent)] font-medium"
                : "text-[var(--text-muted)] cursor-not-allowed opacity-50"
            }`}
            title={index > 0 ? t("home.hint") : undefined}
          >
            {t(key)}
          </button>
        ))}
      </div>
    </nav>
  );
}
