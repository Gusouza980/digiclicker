"use client";

import { ActiveMissionCard } from "@/components/missions/ActiveMissionCard";
import { useGameStore } from "@/stores/game-store";

export function MissionsScreen() {
  const t = useGameStore((state) => state.t);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {t("missions.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("missions.subtitle")}</p>
      </section>

      <ActiveMissionCard />

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <p className="text-sm text-[var(--text-muted)]">{t("missions.hint")}</p>
      </section>
    </div>
  );
}
