import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { faqSchema } from "@/lib/validations/faq";
import { requireAdminSession } from "@/lib/auth/require-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/admin/faqs] list failed:", error);
    return NextResponse.json({ error: "Failed to load FAQs." }, { status: 502 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = faqSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
  }

  const values = parsed.data;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("faqs")
    .insert({
      question: values.question,
      answer: values.answer,
      sort_order: values.sortOrder,
      published: values.published,
    })
    .select()
    .single();

  if (error) {
    console.error("[api/admin/faqs] create failed:", error);
    return NextResponse.json({ error: "Failed to create FAQ." }, { status: 502 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
