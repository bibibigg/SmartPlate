import { Request } from "express";

// ============== User & Auth Types ==============
export interface User {
  id: string;
  user_id: string;
  username: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    userId: string;
    username: string;
  };
}

export interface SignUpRequest {
  userId: string;
  username: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  userLoginId: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// ============== Body Info Types ==============
export interface BodyInfo {
  id?: number;
  user_id?: string;
  gender: "male" | "female" | string;
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fatMass: number;
  fat_mass?: number;
  exerciseFrequency: number | string;
  exercise_frequency?: number;
  goal: "maintain" | "lose" | "gain" | string;
  updatedAt?: string;
  updated_at?: string;
  createdAt?: string;
  created_at?: string;
}

export interface BodyInfoRequest {
  gender: "male" | "female" | string;
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fatMass: number;
  exerciseFrequency: number | string;
  goal: "maintain" | "lose" | "gain" | string;
}

// DB에서 가져온 body_info 형태 (snake_case)
export interface BodyInfoDB {
  id: number;
  user_id: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fat_mass: number;
  exercise_frequency: number;
  goal: string;
  created_at: string;
  updated_at: string;
}

// ============== Meal Types ==============
export interface MealItem {
  id?: number | string;
  meal_record_id?: number;
  food_id?: string;
  name: string;
  mainCategory?: string;
  main_category?: string;
  subCategory?: string;
  sub_category?: string;
  servingSize?: string;
  serving_size?: string;
  totalWeight: number;
  total_weight?: number;
  currentServing: number;
  current_serving?: number;
  calories: number;
  protein?: number;
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
  vitamin_a?: number;
  niacin?: number;
  vitaminC?: number;
  vitamin_c?: number;
  vitaminD?: number;
  vitamin_d?: number;
  cholesterol?: number;
  saturatedFat?: number;
  saturated_fat?: number;
  brandName?: string;
  brand_name?: string;
}

export interface MealRecord {
  id?: number;
  user_id?: string;
  date: string;
  mealItems: MealItem[];
  meal_items?: MealItem[];
  totalCalories: number;
  total_calories?: number;
}

export interface MealRecordRequest {
  date: string;
  mealItems: MealItem[];
  totalCalories: number;
}

// DB에서 가져온 meal_record 형태 (snake_case)
export interface MealRecordDB {
  id: number;
  user_id: string;
  date: string;
  total_calories: number;
  created_at: string;
  updated_at: string;
  meal_items?: MealItemDB[];
}

export interface MealItemDB {
  id: number;
  meal_record_id: number;
  food_id: string | null;
  name: string;
  main_category: string | null;
  sub_category: string | null;
  serving_size: string;
  total_weight: number;
  current_serving: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  water: number;
  sugar: number;
  fiber: number;
  calcium: number;
  iron: number;
  phosphorus: number;
  potassium: number;
  sodium: number;
  vitamin_a: number;
  niacin: number;
  vitamin_c: number;
  vitamin_d: number;
  cholesterol: number;
  saturated_fat: number;
  brand_name: string;
  created_at: string;
}

// 기존 Meal 타입 (검색용)
export interface Meal {
  id?: string;
  name: string;
  category: string;
  description?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface MealRequest {
  name: string;
  category: string;
  description?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

// ============== API Response Types ==============
export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
  error?: string;
}

// ============== Utility Functions ==============
// snake_case를 camelCase로 변환
export function toCamelCase<T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase(),
    );
    result[camelKey] = obj[key];
  }
  return result;
}

// camelCase를 snake_case로 변환
export function toSnakeCase<T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`,
    );
    result[snakeKey] = obj[key];
  }
  return result;
}
