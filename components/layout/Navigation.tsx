"use client";

import { useGameStore } from "@/stores/game-store";
import { useUiStore, type AppScreen } from "@/stores/ui-store";

const NAV_ITEMS: { key: string; screen: AppScreen | null }[] = [
  { key: "nav.battle", screen: "battle" },
  { key: "nav.map", screen: "map" },
  { key: "nav.inventory", screen: null },
  { key: "nav.traits", screen: "traits" },
  { key: "nav.island", screen: null },
];

export function Navigation() {
  const t = useGameStore((state) => state.t);
  const activeScreen = useUiStore((state) => state.activeScreen);
  const setActiveScreen = useUiStore((state) => state.setActiveScreen);

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {NAV_ITEMS.map(({ key, screen }) => {
          const isActive = screen !== null && activeScreen === screen;
          const isDisabled = screen === null;

          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => screen && setActiveScreen(screen)}
              className={`rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[var(--accent)]/20 text-[var(--accent)] font-medium"
                  : isDisabled
                    ? "text-[var(--text-muted)] cursor-not-allowed opacity-50"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
              }`}
              title={isDisabled ? t("home.hint") : undefined}
            >
              {t(key)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
