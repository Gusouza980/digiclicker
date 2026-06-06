export type ShopCatalogEntry = {
  id: string;
  locationId: string;
  nameKey: string;
  itemIds: string[];
};

export type ShopFeedback = {
  messageKey: string;
  variant: "success" | "fail";
  params?: Record<string, string>;
};
