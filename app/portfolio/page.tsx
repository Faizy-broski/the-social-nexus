import {
  getPublishedLogoImages,
  getPublishedPortfolioItems,
  getPublishedSocialImages,
} from "@/lib/data/portfolio";
import { PortfolioTabs } from "@/components/portfolio/PortfolioTabs";

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
