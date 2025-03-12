"use client";

import { useEffect, useState } from "react";

type NotificationProps = {
  id: string;
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
};

const notificationClass = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-yellow-500 text-white",
};

const Notification = ({
  id,
  message,
  type = "success",
  duration = 3000,
  onClose,
}: NotificationProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 设置定时器，触发消失动画
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleAnimationEnd = () => {
    if (isExiting) {
      onClose(); // 动画完成后调用 onClose
    }
  };

  return (
    <div
      className={`p-4 mb-3 rounded-lg shadow-lg ${notificationClass[type]} transition-all duration-500 transform ${
        isExiting ? "animate-slideDown" : "animate-slideUp"
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flex items-center">
        {type === "success" && <span className="mr-3">✔️</span>}
        {type === "error" && <span className="mr-3">❌</span>}
        {type === "warning" && <span className="mr-3">⚠️</span>}
        <p>
          {message} {"id" + id}
        </p>
      </div>
    </div>
  );
};

export default Notification;
