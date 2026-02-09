import { Outlet } from "react-router-dom";
import LandingNavigation from "../components/Landing/layout/LandingNavigation";
import { motion, useScroll } from "framer-motion";

/**
 * 랜딩페이지 전용 레이아웃
 * 독립적인 네비게이션 + 스크롤 진행 바
 */
export default function LandingLayout() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white dark:bg-[#242424]">
      {/* 스크롤 진행 바 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00BCD4] to-[#0097A7] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 네비게이션 */}
      <LandingNavigation />

      {/* 페이지 콘텐츠 */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
