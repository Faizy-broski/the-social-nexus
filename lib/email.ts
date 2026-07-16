import nodemailer, { type Transporter } from "nodemailer";

// Falls back to the SMTP account itself if no separate "From" address is
// configured — most providers require the From address to match (or be
// verified against) the authenticated account anyway.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "connect@thesocialnexus.co.uk";

let transporter: Transporter | null = null;

// Lazily created (and cached) rather than built at module load — module
// load happens during the Next.js build too, before env vars from the
// deploy target are necessarily available, and there's no reason to pay
// for a transport object on every cold start if a route never sends mail.
function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Email service is not configured.");
  }

  const port = Number(SMTP_PORT);
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; every other port (587, 25, ...) starts plaintext
    // and upgrades via STARTTLS, which nodemailer handles on its own.
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Serverless functions have a hard execution limit — nodemailer's own
    // defaults (2 min connection timeout) would otherwise let a misconfigured
    // or unreachable SMTP host hang the request until the platform kills it,
    // instead of failing cleanly back to the user in a few seconds.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  return transporter;
}

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export async function sendFormEmail(fields: {
  subject: string;
  replyTo: string;
  html: string;
  attachments?: EmailAttachment[];
}) {
  if (!FROM_EMAIL) {
    throw new Error("Email service is not configured.");
  }

  const transport = getTransporter();

  const info = await transport.sendMail({
    from: `"The Social Nexus Website" <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo: fields.replyTo,
    subject: fields.subject,
    html: fields.html,
    attachments: fields.attachments,
  });

  // sendMail resolving only means the SMTP server accepted the message for
  // delivery, not that it reached the inbox — log the accepting server's
  // response so a "no error but never arrived" report can be traced.
  console.log("[email] accepted by SMTP server:", {
    messageId: info.messageId,
    response: info.response,
    accepted: info.accepted,
    rejected: info.rejected,
  });
}
