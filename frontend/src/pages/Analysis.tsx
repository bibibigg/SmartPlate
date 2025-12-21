import { motion } from "framer-motion";
import { FaChartLine, FaRobot, FaBrain } from "react-icons/fa";

export default function AnalysisPage() {
  return (
    <div className="min-h-screen dark:text-white text-gray-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-8">AI 분석 페이지</h1>
          <div className="flex justify-center mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaBrain className="text-6xl text-blue-500" />
            </motion.div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">준비 중입니다</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                더 나은 서비스를 위해 AI 분석 기능을 개발하고 있습니다. 곧
                만나보실 수 있습니다!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaChartLine className="text-3xl text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">데이터 분석</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    식단 데이터를 기반으로 한 심층 분석
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaRobot className="text-3xl text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">AI 추천</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    개인화된 식단 추천 시스템
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaBrain className="text-3xl text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">스마트 인사이트</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    건강한 식습관을 위한 맞춤형 인사이트
                  </p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              * 정확한 출시 일정은 추후 공지될 예정입니다.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
