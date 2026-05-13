import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

type Body = {
  name?: string;
  type?: string;
  duration?: string;
  datetime?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Server-side email via Resend (works on Vercel).
 *
 * If `RESEND_API_KEY` is not set, returns 501 so the browser can submit through
 * FormSubmit instead — FormSubmit rejects server-side fetch with 403.
 *
 * Vercel env:
 * - RESEND_API_KEY (required for server path)
 * - RESEND_FROM optional; defaults to "Leslie Bookings <admin@hextech.works>" (domain must be verified in Resend)
 * - BOOKING_TO_EMAIL optional; defaults to SITE.email
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        code: "NO_SERVER_MAIL",
        message:
          "Server email is not configured. The client will deliver via FormSubmit instead.",
      },
      { status: 501 },
    );
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM?.trim() || "Leslie Bookings <admin@hextech.works>";
  const to = (process.env.BOOKING_TO_EMAIL?.trim() || SITE.email).trim();

  const safe = {
    name: escapeHtml(name),
    type: escapeHtml(type),
    duration: escapeHtml(duration),
    datetime: escapeHtml(datetime),
  };

  const html = `
    <table style="font-family:sans-serif;border-collapse:collapse;max-width:560px">
      <tr><td style="padding:8px;border:1px solid #eee"><strong>Name</strong></td><td style="padding:8px;border:1px solid #eee">${safe.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee"><strong>Meeting type</strong></td><td style="padding:8px;border:1px solid #eee">${safe.type}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee"><strong>Duration</strong></td><td style="padding:8px;border:1px solid #eee">${safe.duration}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee"><strong>Preferred date/time</strong></td><td style="padding:8px;border:1px solid #eee">${safe.datetime}</td></tr>
    </table>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Leslie site — Booking from ${name}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message, code: "RESEND_FAILED" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
