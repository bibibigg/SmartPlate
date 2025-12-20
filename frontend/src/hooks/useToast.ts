import { useState, useCallback } from "react";
import { ToastType } from "../components/UI/Toast";

interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: "",
    type: "info",
  });

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      setToast({
        isVisible: true,
        message,
        type,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
