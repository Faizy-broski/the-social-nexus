import type { ContactFormValues } from "@/lib/validations/contact";
import type { HeroContactFormValues } from "@/lib/validations/hero-contact";
import type { WebBriefFormValues } from "@/lib/validations/web-brief";
import type { LogoBriefFormValues } from "@/lib/validations/logo-brief";

const BRAND_NAVY = "#0B1020";
const BRAND_NAVY_LIGHT = "#171F35";
const BRAND_TEAL = "#3BB3C2";
const BRAND_TEAL_DARK = "#2E8F9B";
const BRAND_TEAL_TINT = "#EAF7F8";
const BRAND_GOLD = "#F8C300";
const TEXT_BODY = "#1A1F2B";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const SITE_URL = "https://thesocialnexus.co.uk";
const LOGO_WHITE = `${SITE_URL}/TSN-White-Logo-email.png`;
const LOGO_BLACK = `${SITE_URL}/TSN-Black-Logo-email.png`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

type Row = { label: string; value: string; multiline?: boolean };

function renderRows(rows: Row[]) {
  return rows
    .map(
      (row, index) => `
        <tr>
          <td style="padding: 16px 18px; background: ${index % 2 === 0 ? "#FFFFFF" : "#F8FAFB"}; border-bottom: 1px solid ${BORDER}; border-left: 3px solid ${BRAND_TEAL}; border-radius: 2px;">
            <p style="margin: 0 0 5px; font: 700 11px/1.4 -apple-system, Segoe UI, Roboto, sans-serif; letter-spacing: 0.07em; text-transform: uppercase; color: ${BRAND_TEAL_DARK};">
              ${escapeHtml(row.label)}
            </p>
            <p style="margin: 0; font: 400 15px/1.6 -apple-system, Segoe UI, Roboto, sans-serif; color: ${TEXT_BODY}; ${
              row.multiline ? "white-space: pre-wrap;" : ""
            }">
              ${row.value || "&mdash;"}
            </p>
          </td>
        </tr>`,
    )
    .join("");
}

function renderShell({
  eyebrow,
  heading,
  intro,
  rows,
  preheader,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  rows: Row[];
  preheader?: string;
}) {
  return `
<!doctype html>
<html>
  <body style="margin: 0; padding: 0; background: #EEF1F5; font-family: -apple-system, Segoe UI, Roboto, sans-serif;">
    ${
      preheader
        ? `<div style="display: none; max-height: 0; max-width: 0; overflow: hidden; opacity: 0; mso-hide: all;">${escapeHtml(preheader)}</div>`
        : ""
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #EEF1F5;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid ${BORDER};">
            <tr>
              <td style="background: linear-gradient(135deg, ${BRAND_NAVY} 0%, ${BRAND_NAVY_LIGHT} 100%); padding: 36px 40px; text-align: center;">
                <img src="${LOGO_WHITE}" width="150" height="50" alt="The Social Nexus" style="display: block; margin: 0 auto 18px; border: 0; outline: none; text-decoration: none;" />
                <div style="height: 3px; width: 56px; margin: 0 auto; border-radius: 2px; background: linear-gradient(90deg, ${BRAND_TEAL}, ${BRAND_GOLD});"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 40px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background: ${BRAND_TEAL_TINT}; border-radius: 999px; padding: 6px 14px;">
                      <p style="margin: 0; font: 800 11px/1 -apple-system, Segoe UI, Roboto, sans-serif; letter-spacing: 0.08em; text-transform: uppercase; color: ${BRAND_TEAL_DARK};">
                        ${escapeHtml(eyebrow)}
                      </p>
                    </td>
                  </tr>
                </table>
                <h1 style="margin: 16px 0 12px; font: 800 23px/1.3 -apple-system, Segoe UI, Roboto, sans-serif; color: ${BRAND_NAVY};">
                  ${escapeHtml(heading)}
                </h1>
                <p style="margin: 0 0 24px; font: 400 14px/1.6 -apple-system, Segoe UI, Roboto, sans-serif; color: ${TEXT_MUTED};">
                  ${escapeHtml(intro)}
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius: 8px; overflow: hidden; border: 1px solid ${BORDER};">
                  ${renderRows(rows)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 36px;">
                <div style="height: 1px; background: ${BORDER}; margin-bottom: 24px;"></div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle">
                      <img src="${LOGO_BLACK}" width="110" height="33" alt="The Social Nexus" style="display: block; border: 0; outline: none; text-decoration: none;" />
                    </td>
                    <td valign="middle" align="right">
                      <p style="margin: 0; font: 400 12px/1.6 -apple-system, Segoe UI, Roboto, sans-serif; color: ${TEXT_MUTED};">
                        Sent from a form on
                        <a href="${SITE_URL}" style="color: ${BRAND_TEAL_DARK}; text-decoration: none; font-weight: 600;">thesocialnexus.co.uk</a>
                      </p>
                      <p style="margin: 4px 0 0; font: 400 12px/1.6 -apple-system, Segoe UI, Roboto, sans-serif; color: ${TEXT_MUTED};">
                        ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactEmailTemplate(data: ContactFormValues) {
  return renderShell({
    eyebrow: "Contact form",
    heading: `New enquiry from ${data.firstName} ${data.lastName}`,
    intro: "Someone submitted the contact form on the Contact Us page.",
    preheader: `New enquiry from ${data.firstName} ${data.lastName} – ${data.service}`,
    rows: [
      { label: "Name", value: escapeHtml(`${data.firstName} ${data.lastName}`) },
      { label: "Email", value: `<a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(data.email)}</a>` },
      { label: "Phone", value: `<a href="tel:${escapeHtml(data.phone)}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(data.phone)}</a>` },
      { label: "Company", value: escapeHtml(data.companyName) },
      { label: "Company URL", value: escapeHtml(data.companyUrl) },
      { label: "Region", value: escapeHtml(data.region) },
      { label: "Service", value: escapeHtml(data.service) },
      { label: "Message", value: nl2br(data.message), multiline: true },
    ],
  });
}

