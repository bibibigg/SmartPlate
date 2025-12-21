import { useDispatch, useSelector } from "react-redux";
import MealBuilder from "../components/Meals/MealBuilder";
import AddMealModal from "../components/Meals/AddMealModal";
import { uiActions } from "../store/UI/uiSlice";
import { AnimatePresence } from "framer-motion";
import { RootState, AppDispatch } from "../store";

export default function MealsRecordPage() {
  const { isShowModal } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch<AppDispatch>();

  function handleDone() {
    dispatch(uiActions.closeModal());
  }

  return (
    <>
      <AnimatePresence>
        {isShowModal && <AddMealModal onDone={handleDone} />}
      </AnimatePresence>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4 dark:text-white">
          내 식단 템플릿
        </h1>
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-300 mb-4">
          추가하려는 음식이 없을경우 + 버튼을 눌러주세요
        </h2>
        <MealBuilder />
      </div>
    </>
  );
}
