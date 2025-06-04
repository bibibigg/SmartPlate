import { useRef } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/UI/uiSlice";
import { motion } from "framer-motion";

export default function SearchForm({ onSearch }) {
  const searchRef = useRef();
  const dispatch = useDispatch();

  function handleShow() {
    dispatch(uiActions.openModal());
  }

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
            className="bg-[#00BCD4] text-white px-4 py-2 rounded"
          >
            검색
          </button>
          <motion.button
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(45deg, #FF9800, #F44336)",
              transition: { type: "spring", stiffness: 400 },
            }}
            type="button"
            onClick={handleShow}
            className="bg-[#00BCD4] text-white px-4 py-2 rounded font-bold"
          >
            +
          </motion.button>
        </div>
      </form>
      {/* {content} */}
    </>
  );
}
