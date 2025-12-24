import { useNavigate } from "react-router-dom";
import CalorieStats from "../components/Dashboard/CalorieStats";
import { useQuery } from "@tanstack/react-query";
import { fetchData, HttpError } from "../utils/http";
import { BodyData, MealData } from "../types";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import { calculateCalorieStats } from "../utils/calorieCalculator";
import { useEffect, useState } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import OnboardingModal from "../components/Onboarding/OnboardingModal";

// localStorage 키 상수
const ONBOARDING_DISMISSED_KEY = "onboarding_dismissed";
const ONBOARDING_DISMISS_DAYS = 1; // 다시 표시하기까지 일수

export default function HomePage() {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const {
    data: mealsData,
    isPending: isMealsPending,
    isError: isMealsError,
    error: mealsError,
    refetch: refetchMeals,
  } = useQuery<MealData[]>({
    queryKey: QUERY_KEYS.MY_MEALS,
    queryFn: ({ signal }) =>
      fetchData<MealData[]>({ signal, params: "myMeals" }),
  });

  const {
    data: bodyData,
    isPending,
    isError,
    error,
    refetch: refetchBody,
  } = useQuery<BodyData[]>({
    queryKey: QUERY_KEYS.BODY_INFO,
    queryFn: ({ signal }) =>
      fetchData<BodyData[]>({ signal, params: "bodyinfo" }),
  });

  // 온보딩 모달 표시 로직 (localStorage 기반)
  useEffect(() => {
    // 로딩 중이거나 신체 정보가 있으면 모달 표시 안 함
    if (isPending || (bodyData && bodyData.length > 0)) {
      return;
    }

    // 사용자가 "다음에 입력"을 선택한 적이 있는지 확인
    const dismissed = localStorage.getItem(ONBOARDING_DISMISSED_KEY);
    if (dismissed) {
      const daysPassed =
        (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      if (daysPassed < ONBOARDING_DISMISS_DAYS) {
        return; // 7일 이내면 표시 안 함
      }
    }

    // 신체 정보가 없으면 모달 표시
    if (!bodyData || bodyData.length === 0) {
      setShowOnboarding(true);
    }
  }, [bodyData, isPending]);

  // "지금 입력하기" 클릭 핸들러
  const handleConfirmOnboarding = () => {
    setShowOnboarding(false);
    navigate("/bodyInfo");
  };

  // "다음에 입력" 클릭 핸들러
  const handleLaterOnboarding = (dontShowToday: boolean) => {
    setShowOnboarding(false);
    // "오늘 하루 보지 않기" 체크된 경우에만 localStorage에 저장
    if (dontShowToday) {
      localStorage.setItem(ONBOARDING_DISMISSED_KEY, Date.now().toString());
    }
  };

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
    } else if (
      error?.message?.includes("fetch") ||
      mealsError?.message?.includes("fetch")
    ) {
      errorMessage = "백엔드 서버가 실행 중인지 확인해주세요. (포트 5001)";
    }

    const handleRetry = () => {
      if (isError) refetchBody();
      if (isMealsError) refetchMeals();
    };

    return (
      <ErrorBlock
        title={errorTitle}
        message={errorMessage}
        onRetry={handleRetry}
      />
    );
  }

  // 데이터를 정상적으로 받아올 시 값 추출
  const {
    calorieStats,
    bodyData: currentBodyData,
    totalCalories,
  } = calculateCalorieStats(bodyData, mealsData);

  return (
    <>
      {showOnboarding && (
        <OnboardingModal
          onConfirm={handleConfirmOnboarding}
          onLater={handleLaterOnboarding}
        />
      )}
      <CalorieStats
        calorieStats={calorieStats}
        bodyData={currentBodyData}
        todayCalories={totalCalories}
      />
    </>
  );
}
