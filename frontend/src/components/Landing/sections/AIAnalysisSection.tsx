import { motion } from "framer-motion";
import {
  SECTION_HEADLINES,
  AI_FEATURES,
} from "../../../constants/landingContent";

/**
 * AI 이미지 분석 섹션
 * Pain point 해결 + 차별화 포인트 강조
 */
export default function AIAnalysisSection() {
  const { title, subtitle, description } = SECTION_HEADLINES.aiAnalysis;

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-cyan-50 to-white dark:from-gray-800 dark:to-[#242424]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 이미지 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* 이미지 placeholder - 나중에 실제 스크린샷으로 교체 */}
            <div className="relative mx-auto max-w-sm">
              {/* 폰 모형 배경 */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-[2.5rem] p-4 shadow-2xl">
                {/* 실제 스크린샷이 들어갈 영역 */}
                <div className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden aspect-[9/16]">
                  <img
                    src="/chicken.png"
                    alt="AI 음식 분석 예시 - 치킨"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 장식 요소 */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#00BCD4]/20 to-[#0097A7]/20 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* 오른쪽: 텍스트 + 기능 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 헤드라인 */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00BCD4] dark:text-[#00BCD4] mb-6 leading-snug">
                {subtitle}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>

            {/* 기능 체크리스트 */}
            <div className="space-y-4">
              {AI_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* 체크 아이콘 */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#00BCD4] to-[#0097A7] flex items-center justify-center">
                    <span className="text-white font-bold">{feature.icon}</span>
                  </div>

                  {/* 텍스트 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
