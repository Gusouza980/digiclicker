"use client";

import { getAllCatalogEntries } from "@/catalogs/loader";
import { isTraitUnlocked } from "@/game/traits/unlock";
import { useGameStore } from "@/stores/game-store";
import type { TraitBranch, TraitCatalogEntry } from "@/types";

const BRANCHES: TraitBranch[] = [
  "combat",
  "bond",
  "hatching",
  "explorer",
  "island",
];

function getTraitsByBranch(
  traits: Record<string, TraitCatalogEntry>,
  branch: TraitBranch,
): TraitCatalogEntry[] {
  return Object.values(traits).filter((trait) => trait.branch === branch);
}

export function TraitsScreen() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const unlockTraitById = useGameStore((state) => state.unlockTraitById);

  if (!save) return null;

  const traits = getAllCatalogEntries("trait");

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {t("traits.title")}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">{t("traits.subtitle")}</p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-sm">
          {t("traits.points")}:{" "}
          <strong className="text-[var(--accent)]">{save.player.traitPoints}</strong>
        </div>
      </section>

      <div className="space-y-8">
        {BRANCHES.map((branch) => (
          <section key={branch}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">
              {t(`traits.branch.${branch}`)}
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {getTraitsByBranch(traits, branch).map((trait) => {
                const unlocked = isTraitUnlocked(save, trait.id);
                const prerequisitesMet = trait.prerequisiteTraitIds.every((id) =>
                  isTraitUnlocked(save, id),
                );
                const canAfford = save.player.traitPoints >= trait.cost;
                const canUnlock = !unlocked && prerequisitesMet && canAfford;

                return (
                  <article
                    key={trait.id}
                    className={`rounded-xl border p-4 ${
                      unlocked
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-[var(--border)] bg-[var(--bg-card)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-[var(--text-primary)]">
                        {t(trait.nameKey)}
                      </h4>
                      <span className="text-xs text-[var(--text-muted)]">
                        {t("traits.cost", { cost: String(trait.cost) })}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {t(trait.descriptionKey)}
                    </p>

                    {unlocked ? (
                      <p className="mt-3 text-xs font-medium text-emerald-400">
                        {t("traits.unlocked")}
                      </p>
                    ) : (
                      <div className="mt-3 space-y-2">
                        {!prerequisitesMet && trait.prerequisiteTraitIds.length > 0 && (
                          <p className="text-xs text-amber-400">
                            {t("traits.needs_prerequisite")}
                          </p>
                        )}
                        <button
                          type="button"
                          disabled={!canUnlock}
                          onClick={() => unlockTraitById(trait.id)}
                          className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {t("traits.unlock")}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
