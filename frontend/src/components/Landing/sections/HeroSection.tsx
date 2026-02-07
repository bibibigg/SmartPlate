import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import AnimatedGradient from "../animations/AnimatedGradient";
import ScrollIndicator from "../animations/ScrollIndicator";
import { CTA_TEXT } from "../../../constants/landingContent";

/**
 * 랜딩페이지 Hero 섹션
 * 전체 화면, 중앙 정렬 헤드라인 + CTA 버튼
 */
export default function HeroSection() {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    const previewSection = document.getElementById("preview");
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* 배경 그라데이션 */}
      <AnimatedGradient />

      {/* 콘텐츠 */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        {/* 헤드라인 */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          당신의 건강한 식습관,
          <br />
          <span className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] bg-clip-text text-transparent">
            AI가 함께합니다
          </span>
        </motion.h1>

        {/* 서브 헤드라인 */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          신체 정보 기반 맞춤형 칼로리 관리부터
          <br />
          AI 이미지 분석까지
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            variant="primary"
            size="large"
            fullWidth={false}
            onClick={() => navigate("/signup")}
          >
            {CTA_TEXT.hero.primary}
          </Button>
          {/* <Button
            variant="link"
            size="large"
            fullWidth={false}
            onClick={handleDemoClick}
          >
            {CTA_TEXT.hero.secondary}
          </Button> */}
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <ScrollIndicator />
    </section>
  );
}
