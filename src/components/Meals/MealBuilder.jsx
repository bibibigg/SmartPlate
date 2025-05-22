import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SelectedFoodList from "./SelectedFoodList";
import { mealActions } from "../../store/meals/mealSlice";
import { useSelector, useDispatch } from "react-redux";

export default function MealBuilder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState([]);
  // const { selectedFood } = useSelector((state) => state.meal);
  const dispatch = useDispatch();

  function handleSearch(term) {
    setSearchTerm(term);
  }

  //리스트 클릭 시 선택된 음식 추가
  // 중복 체크 후 추가
  function handleFoodClick(food) {
    if (selectedFood.some((item) => item.id === food.id)) {
      alert("이미 선택된 음식입니다.");
      return;
    }
    const foodWithCurrentServing = {
      ...food,
      currentServing: food.totalWeight,
    };
    setSelectedFood([...selectedFood, foodWithCurrentServing]);
    console.log(selectedFood);
  }

  // // 서빙사이즈 변경
  function handleServingChange(food, newSize) {
    dispatch(mealActions.ChangeServingSize({ id: food.id, newSize }));
  }
  // 칼로리 계산
  function calculateCalories(food) {
    const baseGram = parseInt(food.servingSize);
    const currentGram = parseInt(food.currentServing);
    if (isNaN(currentGram) || currentGram <= 0) {
      return 0; // 기본 서빙 사이즈가 유효하지 않은 경우
    }

    const calculatedCalories = Math.round(
      (food.calories * currentGram) / baseGram
    );
    return calculatedCalories;
  }

  function handleDeleteFood(foodId) {
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
