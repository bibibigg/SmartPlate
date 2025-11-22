import { useRef } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/UI/uiSlice";
import { motion } from "framer-motion";
import React from "react";
import { AppDispatch } from "../../store";

interface SearchFormProps {
  onSearch: (term: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  function handleShow() {
    dispatch(uiActions.openModal());
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchRef.current) {
      onSearch(searchRef.current.value);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            ref={searchRef}
            placeholder="음식명 검색"
            className="border p-2 flex-grow dark:border-white dark:text-white"
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
    </>
  );
}
