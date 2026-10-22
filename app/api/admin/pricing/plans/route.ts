import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { pricingPlanSchema, toPricingPlanRecord } from "@/lib/validations/pricing";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[api/admin/pricing/plans] list failed:", error);
    return NextResponse.json({ error: "Failed to load packages." }, { status: 502 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = pricingPlanSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_plans")
    .insert(toPricingPlanRecord(parsed.data))
    .select()
    .single();

  if (error) {
    console.error("[api/admin/pricing/plans] create failed:", error);
    return NextResponse.json({ error: "Failed to create package." }, { status: 502 });
  }

  revalidatePath("/pricing");
  return NextResponse.json({ item: data }, { status: 201 });
}
