import { QueryClient } from "@tanstack/react-query";
import { SelectedFood } from "../store/meals/mealSlice";
import { BodyData } from "../types";

export const queryClient = new QueryClient();
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom Error Type
export class HttpError extends Error {
  code: number;
  info: {
    title?: string;
    message: string;
  };

  constructor(message: string, code: number, info: { title?: string; message: string }) {
    super(message);
    this.code = code;
    this.info = info;
    this.name = "HttpError";
  }
}

// Fetch Data Types
export interface FetchDataParams {
  signal?: AbortSignal;
  params: string;
  searchTerm?: string;
}

export async function fetchData<T = unknown>({ signal, params, searchTerm }: FetchDataParams): Promise<T> {
  try {
    let url = `${BASE_URL}/api/${params}`;
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }
    const response = await fetch(url, { signal });
    if (!response.ok) {
      const info = await response.json();
      throw new HttpError("Failed to body data", response.status, info);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError("서버 연결에 실패했습니다.", 500, {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
    });
  }
}

// Body Data는 types/index.ts에서 import

export async function updateBodyData(data: BodyData): Promise<BodyData> {
  try {
    const response = await fetch(`${BASE_URL}/api/bodyInfo`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new HttpError("Failed to update body data", response.status, responseData);
    }
    return responseData;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError("서버 연결에 실패했습니다.", 500, {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
    });
  }
}

// Meals Data Types
export interface MealData {
  name: string;
  category: string;
  description?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

// Meal Record Type (for saving meal history)
export interface MealRecord {
  id?: number;
  date: string;
  mealItems: SelectedFood[];
  totalCalories: number;
}

export async function updateMealsData(data: MealRecord): Promise<MealRecord> {
  try {
    const response = await fetch(`${BASE_URL}/api/meals`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new HttpError("Failed to update meals data", response.status, responseData);
    }
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError("서버 연결에 실패했습니다.", 500, {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
    });
  }
}

// AI Image Analysis Types
export interface AnalyzedFood {
  name: string;
  calories: number;
  weight: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  confidence: number;
}

export interface FoodAnalysisResponse {
  foods: AnalyzedFood[];
}

export async function analyzeFoodImage(base64Image: string): Promise<FoodAnalysisResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/analyze-food-image`, {
      method: "POST",
      body: JSON.stringify({ image: base64Image }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new HttpError("Failed to analyze food image", response.status, responseData);
    }
    return responseData;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError("이미지 분석에 실패했습니다.", 500, {
      title: "분석 오류",
      message: "이미지 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
}
