import type { HeadingParts } from "@/lib/validations/service";

export type PortfolioRow = {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  stack: string[];
  preview_href: string | null;
  image_path: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceFeatureRow = {
  id: string;
  service_id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
};

export type ServiceRow = {
  id: string;
  slug: string;
  number: string;
  title: string[];
  hero_description: string;
  image_path: string;
  overview_focus: string;
  overview_team: string;
  overview_heading: HeadingParts | null;
  overview_paragraph: string | null;
  cards_heading: HeadingParts | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  service_features?: ServiceFeatureRow[];
};

export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PricingPlanRow = {
  id: string;
  category: string;
  name: string;
  tagline: string;
  badge: string | null;
  highlighted: boolean;
  currency: string;
  price: number | null;
  original_price: number | null;
  price_period: string | null;
  price_note: string | null;
  features: string[];
  cta_label: string;
  cta_href: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

/** true = included, false = not included, string = custom cell text. */
export type ComparisonValue = boolean | string;

export type PricingComparisonRow = {
  id: string;
  category: string;
  group_name: string;
  label: string;
  values: Record<string, ComparisonValue>;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  source: "contact" | "contact_hero" | "web_brief" | "logo_brief";
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  payload: Record<string, unknown>;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

export type GalleryImageRow = {
  id: string;
  image_path: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};
