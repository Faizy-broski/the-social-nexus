import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";
import { sendFormEmail } from "@/lib/email";
import { contactEmailTemplate } from "@/lib/email-templates";

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
    await sendFormEmail({
      subject: `New contact form submission from ${data.firstName} ${data.lastName}`,
      replyTo: data.email,
      html: contactEmailTemplate(data),
    });
  } catch (error) {
    console.error("[api/contact] failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
