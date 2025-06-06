import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    isShowModal: false,
    isDark: false,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    openModal(state, action) {
      state.isShowModal = true;
    },
    closeModal(state, action) {
      state.isShowModal = false;
    },
    toggleTheme(state, action) {
      state.isDark = !state.isDark;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
