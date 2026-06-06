import { create } from "zustand";

export type AppScreen = "battle" | "map" | "traits";

type UiStore = {
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  activeScreen: "battle",
  setActiveScreen: (screen) => set({ activeScreen: screen }),
}));
