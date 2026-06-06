export type DigimonLocation = "team" | "island" | "unknown";

export type CollectionFeedback = {
  messageKey: string;
  variant: "success" | "fail" | "info";
  params?: Record<string, string>;
};
