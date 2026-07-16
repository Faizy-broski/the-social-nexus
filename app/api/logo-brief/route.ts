import { NextResponse } from "next/server";

import { logoBriefFormSchema } from "@/lib/validations/logo-brief";
import { sendFormEmail, type EmailAttachment } from "@/lib/email";
import { logoBriefEmailTemplate } from "@/lib/email-templates";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10MB, matches the form's client-side accept hint
const ACCEPTED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
]);

const textFieldSchema = logoBriefFormSchema.omit({ attachment: true });

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => key !== "attachment"),
  );
  const parsed = textFieldSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  let attachments: EmailAttachment[] | undefined;
  const file = formData.get("attachment");

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { error: "Attachment is too large (max 10MB)." },
        { status: 400 },
      );
    }
    if (file.type && !ACCEPTED_ATTACHMENT_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Attachment must be a PDF, PPTX, JPG, or PNG file." },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments = [
      { filename: file.name, content: buffer, contentType: file.type || undefined },
    ];
  }

  const data = parsed.data;

  try {
    await sendFormEmail({
      subject: `New logo brief from ${data.contactName}`,
      replyTo: data.contactEmail,
      html: logoBriefEmailTemplate(data),
      attachments,
    });
  } catch (error) {
    console.error("[api/logo-brief] failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send your brief. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
