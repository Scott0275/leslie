import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

type Body = {
  name?: string;
  type?: string;
  duration?: string;
  datetime?: string;
};

/**
 * Forwards booking requests to SITE.email via FormSubmit (no API key).
 * If you use FormSubmit for the first time, check that inbox for a one-time activation link.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const datetime = typeof body.datetime === "string" ? body.datetime.trim() : "";
  if (!name || !datetime) {
    return NextResponse.json({ error: "Name and preferred date/time are required." }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "";
  const duration = typeof body.duration === "string" ? body.duration : "";

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `Leslie site — Booking request from ${name}`,
      _template: "table",
      _captcha: "false",
      name,
      meeting_type: type,
      duration,
      preferred_date_time: datetime,
    }),
  });

  const text = await res.text();
  let data: { success?: boolean; message?: string } = {};
  try {
    data = JSON.parse(text) as typeof data;
  } catch {
    /* non-JSON body */
  }

  if (!res.ok || data.success === false) {
    return NextResponse.json(
      { error: data.message || "Could not send booking email. Try again or use WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
