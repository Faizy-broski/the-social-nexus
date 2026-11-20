import { getPublishedServices } from "@/lib/data/services";

const BASE = "https://thesocialnexus.co.uk";

// Regenerated at most every 5 minutes so newly published services appear
// without a redeploy.
export const revalidate = 300;

const STATIC_SERVICES = [
  ["Digital Marketing and Technology Services", "/services", "Overview of all services: software, websites, mobile apps, AI, SEO, digital marketing, social media design, automation, chatbots and ERP/CRM implementation."],
  ["SEO Agency London", "/seo-agency-london", "Local and technical SEO for London businesses."],
  ["Google Ads Management Agency London", "/google-ads-management-agency-london", "Paid search (PPC) campaign management."],
  ["Content Marketing Companies", "/content-marketing-companies", "Content writing and content marketing services."],
  ["Website Developers for Small Business", "/website-developers-for-small-business", "Custom, affordable websites for small businesses."],
  ["WordPress Development Agency London", "/wordpress-development-agency-london", "WordPress and WooCommerce development and support."],
  ["YouTube Channel Management", "/youtube-channel-management", "Done-for-you YouTube channel management: strategy, thumbnails, editing, publishing, Shorts and reporting."],
] as const;

const COMPANY = [
  ["Website Development Pricing and Packages", "/pricing", "Packages, pricing, included features, SEO setup, eCommerce and ongoing support."],
  ["About The Social Nexus", "/about-us", "Company background, expertise and approach."],
  ["Portfolio", "/portfolio", "Examples of websites, logos and social media designs."],
  ["Frequently Asked Questions", "/faqs", "Answers about services, AI, software development, digital marketing, timelines and support."],
  ["Contact The Social Nexus", "/contact-us", "Contact details, business enquiries, project consultations and office locations."],
] as const;

const line = (title: string, path: string, desc: string) =>
  `- [${title}](${BASE}${path}): ${desc}`;

const oneLine = (text: string, max = 160) => {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "") + "…";
};

export async function GET() {
  let detail: string[] = [];
  try {
    const rows = await getPublishedServices();
    detail = rows.map((row) =>
      line(row.title.join(" "), `/services/${row.slug}`, oneLine(row.hero_description ?? "")),
    );
  } catch (error) {
    // Still serve a valid file if the database is unreachable.
    console.error("[llms.txt] could not load services:", error);
  }

  const body = [
    "# The Social Nexus",
    "",
    "> The Social Nexus is a full-service digital technology and marketing agency serving businesses across the UK, USA and Pakistan. It provides software development, website design and development, mobile apps, AI solutions, SEO, digital marketing, social media design, business automation and ERP/CRM implementation.",
    "",
    "The Social Nexus helps startups and established businesses strengthen their digital presence, improve operational efficiency and achieve sustainable growth through technology and marketing solutions.",
    "",
    "## Services",
    ...STATIC_SERVICES.map(([t, p, d]) => line(t, p, d)),
    ...(detail.length ? ["", "## Service details", ...detail] : []),
    "",
    "## Company",
    ...COMPANY.map(([t, p, d]) => line(t, p, d)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
