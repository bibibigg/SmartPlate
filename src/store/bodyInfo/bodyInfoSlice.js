import { createSlice } from "@reduxjs/toolkit";

const bodyInfoSlice = createSlice({
  name: "bodyInfo",
  initialState: {
    info: [],
  },
  reducers: {
    loadBodyInfo(state, action) {
      state.info = action.payload;
    },
    addBodyInfo(state, action) {
      const newInfo = action.payload;
      state.info.push(newInfo);
    },
  },
});

export const bodyInfoActions = bodyInfoSlice.actions;

export default bodyInfoSlice;
