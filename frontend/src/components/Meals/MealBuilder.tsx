import { useState } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SelectedFoodList from "./SelectedFoodList";
import { Food, SelectedFood, useMealStore } from "../../store/meals/mealSlice";
import { useToast } from "../../hooks/useToast";
import Toast from "../UI/Toast";

export default function MealBuilder() {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedFood = useMealStore((state) => state.selectedFood);
  const addSelectedFood = useMealStore((state) => state.addSelectedFood);
  const changeServingSize = useMealStore((state) => state.changeServingSize);
  const removeSelectedFood = useMealStore((state) => state.removeSelectedFood);
  const { toast, showToast, hideToast } = useToast();

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  // 리스트 클릭 시 선택된 음식 추가
  // 중복 체크 후 추가
  function handleFoodClick(food: Food) {
    if (selectedFood.some((item) => item.id === food.id)) {
      showToast("이미 선택된 음식입니다.", "warning");
      return;
    }
    addSelectedFood(food);
    showToast(`${food.name}이(가) 추가되었습니다.`, "success");
  }

  // 서빙사이즈 변경
  function handleServingChange(food: SelectedFood, newSize: number) {
    changeServingSize(food.id, newSize);
  }

  // 칼로리 계산
  function calculateCalories(food: SelectedFood): number {
    const baseGram = parseInt(food.servingSize || "100");
    const currentGram = parseInt(food.currentServing.toString());

    if (isNaN(baseGram) || baseGram <= 0) {
      return 0; // 기본 서빙 사이즈가 유효하지 않은 경우
    }

    if (isNaN(currentGram) || currentGram <= 0) {
      return 0; // 현재 서빙 사이즈가 유효하지 않은 경우
    }

    if (food.mainCategory === "직접입력") {
      const inputCalories = parseInt(food.calories.toString());
      const inputWeight = parseInt(food.totalWeight.toString());

      // 직접입력 데이터 유효성 검사
      if (isNaN(inputCalories) || inputCalories < 0) {
        return 0; // 칼로리 값이 유효하지 않은 경우
      }

      if (isNaN(inputWeight) || inputWeight <= 0) {
        return 0; // 중량 값이 유효하지 않은 경우 (division by zero 방지)
      }

      return Math.round((inputCalories * currentGram) / inputWeight);
    }

    const calculatedCalories = Math.round(
      (food.calories * currentGram) / baseGram
    );
    return calculatedCalories;
  }

  function handleDeleteFood(foodId: string) {
    removeSelectedFood(foodId);
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SearchForm onSearch={handleSearch} />
          <SearchResults
            searchTerm={searchTerm}
            onFoodSelect={handleFoodClick}
          />
        </div>

        <SelectedFoodList
          selectedFood={selectedFood}
          onFoodDelete={handleDeleteFood}
          calculateCalories={calculateCalories}
          onServingSizeChange={handleServingChange}
        />
      </div>
    </>
  );
}
