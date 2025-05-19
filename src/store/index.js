import { configureStore } from "@reduxjs/toolkit";
import bodyInfoReducer from "./bodyInfo/bodyInfoSlice";
import uiReducer from "./bodyInfo/uiSlice";
import mealReducer from "./meals/mealSlice";

const store = configureStore({
  reducer: {
    bodyInfo: bodyInfoReducer.reducer,
    meal: mealReducer.reducer,
    ui: uiReducer.reducer,
  },
});

export default store;
