import { useMutation } from "@tanstack/react-query";
import { getKoreanDate } from "../../utils/formatDate";
import { updateMealsData } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { MdDelete } from "react-icons/md";
import { SelectedFood } from "../../store/meals/mealSlice";
import { useToast } from "../../hooks/useToast";
import Toast from "../UI/Toast";

interface SelectedFoodListProps {
  selectedFood: SelectedFood[];
  onFoodDelete: (foodId: string) => void;
  calculateCalories: (food: SelectedFood) => number;
  onServingSizeChange: (food: SelectedFood, newServingSize: number) => void;
}

export default function SelectedFoodList({
  selectedFood,
  onFoodDelete,
  calculateCalories,
  onServingSizeChange,
}: SelectedFoodListProps) {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const totalCalories = selectedFood.reduce(
    (sum, food) => sum + calculateCalories(food),
    0
  );

  const { mutate, isPending } = useMutation({
    mutationFn: updateMealsData,
    onSuccess: () => {
      showToast("식사 기록이 성공적으로 저장되었습니다!", "success");
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      console.error("식사 기록 저장 실패:", error);
      showToast("식사 기록 저장에 실패했습니다. 다시 시도해주세요.", "error");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedFood || selectedFood.length === 0) {
      return;
    }

    const mealsRecord = {
      id: Date.now(),
      date: getKoreanDate().toISOString(),
      mealItems: selectedFood,
      totalCalories: totalCalories,
    };
    mutate(mealsRecord);
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <p className="flex-grow text-base sm:text-lg font-semibold bg-[#00BCD4] rounded text-white text-center flex items-center justify-center h-12 sm:h-[42px] px-4">
          총 칼로리: {totalCalories} kcal
        </p>
        {isPending && (
          <button
            type="submit"
            disabled
            className="px-4 py-2 sm:py-1 w-full sm:w-40 h-12 sm:h-auto bg-gray-500 text-white rounded font-semibold"
          >
            제출 중...
          </button>
        )}
        {!isPending && (
          <motion.button
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(45deg, #FF9800, #F44336)",
              transition: { type: "spring", stiffness: 400 },
            }}
            whileTap={{
              scale: 1.2,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 20,
              },
            }}
            type="submit"
            className="px-4 py-2 sm:py-1 w-full sm:w-40 h-12 sm:h-auto bg-[#00BCD4] text-white rounded font-bold transition-colors"
          >
            음식 저장
          </motion.button>
        )}
      </div>
      <div className="mb-4 h-[300px] sm:h-[400px] overflow-y-auto border dark:bg-gray-900 dark:border-white rounded">
        {selectedFood.length === 0 ? (
          <p className="h-full flex items-center justify-center text-gray-500 dark:text-white text-center">
            선택된 음식이 없습니다.
          </p>
        ) : (
          <ul className="space-y-2 p-2">
            {selectedFood.map((food) => (
              <motion.li
                key={food.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-[#00BCD4] dark:hover:border-[#00BCD4]"
              >
                <div className="flex-grow">
                  <p className="font-semibold text-base dark:text-white">{food.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                    {food.currentServing}g 당 {calculateCalories(food)}
                    kcal
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-end">
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      step="1"
                      value={food.currentServing}
                      className="dark:text-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded w-20 sm:w-24 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (value >= 1 && value <= 10000) {
                          onServingSizeChange(food, value);
                        }
                      }}
                      aria-label={`${food.name} 섭취량 (그램)`}
                    />
                    <label className="ml-1.5 sm:ml-2 dark:text-white text-sm">(g)</label>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-sm text-red-500 font-semibold hover:text-white hover:bg-red-500 rounded transition-all duration-200 border border-red-500 whitespace-nowrap"
                    onClick={() => onFoodDelete(food.id)}
                    aria-label={`${food.name} 삭제`}
                  >
                    <MdDelete size={18} />
                    <span className="hidden sm:inline">삭제</span>
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </form>
    </>
  );
}
