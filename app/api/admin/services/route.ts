import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { serviceSchema } from "@/lib/validations/service";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_features(*)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/admin/services] list failed:", error);
    return NextResponse.json({ error: "Failed to load services." }, { status: 502 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();

  const { data: service, error } = await supabase
    .from("services")
    .insert({
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
    .select()
    .single();

  if (error) {
    console.error("[api/admin/services] create failed:", error);
    const message = error.code === "23505" ? "That slug is already in use." : "Failed to create service.";
    return NextResponse.json({ error: message }, { status: error.code === "23505" ? 409 : 502 });
  }

  if (values.features.length > 0) {
    const { error: featuresError } = await supabase.from("service_features").insert(
      values.features.map((feature, index) => ({
        service_id: service.id,
        icon: feature.icon,
        title: feature.title,
        description: feature.description,
        sort_order: feature.sortOrder ?? index,
      })),
    );

    if (featuresError) {
      console.error("[api/admin/services] feature insert failed:", featuresError);
      return NextResponse.json({ error: "Service created, but features failed to save." }, { status: 502 });
    }
  }

  return NextResponse.json({ item: service }, { status: 201 });
}
