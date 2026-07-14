import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    companyName,
    companyUrl,
    region,
    service,
    message,
  } = parsed.data;

  try {
    await sendContactEmail({
      subject: `New contact form submission from ${firstName} ${lastName}`,
      replyTo: email,
      rows: [
        { label: "Name", value: `${firstName} ${lastName}` },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Company", value: companyName },
        { label: "Company URL", value: companyUrl },
        { label: "Region", value: region },
        { label: "Service", value: service },
        { label: "Message", value: message },
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
