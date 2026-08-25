import "server-only";
import { getSupabasePublic } from "@/lib/supabase/public";
import type { GalleryImageRow, PortfolioRow } from "@/lib/types/content";

export async function getPublishedPortfolioItems(limit?: number): Promise<PortfolioRow[]> {
  const supabase = getSupabasePublic();
  let query = supabase
    .from("portfolio_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[data/portfolio] failed to load portfolio items:", error);
    return [];
  }
  return data ?? [];
}

export async function getPublishedLogoImages(): Promise<GalleryImageRow[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("logo_images")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data/portfolio] failed to load logo images:", error);
    return [];
  }
  return data ?? [];
}

export async function getPublishedSocialImages(): Promise<GalleryImageRow[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("social_media_images")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data/portfolio] failed to load social media images:", error);
    return [];
  }
  return data ?? [];
}
