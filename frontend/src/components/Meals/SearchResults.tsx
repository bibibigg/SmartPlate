import { useQuery } from "@tanstack/react-query";
import { fetchData, HttpError } from "../../utils/http";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorBlock from "../UI/ErrorBlock";
import React from "react";
import { Food } from "../../store/meals/mealSlice";

interface SearchResultsProps {
  onFoodSelect: (food: Food) => void;
  searchTerm: string;
}

export default function SearchResults({ onFoodSelect, searchTerm }: SearchResultsProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foodData", { search: searchTerm }],
    queryFn: ({ signal }) =>
      fetchData<Food[]>({ signal: signal, params: "meals", searchTerm }),
    enabled: searchTerm.trim().length > 0,
  });

  const getContent = (): React.ReactNode => {
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
        <li key={food.id} className="border-b py-2 dark:text-white">
          <div className="flex justify-between items-center">
            <span
              className="cursor-pointer hover:text-blue-500"
              onClick={() => onFoodSelect(food)}
            >
              {food.name}
            </span>
          </div>
        </li>
      ));
    }

    return null;
  };

  return (
    <div className="mb-4 h-[400px] overflow-y-auto border dark:bg-gray-900 dark:border-white rounded flex">
      <ul className="w-full flex-1 ">{getContent()}</ul>
    </div>
  );
}
