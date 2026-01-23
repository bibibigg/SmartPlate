import type { MealItem } from "../types";

/** 영양소 데이터 타입 */
export interface Nutrients {
  carbs: number;
  protein: number;
  fat: number;
}

/**
 * MealItem에서 탄수화물 값을 추출 (carbs 또는 carbohydrates 필드 통일)
 */
export function getCarbs(item: MealItem): number {
  return item.carbs ?? item.carbohydrates ?? 0;
}

/**
 * 서빙 비율 계산
 */
export function getServingRatio(item: MealItem): number {
  return item.totalWeight > 0 ? item.currentServing / item.totalWeight : 1;
}

/**
 * MealItem에서 실제 섭취 영양소 계산
 */
export function calculateNutrients(item: MealItem): Nutrients {
  const ratio = getServingRatio(item);
  const carbsValue = getCarbs(item);

  return {
    carbs: carbsValue > 0 ? Math.round(carbsValue * ratio) : 0,
    protein: item.protein ? Math.round(item.protein * ratio) : 0,
    fat: item.fat ? Math.round(item.fat * ratio) : 0,
  };
}

/**
 * 여러 MealItem의 총 영양소 합계 계산
 */
export function calculateTotalNutrients(items: MealItem[]): Nutrients {
  return items.reduce<Nutrients>(
    (acc, item) => {
      const nutrients = calculateNutrients(item);
      return {
        carbs: acc.carbs + nutrients.carbs,
        protein: acc.protein + nutrients.protein,
        fat: acc.fat + nutrients.fat,
      };
    },
    { carbs: 0, protein: 0, fat: 0 }
  );
}
