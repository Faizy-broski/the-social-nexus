import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { PortfolioRow } from "@/lib/types/content";
import { PortfolioManager } from "./PortfolioManager";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getPortfolioItems(): Promise<{ items: PortfolioRow[]; error: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/portfolio] failed to load items:", error);
      return { items: [], error: true };
    }

    return { items: data ?? [], error: false };
  } catch (error) {
    console.error("[admin/portfolio] Supabase not configured:", error);
    return { items: [], error: true };
  }
}

export default async function AdminPortfolioPage() {
  const { items, error } = await getPortfolioItems();

  return (
    <div>
      {error && <SupabaseErrorBanner />}
      <PortfolioManager items={items} />
    </div>
  );
}
