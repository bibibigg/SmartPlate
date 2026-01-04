import { EXERCISE_OPTIONS, GOAL_OPTIONS } from "../../constants/bodyInfoOptions";
import { BodyInfo } from "../../types";

interface ActivityGoalSectionProps {
  selectedGoal: "maintain" | "lose" | "gain";
  onGoalChange: (goal: "maintain" | "lose" | "gain") => void;
  bodyData?: BodyInfo | null;
}

export default function ActivityGoalSection({
  selectedGoal,
  onGoalChange,
  bodyData,
}: ActivityGoalSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
        활동 & 목표
      </h3>

      {/* 운동 빈도 */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          운동 빈도
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {EXERCISE_OPTIONS.map((option) => (
            <label key={option.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="exerciseFrequency"
                value={option.value}
                defaultChecked={bodyData?.exerciseFrequency === Number(option.value)}
                className="peer sr-only"
                required
              />
              <div
                className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600
                          peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/30
                          hover:border-green-300 transition-all text-center min-h-[56px] sm:min-h-[60px] flex flex-col justify-center items-center"
              >
                <div className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 peer-checked:text-green-700 dark:peer-checked:text-green-400 leading-tight">
                  {option.label}
                </div>
                {'desc' in option && (
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    {option.desc}
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 목표 */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          목표
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {GOAL_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onGoalChange(value)}
              className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all ${
                selectedGoal === value
                  ? value === "maintain"
                    ? "bg-green-500 text-white shadow-lg scale-105"
                    : value === "lose"
                    ? "bg-orange-500 text-white shadow-lg scale-105"
                    : "bg-purple-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
