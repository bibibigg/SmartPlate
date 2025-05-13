export default function SearchForm({ searchTerm, onSearchChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="음식명 검색"
          value={searchTerm}
          onChange={onSearchChange}
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
  );
}
