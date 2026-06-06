"use client";

import { useEffect } from "react";

import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useGameStore((state) => state.hydrate);
  const isHydrated = useGameStore((state) => state.isHydrated);
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const setOfflineSummary = useUiStore((state) => state.setOfflineSummary);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (save?.pendingOfflineSummary) {
      setOfflineSummary(save.pendingOfflineSummary);
    }
  }, [save?.pendingOfflineSummary, setOfflineSummary]);

  useEffect(() => {
    if (save?.settings.locale) {
      document.documentElement.lang = save.settings.locale;
    }
  }, [save?.settings.locale]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <p className="text-sm text-[var(--text-muted)]">{t("app.loading")}</p>
      </div>
    );
  }

  return <>{children}</>;
}
