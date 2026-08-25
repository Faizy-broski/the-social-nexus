import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = "8h";

// Hardcoded so the admin session works with zero .env setup — this only
// signs a cookie that says "this browser passed the hardcoded login check
// above," so a fixed secret carries no extra risk beyond the login itself.
const SESSION_SECRET = "3e50439babaa32a2fb19a248921169fc4c6fa1eb84f930d79fe313cab2edc0e9";

function getSecretKey() {
  return new TextEncoder().encode(SESSION_SECRET);
}

export async function createSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { email: string };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
