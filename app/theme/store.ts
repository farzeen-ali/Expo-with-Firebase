import { create } from "zustand";

type ThemeState = {
    theme: 'light' | 'dark' | 'auto';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light',
    toggleTheme: () => 
        set((state)=> ({
            theme: 
            state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'auto' : 'light'
        }))
}))