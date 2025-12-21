/**
 * React Query 쿼리 키 상수
 * 중복을 방지하고 일관성을 유지하기 위한 중앙 관리
 */

export const QUERY_KEYS = {
  BODY_INFO: ["bodyInfo"] as const,
  MY_MEALS: ["myMeals"] as const,
  FOOD_DATA: (searchTerm: string) => ["foodData", { search: searchTerm }] as const,
} as const;
