"use client";

import { useEffect } from "react";

import { useGameStore } from "@/stores/game-store";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useGameStore((state) => state.hydrate);
  const isHydrated = useGameStore((state) => state.isHydrated);
  const t = useGameStore((state) => state.t);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <p className="text-sm text-[var(--text-muted)]">{t("app.loading")}</p>
      </div>
    );
  }

  return <>{children}</>;
}
