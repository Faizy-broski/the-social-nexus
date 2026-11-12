import type { Metadata } from "next";
import { getPublishedFaqs } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/faqs/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about our process, pricing, timelines and support. Find out how working with Social Nexus works.",
  alternates: { canonical: "/faqs" },
};

export default async function FaqsPage() {
  const faqs = await getPublishedFaqs();

  return <FaqAccordion faqs={faqs} />;
}
