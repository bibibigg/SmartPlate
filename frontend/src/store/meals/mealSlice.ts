import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Food {
  id: string;
  name: string;
  category?: string;
  mainCategory?: string;
  subCategory?: string;
  servingSize?: string;
  totalWeight: number;
  calories: number;
  protein?: number;
  carbs?: number;
  carbohydrates?: number;
  fat?: number;
  water?: number;
  sugar?: number;
  fiber?: number;
  calcium?: number;
  iron?: number;
  phosphorus?: number;
  potassium?: number;
  sodium?: number;
  vitaminA?: number;
  niacin?: number;
  vitaminC?: number;
  vitaminD?: number;
  cholesterol?: number;
  saturatedFat?: number;
  brandName?: string;
}

export interface SelectedFood extends Food {
  currentServing: number;
}

interface MealState {
  foodData: Food[];
  selectedFood: SelectedFood[];
}

const initialState: MealState = {
  foodData: [],
  selectedFood: [],
};

const mealSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFoodData(state, action: PayloadAction<Food[]>) {
      state.foodData = action.payload;
    },
    addSelectedFood(state, action: PayloadAction<Food>) {
      const food = action.payload;
      const foodWithCurrentServing: SelectedFood = {
        ...food,
        currentServing: food.totalWeight,
      };
      state.selectedFood.push(foodWithCurrentServing);
    },
    removeSelectedFood(state, action: PayloadAction<string>) {
      state.selectedFood = state.selectedFood.filter(
        (food) => food.id !== action.payload
      );
    },
    ChangeServingSize(state, action: PayloadAction<{ id: string; newSize: number }>) {
      const { id, newSize } = action.payload;
      state.selectedFood = state.selectedFood.map((item) =>
        item.id === id ? { ...item, currentServing: newSize } : item
      );
    },
  },
});

export const mealActions = mealSlice.actions;

export default mealSlice;
