import { useState } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SelectedFoodList from "./SelectedFoodList";
import { useSelector, useDispatch } from "react-redux";
import { mealActions } from "../../store/meals/mealSlice";
import { RootState, AppDispatch } from "../../store";
import { Food, SelectedFood } from "../../store/meals/mealSlice";

export default function MealBuilder() {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedFood } = useSelector((state: RootState) => state.meal);
  const dispatch = useDispatch<AppDispatch>();

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  // 리스트 클릭 시 선택된 음식 추가
  // 중복 체크 후 추가
  function handleFoodClick(food: Food) {
    if (selectedFood.some((item) => item.id === food.id)) {
      alert("이미 선택된 음식입니다.");
      return;
    }
    dispatch(mealActions.addSelectedFood(food));
  }

  // 서빙사이즈 변경
  function handleServingChange(food: SelectedFood, newSize: number) {
    dispatch(mealActions.ChangeServingSize({ id: food.id, newSize }));
  }

  // 칼로리 계산
  function calculateCalories(food: SelectedFood): number {
    const baseGram = parseInt(food.servingSize || "100");
    const currentGram = parseInt(food.currentServing.toString());
    if (isNaN(currentGram) || currentGram <= 0) {
      return 0; // 기본 서빙 사이즈가 유효하지 않은 경우
    }

    if (food.mainCategory === "직접입력") {
      const inputCalories = parseInt(food.calories.toString());
      const inputWeight = parseInt(food.totalWeight.toString());
      return Math.round((inputCalories * currentGram) / inputWeight);
    }

    const calculatedCalories = Math.round(
      (food.calories * currentGram) / baseGram
    );
    return calculatedCalories;
  }

  function handleDeleteFood(foodId: string) {
    dispatch(mealActions.removeSelectedFood(foodId));
  }

  return (
    <>
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
