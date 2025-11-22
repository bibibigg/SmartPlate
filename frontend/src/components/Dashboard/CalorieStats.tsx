interface CalorieStatsProps {
  calorieStats: {
    BMR: number;
    TDEE: number;
    targetCalories: number;
  };
  todayCalories: number;
  bodyData: {
    goal: "maintain" | "lose" | "gain";
  } | null;
}

type GoalType = "maintain" | "lose" | "gain";

export default function CalorieStats({
  calorieStats,
  todayCalories,
  bodyData,
}: CalorieStatsProps) {
  const goal: Record<GoalType, string> = {
    maintain: "체중 유지",
    lose: "체중 감량",
    gain: "근육 증량",
  };
  const mygoal = bodyData?.goal ? goal[bodyData.goal] : "정보없음";

  return (
    <>
      {/*기초대사량량 */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          기초 대사량 정보
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          하루 기초대사량:{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {calorieStats.BMR}
          </span>{" "}
          kcal
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          기초대사량 식 = 10 * 체중 + 6.25 * 신장 - 5 * 나이 + 성별 보정
        </p>
      </div>

      {/* 총 일일 에너지 소비량 */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          총 일일 에너지 소비량
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          하루 총 에너지 소비량:{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {calorieStats.TDEE}
          </span>{" "}
          kcal
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          TDEE = BMR * 운동 빈도 (1.2 ~ 1.9)
        </p>
      </div>

      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          목표 섭취 칼로리
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          오늘의 목표 섭취 칼로리:{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {calorieStats.targetCalories}
          </span>{" "}
          kcal
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          오늘 섭취 칼로리:{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {todayCalories}
          </span>{" "}
          kcal
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          나의 목표 : {mygoal}
        </p>
      </div>
    </>
  );
}
