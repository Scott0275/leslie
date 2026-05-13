import { SITE } from "./site";

export type BookingPayload = {
  name: string;
  type: string;
  duration: string;
  datetime: string;
};

type FormSubmitJson = { success?: boolean | string; message?: string };

/**
 * FormSubmit only accepts submissions from the browser — server-side fetch
 * (e.g. Vercel Route Handlers) gets HTTP 403. Call this from the client.
 */
export async function submitBookingViaFormSubmit(payload: BookingPayload): Promise<void> {
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Leslie site — Booking request from ${payload.name}`,
        _template: "table",
        _captcha: "false",
        name: payload.name,
        meeting_type: payload.type,
        duration: payload.duration,
        preferred_date_time: payload.datetime,
      }),
    },
  );

  const text = await res.text();
  let data: FormSubmitJson = {};
  try {
    data = JSON.parse(text) as FormSubmitJson;
  } catch {
    /* ignore */
  }

  const failed =
    !res.ok ||
    data.success === false ||
    data.success === "false";

  if (failed) {
    throw new Error(
      data.message ||
        "Could not send booking email. Try WhatsApp or call.",
    );
  }
}
