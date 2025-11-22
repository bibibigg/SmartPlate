import { getKoreanDate } from "./formatDate";

// 타입 정의
export interface BodyData {
  weight: number;
  height: number;
  age: number;
  gender: "male" | "female";
  exerciseFrequency: number;
  goal: "maintain" | "lose" | "gain";
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

// BMR 계산
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: string
): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

// TDEE 계산
export function calculateTDEE(BMR: number, exerciseFrequency: number): number {
  return exerciseFrequency * BMR;
}

// 목표 칼로리 계산
export function calculateTargetCalories(TDEE: number, goal: string): number {
  switch (goal) {
    case "maintain":
      return TDEE;
    case "lose":
      return TDEE - 500;
    case "gain":
      return TDEE + 300;
    default:
      return TDEE; // 기본값으로 TDEE 반환
  }
}

export function todayTotalCalories(MealsData: MealData[]): number {
  const today = getKoreanDate().toISOString().split("T")[0];
  const mealsToday = MealsData.filter(
    (meal) => meal.date.split("T")[0] === today
  );
  const totalCalories = mealsToday.reduce(
    (sum, meal) => sum + meal.totalCalories,
    0
  );
  return totalCalories;
}

export function calculateCalorieStats(
  bodyData: BodyData[],
  mealsData: MealData[]
): CalorieStatsResult {
  const totalCalories = todayTotalCalories(mealsData);

  // bodyData가 없거나 빈 배열인 경우 기본값 반환
  if (!bodyData || bodyData.length === 0) {
    return {
      calorieStats: {
        BMR: 0,
        TDEE: 0,
        targetCalories: 0,
      },
      bodyData: null,
      totalCalories,
    };
  }

  // bodyData가 있는 경우 계산 수행
  const currentData = bodyData[bodyData.length - 1];
  const { weight, height, age, gender, exerciseFrequency, goal } = currentData;

  const bmr = calculateBMR(weight, height, age, gender);
  const calculatedTDEE = calculateTDEE(bmr, exerciseFrequency);
  const calculatedTarget = calculateTargetCalories(calculatedTDEE, goal);

  return {
    calorieStats: {
      BMR: Math.round(bmr),
      TDEE: Math.round(calculatedTDEE),
      targetCalories: Math.round(calculatedTarget),
    },
    bodyData: currentData,
    totalCalories,
  };
}
