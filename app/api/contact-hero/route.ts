import { NextResponse } from "next/server";

import { heroContactFormSchema } from "@/lib/validations/hero-contact";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = heroContactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const { fullName, phone, email, message } = parsed.data;

  try {
    await sendContactEmail({
      subject: `New quick enquiry from ${fullName}`,
      replyTo: email,
      rows: [
        { label: "Name", value: fullName },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Message", value: message || "—" },
      ],
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
