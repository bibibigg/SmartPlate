import { getKoreanDate } from "./formatDate";
import { BodyData, CalorieStatsResult } from "../types";

// 칼로리 계산에 필요한 최소 식사 데이터 타입
interface MealWithCalories {
  date: string;
  totalCalories: number;
}

// 칼로리 조정 상수
const CALORIE_DEFICIT_FOR_WEIGHT_LOSS = 500; // 체중 감량 시 일일 칼로리 감소량 (kcal)
const CALORIE_SURPLUS_FOR_MUSCLE_GAIN = 300; // 근육 증량 시 일일 칼로리 증가량 (kcal)

// BMR 계산 (Mifflin-St Jeor 공식)
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

// TDEE 계산
export function calculateTDEE(BMR: number, exerciseFrequency: number): number {
  return exerciseFrequency * BMR;
}

// 목표 칼로리 계산
export function calculateTargetCalories(TDEE: number, goal: "maintain" | "lose" | "gain"): number {
  switch (goal) {
    case "maintain":
      return TDEE;
    case "lose":
      return TDEE - CALORIE_DEFICIT_FOR_WEIGHT_LOSS;
    case "gain":
      return TDEE + CALORIE_SURPLUS_FOR_MUSCLE_GAIN;
    default:
      return TDEE; // 기본값으로 TDEE 반환
  }
}

export function todayTotalCalories(MealsData: MealWithCalories[]): number {
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
  mealsData: MealWithCalories[]
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
