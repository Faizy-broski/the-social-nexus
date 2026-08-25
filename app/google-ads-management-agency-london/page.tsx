import type { Metadata } from "next";
import { GoogleAdsManagementAgencyLondonPage } from "@/components/services/GoogleAdsManagementAgencyLondonPage";

export const metadata: Metadata = {
  title: "Google Ads Management Agency London | Proven PPC Growth Experts",
  description:
    "Looking for a Google Ads management agency London businesses trust? Get expert PPC campaigns, lower costs, and more leads. Book your free audit today.",
  alternates: {
    canonical: "/google-ads-management-agency-london",
  },
  openGraph: {
    title: "Google Ads Management Agency London | Proven PPC Growth Experts",
    description:
      "Looking for a Google Ads management agency London businesses trust? Get expert PPC campaigns, lower costs, and more leads. Book your free audit today.",
    url: "https://thesocialnexus.co.uk/google-ads-management-agency-london",
    type: "website",
  },
};

export default function Page() {
  return <GoogleAdsManagementAgencyLondonPage />;
}
