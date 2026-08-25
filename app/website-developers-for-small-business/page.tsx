import type { Metadata } from "next";
import { WebsiteDevelopersForSmallBusinessPage } from "@/components/services/WebsiteDevelopersForSmallBusinessPage";

export const metadata: Metadata = {
  title: "Turn Clicks Into Clients: Expert Website Developers for Small Business",
  description:
    "Looking for reliable website developers for small business growth? Get custom, affordable websites built to rank higher and convert more visitors.",
  alternates: {
    canonical: "/website-developers-for-small-business",
  },
  openGraph: {
    title: "Turn Clicks Into Clients: Expert Website Developers for Small Business",
    description:
      "Looking for reliable website developers for small business growth? Get custom, affordable websites built to rank higher and convert more visitors.",
    url: "https://thesocialnexus.co.uk/website-developers-for-small-business",
    type: "website",
  },
};

export default function Page() {
  return <WebsiteDevelopersForSmallBusinessPage />;
}
