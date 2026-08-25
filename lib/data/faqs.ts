import "server-only";
import { getSupabasePublic } from "@/lib/supabase/public";
import type { FaqRow } from "@/lib/types/content";

export async function getPublishedFaqs(): Promise<FaqRow[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data/faqs] failed to load FAQs:", error);
    return [];
  }
  return data ?? [];
}
