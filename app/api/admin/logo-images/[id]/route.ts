import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { galleryImageSchema } from "@/lib/validations/gallery-image";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = galleryImageSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("logo_images")
    .update({
      ...(values.imagePath !== undefined && { image_path: values.imagePath }),
      ...(values.sortOrder !== undefined && { sort_order: values.sortOrder }),
      ...(values.published !== undefined && { published: values.published }),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/admin/logo-images/:id] update failed:", error);
    return NextResponse.json({ error: "Failed to update logo image." }, { status: 502 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("logo_images").delete().eq("id", id);

  if (error) {
    console.error("[api/admin/logo-images/:id] delete failed:", error);
    return NextResponse.json({ error: "Failed to delete logo image." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
