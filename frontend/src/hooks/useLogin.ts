import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, HttpError } from "../utils/http";
import { useAuthStore } from "../store/auth/authSlice";

export function useLogin() {
  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authLogin(data.user, data.token);
      navigate("/");
    },
    onError: (error: HttpError) => {
      setError(error.info.message || "로그인에 실패했습니다.");
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error,
    clearError: () => setError(""),
  };
}
