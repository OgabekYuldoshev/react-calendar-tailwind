import { createStore } from "zustand";

interface TabState {
  tab: string;
  setTab: (tab: string) => void;
}

export const useTab = createStore<TabState>((set) => ({
  tab: "",
  setTab: (tab: string) => set({ tab }),
}));
