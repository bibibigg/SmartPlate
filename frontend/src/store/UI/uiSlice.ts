import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  status: string;
  title: string;
  message: string;
}

interface UIState {
  notification: Notification | null;
  isShowModal: boolean;
  isDark: boolean;
}

const initialState: UIState = {
  notification: null,
  isShowModal: false,
  isDark: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<Notification>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    openModal(state) {
      state.isShowModal = true;
    },
    closeModal(state) {
      state.isShowModal = false;
    },
    setInitialTheme(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
