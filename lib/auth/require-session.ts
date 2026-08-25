import "server-only";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

/** Defense-in-depth check for admin API route handlers — proxy.ts already
 *  gates /api/admin/*, but per Next's own guidance a matcher change or
 *  refactor could silently remove that coverage, so every handler verifies
 *  the session itself too instead of relying on proxy alone. */
export async function requireAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  return session;
}
