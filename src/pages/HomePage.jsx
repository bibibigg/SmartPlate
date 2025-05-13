import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
} from "../utils/calorieCalculator";
import { getKoreanDate } from "../utils/formatDate";

export default function HomePage() {
  const navigate = useNavigate();
  // const [meal, setMeal] = useState("");
  // const [meals, setMeals] = useState([]);

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

  //

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!meal.trim()) return;

  //   setMeals((prev) => [...prev, meal]);
  //   setMeal("");
  // };

  return (
    <>
      {/*기초대사량량 */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">기초 대사량 정보</h2>
        <p className="text-gray-700">
          하루 기초대사량:{" "}
          <span className="font-bold text-blue-600">{calorieStats.BMR}</span>{" "}
          kcal
        </p>
        <p className="text-sm text-gray-500 mt-1">
          기초대사량 식 = 10 * 체중 + 6.25 * 신장 - 5 * 나이 + 성별 보정
        </p>
      </div>

      {/* 총 일일 에너지 소비량 */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">총 일일 에너지 소비량</h2>
        <p className="text-gray-700">
          하루 총 에너지 소비량:{" "}
          <span className="font-bold text-blue-600">{calorieStats.TDEE}</span>{" "}
          kcal
        </p>
        <p className="text-sm text-gray-500 mt-1">
          TDEE = BMR * 운동 빈도 (1.2 ~ 1.9)
        </p>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">목표 섭취 칼로리</h2>
        <p className="text-gray-700">
          오늘의 목표 섭취 칼로리:{" "}
          <span className="font-bold text-blue-600">
            {calorieStats.targetCalories}
          </span>{" "}
          kcal
        </p>
        <p>
          오늘 섭취 칼로리:{" "}
          <span className="font-bold text-blue-600">{todayCalories}</span> kcal
        </p>
        <p className="text-sm text-gray-500 mt-1">
          나의 목표 :{" "}
          {bodyData &&
            (bodyData.goal === "maintain"
              ? "체중 유지"
              : bodyData.goal === "lose"
              ? "체중 감량"
              : "근육 증량")}
        </p>
      </div>

      {/* <h1 className="text-2xl font-bold mb-4">오늘의 식단 기록</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          placeholder="예: 아침 - 닭가슴살, 계란"
          className="border p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          추가
        </button>
      </form>

      <ul className="list-disc pl-6 space-y-1">
        {meals.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul> */}
    </>
  );
}
