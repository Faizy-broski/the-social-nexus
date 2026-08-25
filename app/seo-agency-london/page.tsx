import type { Metadata } from "next";
import { SeoAgencyLondonPage } from "@/components/services/SeoAgencyLondonPage";

export const metadata: Metadata = {
  title: "SEO Agency London | Local SEO Experts That Get Results",
  description:
    "Looking for an SEO agency London businesses trust? We help you rank higher, get found by local customers, and grow with strategies built on data, not guesswork.",
  alternates: {
    canonical: "/seo-agency-london",
  },
  openGraph: {
    title: "SEO Agency London | Local SEO Experts That Get Results",
    description:
      "Looking for an SEO agency London businesses trust? We help you rank higher, get found by local customers, and grow with strategies built on data, not guesswork.",
    url: "https://thesocialnexus.co.uk/seo-agency-london",
    type: "website",
  },
};

export default function Page() {
  return <SeoAgencyLondonPage />;
}
