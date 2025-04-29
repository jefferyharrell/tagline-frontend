import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "tagline_session";

// Paths that don't require auth
const PUBLIC_PATHS = [
  "/login",
  "/logout",
  "/api/login",
  "/api/logout",
  "/_next", // Next.js internals
  "/favicon.ico",
  "/robots.txt",
  "/manifest.json",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (session === "1") {
    return NextResponse.next();
  }

  // Not logged in: redirect to /login
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/(.*)"], // Apply to all routes
};
