import "server-only";
import bcrypt from "bcryptjs";

/** Hardcoded single-admin login — no .env setup required.
 *  Default password: GBf1fGtPf — change it below whenever you like by
 *  generating a new hash: `node -e "console.log(require('bcryptjs').hashSync('new-password', 10))"` */
const ADMIN_EMAIL = "admin@thesocialnexus.co.uk";
const ADMIN_PASSWORD_HASH = "$2b$10$T55cN8iE3cAAFzxFjsO5YuEc4RYM7XTr62MQRAstksaoC2kCYWXYq";

export async function verifyAdminCredentials(email: string, password: string) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return false;
  }

  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}
