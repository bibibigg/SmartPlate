import { useState, useEffect } from "react";
import { fetchFoodData } from "../utils/fetch";
import SearchForm from "./Meals/SearchForm";
import SearchResults from "./Meals/SearchResults";
import SelectedFoodList from "./Meals/SelectedFoodList";

export default function FoodSearch() {
  const [foodData, setFoodData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodData();
      setFoodData(data);
    }
    loadData();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const results = foodData.filter((food) =>
      food.name.includes(searchTerm.trim())
    );
    setFilteredResults(results);
  }

  //리스트 클릭 시 선택된 음식 추가
  // 중복 체크 후 추가
  function handleFoodClick(food) {
    const isDuplicate = selectedFood.some((item) => item.id === food.id);
    if (isDuplicate) {
      alert("이미 선택된 음식입니다.");
      return;
    }
    // 중복이 아닐 경우 선택된 음식추가 및 서빙사이즈 설정 초기값은 totalWeight
    const foodWithCurrentServing = {
      ...food,
      currentServing: food.totalWeight,
    };

    setSelectedFood((prev) => [...prev, foodWithCurrentServing]);
    console.log("Selected food:", foodWithCurrentServing);
    // setSelectedFood((prev) => [...prev, food]);
  }

  // // 서빙사이즈 변경
  function handleServingChange(food, newSize) {
    setSelectedFood((prev) =>
      prev.map((item) =>
        item.id === food.id ? { ...item, currentServing: newSize } : item
      )
    );
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
    // 선택된 음식에서 삭제
    setSelectedFood((prev) => prev.filter((item) => item.id !== foodId));
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SearchForm
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onSubmit={handleSubmit}
          />

          <SearchResults
            filteredResults={filteredResults}
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
