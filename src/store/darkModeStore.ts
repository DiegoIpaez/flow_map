import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DarkModeStore {
  isDarkMode: boolean;
  setIsDarkMode: () => void;
}

const useDarkModeStore = create(
  persist<DarkModeStore>(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: () => {
        set((state: DarkModeStore) => ({ isDarkMode: !state.isDarkMode }));
      },
    }),
    {
      name: "darkMode",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDarkModeStore;
