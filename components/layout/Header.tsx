"use client";

import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useGameStore } from "@/stores/game-store";

export function Header() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);

  if (!save) return null;

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-[var(--accent)]">
            {t("app.title")}
          </h1>
          <p className="text-xs text-[var(--text-muted)]">{t("app.subtitle")}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="hidden gap-4 sm:flex">
            <span>
              {t("header.trainer")}: <strong>{save.player.trainerName}</strong>
            </span>
            <span>
              {t("header.level")}: <strong>{save.player.trainerLevel}</strong>
            </span>
            <span>
              {t("header.bits")}: <strong>{save.player.bits}</strong>
            </span>
            <span>
              {t("header.trait_points")}: <strong>{save.player.traitPoints}</strong>
            </span>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
