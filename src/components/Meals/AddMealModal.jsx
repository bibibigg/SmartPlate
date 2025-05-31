import Modal from "../UI/Modal";

export default function AddMealModal({ onDone }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // const test = formData.get('servingSize');
    // const MealData = Object.fromEntries(formData.entries());

    console.log(MealData);
    onDone();
  }

  return (
    <Modal title="test" onClose={onDone}>
      <form onSubmit={handleSubmit} className="p-4">
        {/* <input type="text" name="name" placeholder="음식이름" />
        <input type="number" name="servingSize" placeholder="중량" />
        <input type="number" name="calories" placeholder="칼로리" /> */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">테스트 모달입니다</h3>
          <p className="text-gray-600">이것은 모달 테스트를 위한 내용입니다.</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onDone}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </form>
    </Modal>
  );
}
