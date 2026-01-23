import { memo, useMemo } from "react";
import { FaBreadSlice, FaDrumstickBite } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import NutrientStat from "../UI/NutrientStat";
import { calculateTotalNutrients } from "../../utils/nutrient";
import { getNutrientClasses } from "../../constants/nutrientColors";
import type { MealItem } from "../../types";

interface NutrientSummaryProps {
  items: MealItem[];
}

function NutrientSummary({ items }: NutrientSummaryProps) {
  // 총 영양소 계산
  const totals = useMemo(() => calculateTotalNutrients(items), [items]);

  return (
    <div className="grid grid-cols-3 gap-3">
      <NutrientStat
        type="carbs"
        value={totals.carbs}
        icon={
          <FaBreadSlice
            className={getNutrientClasses("carbs").iconColor}
            size={18}
          />
        }
      />
      <NutrientStat
        type="protein"
        value={totals.protein}
        icon={
          <FaDrumstickBite
            className={getNutrientClasses("protein").iconColor}
            size={18}
          />
        }
      />
      <NutrientStat
        type="fat"
        value={totals.fat}
        icon={
          <IoWater
            className={getNutrientClasses("fat").iconColor}
            size={18}
          />
        }
      />
    </div>
  );
}

export default memo(NutrientSummary);
