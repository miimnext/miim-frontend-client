import type { NextConfig } from "next";
import withPWA from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";
// 配置 next-pwa（仅在生产环境启用）
const withPWAModified = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV == "development",
}) as (config: NextConfig) => NextConfig;

// 配置 next-intl（国际化支持）
const withNextIntl = createNextIntlPlugin();

// **组合插件** (顺序很重要)
const nextConfig: NextConfig = {};

export default withNextIntl(withPWAModified(nextConfig));
