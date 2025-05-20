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

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [calorieStats, setCalorieStats] = useState({
    BMR: 0,
    TDEE: 0,
    targetCalories: 0,
  });
  const [todayCalories, setTodayCalories] = useState(0);

  const bodyData = useSelector((state) => state.bodyInfo.info);
  const uiNotification = useSelector((state) => state.ui.notification) || "";
  const currentData = bodyData[bodyData.length - 1];

  useEffect(() => {
    dispatch(fetchBodyData());
  }, [dispatch]);

  useEffect(() => {
    if (uiNotification.status === "success" && bodyData.length === 0) {
      navigate("/bodyInfo");
    }
  }, [navigate, bodyData, uiNotification]);

  useEffect(() => {
    if (!currentData) return;
    const MealsData = JSON.parse(localStorage.getItem("mealsHistory") || "[]");

    if (currentData) {
      const { weight, height, age, gender, exerciseFrequency, goal } =
        currentData;

      //BMR 계산
      const bmr = calculateBMR(weight, height, age, gender);
      // TDEE
      const calculatedTDEE = calculateTDEE(bmr, exerciseFrequency);
      // 목표 칼로리
      const calculatedTarget = calculateTargetCalories(calculatedTDEE, goal);

      setCalorieStats({
        BMR: Math.round(bmr),
        TDEE: Math.round(calculatedTDEE),
        targetCalories: Math.round(calculatedTarget),
      });

      const totalCalories = todayTotalCalories(MealsData);
      setTodayCalories(totalCalories);
    }
  }, [navigate, currentData]);

  return (
    <>
      {currentData && (
        <CalorieStats
          calorieStats={calorieStats}
          bodyData={currentData}
          todayCalories={todayCalories}
        />
      )}
    </>
  );
}
