import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { getPublishedServiceBySlug, getPublishedServiceSlugs } from "@/lib/data/services";
import { ADMIN_ICONS } from "@/lib/admin-icons";
import { Wrench } from "lucide-react";
import type { ServiceDetail } from "@/lib/services-data";

export const revalidate = 300;

type PageParams = { slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getPublishedServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title.join(" ")} | The Social Nexus`,
    description: service.hero_description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const row = await getPublishedServiceBySlug(slug);

  if (!row) notFound();

  const service: ServiceDetail = {
    slug: row.slug,
    number: row.number,
    title: row.title,
    heroDescription: row.hero_description,
    image: row.image_path,
    overviewFocus: row.overview_focus,
    overviewTeam: row.overview_team,
    overviewHeading: row.overview_heading ?? undefined,
    overviewParagraph: row.overview_paragraph ?? undefined,
    cardsHeading: row.cards_heading ?? undefined,
    features: (row.service_features ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((feature) => ({
        icon: ADMIN_ICONS[feature.icon] ?? Wrench,
        title: feature.title,
        description: feature.description,
      })),
  };

  return <ServiceDetailPage service={service} />;
}
