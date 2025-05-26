import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBodyData } from "../store/bodyInfo/bodyInfoActions";
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

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [todayCalories, setTodayCalories] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bodyInfo"],
    queryFn: ({ signal }) => fetchData({ signal, params: "bodyinfo" }),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorBlock title="fail" message={error.info?.message || "fail"} />;
  }

  if (!data) {
    return navigate('"/bodyInfo"');
  }

  if (data) {
    const currentData = data[data.length - 1];
    const { weight, height, age, gender, exerciseFrequency, goal } =
      currentData;

    // BMR 계산
    const bmr = calculateBMR(weight, height, age, gender);
    console.log(bmr);
    // TDEE
    const calculatedTDEE = calculateTDEE(bmr, exerciseFrequency);
    console.log(calculatedTDEE);
    // // 목표 칼로리
    const calculatedTarget = calculateTargetCalories(calculatedTDEE, goal);
    console.log(calculatedTarget);

    const calorieStats = {
      BMR: Math.round(bmr),
      TDEE: Math.round(calculatedTDEE),
      targetCalories: Math.round(calculatedTarget),
    };
    return <CalorieStats calorieStats={calorieStats} bodyData={currentData} />;
  }

  // useEffect(() => {
  //   if (!currentData) return;
  //   const MealsData = JSON.parse(localStorage.getItem("mealsHistory") || "[]");

  //   if (currentData) {
  //     const { weight, height, age, gender, exerciseFrequency, goal } =
  //       currentData;

  //     //BMR 계산
  //     const bmr = calculateBMR(weight, height, age, gender);
  //     // TDEE
  //     const calculatedTDEE = calculateTDEE(bmr, exerciseFrequency);
  //     // 목표 칼로리
  //     const calculatedTarget = calculateTargetCalories(calculatedTDEE, goal);

  //     setCalorieStats({
  //       BMR: Math.round(bmr),
  //       TDEE: Math.round(calculatedTDEE),
  //       targetCalories: Math.round(calculatedTarget),
  //     });

  //     const totalCalories = todayTotalCalories(MealsData);
  //     setTodayCalories(totalCalories);
  //   }
  // }, [navigate, currentData]);

  // return (
  //   <>
  //     {currentData && (
  //       <CalorieStats
  //         calorieStats={calorieStats}
  //         bodyData={currentData}
  //         todayCalories={todayCalories}
  //       />
  //     )}
  //   </>
  // );
}
