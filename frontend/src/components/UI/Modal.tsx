import { memo } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-gray-700/50 z-10"
        onClick={onClose}
      />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="top-1/12 rounded-md p-5 w-96 max-w-11/12 z-20 m-auto text-shadow-gray-900 dark:text-white bg-white dark:bg-gray-700 dark:border dark:border-white"
      >
        <h2 className="text-xl text-center font-semibold">{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(Modal);
