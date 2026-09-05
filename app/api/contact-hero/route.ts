import { NextResponse } from "next/server";

import { heroContactFormSchema } from "@/lib/validations/hero-contact";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = heroContactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    await saveLead({
      source: "contact_hero",
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      payload: data,
    });
  } catch (error) {
    console.error("[api/contact-hero] failed to save submission:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
