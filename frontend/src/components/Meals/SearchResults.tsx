import { useQuery } from "@tanstack/react-query";
import { fetchData, HttpError } from "../../utils/http";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorBlock from "../UI/ErrorBlock";
import { memo, useCallback, useMemo } from "react";
import { Food } from "../../store/meals/mealSlice";
import { QUERY_KEYS } from "../../constants/queryKeys";

interface SearchResultsProps {
  onFoodSelect: (food: Food) => void;
  searchTerm: string;
}

// 리스트 아이템 컴포넌트를 분리하여 memo로 최적화
interface FoodItemProps {
  food: Food;
  onSelect: (food: Food) => void;
}

const FoodItem = memo(({ food, onSelect }: FoodItemProps) => {
  const handleClick = useCallback(() => {
    onSelect(food);
  }, [food, onSelect]);

  return (
    <li className="border-b py-2 dark:text-white">
      <div className="flex justify-between items-center">
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={handleClick}
        >
          {food.name}
        </span>
      </div>
    </li>
  );
});

FoodItem.displayName = "FoodItem";

function SearchResults({ onFoodSelect, searchTerm }: SearchResultsProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.FOOD_DATA(searchTerm),
    queryFn: ({ signal }) =>
      fetchData<Food[]>({ signal: signal, params: "meals", searchTerm }),
    enabled: searchTerm.trim().length > 0,
  });

  // onFoodSelect를 useCallback으로 메모이제이션
  const handleFoodSelect = useCallback((food: Food) => {
    onFoodSelect(food);
  }, [onFoodSelect]);

  // getContent를 useMemo로 최적화하여 불필요한 재계산 방지
  const content = useMemo(() => {
    if (!searchTerm) {
      return (
        <li className="h-full flex items-center justify-center text-gray-500 dark:text-white text-center ">
          검색어를 입력해주세요.
        </li>
      );
    }

    if (isPending) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return (
        <ErrorBlock
          title="에러!"
          message={error instanceof HttpError ? error.info.message : "fail to fetch"}
        />
      );
    }

    if (data) {
      if (data.length === 0) {
        return (
          <li className="h-full flex items-center justify-center text-gray-500 dark:text-white text-center ">
            검색 결과가 없습니다.
          </li>
        );
      }

      return data.map((food: Food) => (
        <FoodItem key={food.id} food={food} onSelect={handleFoodSelect} />
      ));
    }

    return null;
  }, [searchTerm, isPending, isError, error, data, handleFoodSelect]);

  return (
    <div className="mb-4 h-[400px] overflow-y-auto border dark:bg-gray-900 dark:border-white rounded flex">
      <ul className="w-full flex-1 ">{content}</ul>
    </div>
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(SearchResults);
