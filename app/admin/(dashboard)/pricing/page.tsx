import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";
import { PricingManager } from "./PricingManager";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getPricing(): Promise<{
  plans: PricingPlanRow[];
  rows: PricingComparisonRow[];
  error: boolean;
}> {
  try {
    const supabase = getSupabaseAdmin();
    const [plansResult, rowsResult] = await Promise.all([
      supabase
        .from("pricing_plans")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("pricing_comparison_rows")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);

    if (plansResult.error || rowsResult.error) {
      console.error("[admin/pricing] failed to load items:", plansResult.error ?? rowsResult.error);
      return { plans: plansResult.data ?? [], rows: rowsResult.data ?? [], error: true };
    }

    return { plans: plansResult.data ?? [], rows: rowsResult.data ?? [], error: false };
  } catch (error) {
    console.error("[admin/pricing] Supabase not configured:", error);
    return { plans: [], rows: [], error: true };
  }
}

export default async function AdminPricingPage() {
  const { plans, rows, error } = await getPricing();

  return (
    <div>
      {error && <SupabaseErrorBanner />}
      <PricingManager plans={plans} rows={rows} />
    </div>
  );
}
