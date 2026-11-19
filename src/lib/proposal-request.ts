/**
 * The proposal requests sent by the site's two forms — the /orcamento form and the proposal quiz —
 * to POST /api/pedido, which emails a confirmation to the couple and a copy to the estate.
 * Shared by client (types, payload) and server (validation, summary rows). No server-only imports.
 */
import { getDictionary } from "@/lib/i18n";
import { getOrcamento, type ContactPreference, type GuestRange } from "@/lib/i18n/orcamento";
import type { Locale } from "@/lib/i18n/types";
import type { QuizChoiceStep } from "@/types/content";

export const PROPOSAL_ENDPOINT = "/api/pedido";

type Common = {
  locale: Locale;
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot: real visitors never fill it. */
  company?: string;
};

export type ProposalFormRequest = Common & {
  form: "proposal";
  /** "2027" … or "undecided". */
  year: string;
  /** 0–11, or null when no month was picked. */
  month: number | null;
  guests: GuestRange;
  contact: ContactPreference;
};

export type QuizRequest = Common & {
  form: "quiz";
  /** One of the quiz's year options (localized label). */
  year: string;
  /** yyyy-mm-dd, or "" when no date. */
  date: string;
  guests: string;
  services: string[];
};

export type ProposalRequest = ProposalFormRequest | QuizRequest;

/** Sends the request and waits for the server: true once the confirmation email was accepted. */
export async function submitProposalRequest(payload: ProposalRequest): Promise<boolean> {
  try {
    const res = await fetch(PROPOSAL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Fire-and-forget from the browser: never blocks or breaks the form's own WhatsApp / email flow. */
export function sendProposalRequest(payload: ProposalRequest) {
  try {
    void fetch(PROPOSAL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Network / serialization problems must not affect the visitor's submission.
  }
}

// ---------- server-side validation ----------

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_RE = /^[+\d\s().-]{0,40}$/;
const GUEST_RANGES: GuestRange[] = ["0-60", "60-90", "90-120", "120+"];

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function quizOptions(locale: Locale, key: QuizChoiceStep["key"]) {
  const step = getDictionary(locale).quiz.steps.find((s): s is QuizChoiceStep => s.kind !== "date" && s.key === key);
  return step?.options ?? [];
}

/** Returns a clean request, or an error code. Only known option values are accepted. */
export function parseProposalRequest(input: unknown): { ok: true; data: ProposalRequest } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "invalid" };
  const o = input as Record<string, unknown>;
  if (str(o.company, 200)) return { ok: false, error: "spam" };

  const locale: Locale = o.locale === "en" ? "en" : "pt";
  const name = str(o.name, 100).replace(/[\r\n]+/g, " ");
  const email = str(o.email, 254).toLowerCase();
  const phone = str(o.phone, 40);
  const message = str(o.message, 1500);
  if (!name) return { ok: false, error: "name" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "email" };
  if (!PHONE_RE.test(phone)) return { ok: false, error: "phone" };
  const common = { locale, name, email, phone, message };

  if (o.form === "proposal") {
    const year = str(o.year, 10);
    const thisYear = new Date().getFullYear();
    const yearOk = year === "undecided" || (/^\d{4}$/.test(year) && +year >= thisYear && +year <= thisYear + 6);
    const month = o.month === null || o.month === undefined ? null : Number(o.month);
    const guests = str(o.guests, 10) as GuestRange;
    const contact = o.contact === "email" ? "email" : o.contact === "whatsapp" ? "whatsapp" : null;
    if (!yearOk) return { ok: false, error: "year" };
    if (month !== null && !(Number.isInteger(month) && month >= 0 && month <= 11)) return { ok: false, error: "month" };
    if (!GUEST_RANGES.includes(guests)) return { ok: false, error: "guests" };
    if (!contact) return { ok: false, error: "contact" };
    return { ok: true, data: { form: "proposal", ...common, year, month: year === "undecided" ? null : month, guests, contact } };
  }

  if (o.form === "quiz") {
    const year = str(o.year, 60);
    const guests = str(o.guests, 60);
    const services = Array.isArray(o.services) ? o.services.map((s) => str(s, 80)) : [];
    const date = str(o.date, 10);
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)))) return { ok: false, error: "date" };
    // Picking a day on the calendar overwrites the year with that date's year, which may not be a listed option.
    const yearOk = quizOptions(locale, "year").includes(year) || (!!date && (year === "" || date.startsWith(year)));
    if (!yearOk) return { ok: false, error: "year" };
    if (!quizOptions(locale, "guests").includes(guests)) return { ok: false, error: "guests" };
    const allowed = quizOptions(locale, "services");
    if (services.length > allowed.length || !services.every((s) => allowed.includes(s))) return { ok: false, error: "services" };
    return { ok: true, data: { form: "quiz", ...common, year, date, guests, services } };
  }

  return { ok: false, error: "form" };
}

// ---------- summary rows (shared by both emails) ----------

const labels: Record<
  Locale,
  { date: string; year: string; guests: string; services: string; contact: string; phone: string; email: string; message: string; name: string; noDate: string }
> = {
  pt: {
    date: "Data",
    year: "Ano",
    guests: "Convidados",
    services: "Interesses",
    contact: "Contacto preferido",
    phone: "Telefone",
    email: "Email",
    message: "Mensagem",
    name: "Nome",
    noDate: "Ainda sem data definida",
  },
  en: {
    date: "Date",
    year: "Year",
    guests: "Guests",
    services: "Interests",
    contact: "Preferred contact",
    phone: "Phone",
    email: "Email",
    message: "Message",
    name: "Name",
    noDate: "No date set yet",
  },
};

/** Human-readable rows describing the request, in `locale`. `withContact` adds name/email (for the estate's copy). */
export function summaryRows(r: ProposalRequest, locale: Locale, withContact = false): [string, string][] {
  const l = labels[locale];
  const rows: [string, string][] = [];
  if (withContact) rows.push([l.name, r.name], [l.email, r.email]);

  if (r.form === "proposal") {
    const f = getOrcamento(locale).form;
    const when =
      r.year === "undecided" ? f.undecided : r.month !== null ? f.formatDate(f.monthsLong[r.month], r.year) : r.year;
    rows.push([l.date, when]);
    rows.push([l.guests, f.guests.find((g) => g.value === r.guests)?.label ?? r.guests]);
    rows.push([l.contact, r.contact === "whatsapp" ? "WhatsApp" : "Email"]);
  } else {
    const dateLocale = getDictionary(locale).dateLocale;
    const when = r.date
      ? new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
          new Date(`${r.date}T00:00:00Z`),
        )
      : r.year || l.noDate;
    rows.push([r.date ? l.date : l.year, when]);
    rows.push([l.guests, r.guests]);
    if (r.services.length) rows.push([l.services, r.services.join(", ")]);
  }

  if (r.phone) rows.push([l.phone, r.phone]);
  if (r.message) rows.push([l.message, r.message]);
  return rows;
}
