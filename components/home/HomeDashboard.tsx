"use client";

import { SaveDebugPanel } from "@/components/debug/SaveDebugPanel";
import { getLocationName, useGameStore } from "@/stores/game-store";

export function HomeDashboard() {
  const save = useGameStore((state) => state.save);
  const statusMessage = useGameStore((state) => state.statusMessage);
  const t = useGameStore((state) => state.t);

  if (!save) return null;

  const locationName = getLocationName(
    save.location.currentLocationId,
    save.settings.locale,
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          {t("home.welcome")}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{t("home.hint")}</p>

        {statusMessage && (
          <p className="mt-4 rounded-lg bg-[var(--accent)]/10 px-3 py-2 text-sm text-[var(--accent)]">
            {t(statusMessage)}
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label={t("home.current_location")} value={locationName} />
        <StatCard
          label={t("home.team_size")}
          value={`${save.team.activeDigimonIds.length} / 3`}
        />
        <StatCard
          label={t("home.island_size")}
          value={`${save.island.storedDigimonIds.length} / 50`}
        />
      </section>

      <SaveDebugPanel />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
      <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
