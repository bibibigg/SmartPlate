import { useMemo, memo } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useUIStore } from "../../store/UI/uiSlice";

interface NutrientBarChartProps {
  bmr: number;
  tdee: number;
  target: number;
}

function NutrientBarChart({
  bmr,
  tdee,
  target,
}: NutrientBarChartProps) {
  const isDark = useUIStore((state) => state.isDark);
  // 차트 데이터 객체 (useMemo로 최적화)
  const data = useMemo(
    () => ({
      labels: ["BMR", "TDEE", "목표"],
      datasets: [
        {
          label: "칼로리 (kcal)",
          data: [bmr, tdee, target],
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)", // blue
            "rgba(168, 85, 247, 0.8)", // purple
            "rgba(0, 188, 212, 0.8)", // cyan
          ],
          borderColor: [
            "rgb(59, 130, 246)",
            "rgb(168, 85, 247)",
            "rgb(0, 188, 212)",
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }),
    [bmr, tdee, target]
  );

  const options: ChartOptions<"bar"> = useMemo(
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
              return `${context.parsed.y} kcal`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + " kcal";
            },
            color: isDark ? "rgba(209, 213, 219, 0.8)" : "rgba(75, 85, 99, 0.8)",
          },
          grid: {
            color: isDark ? "rgba(75, 85, 99, 0.3)" : "rgba(156, 163, 175, 0.2)",
          },
        },
        x: {
          ticks: {
            color: isDark ? "rgba(209, 213, 219, 0.8)" : "rgba(75, 85, 99, 0.8)",
          },
          grid: {
            display: false,
          },
        },
      },
    }),
    [isDark]
  );

  return (
    <div
      className="w-full h-[250px]"
      role="img"
      aria-label={`칼로리 비교 차트: 기초대사량 ${bmr}칼로리, 총 소비량 ${tdee}칼로리, 목표 ${target}칼로리`}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default memo(NutrientBarChart);
