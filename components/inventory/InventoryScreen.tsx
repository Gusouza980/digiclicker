"use client";

import { getCatalogEntry } from "@/catalogs/loader";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";
import type { ItemCategory } from "@/types";

const ITEM_CATEGORIES: ItemCategory[] = [
  "consumable",
  "material",
  "equipment",
  "key",
  "special",
];

export function InventoryScreen() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const setSelectedEggId = useUiStore((state) => state.setSelectedEggId);

  if (!save) return null;

  const hasItems = save.inventory.items.length > 0;
  const hasEssences = save.inventory.essences.length > 0;
  const hasEggs = save.inventory.eggs.length > 0;
  const isEmpty = !hasItems && !hasEssences && !hasEggs;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {t("inventory.title")}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">{t("inventory.subtitle")}</p>
      </section>

      {isEmpty && (
        <p className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center text-sm text-[var(--text-muted)]">
          {t("inventory.empty")}
        </p>
      )}

      {hasItems && (
        <section>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">
            {t("inventory.section.items")}
          </h3>
          <div className="space-y-4">
            {ITEM_CATEGORIES.map((category) => {
              const categoryItems = save.inventory.items.filter((stack) => {
                const item = getCatalogEntry("item", stack.itemId);
                return item?.category === category;
              });

              if (categoryItems.length === 0) return null;

              return (
                <div key={category}>
                  <h4 className="mb-2 text-xs font-medium text-[var(--text-muted)]">
                    {t(`inventory.category.${category}`)}
                  </h4>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {categoryItems.map((stack) => {
                      const item = getCatalogEntry("item", stack.itemId);
                      if (!item) return null;

                      return (
                        <li
                          key={stack.itemId}
                          className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-[var(--text-primary)]">
                              {t(item.nameKey)}
                            </span>
                            <span className="text-sm text-[var(--accent)]">
                              x{stack.quantity}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[var(--text-muted)]">
                            {t(item.descriptionKey)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {hasEssences && (
        <section>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">
            {t("inventory.section.essences")}
          </h3>
          <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {save.inventory.essences.map((stack) => {
              const essence = getCatalogEntry("essence", stack.essenceId);
              if (!essence) return null;

              return (
                <li
                  key={stack.essenceId}
                  className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-[var(--text-primary)]">
                      {t(essence.nameKey)}
                    </span>
                    <span className="text-sm text-violet-300">x{stack.quantity}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {hasEggs && (
        <section>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">
            {t("inventory.section.eggs")}
          </h3>
          <ul className="grid gap-2 md:grid-cols-2">
            {save.inventory.eggs.map((egg) => (
              <li
                key={egg.instanceId}
                className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-[var(--text-primary)]">
                    {t(`egg.${egg.rarity}.name`)}
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                    {t(`egg.rarity.${egg.rarity}`)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {t("inventory.egg.type", {
                    type: t(`digimon_type.${egg.digimonType}`),
                  })}
                </p>
                {!egg.scanned && (
                  <p className="mt-2 text-xs text-amber-400/90">
                    {t("inventory.egg.unscanned")}
                  </p>
                )}
                {egg.scanned && egg.revealedDigimonId && (
                  <p className="mt-2 text-xs text-emerald-400">
                    {t("inventory.egg.scanned", {
                      name: t(`digimon.${egg.revealedDigimonId}.name`),
                    })}
                  </p>
                )}
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  {t("inventory.egg.progress", {
                    current: String(egg.insertions),
                    max: String(egg.maxInsertions),
                  })}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedEggId(egg.instanceId)}
                  className="mt-3 w-full rounded-lg border border-amber-500/40 px-3 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/10"
                >
                  {t("inventory.egg.open_scanner")}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
