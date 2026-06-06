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

const USABLE_ITEMS = new Set(["meat", "xp_boost", "trait_reset_core"]);
const SELLABLE_ITEMS = new Set([
  "potion_small",
  "meat",
  "scan_disc",
  "revival_patch",
  "hatch_stabilizer",
  "training_chip",
  "xp_boost",
  "trait_reset_core",
]);

export function InventoryScreen() {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const sellInventoryItem = useGameStore((state) => state.sellInventoryItem);
  const useInventoryItem = useGameStore((state) => state.useInventoryItem);
  const useItemOnDigimon = useGameStore((state) => state.useItemOnDigimon);
  const setSelectedEggId = useUiStore((state) => state.setSelectedEggId);
  const itemUseFeedback = useUiStore((state) => state.itemUseFeedback);
  const setItemUseFeedback = useUiStore((state) => state.setItemUseFeedback);
  const shopFeedback = useUiStore((state) => state.shopFeedback);
  const setShopFeedback = useUiStore((state) => state.setShopFeedback);

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

      {(itemUseFeedback || shopFeedback) && (
        <p
          className={`rounded-lg border px-3 py-2 text-sm ${
            (itemUseFeedback ?? shopFeedback)?.variant === "success"
              ? "border-emerald-500/30 text-emerald-400"
              : "border-red-500/30 text-red-400"
          }`}
        >
          {t((itemUseFeedback ?? shopFeedback)!.messageKey, {
            ...(itemUseFeedback ?? shopFeedback)?.params,
            item: (itemUseFeedback ?? shopFeedback)?.params?.item
              ? t((itemUseFeedback ?? shopFeedback)!.params!.item!)
              : "",
          })}
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
                          <div className="mt-3 flex flex-wrap gap-2">
                            {USABLE_ITEMS.has(stack.itemId) && stack.itemId !== "meat" && (
                              <button
                                type="button"
                                onClick={() => {
                                  const feedback = useInventoryItem(stack.itemId);
                                  if (feedback) setItemUseFeedback(feedback);
                                }}
                                className="rounded-lg bg-violet-500/20 px-2 py-1 text-xs font-medium text-violet-300"
                              >
                                {t("inventory.use")}
                              </button>
                            )}
                            {stack.itemId === "meat" && save.team.activeDigimonIds[0] && (
                              <button
                                type="button"
                                onClick={() => {
                                  const feedback = useItemOnDigimon(
                                    "meat",
                                    save.team.activeDigimonIds[0]!,
                                  );
                                  if (feedback) setItemUseFeedback(feedback);
                                }}
                                className="rounded-lg bg-violet-500/20 px-2 py-1 text-xs font-medium text-violet-300"
                              >
                                {t("inventory.use_on_team")}
                              </button>
                            )}
                            {SELLABLE_ITEMS.has(stack.itemId) && item.sellPrice > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const feedback = sellInventoryItem(stack.itemId, 1);
                                  if (feedback) setShopFeedback(feedback);
                                }}
                                className="rounded-lg bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-300"
                              >
                                {t("inventory.sell", { price: String(item.sellPrice) })}
                              </button>
                            )}
                          </div>
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
