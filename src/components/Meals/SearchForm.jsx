import { useRef } from "react";

export default function SearchForm({ onSearch }) {
  const searchRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchRef.current.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            ref={searchRef}
            placeholder="음식명 검색"
            className="border p-2 flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            검색
          </button>
        </div>
      </form>
      {/* {content} */}
    </>
  );
}
