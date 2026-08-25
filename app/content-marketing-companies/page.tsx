import type { Metadata } from "next";
import { ContentMarketingCompaniesPage } from "@/components/services/ContentMarketingCompaniesPage";

export const metadata: Metadata = {
  title: "Content Marketing Companies | Trusted Content Partner for 2026",
  description:
    "Searching for a content marketing company that can really help your brand grow? Get expert content writing and SEO services that will grow your brand.",
  alternates: {
    canonical: "/content-marketing-companies",
  },
  openGraph: {
    title: "Content Marketing Companies | Trusted Content Partner for 2026",
    description:
      "Searching for a content marketing company that can really help your brand grow? Get expert content writing and SEO services that will grow your brand.",
    url: "https://thesocialnexus.co.uk/content-marketing-companies",
    type: "website",
  },
};

export default function Page() {
  return <ContentMarketingCompaniesPage />;
}
