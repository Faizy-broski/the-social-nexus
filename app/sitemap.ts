import type { MetadataRoute } from "next";
import { getPublishedServiceSlugs } from "@/lib/data/services";

const BASE_URL = "https://thesocialnexus.co.uk";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.5 },
  { path: "/logo-brief", changeFrequency: "monthly", priority: 0.6 },
  { path: "/web-brief", changeFrequency: "monthly", priority: 0.6 },
  { path: "/content-marketing-companies", changeFrequency: "monthly", priority: 0.7 },
  { path: "/google-ads-management-agency-london", changeFrequency: "monthly", priority: 0.7 },
  { path: "/seo-agency-london", changeFrequency: "monthly", priority: 0.7 },
  { path: "/website-developers-for-small-business", changeFrequency: "monthly", priority: 0.7 },
  { path: "/wordpress-development-agency-london", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceSlugs = await getPublishedServiceSlugs();
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries];
}
