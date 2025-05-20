import { createSlice } from "@reduxjs/toolkit";

const mealSlice = createSlice({
  name: "food",
  initialState: {
    foodData: [],
    selectedFood: [],
  },
  reducers: {
    setFoodData(state, action) {
      state.foodData = action.payload;
    },
    addSelectedFood(state, action) {
      const food = action.payload;
      const foodWithCurrentServing = {
        ...food,
        currentServing: food.totalWeight,
      };
      state.selectedFood.push(foodWithCurrentServing);
      state.hasDuplicate = false;
    },
    removeSelectedFood(state, action) {
      state.selectedFood = state.selectedFood.filter(
        (food) => food.id !== action.payload
      );
    },
    ChangeServingSize(state, action) {
      const { id, newSize } = action.payload;
      state.selectedFood = state.selectedFood.map((item) =>
        item.id === id ? { ...item, currentServing: newSize } : item
      );
    },
  },
});

export const mealActions = mealSlice.actions;

export default mealSlice;
