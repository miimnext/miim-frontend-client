import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // 导入国际化路由逻辑
import { Locale, isValidLocale } from "./enum/locales"; // 导入语言相关的工具函数

// 初始化 next-intl 中间件，用于处理国际化路由
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // 应用 next-intl 中间件，处理基于语言的路由匹配
  const response = intlMiddleware(request);

  // 克隆请求的 URL 以便修改 pathname
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 从 URL 中提取语言代码（例如，/en 或 /zh）
  const pathLocale = pathname.split("/")[1];

  // 检查提取的语言代码是否有效，如果无效则默认使用 'en'
  const locale = isValidLocale(pathLocale) ? pathLocale : Locale.en;

  // 定义需要身份验证的受保护路由（例如，登录页面）
  const protectedRoutes = [
    `/${locale}/login/signin`,
    `/${locale}/login/register`,
  ];

  // 获取 cookie 中的 'SSSID' token，用于检查用户是否已认证
  const token = request.cookies.get("SSSID")?.value;

  // 如果用户已经登录并尝试访问登录页面，重定向到首页
  if (pathname === `/${locale}/login/signin` && token) {
    return NextResponse.redirect(new URL(`/${locale}/`, url)); // 重定向到首页
  }

  // 如果是访问登录页面或已经认证的用户，允许继续访问
  if (pathname === `/${locale}/login/signin` || token) {
    return response;
  }

  // 如果访问的路由不是受保护的路由，重定向到登录页面
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(`/${locale}/login/signin`, url));
  }

  // 其他情况下，返回原始响应
  return response;
}

// 配置中间件的匹配规则
export const config = {
  matcher: ["/", "/(zh|en)/:path*"], // 匹配根路径和包含语言代码的路径
};
