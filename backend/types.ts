// Body Info Types
export interface BodyInfo {
  gender: string;
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fatMass: number;
  exerciseFrequency: string;
  goal: string;
  updatedAt: string;
}

// Meal Types
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

// Request Body Types
export interface BodyInfoRequest {
  gender: string;
  age: number;
  height: number;
  weight: number;
  muscle: number;
  fatMass: number;
  exerciseFrequency: string;
  goal: string;
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

// API Response Types
export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}
