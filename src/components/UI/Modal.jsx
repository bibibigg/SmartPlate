import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
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
        className="top-1/12 rounded-md p-5 w-96 max-w-11/12 z-20 m-auto"
      >
        <h2 className="text-xl text-center font-semibold">{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
