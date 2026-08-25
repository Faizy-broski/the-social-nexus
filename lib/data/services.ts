import "server-only";
import { getSupabasePublic } from "@/lib/supabase/public";
import type { ServiceRow } from "@/lib/types/content";

export async function getPublishedServices(limit?: number): Promise<ServiceRow[]> {
  const supabase = getSupabasePublic();
  let query = supabase
    .from("services")
    .select("*, service_features(*)")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[data/services] failed to load services:", error);
    return [];
  }
  return data ?? [];
}

export async function getPublishedServiceSlugs(): Promise<string[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase.from("services").select("slug").eq("published", true);

  if (error) {
    console.error("[data/services] failed to load service slugs:", error);
    return [];
  }
  return (data ?? []).map((row) => row.slug);
}

export async function getPublishedServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_features(*)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[data/services] failed to load service by slug:", error);
    return null;
  }
  return data;
}
