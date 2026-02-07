import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "./DarkModeIcon";
import { useUIStore } from "../../store/UI/uiSlice";

interface DarkModeToggleProps {
  size?: string;
  strokeWidth?: string;
  className?: string;
}

/**
 * 다크모드 토글 버튼
 * Sun ↔ Moon 아이콘 회전 애니메이션
 */
export default function DarkModeToggle({
  size = "24",
  strokeWidth = "2",
  className = "",
}: DarkModeToggleProps) {
  const isDark = useUIStore((state) => state.isDark);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  function handleThemeToggle() {
    const newDarkMode = !isDark;
    document.documentElement.classList.toggle("dark");
    toggleTheme();
    localStorage.setItem("isDark", newDarkMode.toString());
  }

  return (
    <AnimatePresence mode="wait">
      {!isDark ? (
        <motion.div
          key="sun"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          onClick={handleThemeToggle}
          className={`cursor-pointer transition-colors ${className}`}
        >
          <SunIcon size={size} strokeWidth={strokeWidth} />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ opacity: 0, rotate: 90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ duration: 0.3 }}
          onClick={handleThemeToggle}
          className={`cursor-pointer transition-colors ${className}`}
        >
          <MoonIcon size={size} strokeWidth={strokeWidth} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
