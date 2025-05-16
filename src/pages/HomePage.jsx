import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBodyData } from "../store/bodyInfo/bodyInfoActions";
import {
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
} from "../utils/calorieCalculator";
import { getKoreanDate } from "../utils/formatDate";
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

  // 데이터 로드를 위한 useEffect
  useEffect(() => {
    dispatch(fetchBodyData());
  }, [dispatch]);
  console.log(bodyData);
  const currentData = bodyData[bodyData.length - 1];

  useEffect(() => {
    const MealsData = JSON.parse(localStorage.getItem("mealsHistory") || "[]");
    if (!bodyData) {
      navigate("/bodyInfo");
    }

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

      // 오늘 날짜에 해당하는 식사 기록 가져오기
      const today = getKoreanDate().toISOString().split("T")[0];
      const mealsToday = MealsData.filter(
        (meal) => meal.date.split("T")[0] === today
      );
      const totalCalories = mealsToday.reduce(
        (sum, meal) => sum + meal.totalCalories,
        0
      );
      setTodayCalories(totalCalories);
    }
  }, [navigate, bodyData, dispatch, currentData]);

  return (
    <>
      <CalorieStats
        calorieStats={calorieStats}
        bodyData={currentData}
        todayCalories={todayCalories}
      />
    </>
  );
}
