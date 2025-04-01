"use client";
import { useEffect } from "react";
export default function PwaServiceWorker() {
  useEffect(() => {
    // 仅在生产环境注册 Service Worker，开发环境禁用
    if (
      process.env.NODE_ENV !== "development" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null; // 不渲染任何内容
}
