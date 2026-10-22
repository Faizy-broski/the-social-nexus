import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { pricingComparisonRowSchema, toComparisonRowRecord } from "@/lib/validations/pricing";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_comparison_rows")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[api/admin/pricing/comparison] list failed:", error);
    return NextResponse.json({ error: "Failed to load comparison rows." }, { status: 502 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = pricingComparisonRowSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_comparison_rows")
    .insert(toComparisonRowRecord(parsed.data))
    .select()
    .single();

  if (error) {
    console.error("[api/admin/pricing/comparison] create failed:", error);
    return NextResponse.json({ error: "Failed to create comparison row." }, { status: 502 });
  }

  revalidatePath("/pricing");
  return NextResponse.json({ item: data }, { status: 201 });
}
