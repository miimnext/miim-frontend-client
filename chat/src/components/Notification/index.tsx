"use client";

import { useState, ReactNode } from "react";
import Notification from "./Notification";

type NotificationProps = {
  id: string;
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
};

type NotificationManagerProps = {
  children: (args: {
    showNotification: (
      message: string,
      type?: "success" | "error" | "warning",
      duration?: number
    ) => void;
  }) => ReactNode;
};

const NotificationManager: React.FC<NotificationManagerProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const showNotification = (
    message: string,
    type: "success" | "error" | "warning" = "success",
    duration = 3000
  ) => {
    const id = Math.random().toString(36).substring(2, 9); // 生成唯一 ID
    const newNotification = { id, message, type, duration };

    setNotifications((prevNotifications) => {
      if (prevNotifications.length >= 5) {
        // 如果超过 5 条，移除最早的一条
        return [...prevNotifications.slice(1), newNotification];
      }
      return [...prevNotifications, newNotification];
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div>
      {children({ showNotification })}
      <div className="fixed top-20 right-4 space-y-3 w-[240px]">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationManager;
