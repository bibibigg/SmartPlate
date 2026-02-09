import { useMemo, memo, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useUIStore } from "../../store/UI/uiSlice";
import { useCountUp } from "../../hooks/useCountUp";
import { useInView } from "framer-motion";

interface CalorieProgressChartProps {
  current: number;
  target: number;
  goal: "maintain" | "lose" | "gain";
  enableCountUp?: boolean; // 랜딩페이지용 count-up 애니메이션
}

function CalorieProgressChart({
  current,
  target,
  goal,
  enableCountUp = false,
}: CalorieProgressChartProps) {
  const isDark = useUIStore((state) => state.isDark);
  const percentage =
    target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const isOver = current > target;

  // Viewport 진입 감지 (도넛 차트 애니메이션용)
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.3 });

  // Count-up 애니메이션 (랜딩페이지용)
  const percentageRef = useCountUp(percentage, {
    duration: 1.5,
    delay: 0.3,
    enabled: enableCountUp,
  });

  // 목표에 따른 색상 (useMemo로 최적화)
  const colors = useMemo(() => {
    if (isOver && goal === "lose") return { main: "#ef4444", light: "#fca5a5" };
    if (!isOver && goal === "lose")
      return { main: "#22c55e", light: "#86efac" };
    if (isOver && goal === "gain") return { main: "#22c55e", light: "#86efac" };
    return { main: "#22c55e", light: "#86efac" };
  }, [isOver, goal]);

  // 배경 도넛 (고정, 애니메이션 없음)
  const backgroundData = useMemo(() => {
    return {
      labels: ["전체"],
      datasets: [
        {
          data: [target],
          backgroundColor: [isDark ? "#374151" : "#ffffff"],
          borderColor: [isDark ? "#4b5563" : "#e5e7eb"],
          borderWidth: 2,
          cutout: "75%",
        },
      ],
    };
  }, [target, isDark]);

  // 전경 도넛 (애니메이션)
  const foregroundData = useMemo(() => {
    // 애니메이션 활성화 시 viewport 진입 전에는 0 표시
    const animatedCurrent = enableCountUp && !isInView ? 0 : current;

    // 목표 초과 시에도 차트가 제대로 표시
    const consumed = Math.min(animatedCurrent, target);
    const remaining = Math.max(0, target - animatedCurrent);

    // 0%일 때 border가 보이지 않도록 설정
    const isZero = consumed === 0;

    return {
      labels: ["섭취", "남음"],
      datasets: [
        {
          data: [consumed, remaining],
          backgroundColor: [colors.main, "transparent"], // 남은 부분은 투명
          borderColor: [colors.main, "transparent"],
          borderWidth: isZero ? 0 : 2,
          cutout: "75%",
        },
      ],
    };
  }, [current, target, colors, enableCountUp, isInView]);

  // 배경 도넛 옵션 (애니메이션 없음)
  const backgroundOptions: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // 절대 위치 겹침을 위해 false
      animation: false, // 애니메이션 비활성화
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }, // 배경은 툴팁 없음
      },
    }),
    []
  );

  // 전경 도넛 옵션 (애니메이션)
  const foregroundOptions: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // 절대 위치 겹침을 위해 false
      animation: {
        duration: enableCountUp ? 1500 : 1000,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.parsed || 0;
              return `${label}: ${value} kcal`;
            },
          },
        },
      },
    }),
    [enableCountUp]
  );

  return (
    <div
      ref={chartRef}
      className="relative w-full max-w-[250px] mx-auto"
      role="img"
      aria-label={`칼로리 달성률 ${percentage}%, ${current}칼로리 섭취, 목표 ${target}칼로리`}
    >
      {/* 배경 도넛 (고정) */}
      <Doughnut data={backgroundData} options={backgroundOptions} />

      {/* 전경 도넛 (애니메이션) - 절대 위치로 배경 위에 겹침 */}
      <div className="absolute inset-0">
        <Doughnut data={foregroundData} options={foregroundOptions} />
      </div>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold" style={{ color: colors.main }}>
          {enableCountUp ? (
            <span ref={percentageRef}>0</span>
          ) : (
            percentage
          )}%
        </p>
        <p className="text-sm text-white dark:text-gray-400">
          {current} / {target}
        </p>
        <p className="text-xs text-white dark:text-gray-500">kcal</p>
      </div>
    </div>
  );
}

export default memo(CalorieProgressChart);
