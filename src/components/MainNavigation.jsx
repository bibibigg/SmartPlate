import { Link } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header className="flex justify-between items-center p-4">
      <nav className="flex gap-4 mb-6 font-semibold text-blue-600">
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
    </header>
  );
}
