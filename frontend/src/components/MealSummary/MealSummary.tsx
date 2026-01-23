import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdAdd, MdRestaurantMenu } from "react-icons/md";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import MealSummaryList from "./MealSummaryList";
import NutrientSummary from "./NutrientSummary";
import type { MealRecord } from "../../types";
import { getKoreanDate } from "../../utils/formatDate";
import { BRAND_CLASSES } from "../../constants/colors";

interface MealSummaryProps {
  mealRecords: MealRecord[];
}

function MealSummary({ mealRecords }: MealSummaryProps) {
  const navigate = useNavigate();

  // 오늘 날짜의 식사 기록 및 음식 아이템 추출
  const { todayMeals, todayFoodItems } = useMemo(() => {
    const today = getKoreanDate().toISOString().split("T")[0];
    const meals = mealRecords.filter(
      (record) => record.date.split("T")[0] === today
    );
    return {
      todayMeals: meals,
      todayFoodItems: meals.flatMap((record) => record.mealItems),
    };
  }, [mealRecords]);

  // 식사 횟수
  const mealCount = todayMeals.length;

  // 기록하기 버튼 핸들러
  const handleAddMeal = () => {
    navigate("/record");
  };

  // TODO: 전체 기록 보기 페이지(/meals) 구현 후 navigate로 변경
  const handleViewMeals = () => {
    alert("전체 기록 보기 기능은 구현 중입니다.");
  };

  return (
    <Card variant="default" className="p-5" delay={0.2}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MdRestaurantMenu className={BRAND_CLASSES.textPrimary} size={24} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            오늘의 식사
          </h3>
          {mealCount > 0 && (
            <Badge variant="info" size="sm">
              {mealCount}끼
            </Badge>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddMeal}
          className={`flex items-center gap-1 px-3 py-1.5 ${BRAND_CLASSES.bgPrimary} text-white text-sm font-medium rounded-lg ${BRAND_CLASSES.bgPrimaryHover} transition-colors`}
          aria-label="식사 기록하기"
        >
          <MdAdd size={18} />
          <span className="hidden sm:inline">기록하기</span>
        </motion.button>
      </div>

      {/* 영양소 통계 */}
      <div className="mb-4">
        <NutrientSummary items={todayFoodItems} />
      </div>

      {/* 식사 목록 */}
      <MealSummaryList
        items={todayFoodItems}
        maxItems={4}
        emptyMessage="아직 기록된 식사가 없어요. 첫 식사를 기록해보세요!"
      />

      {/* 전체 보기 링크 (식사가 있는 경우만) */}
      {todayFoodItems.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleViewMeals}
          className={`w-full mt-4 py-2 text-sm ${BRAND_CLASSES.textPrimary} font-medium hover:bg-[#00BCD4]/5 rounded-lg transition-colors`}
        >
          전체 기록 보기
        </motion.button>
      )}
    </Card>
  );
}

export default memo(MealSummary);
