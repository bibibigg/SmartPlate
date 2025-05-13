export default function SearchResults({ filteredResults, onFoodSelect }) {
  return (
    <div className="mb-4 h-[400px] overflow-y-auto border rounded flex">
      <ul className="w-full flex-1">
        {filteredResults.length === 0 && (
          <li className="h-full flex items-center justify-center text-gray-500-gray-500 text-center ">
            검색 결과가 없습니다.
          </li>
        )}
        {filteredResults.map((food) => (
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
        ))}
      </ul>
    </div>
  );
}
