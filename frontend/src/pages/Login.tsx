import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { AuthLayout, FormInput, FormError, Button } from "../components/UI";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error, clearError } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!userId || !password) {
      return;
    }

    login({ userId, password });
  };

  return (
    <AuthLayout title="로그인" subtitle="SmartPlate에 오신 것을 환영합니다">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            id="userId"
            label="아이디"
            value={userId}
            onChange={setUserId}
            placeholder="아이디를 입력하세요"
            disabled={isPending}
          />
          <FormInput
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호를 입력하세요"
            disabled={isPending}
          />
        </div>

        {error && <FormError message={error} />}

        <div>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
        </div>

        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/signup")}>
            계정이 없으신가요? 회원가입
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
