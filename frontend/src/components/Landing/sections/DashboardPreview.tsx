import { motion } from "framer-motion";
import CalorieStats from "../../Dashboard/CalorieStats";
import {
  DEMO_CALORIE_STATS,
  DEMO_BODY_DATA,
  SECTION_HEADLINES,
} from "../../../constants/landingContent";

/**
 * 실시간 대시보드 프리뷰 섹션
 * 실제 CalorieStats 컴포넌트를 재사용하여 결과물을 먼저 보여줌
 */
export default function DashboardPreview() {
  const { title, subtitle, description } = SECTION_HEADLINES.dashboardPreview;

  return (
    <section className="relative py-20 px-6 bg-white dark:bg-[#242424]">
      <div className="max-w-7xl mx-auto">
        {/* 헤드라인 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-[#00BCD4] to-[#0097A7] bg-clip-text text-transparent">
            {subtitle}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* 실제 대시보드 컴포넌트 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CalorieStats
            calorieStats={{
              BMR: DEMO_CALORIE_STATS.BMR,
              TDEE: DEMO_CALORIE_STATS.TDEE,
              targetCalories: DEMO_CALORIE_STATS.targetCalories,
            }}
            todayCalories={DEMO_CALORIE_STATS.todayCalories}
            bodyData={{ goal: DEMO_BODY_DATA.goal }}
          />
        </motion.div>

        {/* 하단 설명 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            실제 사용자 대시보드 화면입니다. 데모 데이터로 미리 경험해보세요.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
