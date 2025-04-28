import { NextResponse } from "next/server";

const SESSION_COOKIE = "tagline_session";

export async function POST() {
  // Clear the session cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Expire immediately
  });
  return res;
}
