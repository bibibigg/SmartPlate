import { create } from "zustand";

interface Notification {
  status: string;
  title: string;
  message: string;
}

interface UIState {
  notification: Notification | null;
  isShowModal: boolean;
  isDark: boolean;

  // Actions
  showNotification: (notification: Notification) => void;
  openModal: () => void;
  closeModal: () => void;
  setInitialTheme: (isDark: boolean) => void;
  toggleTheme: () => void;
}

const initialState = {
  notification: null,
  isShowModal: false,
  isDark: false,
};

export const useUIStore = create<UIState>((set) => ({
  ...initialState,

  showNotification: (notification) => {
    set({ notification });
  },

  openModal: () => {
    set({ isShowModal: true });
  },

  closeModal: () => {
    set({ isShowModal: false });
  },

  setInitialTheme: (isDark) => {
    set({ isDark });
  },

  toggleTheme: () => {
    set((state) => ({ isDark: !state.isDark }));
  },
}));
