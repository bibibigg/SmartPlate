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
// import { store } from "../store/index";

export default function HomePage() {
  // console.log(store.getState());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bodyData = useSelector((state) => state.bodyInfo.info);

  const [calorieStats, setCalorieStats] = useState({
    BMR: 0,
    TDEE: 0,
    targetCalories: 0,
  });

  // 데이터 로드를 위한 useEffect
  useEffect(() => {
    dispatch(fetchBodyData());
  }, [dispatch]); // dispatch만 의존성으로 설정
  const currentData = bodyData[bodyData.length - 1];

  // const [bodyData, setBodyData] = useState(null);
  const [todayCalories, setTodayCalories] = useState(0);
  // const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    console.log(bodyData);
    console.log(currentData);
    // const BodyData = JSON.parse(localStorage.getItem("bodyInfo"));
    const MealsData = JSON.parse(localStorage.getItem("mealsHistory") || "[]");
    if (!bodyData) {
      navigate("/bodyInfo");
    }

    // const bodyInfo = BodyData[BodyData.length - 1]; // 가장 최근 데이터 가져오기
    // setBodyData(bodyInfo); // bodyInfo 상태 설정
    // console.log(bodyInfo); // bodyInfo 확인용

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
