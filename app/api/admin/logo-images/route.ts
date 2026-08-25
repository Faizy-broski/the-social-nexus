import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { galleryImageSchema } from "@/lib/validations/gallery-image";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("logo_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/admin/logo-images] list failed:", error);
    return NextResponse.json({ error: "Failed to load logo images." }, { status: 502 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = galleryImageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("logo_images")
    .insert({
      image_path: values.imagePath,
      sort_order: values.sortOrder,
      published: values.published,
    })
    .select()
    .single();

  if (error) {
    console.error("[api/admin/logo-images] create failed:", error);
    return NextResponse.json({ error: "Failed to save logo image." }, { status: 502 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
