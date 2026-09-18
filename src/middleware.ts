// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and auth routes
const protectedRoutes = ["/admin", "/dashboard", "/worker", "/settings", "/profile", "/chat"];
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Read the auth cookies directly from request
  const token = request.cookies.get("accessToken")?.value;
  const userCookie = request.cookies.get("user")?.value;

  let userRole: string | null = null;
  if (userCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(userCookie));
      userRole = parsed.role;
    } catch {
      userRole = null;
    }
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 2. Unauthenticated user trying to access protected route
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Authenticated user trying to access login/signup
  if (isAuthRoute && token) {
    const redirectUrl =
      userRole === "admin" ? "/admin/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 4. Role-based protection: non-admin trying to access /admin
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// 5. Matcher configuration to skip static assets and images
export const config = {
  matcher: [
    "/login","/signup",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
