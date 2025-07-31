import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchData({ signal, params, searchTerm }) {
  try {
    let url = `${BASE_URL}/api/` + params;
    if (searchTerm) {
      url += "?search=" + searchTerm;
    }
    const response = await fetch(url, { signal: signal });
    console.log("확인");
    if (!response.ok) {
      const error = new Error("Failed to body data");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const customError = new Error("서버 연결에 실패했습니다.");
    customError.code = 500;
    customError.info = {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
    };
    throw customError;
  }
}

export async function updateBodyData(data) {
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
      const error = new Error("test");
      error.code = response.status;
      error.info = responseData;
      throw error;
    }
    return data;
  } catch (error) {
    const customError = new Error("서버 연결에 실패했습니다.");
    customError.code = 500;
    customError.info = {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
    };
    throw customError;
  }
}

export async function updateMealsData(data) {
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
      const error = new Error("test");
      error.code = response.status;
      error.info = responseData;
      throw error;
    }
    return data;
  } catch (error) {
    const customError = new Error("서버 연결에 실패했습니다.");
    customError.code = 500;
    customError.info = {
      title: "연결 오류",
      message: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
    };
    throw customError;
  }
}
