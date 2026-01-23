import { memo } from "react";
import { motion } from "framer-motion";
import { MdRestaurant } from "react-icons/md";
import Badge from "../UI/Badge";
import { calculateNutrients, getServingRatio } from "../../utils/nutrient";
import { BRAND_CLASSES } from "../../constants/colors";
import type { MealItem } from "../../types";

interface MealSummaryItemProps {
  item: MealItem;
  index?: number;
}

function MealSummaryItem({ item, index = 0 }: MealSummaryItemProps) {
  // 실제 섭취 칼로리 계산 (currentServing 기준)
  const ratio = getServingRatio(item);
  const actualCalories = Math.round(item.calories * ratio);

  // 영양소 계산
  const nutrients = calculateNutrients(item);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {/* 음식 아이콘 */}
      <div className={`flex-shrink-0 w-10 h-10 ${BRAND_CLASSES.bgPrimaryLight} ${BRAND_CLASSES.bgPrimaryLightDark} rounded-full flex items-center justify-center`}>
        <MdRestaurant className={BRAND_CLASSES.textPrimary} size={20} />
      </div>

      {/* 음식 정보 */}
      <div className="flex-grow min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">
          {item.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {item.currentServing}g
        </p>
      </div>

      {/* 영양소 배지 (0보다 큰 경우만 표시) */}
      <div className="hidden sm:flex items-center gap-1.5">
        {nutrients.carbs > 0 && (
          <Badge variant="carbs" size="sm">
            탄 {nutrients.carbs}g
          </Badge>
        )}
        {nutrients.protein > 0 && (
          <Badge variant="protein" size="sm">
            단 {nutrients.protein}g
          </Badge>
        )}
        {nutrients.fat > 0 && (
          <Badge variant="fat" size="sm">
            지 {nutrients.fat}g
          </Badge>
        )}
      </div>

      {/* 칼로리 */}
      <div className="flex-shrink-0 text-right">
        <p className={`font-bold ${BRAND_CLASSES.textPrimary}`}>
          {actualCalories}
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-0.5">
            kcal
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export default memo(MealSummaryItem);
