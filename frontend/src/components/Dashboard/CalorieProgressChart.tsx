import { useMemo, memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useUIStore } from "../../store/UI/uiSlice";

interface CalorieProgressChartProps {
  current: number;
  target: number;
  goal: "maintain" | "lose" | "gain";
}

function CalorieProgressChart({
  current,
  target,
  goal,
}: CalorieProgressChartProps) {
  const isDark = useUIStore((state) => state.isDark);
  const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const isOver = current > target;

  // 목표에 따른 색상 (useMemo로 최적화)
  const colors = useMemo(() => {
    if (isOver && goal === "lose") return { main: "#ef4444", light: "#fca5a5" };
    if (!isOver && goal === "lose") return { main: "#22c55e", light: "#86efac" };
    if (isOver && goal === "gain") return { main: "#22c55e", light: "#86efac" };
    return { main: "#00BCD4", light: "#67e8f9" };
  }, [isOver, goal]);

  // 차트 데이터 객체 (useMemo로 최적화)
  const data = useMemo(() => {
    // 목표 초과 시에도 차트가 제대로 표시되도록 수정
    const consumed = Math.min(current, target);
    const remaining = Math.max(0, target - current);

    return {
      labels: ["섭취", "남음"],
      datasets: [
        {
          data: [consumed, remaining],
          backgroundColor: [
            colors.main,
            isDark ? "#374151" : "#e5e7eb",
          ],
          borderColor: [
            colors.main,
            isDark ? "#4b5563" : "#d1d5db",
          ],
          borderWidth: 2,
          cutout: "75%",
        },
      ],
    };
  }, [current, target, colors, isDark]);

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
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
    []
  );

  return (
    <div
      className="relative w-full max-w-[250px] mx-auto"
      role="img"
      aria-label={`칼로리 달성률 ${percentage}%, ${current}칼로리 섭취, 목표 ${target}칼로리`}
    >
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold" style={{ color: colors.main }}>
          {percentage}%
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {current} / {target}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">kcal</p>
      </div>
    </div>
  );
}

export default memo(CalorieProgressChart);
