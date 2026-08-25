import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { GalleryImageRow } from "@/lib/types/content";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { FadeIn } from "@/components/admin/FadeIn";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";

async function getSocialImages(): Promise<{ items: GalleryImageRow[]; error: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("social_media_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin/social-images] failed to load items:", error);
      return { items: [], error: true };
    }

    return { items: data ?? [], error: false };
  } catch (error) {
    console.error("[admin/social-images] Supabase not configured:", error);
    return { items: [], error: true };
  }
}

export default async function AdminSocialImagesPage() {
  const { items, error } = await getSocialImages();

  return (
    <div>
      <FadeIn>
        <h1 className="text-2xl font-bold tracking-tight">Social Media Design Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} image{items.length === 1 ? "" : "s"} — powers the Social Media Design tab on /portfolio.
        </p>
      </FadeIn>

      {error && <SupabaseErrorBanner />}

      <div className="mt-6">
        <GalleryManager items={items} apiPath="/api/admin/social-images" uploadFolder="social" />
      </div>
    </div>
  );
}
