import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/http";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorBlock from "../UI/ErrorBlock";

export default function SearchResults({ onFoodSelect, searchTerm }) {
  let content = "";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foodData", { search: searchTerm }],
    queryFn: () => fetchData("meals", searchTerm),
    enabled: searchTerm.trim().length > 0,
  });

  if (!searchTerm) {
    content = (
      <li className="h-full flex items-center justify-center text-gray-500-gray-500 text-center ">
        검색어를 입력해주세요.
      </li>
    );
  } else if (isPending) {
    return (
      <div className="mb-4 h-[400px] overflow-y-auto border rounded flex">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="에러!"
        message={error.info?.message || "fail to fetch"}
      />
    );
  }
  if (data) {
    content =
      data.length === 0 ? (
        <li className="h-full flex items-center justify-center text-gray-500-gray-500 text-center ">
          검색 결과가 없습니다.
        </li>
      ) : (
        data.map((food) => (
          <li key={food.id} className="border-b py-2">
            <div className="flex justify-between items-center">
              <span
                className="cursor-pointer hover:text-blue-500"
                onClick={() => onFoodSelect(food)}
              >
                {food.name}
              </span>
            </div>
          </li>
        ))
      );
  }

  return (
    <div className="mb-4 h-[400px] overflow-y-auto border rounded flex">
      <ul className="w-full flex-1">{content}</ul>
    </div>
  );
}
