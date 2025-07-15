import { NextResponse } from "next/server";
import {ROUTES} from "./utils/routes"


function isPublicPath(pathname) {
  return ROUTES.PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

function isUserPath(pathname) {
  return ROUTES.USER_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

function isAdminPath(pathname) {
  return ROUTES.ADMIN_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export function middleware(request) {
 console.log("⚡️ Middleware running on:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;
  const role = request.cookies.get("user-role")?.value;

  // 1. Allow all public routes for unauthenticated users
  if (isPublicPath(pathname)) {
    if (token && role) {
      // Prevent logged-in users from accessing auth pages
      const redirectTo = role === "admin" ? "/admin" : "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.next(); // allow guest
  }

  // 2. If not logged in, redirect to login
  if (!token || !role) {
    return NextResponse.redirect(new URL("/Auth/login", request.url));
  }

  // 3. Block admin from accessing user routes
  if (isUserPath(pathname) && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 4. Block user from accessing admin routes
  if (isAdminPath(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 5. Default allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  
};

// export const config = {
//   matcher: ["/:path*"],
// };

