import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { LeadRow } from "@/lib/types/content";
import { LeadsManager } from "./LeadsManager";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getLeads(): Promise<{ items: LeadRow[]; error: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/leads] failed to load items:", error);
      return { items: [], error: true };
    }

    return { items: data ?? [], error: false };
  } catch (error) {
    console.error("[admin/leads] Supabase not configured:", error);
    return { items: [], error: true };
  }
}

export default async function AdminLeadsPage() {
  const { items, error } = await getLeads();

  return (
    <div>
      {error && <SupabaseErrorBanner />}
      <LeadsManager items={items} />
    </div>
  );
}
