import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { portfolioItemSchema } from "@/lib/validations/portfolio";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/admin/portfolio] list failed:", error);
    return NextResponse.json({ error: "Failed to load portfolio items." }, { status: 502 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = portfolioItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("portfolio_items")
    .insert({
      slug: values.slug,
      title: values.title,
      categories: values.categories,
      stack: values.stack,
      preview_href: values.previewHref ?? null,
      image_path: values.imagePath,
      sort_order: values.sortOrder,
      published: values.published,
    })
    .select()
    .single();

  if (error) {
    console.error("[api/admin/portfolio] create failed:", error);
    const message = error.code === "23505" ? "That slug is already in use." : "Failed to create portfolio item.";
    return NextResponse.json({ error: message }, { status: error.code === "23505" ? 409 : 502 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
