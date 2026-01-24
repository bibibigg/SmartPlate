import { QueryClient } from "@tanstack/react-query";
import { SelectedFood } from "../store/meals/mealSlice";
import { BodyData } from "../types";
import { useAuthStore } from "../store/auth/authSlice";

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

// 토큰을 포함한 헤더 생성
function getAuthHeaders(): HeadersInit {
  const token = useAuthStore.getState().token;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// 401 에러 처리 (토큰 만료 시 로그아웃)
function handleUnauthorized() {
  useAuthStore.getState().logout();
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
    const response = await fetch(url, {
      signal,
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new HttpError("인증이 만료되었습니다.", 401, {
        title: "인증 만료",
        message: "다시 로그인해주세요.",
      });
    }

    if (!response.ok) {
      const info = await response.json();
      throw new HttpError("Failed to fetch data", response.status, info);
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

export async function updateBodyData(data: BodyData): Promise<BodyData> {
  try {
    const response = await fetch(`${BASE_URL}/api/bodyinfo`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new HttpError("인증이 만료되었습니다.", 401, {
        title: "인증 만료",
        message: "다시 로그인해주세요.",
      });
    }

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
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new HttpError("인증이 만료되었습니다.", 401, {
        title: "인증 만료",
        message: "다시 로그인해주세요.",
      });
    }

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

// Auth Types
export interface SignUpData {
  userId: string;
  username: string;
  password: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    id: string;
    userId: string;
    username: string;
  };
}

export interface LoginData {
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

export async function signUp(data: SignUpData): Promise<SignUpResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new HttpError("Failed to sign up", response.status, {
        message: responseData.message || "회원가입에 실패했습니다.",
      });
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

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new HttpError("Failed to login", response.status, {
        message: responseData.message || "로그인에 실패했습니다.",
      });
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

export async function verifyToken(): Promise<{ user: LoginResponse["user"] }> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new HttpError("Token verification failed", response.status, {
        message: "토큰 검증에 실패했습니다.",
      });
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError("서버 연결에 실패했습니다.", 500, {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다.",
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
    const response = await fetch(`${BASE_URL}/api/analyze/food-image`, {
      method: "POST",
      body: JSON.stringify({ image: base64Image }),
      headers: getAuthHeaders(),
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
