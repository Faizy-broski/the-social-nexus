import { getPublishedFaqs } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/faqs/FaqAccordion";

export default async function FaqsPage() {
  const faqs = await getPublishedFaqs();

  return <FaqAccordion faqs={faqs} />;
}
