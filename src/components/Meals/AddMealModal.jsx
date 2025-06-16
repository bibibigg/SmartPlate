import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { mealActions } from "../../store/meals/mealSlice";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddMealModal({ onDone }) {
  const [showNutrition, setShowNutrition] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = Math.random();
    const name = formData.get("name");
    const mainCategory = formData.get("mainCategory") || "직접입력";
    const subCategory = formData.get("subCategory") || "직접입력";
    const servingSize = "100";
    const calories = formData.get("calories");
    const water = formData.get("water") || 0;
    const protein = formData.get("protein") || 0;
    const fat = formData.get("fat") || 0;
    const carbohydrates = formData.get("carbohydrates") || 0;
    const sugar = formData.get("sugar") || 0;
    const fiber = formData.get("fiber") || 0;
    const calcium = formData.get("calcium") || 0;
    const iron = formData.get("iron") || 0;
    const phosphorus = formData.get("phosphorus") || 0;
    const potassium = formData.get("potassium") || 0;
    const sodium = formData.get("sodium") || 0;
    const vitaminA = formData.get("vitaminA") || 0;
    const niacin = formData.get("niacin") || 0;
    const vitaminC = formData.get("vitaminC") || 0;
    const vitaminD = formData.get("vitaminD") || 0;
    const cholesterol = formData.get("cholesterol") || 0;
    const saturatedFat = formData.get("saturatedFat") || 0;
    const brandName = formData.get("brandName") || "해당없음";
    const totalWeight = formData.get("totalWeight");
    const newFood = {
      id,
      name,
      mainCategory,
      subCategory,
      servingSize,
      calories,
      water,
      protein,
      fat,
      carbohydrates,
      sugar,
      fiber,
      calcium,
      iron,
      phosphorus,
      potassium,
      sodium,
      vitaminA,
      niacin,
      vitaminC,
      vitaminD,
      cholesterol,
      saturatedFat,
      brandName,
      totalWeight,
      currentServing: totalWeight,
    };
    // const test = formData.get('servingSize');
    // const MealData = Object.fromEntries(formData.entries());

    dispatch(mealActions.addSelectedFood(newFood));
    // console.log(MealData);
    onDone();
  }

  return (
    <Modal title="직접 음식 입력" onClose={onDone}>
      <form onSubmit={handleSubmit} className="p-6 ">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            음식 이름
          </label>
          <input
            type="text"
            name="name"
            placeholder="음식 이름을 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              중량 (g)
            </label>
            <input
              type="number"
              min="0"
              name="totalWeight"
              placeholder="중량 입력"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              칼로리 (kcal)
            </label>
            <input
              type="number"
              name="calories"
              min="0"
              placeholder="칼로리 입력"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowNutrition(!showNutrition)}
          className="w-full flex items-center justify-between mt-4 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-300 dark:border rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <span>영양소 정보 입력</span>
          <motion.svg
            animate={{ rotate: showNutrition ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </motion.svg>
        </button>
        <AnimatePresence>
          {showNutrition && (
            <>
              <motion.div
                variants={{
                  hidden: {
                    y: -20,
                    height: 0,
                    opacity: 0,
                  },
                  visible: {
                    y: 0,
                    height: "auto",
                    opacity: 1,
                  },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
                exit="hidden"
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700 ">
                    나트륨(mg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="sodium"
                    placeholder="나트륨 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    단백질(g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="protein"
                    placeholder="단백질 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    탄수화물(g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="carbohydrates"
                    placeholder="탄수화물 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    당(g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="sugar"
                    placeholder="당 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    지방(g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="fat"
                    placeholder="지방 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    포화지방(g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="saturatedFat"
                    placeholder="포화지방 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    콜레스테롤(mg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="cholesterol"
                    placeholder="콜레스테롤 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    비타민C(mg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="vitaminC"
                    placeholder="비타민C 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onDone}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[#00BCD4] rounded-md hover:bg-[#0097a7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            확인
          </button>
        </div>
      </form>
    </Modal>
  );
}
