interface RealTimeAnalysisProps {
  bmi: string | null;
  bmiStatus: { text: string; color: string } | null;
  bodyFatPercentage: string | null;
}

export default function RealTimeAnalysis({
  bmi,
  bmiStatus,
  bodyFatPercentage,
}: RealTimeAnalysisProps) {
  if (!bmi && !bodyFatPercentage) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
        실시간 분석
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {bmi && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">BMI</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {bmi}
            </div>
            {bmiStatus && (
              <div className={`text-xs sm:text-sm font-semibold mt-1 ${bmiStatus.color}`}>
                {bmiStatus.text}
              </div>
            )}
          </div>
        )}
        {bodyFatPercentage && (
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">체지방률</div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {bodyFatPercentage}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
