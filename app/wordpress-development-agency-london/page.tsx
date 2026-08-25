import type { Metadata } from "next";
import { WordpressDevelopmentAgencyLondonPage } from "@/components/services/WordpressDevelopmentAgencyLondonPage";

export const metadata: Metadata = {
  title: "WordPress Development Agency London | Trusted Team for 2026",
  description:
    "Looking for a reliable WordPress development agency London businesses trust? Get custom design, WooCommerce builds, and ongoing support that scales.",
  alternates: {
    canonical: "/wordpress-development-agency-london",
  },
  openGraph: {
    title: "WordPress Development Agency London | Trusted Team for 2026",
    description:
      "Looking for a reliable WordPress development agency London businesses trust? Get custom design, WooCommerce builds, and ongoing support that scales.",
    url: "https://thesocialnexus.co.uk/wordpress-development-agency-london",
    type: "website",
  },
};

export default function Page() {
  return <WordpressDevelopmentAgencyLondonPage />;
}
