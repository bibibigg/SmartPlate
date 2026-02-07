/**
 * Hero 섹션 배경 그라데이션
 * 깔끔하고 정적인 배경 (가독성 우선)
 */
export default function AnimatedGradient() {
  return (
    <div className="absolute inset-0 z-0">
      {/* 메인 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

      {/* 정적 강조 원형 - 좌측 상단 */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00BCD4]/10 dark:bg-[#00BCD4]/5 rounded-full blur-3xl" />

      {/* 정적 강조 원형 - 우측 하단 */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#0097A7]/10 dark:bg-[#0097A7]/5 rounded-full blur-3xl" />
    </div>
  );
}
