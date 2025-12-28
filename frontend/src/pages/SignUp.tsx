import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp, HttpError } from "../utils/http";

const SignUpPage = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    },
    onError: (error: HttpError) => {
      setError(error.info.message || "회원가입에 실패했습니다.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 입력 검증
    if (!userId || !username || !password || !passwordConfirm) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (userId.length < 4) {
      setError("아이디는 최소 4자 이상이어야 합니다.");
      return;
    }

    if (username.length < 2) {
      setError("닉네임은 최소 2자 이상이어야 합니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    mutate({ userId, username, password });
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">
            회원가입
          </h2>
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="최소 4자 이상"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                닉네임
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="최소 2자 이상"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="최소 6자 이상"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium mb-1"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 다시 입력하세요"
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
              {isPending ? "처리 중..." : "회원가입"}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-[#00BCD4] hover:text-[#0097A7] dark:text-[#00BCD4] dark:hover:text-[#4DD0E1] transition-colors"
            >
              이미 계정이 있으신가요? 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
