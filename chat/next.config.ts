import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

// 配置 next-intl（国际化支持）
const withNextIntl = createNextIntlPlugin();

// 配置 next-pwa（仅在生产环境启用）
const withPWAModified = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // 仅生产环境启用 PWA
  // disable: false, // 仅生产环境启用 PWA
});

// 组合插件（先处理国际化，再处理 PWA）
const nextConfig: NextConfig = {
  reactStrictMode: false,
};
export default withNextIntl(withPWAModified(nextConfig));
