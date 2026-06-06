import { create } from "zustand";

export type AppScreen = "battle" | "map" | "inventory" | "traits";

type UiStore = {
  activeScreen: AppScreen;
  selectedDigimonId: string | null;
  setActiveScreen: (screen: AppScreen) => void;
  setSelectedDigimonId: (digimonId: string | null) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  activeScreen: "battle",
  selectedDigimonId: null,
  setActiveScreen: (screen) => set({ activeScreen: screen, selectedDigimonId: null }),
  setSelectedDigimonId: (digimonId) => set({ selectedDigimonId: digimonId }),
}));
