import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { FaqRow } from "@/lib/types/content";
import { FaqsManager } from "./FaqsManager";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getFaqs(): Promise<{ items: FaqRow[]; error: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/faqs] failed to load items:", error);
      return { items: [], error: true };
    }

    return { items: data ?? [], error: false };
  } catch (error) {
    console.error("[admin/faqs] Supabase not configured:", error);
    return { items: [], error: true };
  }
}

export default async function AdminFaqsPage() {
  const { items, error } = await getFaqs();

  return (
    <div>
      {error && <SupabaseErrorBanner />}
      <FaqsManager items={items} />
    </div>
  );
}
