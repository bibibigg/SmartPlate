import { createPortal } from "react-dom";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-gray-700/50 z-10"
        onClick={onClose}
      />
      <dialog
        open
        className="top-1/12 rounded-md p-5 w-96 max-w-11/12 z-20 m-auto"
      >
        <h2 className="text-2xl">{title}</h2>
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
