"use client"; // 这是客户端组件标记

import { useEffect } from "react";

export default function PwaServiceWorker() {
  useEffect(() => {
    // 只在客户端注册 Service Worker
    if ("serviceWorker" in navigator) {
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
