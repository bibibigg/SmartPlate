import { Link } from "react-router-dom";
import DarkModeToggle from "./UI/DarkModeToggle";
import { useEffect } from "react";
import { useUIStore } from "../store/UI/uiSlice";

export default function MainNavigation() {
  const setInitialTheme = useUIStore((state) => state.setInitialTheme);

  // 초기 렌더링 시 다크모드 상태 세팅
  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
      setInitialTheme(true);
    }
  }, [setInitialTheme]);

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
      <DarkModeToggle size="30" strokeWidth="2" className="text-white" />
    </header>
  );
}
