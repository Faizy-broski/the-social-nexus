import { NextResponse } from "next/server";

import { youtubeAuditSchema } from "@/lib/validations/youtube-audit";
import { saveLead } from "@/lib/leads";
import { sendFormEmail } from "@/lib/email";
import { youtubeAuditEmailTemplate } from "@/lib/email-templates";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = youtubeAuditSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    await saveLead({
      source: "youtube_audit",
      name: data.name,
      email: data.email,
      message: data.challenge || null,
      payload: data,
    });
  } catch (error) {
    console.error("[api/youtube-audit] failed to save submission:", error);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again shortly." },
      { status: 502 },
    );
  }

  try {
    await sendFormEmail({
      subject: `New YouTube audit request from ${data.name}`,
      replyTo: data.email,
      html: youtubeAuditEmailTemplate(data),
    });
  } catch (error) {
    // Lead is already saved, so a mail outage shouldn't fail the submission.
    console.error("[api/youtube-audit] failed to send notification email:", error);
  }

  return NextResponse.json({ ok: true });
}
