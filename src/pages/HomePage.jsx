import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
} from "../utils/calorieCalculator";
import { getKoreanDate } from "../utils/formatDate";
import CalorieStats from "../components/Dashboard/CalorieStats";

export default function HomePage() {
  const navigate = useNavigate();

  const [calorieStats, setCalorieStats] = useState({
    BMR: 0,
    TDEE: 0,
    targetCalories: 0,
  });

  const [bodyData, setBodyData] = useState(null);
  const [todayCalories, setTodayCalories] = useState(0);
  // const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    const BodyData = JSON.parse(localStorage.getItem("bodyInfo"));
    const MealsData = JSON.parse(localStorage.getItem("mealsHistory") || "[]");
    if (!BodyData) {
      navigate("/bodyInfo");
    }
    const bodyInfo = BodyData[BodyData.length - 1]; // 가장 최근 데이터 가져오기
    setBodyData(bodyInfo); // bodyInfo 상태 설정
    console.log(bodyInfo); // bodyInfo 확인용

    if (bodyInfo) {
      const { weight, height, age, gender, exerciseFrequency, goal } = bodyInfo;

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
  }, [navigate]);

  return (
    <>
      <CalorieStats
        calorieStats={calorieStats}
        bodyData={bodyData}
        todayCalories={todayCalories}
      />
    </>
  );
}
