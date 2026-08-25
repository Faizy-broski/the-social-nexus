import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { portfolioItemSchema } from "@/lib/validations/portfolio";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = portfolioItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("portfolio_items")
    .update({
      slug: values.slug,
      title: values.title,
      categories: values.categories,
      stack: values.stack,
      preview_href: values.previewHref ?? null,
      image_path: values.imagePath,
      sort_order: values.sortOrder,
      published: values.published,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/admin/portfolio/:id] update failed:", error);
    const message = error.code === "23505" ? "That slug is already in use." : "Failed to update portfolio item.";
    return NextResponse.json({ error: message }, { status: error.code === "23505" ? 409 : 502 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);

  if (error) {
    console.error("[api/admin/portfolio/:id] delete failed:", error);
    return NextResponse.json({ error: "Failed to delete portfolio item." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
