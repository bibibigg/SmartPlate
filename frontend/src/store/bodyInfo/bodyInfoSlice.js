import { createSlice } from "@reduxjs/toolkit";
import { koreanDateTime } from "../../utils/formatDate";

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
      const today = koreanDateTime.split("T")[0];
      console.log("오늘:", today);
      const idx = state.info.findIndex(
        (data) => data.updatedAt.split("T")[0] === today
      );
      if (idx >= 0) {
        state.info = action.payload;
        console.log("오늘날짜 있음");
      } else {
        state.info.push(action.payload);
        console.log("오늘날짜 없음");
      }
    },
    // updateBodyInfo(state, action) {
    //   state.info = {
    //     ...state.info,
    //     ...action.payload,
    //   };
    // },
  },
});

export const bodyInfoActions = bodyInfoSlice.actions;

export default bodyInfoSlice;
