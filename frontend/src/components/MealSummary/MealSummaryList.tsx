import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import MealSummaryItem from "./MealSummaryItem";
import type { MealItem } from "../../types";

interface MealSummaryListProps {
  items: MealItem[];
  maxItems?: number;
  emptyMessage?: string;
}

function MealSummaryList({
  items,
  maxItems = 5,
  emptyMessage = "오늘 기록된 식사가 없습니다.",
}: MealSummaryListProps) {
  const displayItems = items.slice(0, maxItems);
  const remainingCount = items.length - maxItems;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {displayItems.map((item, index) => (
          <MealSummaryItem key={item.id} item={item} index={index} />
        ))}
      </AnimatePresence>

      {remainingCount > 0 && (
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
          +{remainingCount}개 더 있음
        </p>
      )}
    </div>
  );
}

export default memo(MealSummaryList);
