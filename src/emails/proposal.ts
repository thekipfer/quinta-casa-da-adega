/**
 * The two emails sent for every proposal request:
 *  - confirmation → the couple, in the language they used on the site;
 *  - notification → the estate (Portuguese), with reply-to set to the couple.
 */
import { WHATSAPP_NUMBER } from "@/lib/content";
import type { Locale } from "@/lib/i18n/types";
import { summaryRows, type ProposalRequest } from "@/lib/proposal-request";
import { button, c, esc, fonts, layout, siteHref, summary } from "@/emails/layout";

type Built = { subject: string; html: string; text: string };

const copy: Record<
  Locale,
  {
    subject: string;
    preheader: (first: string) => string;
    eyebrow: string;
    title: (first: string) => string;
    intro: string;
    summaryTitle: string;
    meanwhile: string;
    cta: string;
    whatsapp: string;
    signoff: string;
    team: string;
  }
> = {
  pt: {
    subject: "Recebemos o vosso pedido — Quinta Casa da Adega",
    preheader: (first) => `Obrigado, ${first}. Respondemos com uma proposta personalizada em 24 a 48 horas.`,
    eyebrow: "Pedido de proposta",
    title: (first) => `Obrigado, ${first}.`,
    intro:
      "Recebemos o vosso pedido para celebrar o casamento na Quinta Casa da Adega. A nossa equipa vai analisá-lo com todo o cuidado e responder com uma proposta personalizada em 24 a 48 horas.",
    summaryTitle: "O vosso pedido",
    meanwhile: "Enquanto isso, conheçam melhor a quinta e alguns dos casamentos que já tivemos o privilégio de receber.",
    cta: "Visitar o site",
    whatsapp: "Ou falem connosco no WhatsApp",
    signoff: "Com carinho,",
    team: "A equipa da Quinta Casa da Adega",
  },
  en: {
    subject: "We’ve received your request — Quinta Casa da Adega",
    preheader: (first) => `Thank you, ${first}. We’ll reply with a bespoke proposal within 24 to 48 hours.`,
    eyebrow: "Proposal request",
    title: (first) => `Thank you, ${first}.`,
    intro:
      "We’ve received your request to celebrate your wedding at Quinta Casa da Adega. Our team will look at it with every care and reply with a bespoke proposal within 24 to 48 hours.",
    summaryTitle: "Your request",
    meanwhile: "In the meantime, get to know the estate and some of the weddings we’ve had the privilege of hosting.",
    cta: "Visit the website",
    whatsapp: "Or message us on WhatsApp",
    signoff: "With warm wishes,",
    team: "The Quinta Casa da Adega team",
  },
};

/** A couple ("Ana & Miguel", "Ana e Miguel", "Ana and Miguel") stays whole; "Ana Silva" → "Ana". */
const firstName = (name: string) => (/&|\+|\s(e|and)\s/i.test(name) ? name : name.split(/\s+/)[0]);

export function confirmationEmail(r: ProposalRequest): Built {
  const t = copy[r.locale];
  const first = firstName(r.name);
  const rows = summaryRows(r, r.locale);
  const home = siteHref(r.locale);
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}`;

  const content = `
    <p style="margin:0;font-family:${fonts.ui};font-size:11px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${c.sandDark};text-align:center;">${esc(t.eyebrow)}</p>
    <h1 class="h1" style="margin:14px 0 0;font-family:${fonts.display};font-size:44px;line-height:48px;font-weight:400;color:${c.brand};text-align:center;">${esc(t.title(first))}</h1>
    <p style="margin:22px 0 0;font-family:${fonts.serif};font-size:17px;line-height:28px;color:${c.body};text-align:center;">${esc(t.intro)}</p>
    <div style="height:34px;line-height:34px;font-size:1px;">&nbsp;</div>
    ${summary(t.summaryTitle, rows)}
    <p style="margin:34px 0 26px;font-family:${fonts.serif};font-size:17px;line-height:28px;color:${c.body};text-align:center;">${esc(t.meanwhile)}</p>
    ${button(home, t.cta)}
    <p style="margin:18px 0 0;font-family:${fonts.serif};font-size:15px;line-height:22px;text-align:center;">
      <a href="${whatsapp}" target="_blank" style="color:${c.brand};text-decoration:underline;text-underline-offset:3px;">${esc(t.whatsapp)}</a>
    </p>
    <p style="margin:40px 0 0;font-family:${fonts.serif};font-size:16px;line-height:26px;color:${c.body};text-align:center;font-style:italic;">${esc(t.signoff)}</p>
    <p style="margin:2px 0 0;font-family:${fonts.display};font-size:22px;line-height:28px;color:${c.brand};text-align:center;">${esc(t.team)}</p>`;

  const text = [
    t.title(first),
    "",
    t.intro,
    "",
    `${t.summaryTitle}:`,
    ...rows.map(([label, value]) => `- ${label}: ${value}`),
    "",
    t.meanwhile,
    `${t.cta}: ${home}`,
    `WhatsApp: ${whatsapp}`,
    "",
    t.signoff,
    t.team,
  ].join("\n");

  return { subject: t.subject, html: layout({ locale: r.locale, title: t.subject, preheader: t.preheader(first), content }), text };
}

/** Internal copy for the estate (always Portuguese). Reply-to is the couple, so "Responder" answers them. */
export function notificationEmail(r: ProposalRequest): Built {
  const source = r.form === "quiz" ? "Questionário de proposta" : "Formulário de orçamento";
  const lang = r.locale === "en" ? "inglês" : "português";
  const rows = summaryRows(r, "pt", true);
  const subject = `Novo pedido de proposta — ${r.name}`;
  const content = `
    <p style="margin:0;font-family:${fonts.ui};font-size:11px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${c.sandDark};">Novo pedido · ${esc(source)}</p>
    <h1 class="h1" style="margin:12px 0 0;font-family:${fonts.display};font-size:38px;line-height:42px;font-weight:400;color:${c.brand};">${esc(r.name)}</h1>
    <p style="margin:12px 0 28px;font-family:${fonts.serif};font-size:16px;line-height:26px;color:${c.body};">Pedido feito no site em ${lang}. Respondam diretamente a este email para falar com o casal — a confirmação já lhes foi enviada.</p>
    ${summary("Detalhes do pedido", rows)}`;
  const text = [`${subject} (${source}, ${lang})`, "", ...rows.map(([l, v]) => `- ${l}: ${v}`)].join("\n");
  return { subject, html: layout({ locale: "pt", title: subject, preheader: `${source} · ${r.email}`, content, showNote: false }), text };
}
