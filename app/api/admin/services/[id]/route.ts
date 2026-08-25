import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { serviceSchema } from "@/lib/validations/service";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();

  const { data: service, error } = await supabase
    .from("services")
    .update({
      slug: values.slug,
      number: values.number,
      title: values.title,
      hero_description: values.heroDescription,
      image_path: values.imagePath,
      overview_focus: values.overviewFocus,
      overview_team: values.overviewTeam,
      overview_heading: values.overviewHeading ?? null,
      overview_paragraph: values.overviewParagraph ?? null,
      cards_heading: values.cardsHeading ?? null,
      sort_order: values.sortOrder,
      published: values.published,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/admin/services/:id] update failed:", error);
    const message = error.code === "23505" ? "That slug is already in use." : "Failed to update service.";
    return NextResponse.json({ error: message }, { status: error.code === "23505" ? 409 : 502 });
  }

  // Reconcile features by full replace — simplest correct approach for an
  // admin panel with no concurrent editors, avoids diffing add/edit/remove.
  const { error: deleteError } = await supabase.from("service_features").delete().eq("service_id", id);
  if (deleteError) {
    console.error("[api/admin/services/:id] feature delete failed:", deleteError);
    return NextResponse.json({ error: "Service saved, but features failed to update." }, { status: 502 });
  }

  if (values.features.length > 0) {
    const { error: insertError } = await supabase.from("service_features").insert(
      values.features.map((feature, index) => ({
        service_id: id,
        icon: feature.icon,
        title: feature.title,
        description: feature.description,
        sort_order: feature.sortOrder ?? index,
      })),
    );

    if (insertError) {
      console.error("[api/admin/services/:id] feature insert failed:", insertError);
      return NextResponse.json({ error: "Service saved, but features failed to update." }, { status: 502 });
    }
  }

  return NextResponse.json({ item: service });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error("[api/admin/services/:id] delete failed:", error);
    return NextResponse.json({ error: "Failed to delete service." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
