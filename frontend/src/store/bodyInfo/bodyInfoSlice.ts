import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { koreanDateTime } from "../../utils/formatDate";

export interface BodyInfo {
  gender: string;
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fatMass: number;
  exerciseFrequency: number;
  goal: string;
  updatedAt: string;
}

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
        state.info = [action.payload];
      } else {
        state.info.push(action.payload);
      }
    },
  },
});

export const bodyInfoActions = bodyInfoSlice.actions;

export default bodyInfoSlice;
