import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request); // 保留 next-intl 的路由匹配

  const url = request.nextUrl.clone();
  const pathname = url.pathname.replace(/^\/(zh|en)/, "") || "/";

  const protectedRoutes = ["/chat", "/profile"];
  const token = request.cookies.get("SSSID")?.value;
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", url));
    }
  } else {
    return response;
  }
}
export const config = {
  matcher: ["/", "/(zh|en)/:path*"],
};
