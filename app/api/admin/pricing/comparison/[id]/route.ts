import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { pricingComparisonRowSchema, toComparisonRowRecord } from "@/lib/validations/pricing";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = pricingComparisonRowSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_comparison_rows")
    .update(toComparisonRowRecord(parsed.data))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/admin/pricing/comparison/:id] update failed:", error);
    return NextResponse.json({ error: "Failed to update comparison row." }, { status: 502 });
  }

  revalidatePath("/pricing");
  return NextResponse.json({ item: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("pricing_comparison_rows").delete().eq("id", id);

  if (error) {
    console.error("[api/admin/pricing/comparison/:id] delete failed:", error);
    return NextResponse.json({ error: "Failed to delete comparison row." }, { status: 502 });
  }

  revalidatePath("/pricing");
  return NextResponse.json({ ok: true });
}
