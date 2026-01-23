import { memo, ReactNode } from "react";
import {
  getNutrientClasses,
  type NutrientType,
} from "../../constants/nutrientColors";

interface NutrientStatProps {
  type: NutrientType;
  value: number;
  unit?: string;
  icon?: ReactNode;
  className?: string;
}

function NutrientStat({
  type,
  value,
  unit = "g",
  icon,
  className = "",
}: NutrientStatProps) {
  const { label, textColor, bgColor } = getNutrientClasses(type);

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-xl ${bgColor} ${className}`}
    >
      {icon && <span className="mb-1">{icon}</span>}
      <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </span>
      <span className={`text-lg font-bold ${textColor}`}>
        {value}
        <span className="text-xs font-normal ml-0.5">{unit}</span>
      </span>
    </div>
  );
}

export default memo(NutrientStat);
