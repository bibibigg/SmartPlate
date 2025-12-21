import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { koreanDateTime } from "../../utils/formatDate";
import { BodyInfo } from "../../types";

interface BodyInfoState {
  info: BodyInfo[];
}

const initialState: BodyInfoState = {
  info: [],
};

const bodyInfoSlice = createSlice({
  name: "bodyInfo",
  initialState,
  reducers: {
    loadBodyInfo(state, action: PayloadAction<BodyInfo[]>) {
      state.info = action.payload;
    },
    addBodyInfo(state, action: PayloadAction<BodyInfo>) {
      const today = koreanDateTime.split("T")[0];
      const idx = state.info.findIndex(
        (data) => data.updatedAt.split("T")[0] === today
      );
      if (idx >= 0) {
        // 오늘 날짜 데이터가 이미 존재하면 해당 항목만 업데이트
        state.info[idx] = action.payload;
      } else {
        // 새로운 날짜 데이터 추가
        state.info.push(action.payload);
      }
    },
  },
});

export const bodyInfoActions = bodyInfoSlice.actions;

export default bodyInfoSlice;
