import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix
} from "@/routes";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.nextauth.token;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return null;

    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => true, 
    },
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};