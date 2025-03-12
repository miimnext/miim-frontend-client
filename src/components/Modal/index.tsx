// components/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className="fixed  top-0 bottom-0 bg-gray-600 bg-opacity-20 z-[1000] w-full h-full  flex justify-center items-center "
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
