import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    await saveLead({
      source: "contact",
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      company: data.companyName,
      message: data.message,
      payload: data,
    });
  } catch (error) {
    console.error("[api/contact] failed to save submission:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
