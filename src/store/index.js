import { configureStore } from "@reduxjs/toolkit";
import bodyInfoReducer from "./bodyInfo/bodyInfoSlice";
import uiReducer from "./bodyInfo/uiSlice";

const store = configureStore({
  reducer: {
    bodyInfo: bodyInfoReducer.reducer,
    ui: uiReducer.reducer,
  },
});

export default store;
