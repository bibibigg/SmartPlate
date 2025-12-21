import { useNavigate } from "react-router-dom";
import CalorieStats from "../components/Dashboard/CalorieStats";
import { useQuery } from "@tanstack/react-query";
import { fetchData, HttpError } from "../utils/http";
import { BodyData, MealData } from "../types";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import { calculateCalorieStats } from "../utils/calorieCalculator";
import { useEffect } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";

export default function HomePage() {
  const navigate = useNavigate();

  const {
    data: mealsData,
    isPending: isMealsPending,
    isError: isMealsError,
    error: mealsError,
    refetch: refetchMeals,
  } = useQuery<MealData[]>({
    queryKey: QUERY_KEYS.MY_MEALS,
    queryFn: ({ signal }) => fetchData<MealData[]>({ signal, params: "myMeals" }),
  });

  const {
    data: bodyData,
    isPending,
    isError,
    error,
    refetch: refetchBody,
  } = useQuery<BodyData[]>({
    queryKey: QUERY_KEYS.BODY_INFO,
    queryFn: ({ signal }) => fetchData<BodyData[]>({ signal, params: "bodyinfo" }),
  });

  // 첫 방문자 온보딩: 신체 정보 없을 시 자동 리다이렉트
  useEffect(() => {
    if (!isPending && (!bodyData || bodyData.length === 0)) {
      navigate("/bodyInfo");
    }
  }, [navigate, bodyData, isPending]);

  if (isPending || isMealsPending) {
    return <LoadingSpinner />;
  }

  // 에러 처리 개선 (타입 가드 추가)
  if (isError || isMealsError) {
    const errorTitle = "데이터를 불러올 수 없습니다";
    let errorMessage = "서버와의 연결에 문제가 발생했습니다.";

    // 타입 가드 함수
    const isHttpError = (err: unknown): err is HttpError => {
      return err instanceof HttpError;
    };

    if (isHttpError(error)) {
      errorMessage = error.info.message;
    } else if (isHttpError(mealsError)) {
      errorMessage = mealsError.info.message;
    } else if (error?.message?.includes("fetch") || mealsError?.message?.includes("fetch")) {
      errorMessage = "백엔드 서버가 실행 중인지 확인해주세요. (포트 5001)";
    }

    const handleRetry = () => {
      if (isError) refetchBody();
      if (isMealsError) refetchMeals();
    };

    return <ErrorBlock title={errorTitle} message={errorMessage} onRetry={handleRetry} />;
  }

  // 데이터를 정상적으로 받아올 시 값 추출
  const {
    calorieStats,
    bodyData: currentBodyData,
    totalCalories,
  } = calculateCalorieStats(bodyData, mealsData);

  return (
    <CalorieStats
      calorieStats={calorieStats}
      bodyData={currentBodyData}
      todayCalories={totalCalories}
    />
  );
}
