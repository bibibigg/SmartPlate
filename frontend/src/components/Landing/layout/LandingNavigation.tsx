import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Button from "../../UI/Button";
import DarkModeToggle from "../../UI/DarkModeToggle";

/**
 * 랜딩페이지 전용 네비게이션
 * 투명 헤더 → 스크롤 시 반투명 배경으로 전환
 */
export default function LandingNavigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-[background-color,box-shadow,backdrop-filter,height] duration-300
        ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}
      >
        {/* 로고 */}
        <Link
          to="/welcome"
          className="text-2xl font-bold text-[#00BCD4] dark:text-[#00BCD4]"
        >
          SmartPlate
        </Link>

        {/* 네비게이션 링크 (데스크탑) */}
        {/* <ul className="hidden md:flex gap-10 text-gray-700 dark:text-gray-200">
          <li>
            <a
              href="#preview"
              className="py-2 px-1 hover:text-[#00BCD4] dark:hover:text-[#00BCD4] transition-colors"
            >
              미리보기
            </a>
          </li>
          <li>
            <Link
              to="/info"
              className="py-2 px-1 hover:text-[#00BCD4] dark:hover:text-[#00BCD4] transition-colors"
            >
              소개
            </Link>
          </li>
        </ul> */}

        {/* CTA 버튼 + 다크모드 토글 */}
        <div className="flex gap-4 items-center">
          {/* 다크모드 토글 */}
          <DarkModeToggle
            size="24"
            strokeWidth="2"
            className="text-gray-700 dark:text-gray-200 hover:text-[#00BCD4] dark:hover:text-[#00BCD4] hover:scale-110 transition-transform"
          />

          <Button variant="primary" size="medium" fullWidth={false} to="/login">
            로그인
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
