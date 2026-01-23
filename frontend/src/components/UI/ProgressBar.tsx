import { memo, useMemo } from "react";
import { motion } from "framer-motion";

type ProgressBarVariant = "default" | "success" | "warning" | "error";
type ProgressBarSize = "sm" | "md" | "lg";

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  labelPosition?: "inside" | "outside";
  className?: string;
  animate?: boolean;
}

const variantColors: Record<ProgressBarVariant, string> = {
  default: "bg-[#00BCD4]",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

const sizeStyles: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

function ProgressBar({
  value,
  max,
  variant = "default",
  size = "md",
  showLabel = false,
  labelPosition = "outside",
  className = "",
  animate = true,
}: ProgressBarProps) {
  const percentage = useMemo(() => {
    if (max === 0) return 0;
    return Math.min(Math.round((value / max) * 100), 100);
  }, [value, max]);

  const progressColor = variantColors[variant];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === "outside" && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {value} / {max}
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {percentage}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeStyles[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${progressColor}`}
          >
            {showLabel && labelPosition === "inside" && size === "lg" && (
              <span className="flex items-center justify-center h-full text-xs text-white font-medium">
                {percentage}%
              </span>
            )}
          </motion.div>
        ) : (
          <div
            className={`h-full rounded-full ${progressColor}`}
            style={{ width: `${percentage}%` }}
          >
            {showLabel && labelPosition === "inside" && size === "lg" && (
              <span className="flex items-center justify-center h-full text-xs text-white font-medium">
                {percentage}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProgressBar);
