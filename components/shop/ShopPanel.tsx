"use client";

import { getCatalogEntry } from "@/catalogs/loader";
import { findShopByLocation } from "@/game/shop";
import { useGameStore } from "@/stores/game-store";
import { useUiStore } from "@/stores/ui-store";

type ShopPanelProps = {
  locationId: string;
};

export function ShopPanel({ locationId }: ShopPanelProps) {
  const save = useGameStore((state) => state.save);
  const t = useGameStore((state) => state.t);
  const buyShopItem = useGameStore((state) => state.buyShopItem);
  const shopFeedback = useUiStore((state) => state.shopFeedback);
  const setShopFeedback = useUiStore((state) => state.setShopFeedback);

  if (!save) return null;

  const shop = findShopByLocation(locationId);
  if (!shop) return null;

  const handleBuy = (itemId: string) => {
    const feedback = buyShopItem(itemId, 1);
    if (feedback) setShopFeedback(feedback);
  };

  return (
    <section className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <h4 className="font-medium text-emerald-300">{t(shop.nameKey)}</h4>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{t("shop.subtitle")}</p>

      {shopFeedback && (
        <p
          className={`mt-3 text-xs ${
            shopFeedback.variant === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {t(shopFeedback.messageKey, {
            item: shopFeedback.params?.item ? t(shopFeedback.params.item) : "",
            quantity: shopFeedback.params?.quantity ?? "",
            bits: shopFeedback.params?.bits ?? "",
          })}
        </p>
      )}

      <ul className="mt-3 space-y-2">
        {shop.itemIds.map((itemId) => {
          const item = getCatalogEntry("item", itemId);
          if (!item) return null;

          const canAfford = save.player.bits >= item.buyPrice;

          return (
            <li
              key={itemId}
              className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {t(item.nameKey)}
                </p>
                <p className="text-xs text-amber-300">
                  {t("shop.price", { price: String(item.buyPrice) })}
                </p>
              </div>
              <button
                type="button"
                disabled={!canAfford}
                onClick={() => handleBuy(itemId)}
                className="shrink-0 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white disabled:opacity-40"
              >
                {t("shop.buy")}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