export function heroContactEmailTemplate(data: HeroContactFormValues) {
  return renderShell({
    eyebrow: "Quick enquiry",
    heading: `New quick enquiry from ${data.fullName}`,
    intro: "Someone submitted the quick contact form on the homepage hero.",
    preheader: `New quick enquiry from ${data.fullName}`,
    rows: [
      { label: "Name", value: escapeHtml(data.fullName) },
      { label: "Email", value: `<a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(data.email)}</a>` },
      { label: "Phone", value: `<a href="tel:${escapeHtml(data.phone)}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(data.phone)}</a>` },
      { label: "Message", value: data.message ? nl2br(data.message) : "&mdash;", multiline: true },
    ],
  });
}

export function webBriefEmailTemplate(data: Omit<WebBriefFormValues, "attachment">) {
  const phone = `${data.countryCode} ${data.phone}`;
  return renderShell({
    eyebrow: "Web brief",
    heading: `New web brief from ${data.name}`,
    intro: "A new website project brief was submitted via the Web Brief form.",
    preheader: `New web brief from ${data.name}`,
    rows: [
      { label: "Name", value: escapeHtml(data.name) },
      { label: "Email", value: `<a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(data.email)}</a>` },
      { label: "Phone", value: `<a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(phone)}</a>` },
      { label: "Current website URL", value: escapeHtml(data.currentWebsiteUrl || "") },
      { label: "Current web host", value: escapeHtml(data.currentWebHost) },
      { label: "Domain purchased?", value: nl2br(data.domainPurchased), multiline: true },
      { label: "Providing images?", value: escapeHtml(data.providingImages) },
      { label: "Content ready?", value: escapeHtml(data.hasContent) },
      { label: "Company description", value: nl2br(data.companyDescription), multiline: true },
      { label: "Theme / feel", value: nl2br(data.themeFeel), multiline: true },
      { label: "Preferred colors", value: escapeHtml(data.colors) },
      { label: "Competitor / admired sites", value: nl2br(data.competitorSites), multiline: true },
      { label: "Pages needed", value: nl2br(data.pagesNeeded), multiline: true },
      { label: "Services / products", value: nl2br(data.servicesProducts), multiline: true },
      { label: "Competitive advantage", value: nl2br(data.competitiveAdvantage), multiline: true },
      { label: "Customer acquisition", value: nl2br(data.customerAcquisition), multiline: true },
      { label: "Additional info", value: nl2br(data.additionalInfo), multiline: true },
      { label: "Social media", value: escapeHtml(data.socialMedia || "") },
    ],
  });
}

export function logoBriefEmailTemplate(data: Omit<LogoBriefFormValues, "attachment">) {
  const phone = `${data.countryCode} ${data.contactPhone}`;
  return renderShell({
    eyebrow: "Logo brief",
    heading: `New logo brief from ${data.contactName}`,
    intro: "A new logo design brief was submitted via the Logo Brief form.",
    preheader: `New logo brief from ${data.contactName}`,
    rows: [
      { label: "Contact name", value: escapeHtml(data.contactName) },
      { label: "Email", value: `<a href="mailto:${escapeHtml(data.contactEmail)}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(data.contactEmail)}</a>` },
      { label: "Phone", value: `<a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" style="color:${BRAND_TEAL_DARK};">${escapeHtml(phone)}</a>` },
      { label: "Logo name", value: escapeHtml(data.logoName) },
      { label: "Company slogan", value: escapeHtml(data.companySlogan || "") },
      { label: "Competitors / references", value: nl2br(data.competitorsReference || ""), multiline: true },
      { label: "Business description", value: nl2br(data.businessDescription), multiline: true },
      { label: "Logo requirements", value: nl2br(data.logoRequirements || ""), multiline: true },
      { label: "Primary color", value: escapeHtml(data.primaryColor || "") },
      { label: "Secondary color", value: escapeHtml(data.secondaryColor || "") },
    ],
  });
}
