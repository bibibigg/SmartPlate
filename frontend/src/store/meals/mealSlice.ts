import { create } from "zustand";

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

  // Actions
  setFoodData: (foods: Food[]) => void;
  addSelectedFood: (food: Food) => void;
  removeSelectedFood: (id: string) => void;
  changeServingSize: (id: string, newSize: number) => void;
}

const initialState = {
  foodData: [],
  selectedFood: [],
};

export const useMealStore = create<MealState>((set) => ({
  ...initialState,

  setFoodData: (foods) => {
    set({ foodData: foods });
  },

  addSelectedFood: (food) => {
    const foodWithCurrentServing: SelectedFood = {
      ...food,
      currentServing: food.totalWeight,
    };
    set((state) => ({
      selectedFood: [...state.selectedFood, foodWithCurrentServing],
    }));
  },

  removeSelectedFood: (id) => {
    set((state) => ({
      selectedFood: state.selectedFood.filter((food) => food.id !== id),
    }));
  },

  changeServingSize: (id, newSize) => {
    set((state) => ({
      selectedFood: state.selectedFood.map((item) =>
        item.id === id ? { ...item, currentServing: newSize } : item
      ),
    }));
  },
}));
