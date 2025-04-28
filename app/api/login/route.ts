import { NextRequest, NextResponse } from "next/server";

// Use a secure, httpOnly cookie for session
const SESSION_COOKIE = "tagline_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correctPassword = process.env.TAGLINE_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json(
      { detail: "Server misconfigured: password not set." },
      { status: 500 }
    );
  }

  if (password === correctPassword) {
    // Set a signed session cookie (for MVP, just a flag)
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } else {
    return NextResponse.json(
      { detail: "Incorrect password." },
      { status: 401 }
    );
  }
}
