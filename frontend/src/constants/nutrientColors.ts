/** 영양소 타입 */
export type NutrientType = "carbs" | "protein" | "fat";

/** 영양소별 색상 설정 */
export const NUTRIENT_COLORS: Record<
  NutrientType,
  {
    label: string;
    text: string;
    textDark: string;
    bg: string;
    bgDark: string;
    icon: string;
  }
> = {
  carbs: {
    label: "탄수화물",
    text: "text-purple-600",
    textDark: "dark:text-purple-400",
    bg: "bg-purple-100",
    bgDark: "dark:bg-purple-900/30",
    icon: "text-purple-500",
  },
  protein: {
    label: "단백질",
    text: "text-rose-600",
    textDark: "dark:text-rose-400",
    bg: "bg-rose-100",
    bgDark: "dark:bg-rose-900/30",
    icon: "text-rose-500",
  },
  fat: {
    label: "지방",
    text: "text-yellow-600",
    textDark: "dark:text-yellow-400",
    bg: "bg-yellow-100",
    bgDark: "dark:bg-yellow-900/30",
    icon: "text-yellow-500",
  },
};

/** Tailwind 클래스 조합 헬퍼 */
export function getNutrientClasses(type: NutrientType) {
  const color = NUTRIENT_COLORS[type];
  return {
    label: color.label,
    textColor: `${color.text} ${color.textDark}`,
    bgColor: `${color.bg} ${color.bgDark}`,
    iconColor: color.icon,
    // Badge용 전체 클래스
    badgeClass: `${color.bg} ${color.text.replace("600", "800")} ${color.bgDark} ${color.textDark}`,
  };
}
