import { memo, ReactNode } from "react";
import {
  getNutrientClasses,
  type NutrientType,
} from "../../constants/nutrientColors";

type BaseBadgeVariant = "success" | "warning" | "error" | "info" | "neutral";
type BadgeVariant = BaseBadgeVariant | NutrientType;
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: ReactNode;
}

const baseVariantStyles: Record<BaseBadgeVariant, string> = {
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  neutral: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

// 영양소 타입인지 확인
const isNutrientType = (variant: BadgeVariant): variant is NutrientType => {
  return ["carbs", "protein", "fat"].includes(variant);
};

// variant에 따른 스타일 반환
const getVariantStyle = (variant: BadgeVariant): string => {
  if (isNutrientType(variant)) {
    return getNutrientClasses(variant).badgeClass;
  }
  return baseVariantStyles[variant];
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  icon,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${getVariantStyle(variant)} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export default memo(Badge);
