import { motion, AnimatePresence } from "framer-motion";
import { memo, useEffect } from "react";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

// 매 렌더링마다 재생성 방지를 위해 컴포넌트 외부로 이동
const iconMap = {
  success: <MdCheckCircle size={24} />,
  error: <MdError size={24} />,
  warning: <MdWarning size={24} />,
  info: <MdInfo size={24} />,
};

const colorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-orange-500",
  info: "bg-blue-500",
};

function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className={`${colorMap[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
          >
            <div className="flex-shrink-0">{iconMap[type]}</div>
            <p className="flex-grow font-medium">{message}</p>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="알림 닫기"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(Toast);
