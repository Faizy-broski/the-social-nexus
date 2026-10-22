import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { z } from "zod";
import { pricingPlanSchema, toPricingPlanRecord } from "@/lib/validations/pricing";
import { requireAdminSession } from "@/lib/auth/require-session";

const publishToggleSchema = z.object({ published: z.boolean() }).strict();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);

  // `{ published }` alone is the quick Publish / Move to draft toggle from
  // the packages table; anything else is a full edit from the form.
  let record: Partial<ReturnType<typeof toPricingPlanRecord>>;
  const toggle = publishToggleSchema.safeParse(body);

  if (toggle.success) {
    record = { published: toggle.data.published };
  } else {
    const parsed = pricingPlanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
    }
    record = toPricingPlanRecord(parsed.data);
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_plans")
    .update(record)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/admin/pricing/plans/:id] update failed:", error);
    return NextResponse.json({ error: "Failed to update package." }, { status: 502 });
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
  const { error } = await supabase.from("pricing_plans").delete().eq("id", id);

  if (error) {
    console.error("[api/admin/pricing/plans/:id] delete failed:", error);
    return NextResponse.json({ error: "Failed to delete package." }, { status: 502 });
  }

  revalidatePath("/pricing");
  return NextResponse.json({ ok: true });
}
