import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "./UI/DarkModeIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useUIStore } from "../store/UI/uiSlice";

export default function MainNavigation() {
  const isDark = useUIStore((state) => state.isDark);
  const setInitialTheme = useUIStore((state) => state.setInitialTheme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  console.log(isDark);

  // 초기 렌더링 시 다크모드 상태 세팅
  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
      setInitialTheme(true);
    }
  }, [setInitialTheme]);

  // isDark상태 변경 시 로컬스토리지 업데이트
  useEffect(() => {
    localStorage.setItem("isDark", isDark.toString());
  }, [isDark]);

  function handleThemeToggle() {
    document.documentElement.classList.toggle("dark");
    toggleTheme();
  }

  return (
    <header className="flex justify-between h-16 items-center p-4 bg-[#00BCD4]">
      <nav className="flex gap-4 font-semibold text-white">
        <ul className="flex gap-4">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/record">기록</Link>
          </li>
          <li>
            <Link to="/analyze">AI 분석</Link>
          </li>
          <li>
            <Link to="/bodyInfo">신체 정보</Link>
          </li>
        </ul>
      </nav>
      <AnimatePresence mode="wait">
        {!isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            onClick={handleThemeToggle}
          >
            <SunIcon size="30" strokeWidth="2" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            onClick={handleThemeToggle}
          >
            <MoonIcon size="30" strokeWidth="2" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
