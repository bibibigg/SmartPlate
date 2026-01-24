import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp, HttpError } from "../utils/http";
import { AuthLayout, FormInput, FormError, Button } from "../components/UI";

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
    <AuthLayout title="회원가입" subtitle="SmartPlate에 오신 것을 환영합니다">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            id="userId"
            label="아이디"
            value={userId}
            onChange={setUserId}
            placeholder="최소 4자 이상"
            disabled={isPending}
          />
          <FormInput
            id="username"
            label="닉네임"
            value={username}
            onChange={setUsername}
            placeholder="최소 2자 이상"
            disabled={isPending}
          />
          <FormInput
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="최소 6자 이상"
            disabled={isPending}
          />
          <FormInput
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            placeholder="비밀번호를 다시 입력하세요"
            disabled={isPending}
          />
        </div>

        {error && <FormError message={error} />}

        <div>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "처리 중..." : "회원가입"}
          </Button>
        </div>

        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/login")}>
            이미 계정이 있으신가요? 로그인
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
