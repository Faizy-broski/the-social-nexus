import type { Metadata } from "next";
import {
  getPublishedLogoImages,
  getPublishedPortfolioItems,
  getPublishedSocialImages,
} from "@/lib/data/portfolio";
import { PortfolioTabs } from "@/components/portfolio/PortfolioTabs";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse websites, logos and social media designs we have delivered. See how Social Nexus turns ideas into digital results for real businesses.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const [portfolioItems, logoImages, socialImages] = await Promise.all([
    getPublishedPortfolioItems(),
    getPublishedLogoImages(),
    getPublishedSocialImages(),
  ]);

  return (
    <PortfolioTabs
      portfolioItems={portfolioItems}
      logoImages={logoImages}
      socialImages={socialImages}
    />
  );
}
