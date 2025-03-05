// components/Toast.tsx
import React, { useEffect } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 1500,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <>
      {/* Toast 容器 */}
      <div className="fixed inset-0 flex items-center justify-center z-[2000]">
        <div
          className={`px-6 py-2 rounded-md text-white ${toastStyles[type]} shadow-lg animate-fade-in`}
        >
          {message}
        </div>
      </div>
    </>
  );
};

export default Toast;
