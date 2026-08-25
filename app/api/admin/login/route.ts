import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validations/admin-auth";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createSessionToken, COOKIE_NAME } from "@/lib/auth/session";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

/** In-memory sliding-window limiter — no Redis/KV in this project, and for
 *  a single hardcoded admin account this is a pragmatic brute-force
 *  deterrent. Resets on cold start/restart, which is an acceptable
 *  trade-off at this scale. */
const attemptsByIp = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const attempts = (attemptsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  attemptsByIp.set(ip, attempts);
  return attempts.length >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const attempts = attemptsByIp.get(ip) ?? [];
  attempts.push(Date.now());
  attemptsByIp.set(ip, attempts);
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const { email, password } = parsed.data;

  let isValid: boolean;
  try {
    isValid = await verifyAdminCredentials(email, password);
  } catch (error) {
    console.error("[api/admin/login] credential check failed:", error);
    return NextResponse.json({ error: "Login is not configured yet." }, { status: 500 });
  }

  if (!isValid) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
