import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, HttpError } from "../utils/http";
import { useAuthStore } from "../store/auth/authSlice";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authLogin(data.user, data.token);
      navigate("/");
    },
    onError: (error: HttpError) => {
      setError(error.info.message || "로그인에 실패했습니다.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    mutate({ userId, password });
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">로그인</h2>
          <p className="mt-2 text-center text-sm opacity-70">
            SmartPlate에 오신 것을 환영합니다
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium mb-1"
              >
                아이디
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="아이디를 입력하세요"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="비밀번호를 입력하세요"
                disabled={isPending}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-[#00BCD4] hover:bg-[#0097A7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "로그인 중..." : "로그인"}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-sm text-[#00BCD4] hover:text-[#0097A7] dark:text-[#00BCD4] dark:hover:text-[#4DD0E1] transition-colors"
            >
              계정이 없으신가요? 회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
