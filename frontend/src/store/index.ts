import { configureStore } from "@reduxjs/toolkit";
import bodyInfoReducer from "./bodyInfo/bodyInfoSlice";
import uiReducer from "./UI/uiSlice";
import mealReducer from "./meals/mealSlice";

const store = configureStore({
  reducer: {
    bodyInfo: bodyInfoReducer.reducer,
    meal: mealReducer.reducer,
    ui: uiReducer.reducer,
  },
});

// RootState 타입 추출
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch 타입 추출
export type AppDispatch = typeof store.dispatch;

export default store;
