import { useMutation } from "@tanstack/react-query";
import { getKoreanDate } from "../../utils/formatDate";
import { updateMealsData } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// // 서빙사이즈 변경

export default function SelectedFoodList({
  selectedFood,
  onFoodDelete,
  calculateCalories,
  onServingSizeChange,
}) {
  const navigate = useNavigate();
  const totalCalories = selectedFood.reduce(
    (sum, food) => sum + calculateCalories(food),
    0
  );

  const { mutate, isPending } = useMutation({
    mutationFn: updateMealsData,
    onSuccess: () => {
      navigate("/");
    },
  });

  // console.log(selectedFood);
  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedFood || selectedFood.length === 0) {
      // 조건 수정
      // console.log("음식없음");
      return;
    }

    const mealsRecord = {
      id: Date.now(),
      date: getKoreanDate().toISOString(),
      mealItems: selectedFood,
      totalCalories: totalCalories,
      // mealType : "breakfast" // 예시로 아침으로 설정
    };
    mutate(mealsRecord);
    // const existingRecords = localStorage.getItem("mealsHistory");
    // const records = existingRecords ? JSON.parse(existingRecords) : [];
    // records.push(mealsRecord);
    // localStorage.setItem("mealsHistory", JSON.stringify(records));
  }
  // mb-4 p-2 h-[42px] flex justify-center bg-blue-500 rounded text-white
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-[42px] gap-2 mb-4">
        <p className="flex-grow text-lg font-semibold  bg-[#00BCD4] rounded text-white text-center flex items-center justify-center">
          총 칼로리: {totalCalories} kcal
        </p>
        {isPending && (
          <button
            type="submit"
            on
            className="px-4 py-1 w-40 bg-gray-500 text-white rounded"
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
            className="px-4 py-1 w-40 bg-[#00BCD4] text-white rounded font-bold transition-colors"
          >
            음식 저장
          </motion.button>
        )}
      </div>
      <div className="mb-4 h-[400px] overflow-y-auto border dark:bg-gray-900 dark:border-white rounded ">
        {/* <h3 className="font-bold mb-4">선택된 음식 목록</h3> */}
        {selectedFood.length === 0 ? (
          <p className="h-full flex items-center justify-center text-gray-500 dark:text-white text-center">
            선택된 음식이 없습니다.
          </p>
        ) : (
          <ul className="space-y-2">
            {selectedFood.map((food) => (
              <li
                key={food.id}
                className="flex items-center bg-white dark:bg-gray-800 p-3 rounded shadow-sm"
              >
                <div className="flex-grow">
                  <p className="font-medium dark:text-white">{food.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {food.currentServing}g 당 {calculateCalories(food)}
                    kcal
                  </p>
                </div>
                <div className="flex items-center gap-15">
                  <div>
                    <input
                      type="number"
                      value={food.currentServing}
                      className="dark:text-white border rounded w-24"
                      onChange={(event) =>
                        onServingSizeChange(food, event.target.value)
                      }
                    />
                    <label className="ml-2 dark:text-white">(g)</label>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 font-bold hover:text-red-700"
                    onClick={() => onFoodDelete(food.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
