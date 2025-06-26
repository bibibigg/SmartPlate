import { useNavigate } from "react-router-dom";
import {
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
  todayTotalCalories,
} from "../utils/calorieCalculator";
import CalorieStats from "../components/Dashboard/CalorieStats";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import { useEffect } from "react";

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

  // useEffect(() => {
  //   if (!bodyData || bodyData.length === 0) {
  //     return navigate("/bodyInfo");
  //   }
  // }, [navigate, bodyData]);
  if (!bodyData || bodyData.length === 0) {
    const calorieStats = {
      BMR: 0,
      TDEE: 0,
      targetCalories: 0,
    };
    console.log(mealsData);
    const totalCalories = todayTotalCalories(mealsData);
    return (
      <CalorieStats
        calorieStats={calorieStats}
        bodyData={bodyData}
        todayCalories={totalCalories}
      />
    );
  }

  if (bodyData && mealsData) {
    console.log(bodyData);
    const currentData = bodyData[bodyData.length - 1];
    const { weight, height, age, gender, exerciseFrequency, goal } =
      currentData;

    // BMR 계산
    const bmr = calculateBMR(weight, height, age, gender);
    // TDEE
    const calculatedTDEE = calculateTDEE(bmr, exerciseFrequency);
    // // 목표 칼로리
    const calculatedTarget = calculateTargetCalories(calculatedTDEE, goal);

    const calorieStats = {
      BMR: Math.round(bmr),
      TDEE: Math.round(calculatedTDEE),
      targetCalories: Math.round(calculatedTarget),
    };
    const totalCalories = todayTotalCalories(mealsData);

    return (
      <>
        <CalorieStats
          calorieStats={calorieStats}
          bodyData={currentData}
          todayCalories={totalCalories}
        />
      </>
    );
  }
}
