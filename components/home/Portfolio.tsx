import { getPublishedPortfolioItems } from "@/lib/data/portfolio";
import { PortfolioCarousel } from "@/components/home/PortfolioCarousel";

export async function PortfolioSection() {
  const items = await getPublishedPortfolioItems(12);
  return <PortfolioCarousel items={items} />;
}

export default PortfolioSection;
