import { useNavigate } from "react-router-dom";
import CalorieStats from "../components/Dashboard/CalorieStats";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import { calculateCalorieStats } from "../utils/calorieCalculator";

export default function HomePage() {
  const navigate = useNavigate();

  const {
    data: mealsData,
    isPending: isMealsPending,
    isError: isMealsError,
    error: mealsError,
  } = useQuery({
    queryKey: ["myMeals"],
    queryFn: ({ signal }) => fetchData({ signal, params: "myMeals" }),
  });

  const {
    data: bodyData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["bodyInfo"],
    queryFn: ({ signal }) => fetchData({ signal, params: "bodyinfo" }),
  });

  if (isPending || isMealsPending) {
    return <LoadingSpinner />;
  }

  if (isError || isMealsError) {
    return <ErrorBlock title="fail" message={error.info?.message || "fail"} />;
  }
  {
    /* 데이터를 정상적으로 받아올 시 값 추출  */
  }
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

  // useEffect(() => {
  //   if (!bodyData || bodyData.length === 0) {
  //     return navigate("/bodyInfo");
  //   }
  // }, [navigate, bodyData]);
}
