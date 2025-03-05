import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

// Configure next-intl (internationalization support)
const withNextIntl = createNextIntlPlugin();

// Configure next-pwa (enable only in production environment)
const withPWAModified = withPWA({
  dest: "public", // PWA assets output folder
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
  register: true, // Register the service worker
  workboxOptions: {
    exclude: [
      /\/@modal\/.*/, // 排除 /@modal/ 路径
    ],
  },
});

// Combine the plugins (first next-intl, then next-pwa)
const nextConfig: NextConfig = {
  reactStrictMode: false, // React Strict Mode disabled (can enable based on preference)
  async rewrites() {
    return [
      {
        source: "/@modal/:path*", // 匹配 /@modal/ 开头的路径
        destination: "/%40modal/:path*", // 将 @ 替换为 %40
      },
    ];
  },
};

export default withNextIntl(withPWAModified(nextConfig));
