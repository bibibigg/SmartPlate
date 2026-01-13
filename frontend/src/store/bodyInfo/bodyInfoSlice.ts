import { create } from "zustand";
import { koreanDateTime } from "../../utils/formatDate";
import { BodyInfo } from "../../types";

interface BodyInfoState {
  info: BodyInfo[];

  // Actions
  loadBodyInfo: (info: BodyInfo[]) => void;
  addBodyInfo: (bodyInfo: BodyInfo) => void;
}

const initialState = {
  info: [],
};

export const useBodyInfoStore = create<BodyInfoState>((set) => ({
  ...initialState,

  loadBodyInfo: (info) => {
    set({ info });
  },

  addBodyInfo: (bodyInfo) => {
    set((state) => {
      const today = koreanDateTime.split("T")[0];
      const idx = state.info.findIndex(
        (data) => data.updatedAt.split("T")[0] === today
      );

      if (idx >= 0) {
        // 오늘 날짜 데이터가 이미 존재하면 해당 항목만 업데이트
        const newInfo = [...state.info];
        newInfo[idx] = bodyInfo;
        return { info: newInfo };
      } else {
        // 새로운 날짜 데이터 추가
        return { info: [...state.info, bodyInfo] };
      }
    });
  },
}));
