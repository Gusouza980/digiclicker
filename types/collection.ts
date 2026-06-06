export type IslandActionType =
  | "stat_training"
  | "friendship_training"
  | "type_xp"
  | "mission";

export type IslandActionSlot = {
  digimonInstanceId: string;
  actionType: IslandActionType;
};

export type DigimonLocation = "team" | "island" | "unknown";

export type CollectionFeedback = {
  messageKey: string;
  variant: "success" | "fail" | "info";
  params?: Record<string, string>;
};
