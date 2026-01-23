/** 브랜드 메인 색상 */
export const BRAND_COLORS = {
  primary: "#00BCD4",
  primaryHover: "#0097A7",
  primaryDark: "#00796B",
} as const;

/** Tailwind 클래스용 브랜드 색상 */
export const BRAND_CLASSES = {
  // 배경색
  bgPrimary: "bg-[#00BCD4]",
  bgPrimaryHover: "hover:bg-[#0097A7]",
  bgPrimaryLight: "bg-[#00BCD4]/10",
  bgPrimaryLightDark: "dark:bg-[#00BCD4]/20",
  // 텍스트색
  textPrimary: "text-[#00BCD4]",
  // 그라데이션
  gradientPrimary: "bg-gradient-to-br from-[#00BCD4] to-[#0097A7]",
  gradientPrimaryDark: "dark:from-[#0097A7] dark:to-[#00796B]",
} as const;
