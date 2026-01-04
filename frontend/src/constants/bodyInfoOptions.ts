export const EXERCISE_OPTIONS = [
  { value: "1.2", label: "거의 활동 없음" },
  { value: "1.375", label: "가벼운 활동", desc: "주 1~2회" },
  { value: "1.55", label: "보통 활동", desc: "주 3~5회" },
  { value: "1.725", label: "매우 활동적", desc: "주 6~7회" },
] as const;

export const GOAL_OPTIONS = [
  { value: "maintain", label: "체중 유지", color: "green" },
  { value: "lose", label: "체중 감량", color: "orange" },
  { value: "gain", label: "근육 증량", color: "purple" },
] as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "남성", color: "blue" },
  { value: "female", label: "여성", color: "pink" },
] as const;
