import { getKoreanDate } from "../../utils/formatDate";

export default function SelectedFoodList({
  selectedFood,
  onFoodDelete,
  onServingSizeChange,
  calculateCalories,
}) {
  const totalCalories = selectedFood.reduce(
    (sum, food) => sum + calculateCalories(food),
    0
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const mealsRecord = {
      id: Date.now(),
      date: getKoreanDate().toISOString(),
      mealItems: selectedFood,
      totalCalories: totalCalories,
      // mealType : "breakfast" // 예시로 아침으로 설정
    };
    const existingRecords = localStorage.getItem("mealsHistory");
    const records = existingRecords ? JSON.parse(existingRecords) : [];
    records.push(mealsRecord);
    localStorage.setItem("mealsHistory", JSON.stringify(records));
  };
  // mb-4 p-2 h-[42px] flex justify-center bg-blue-500 rounded text-white
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-[42px] gap-2 mb-4">
        <p className="flex-grow text-lg font-semibold  bg-blue-500 rounded text-white text-center flex items-center justify-center">
          총 칼로리: {totalCalories} kcal
        </p>
        <button
          type="submit"
          className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
        >
          저장
        </button>
      </div>
      <div className="mb-4 h-[400px] overflow-y-auto border rounded ">
        {/* <h3 className="font-bold mb-4">선택된 음식 목록</h3> */}
        {selectedFood.length === 0 ? (
          <p className="h-full flex items-center justify-center text-gray-500-gray-500 text-center">
            선택된 음식이 없습니다.
          </p>
        ) : (
          <ul className="space-y-2">
            {selectedFood.map((food) => (
              <li
                key={food.id}
                className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
              >
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-500">
                    {food.currentServing}g 당{" "}
                    {isNaN(calculateCalories(food))
                      ? "0"
                      : calculateCalories(food)}
                    kcal
                  </p>
                </div>
                <input
                  type="number"
                  value={food.currentServing}
                  onChange={(event) =>
                    onServingSizeChange(food, event.target.value)
                  }
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onFoodDelete(food.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
