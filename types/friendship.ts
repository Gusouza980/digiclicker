export type FriendshipConfig = {
  maxValue: number;
  gainFromBattle: number;
  gainFromClickAssist: number;
  dailyClickSoftCap: number;
  globalMultiplier: number;
};

export type FriendshipDailyProgress = {
  dateKey: string;
  clickGainUsed: number;
};
