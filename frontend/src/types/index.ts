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
