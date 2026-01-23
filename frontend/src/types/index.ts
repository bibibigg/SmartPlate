// 중앙집중식 타입 정의

export interface BodyData {
  gender: "male" | "female";
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fatMass: number;
  exerciseFrequency: number;
  goal: "maintain" | "lose" | "gain";
}

// BodyInfo는 BodyData + updatedAt (서버에서 받아오는 데이터)
export interface BodyInfo extends BodyData {
  updatedAt: string;
}

export interface MealData {
  date: string;
  totalCalories: number;
}

export interface CalorieStats {
  BMR: number;
  TDEE: number;
  targetCalories: number;
}

export interface CalorieStatsResult {
  calorieStats: CalorieStats;
  bodyData: BodyData | null;
  totalCalories: number;
}

// 식사 기록 아이템 (저장된 음식 정보)
export interface MealItem {
  id: string;
  name: string;
  calories: number;
  totalWeight: number;
  currentServing: number;
  protein?: number;
  carbs?: number;
  carbohydrates?: number;
  fat?: number;
}

// 식사 기록 (하루 단위)
export interface MealRecord {
  id: number;
  date: string;
  mealItems: MealItem[];
  totalCalories: number;
}
