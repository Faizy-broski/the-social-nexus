import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ServiceRow } from "@/lib/types/content";
import { ServicesManager } from "./ServicesManager";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getServices(): Promise<{ items: ServiceRow[]; error: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("services")
      .select("*, service_features(*)")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/services] failed to load items:", error);
      return { items: [], error: true };
    }

    return { items: data ?? [], error: false };
  } catch (error) {
    console.error("[admin/services] Supabase not configured:", error);
    return { items: [], error: true };
  }
}

export default async function AdminServicesPage() {
  const { items, error } = await getServices();

  return (
    <div>
      {error && <SupabaseErrorBanner />}
      <ServicesManager items={items} />
    </div>
  );
}
