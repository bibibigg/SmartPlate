import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MealBuilder from "../components/Meals/MealBuilder";
import AddMealModal from "../components/Meals/AddMealModal";
import ImageAnalysisModal from "../components/Meals/ImageAnalysisModal";
import { uiActions } from "../store/UI/uiSlice";
import { mealActions } from "../store/meals/mealSlice";
import { AnimatePresence } from "framer-motion";
import { RootState, AppDispatch } from "../store";
import { FiCamera } from "react-icons/fi";
import { AnalyzedFood } from "../utils/http";

export default function MealsRecordPage() {
  const { isShowModal } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch<AppDispatch>();
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);

  function handleDone() {
    dispatch(uiActions.closeModal());
  }

  function handleOpenImageAnalysis() {
    setShowImageAnalysis(true);
  }

  function handleCloseImageAnalysis() {
    setShowImageAnalysis(false);
  }

  function handleImageAnalysisConfirm(foods: AnalyzedFood[]) {
    // AI 분석 결과를 selectedFood에 추가
    foods.forEach((food) => {
      const newFood = {
        id: Math.random().toString(),
        name: food.name,
        mainCategory: "AI분석",
        subCategory: "AI분석",
        servingSize: "100",
        calories: food.calories,
        totalWeight: food.weight,
        protein: food.protein,
        carbohydrates: food.carbohydrates,
        fat: food.fat,
        currentServing: food.weight,
      };
      dispatch(mealActions.addSelectedFood(newFood));
    });
  }

  return (
    <>
      <AnimatePresence>
        {isShowModal && <AddMealModal onDone={handleDone} />}
        {showImageAnalysis && (
          <ImageAnalysisModal
            onClose={handleCloseImageAnalysis}
            onConfirm={handleImageAnalysisConfirm}
          />
        )}
      </AnimatePresence>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold dark:text-white">내 식단 템플릿</h1>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-300 mt-1">
              추가하려는 음식이 없을경우 + 버튼을 눌러주세요
            </h2>
          </div>
          <button
            onClick={handleOpenImageAnalysis}
            className="px-4 py-2 bg-gradient-to-r from-[#00BCD4] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00838F] text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FiCamera className="w-5 h-5" />
            <span>AI 이미지 분석</span>
          </button>
        </div>
        <MealBuilder />
      </div>
    </>
  );
}
