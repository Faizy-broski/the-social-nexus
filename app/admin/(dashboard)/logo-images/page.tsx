import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { GalleryImageRow } from "@/lib/types/content";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { FadeIn } from "@/components/admin/FadeIn";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getLogoImages(): Promise<{ items: GalleryImageRow[]; error: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("logo_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/logo-images] failed to load items:", error);
      return { items: [], error: true };
    }

    return { items: data ?? [], error: false };
  } catch (error) {
    console.error("[admin/logo-images] Supabase not configured:", error);
    return { items: [], error: true };
  }
}

export default async function AdminLogoImagesPage() {
  const { items, error } = await getLogoImages();

  return (
    <div>
      <FadeIn>
        <h1 className="text-2xl font-bold tracking-tight">Logo Design Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} image{items.length === 1 ? "" : "s"} — powers the Logo Design tab on /portfolio.
        </p>
      </FadeIn>

      {error && <SupabaseErrorBanner />}

      <div className="mt-6">
        <GalleryManager items={items} apiPath="/api/admin/logo-images" uploadFolder="logos" />
      </div>
    </div>
  );
}
