import { configureStore } from "@reduxjs/toolkit";
import bodyInfoReducer from "./bodyInfo/bodyInfoSlice";

const store = configureStore({
  reducer: {
    bodyInfo: bodyInfoReducer.reducer,
  },
});

export default store;
