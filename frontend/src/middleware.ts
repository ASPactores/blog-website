import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value || "";
  const refreshToken = request.cookies.get("refresh_token")?.value || "";
  const uid = request.cookies.get("uid")?.value || "";

  const isAuthenticated = Boolean(accessToken && refreshToken && uid);

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin";
  const isProtectedRoute = pathname.startsWith("/admin") && !isLoginPage;

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
