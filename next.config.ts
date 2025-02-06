import type { NextConfig } from "next";
import withPWA from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

// 创建 Next.js 配置
const nextConfig: NextConfig = {
  // 在这里添加其他配置
};

// 先使用 next-intl 插件
const withNextIntl = createNextIntlPlugin();

// 然后应用 next-pwa 插件
export default withNextIntl(withPWA({
  dest: "public", // PWA Service Worker 存放位置
  register: true, // 自动注册 Service Worker
  skipWaiting: true, // 让新 Service Worker 立即生效
  disable: false
})(nextConfig));
