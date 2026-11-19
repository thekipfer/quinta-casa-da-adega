import { Resend } from "resend";
import { LOGO_CID } from "@/emails/layout";
import { LOGO_PNG_BASE64 } from "@/emails/logo";
import { confirmationEmail, notificationEmail } from "@/emails/proposal";
import { CONTACT_EMAIL } from "@/lib/i18n/orcamento";
import { parseProposalRequest } from "@/lib/proposal-request";

/**
 * POST /api/pedido — called by the /orcamento form and the proposal quiz after the visitor submits.
 * Sends the couple an elegant confirmation and the estate a copy (reply-to: the couple).
 * The form's own WhatsApp / email hand-off is unaffected: the browser fires this in the background.
 */

const FROM = `Quinta Casa da Adega <${CONTACT_EMAIL}>`;
const logo = { filename: "quinta-casa-da-adega.png", content: LOGO_PNG_BASE64, contentId: LOGO_CID };

// Best-effort abuse guard (per server instance): this endpoint emails an address typed by the visitor.
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function limited(key: string, max: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/pedido] RESEND_API is not set");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = parseProposalRequest(body);
  if (!parsed.ok) {
    // Honeypot hits get a fake success so bots learn nothing.
    if (parsed.error === "spam") return Response.json({ ok: true });
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const req = parsed.data;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(`ip:${ip}`, 5) || limited(`email:${req.email}`, 3)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const resend = new Resend(apiKey);
  const confirmation = confirmationEmail(req);
  const notification = notificationEmail(req);

  const [toCouple, toEstate] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: req.email,
      replyTo: CONTACT_EMAIL,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
      attachments: [logo],
      tags: [{ name: "type", value: "proposal_confirmation" }],
    }),
    resend.emails.send({
      from: FROM,
      to: CONTACT_EMAIL,
      replyTo: req.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      attachments: [logo],
      tags: [{ name: "type", value: "proposal_notification" }],
    }),
  ]);

  const failed = (r: PromiseSettledResult<{ error: unknown }>) => r.status === "rejected" || !!r.value.error;
  if (failed(toEstate)) console.error("[api/pedido] estate notification failed", toEstate.status === "rejected" ? toEstate.reason : toEstate.value.error);
  if (failed(toCouple)) {
    console.error("[api/pedido] confirmation failed", toCouple.status === "rejected" ? toCouple.reason : toCouple.value.error);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
