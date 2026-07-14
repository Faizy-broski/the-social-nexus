import { Resend } from "resend";

// Resend's test domain — works without a verified domain, but only ever
// delivers to the email address the Resend account was signed up with.
// Swap in a verified sending domain (e.g. "notifications@thesocialnexus.co.uk")
// once one is set up in the Resend dashboard.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "connect@thesocialnexus.co.uk";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(fields: {
  subject: string;
  replyTo: string;
  rows: Array<{ label: string; value: string }>;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email service is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #111;">
      ${fields.rows
        .map(
          (row) =>
            `<p style="margin: 0 0 12px;"><strong>${escapeHtml(row.label)}:</strong><br />${escapeHtml(
              row.value
            ).replace(/\n/g, "<br />")}</p>`
        )
        .join("")}
    </div>
  `;

  const { error } = await resend.emails.send({
    from: `The Social Nexus Website <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo: fields.replyTo,
    subject: fields.subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
