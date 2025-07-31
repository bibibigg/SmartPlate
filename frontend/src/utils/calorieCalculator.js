import { getKoreanDate } from "./formatDate";

// BMR 계산
export function calculateBMR(weight, height, age, gender) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

// TDEE 계산
export function calculateTDEE(BMR, exerciseFrequency) {
  return exerciseFrequency * BMR;
}

//목표 칼로리 계산
export function calculateTargetCalories(TDEE, goal) {
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

export function todayTotalCalories(MealsData) {
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

export function calculateCalorieStats(bodyData, mealsData) {
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
