import { BodyInfo } from "../../types";

interface BodyMeasurementSectionProps {
  height: number;
  weight: number;
  fatMass: number;
  weightChange: number | null;
  fatChange: number | null;
  onHeightChange: (height: number) => void;
  onWeightChange: (weight: number) => void;
  onFatMassChange: (fatMass: number) => void;
  bodyData?: BodyInfo | null;
}

export default function BodyMeasurementSection({
  height,
  weight,
  fatMass,
  weightChange,
  fatChange,
  onHeightChange,
  onWeightChange,
  onFatMassChange,
  bodyData,
}: BodyMeasurementSectionProps) {
  const renderChangeIndicator = (change: number | null) => {
    if (change === null) return null;

    return (
      <span
        className={`ml-2 text-xs ${
          change > 0
            ? "text-red-500"
            : change < 0
            ? "text-green-500"
            : "text-gray-500"
        }`}
      >
        {change > 0 ? "▲" : change < 0 ? "▼" : "−"}{" "}
        {Math.abs(change).toFixed(1)}kg
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
        신체 측정
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* 키 */}
        <div>
          <label
            htmlFor="height"
            className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            키 (cm)
          </label>
          <input
            id="height"
            type="number"
            name="height"
            step="0.1"
            placeholder="170.0"
            value={height || ""}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            min="100"
            max="250"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* 체중 */}
        <div>
          <label
            htmlFor="weight"
            className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            체중 (kg)
            {renderChangeIndicator(weightChange)}
          </label>
          <input
            id="weight"
            type="number"
            step="0.1"
            name="weight"
            placeholder="70.0"
            value={weight || ""}
            onChange={(e) => onWeightChange(Number(e.target.value))}
            min="30"
            max="300"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* 골격근량 */}
        <div>
          <label
            htmlFor="muscle"
            className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            골격근량 (kg)
            <span className="ml-1 text-xs text-gray-500">체성분 분석 결과</span>
          </label>
          <input
            id="muscle"
            type="number"
            step="0.1"
            name="muscle"
            placeholder="30.0"
            defaultValue={bodyData?.muscle || ""}
            min="0"
            max="100"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        {/* 체지방량 */}
        <div>
          <label
            htmlFor="fatMass"
            className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            체지방량 (kg)
            {renderChangeIndicator(fatChange)}
          </label>
          <input
            id="fatMass"
            type="number"
            step="0.1"
            name="fatMass"
            placeholder="15.0"
            value={fatMass || ""}
            onChange={(e) => onFatMassChange(Number(e.target.value))}
            min="0"
            max="150"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );
}
