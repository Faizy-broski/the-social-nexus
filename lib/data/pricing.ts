import "server-only";
import { getSupabasePublic } from "@/lib/supabase/public";
import type { PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";

export async function getPublishedPricing(): Promise<{
  plans: PricingPlanRow[];
  comparisonRows: PricingComparisonRow[];
}> {
  const supabase = getSupabasePublic();

  const [plansResult, rowsResult] = await Promise.all([
    supabase
      .from("pricing_plans")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("pricing_comparison_rows")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
  ]);

  if (plansResult.error) {
    console.error("[data/pricing] failed to load plans:", plansResult.error);
  }
  if (rowsResult.error) {
    console.error("[data/pricing] failed to load comparison rows:", rowsResult.error);
  }

  return {
    plans: plansResult.data ?? [],
    comparisonRows: rowsResult.data ?? [],
  };
}
