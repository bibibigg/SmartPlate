import { motion } from "framer-motion";
import { MdLocalFireDepartment, MdFitnessCenter, MdFlag } from "react-icons/md";
import CalorieProgressChart from "./CalorieProgressChart";
import NutrientBarChart from "./NutrientBarChart";

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
  const goalType = bodyData?.goal || "maintain";

  const remaining = calorieStats.targetCalories - todayCalories;
  const isOver = remaining < 0;

  return (
    <div className="space-y-6">
      {/* 메인 칼로리 달성률 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#00BCD4] to-[#0097A7] dark:from-[#0097A7] dark:to-[#00796B] rounded-2xl shadow-xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">오늘의 칼로리</h2>
            <p className="text-sm opacity-90">목표: {mygoal}</p>
          </div>
          <MdFlag size={40} className="opacity-80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <div className="space-y-3">
              <div>
                <p className="text-sm opacity-80">섭취 칼로리</p>
                <p className="text-4xl font-bold">{todayCalories}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">목표 칼로리</p>
                <p className="text-2xl font-semibold">{calorieStats.targetCalories}</p>
              </div>
              <div className={`mt-4 px-4 py-2 rounded-lg ${isOver ? 'bg-red-500/30' : 'bg-green-500/30'}`}>
                <p className="text-sm font-semibold">
                  {isOver
                    ? `⚠️ 목표 초과 ${Math.abs(remaining)} kcal`
                    : `✅ 남은 칼로리 ${remaining} kcal`
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <CalorieProgressChart
              current={todayCalories}
              target={calorieStats.targetCalories}
              goal={goalType}
            />
          </div>
        </div>
      </motion.div>

      {/* 차트 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <MdFitnessCenter className="text-[#00BCD4]" />
          칼로리 비교
        </h2>
        <NutrientBarChart
          bmr={calorieStats.BMR}
          tdee={calorieStats.TDEE}
          target={calorieStats.targetCalories}
        />
      </motion.div>

      {/* 상세 정보 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-blue-500"
        >
          <div className="flex items-center gap-3 mb-2">
            <MdLocalFireDepartment size={28} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              기초 대사량 (BMR)
            </h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {calorieStats.BMR}
            <span className="text-lg font-normal text-gray-500 ml-1">kcal</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            기본적으로 소모되는 에너지
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-purple-500"
        >
          <div className="flex items-center gap-3 mb-2">
            <MdFitnessCenter size={28} className="text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              총 소비량 (TDEE)
            </h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {calorieStats.TDEE}
            <span className="text-lg font-normal text-gray-500 ml-1">kcal</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            활동량 포함 하루 소모 에너지
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-[#00BCD4]"
        >
          <div className="flex items-center gap-3 mb-2">
            <MdFlag size={28} className="text-[#00BCD4]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              목표 칼로리
            </h3>
          </div>
          <p className="text-3xl font-bold text-[#00BCD4]">
            {calorieStats.targetCalories}
            <span className="text-lg font-normal text-gray-500 ml-1">kcal</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {mygoal} 기준
          </p>
        </motion.div>
      </div>
    </div>
  );
}
