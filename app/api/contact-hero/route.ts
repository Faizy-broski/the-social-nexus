import { NextResponse } from "next/server";

import { heroContactFormSchema } from "@/lib/validations/hero-contact";
import { sendFormEmail } from "@/lib/email";
import { heroContactEmailTemplate } from "@/lib/email-templates";

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
    await sendFormEmail({
      subject: `New quick enquiry from ${data.fullName}`,
      replyTo: data.email,
      html: heroContactEmailTemplate(data),
    });
  } catch (error) {
    console.error("[api/contact-hero] failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
