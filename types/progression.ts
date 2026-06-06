export type ProgressionState = {
  autoProgressEnabled: boolean;
};

export type ActiveBuffType = "xp_multiplier";

export type ActiveBuff = {
  id: string;
  type: ActiveBuffType;
  multiplier: number;
  battlesRemaining: number;
};

export type OfflineSummary = {
  awayMs: number;
  battlesSimulated: number;
  bitsGained: number;
  digimonXpGained: number;
  trainerXpGained: number;
  itemsDropped: Array<{ itemId: string; quantity: number }>;
};

export type ItemUseFeedback = {
  messageKey: string;
  variant: "success" | "fail";
  params?: Record<string, string>;
};
