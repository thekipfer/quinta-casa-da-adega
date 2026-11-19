/**
 * Shared, email-client-safe HTML shell: table layout, inline styles, 600px card on the site's cream.
 * Header: the logo (inline CID image) linking to the site. Footer: the estate's real contact details.
 * Everything user-provided must go through `esc()` before it reaches the HTML.
 */
import { ADDRESS_LINES, PHONE_DISPLAY, SITE_URL, WHATSAPP_NUMBER, socialLinks } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/i18n/orcamento";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";
import { LOGO_HEIGHT, LOGO_WIDTH } from "@/emails/logo";

export const LOGO_CID = "logo-quinta-casa-da-adega";

/** Site palette (globals.css), tuned slightly darker where email text needs the contrast. */
export const c = {
  brand: "#71654a",
  sand: "#d1b58e",
  sandDark: "#bc9c73",
  cream: "#f8f5f1",
  card: "#fbf8f3",
  line: "#e7e1d6",
  ink: "#3f3d39",
  body: "#66615a",
  muted: "#8a857c",
};

export const fonts = {
  display: "'Cormorant Garamond', 'Cormorant', Georgia, 'Times New Roman', serif",
  serif: "Georgia, 'Times New Roman', serif",
  ui: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped text with line breaks kept. */
export const escLines = (value: string) => esc(value).replace(/\r?\n/g, "<br>");

export const siteHref = (locale: Locale) => `${SITE_URL}${routes.home[locale] === "/" ? "" : routes.home[locale]}`;

const footerCopy: Record<Locale, { note: string; site: string }> = {
  pt: {
    note: "Recebeu este email porque fez um pedido de proposta em quintacasadaadega.com.",
    site: "quintacasadaadega.com",
  },
  en: {
    note: "You received this email because you requested a proposal at quintacasadaadega.com.",
    site: "quintacasadaadega.com",
  },
};

/** Footer link + separator: on phones the separators hide and the links wrap as spaced pills of text. */
const SEP = `<span class="sep" style="color:${c.sand};">&nbsp;&nbsp;·&nbsp;&nbsp;</span>`;
const link = (href: string, label: string) =>
  `<a class="lnk" href="${esc(href)}" target="_blank" style="color:${c.brand};text-decoration:none;white-space:nowrap;">${esc(label)}</a>`;

/** Bulletproof (table) button. */
export function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
  <tr><td align="center" bgcolor="${c.brand}" style="background:${c.brand};">
    <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:15px 38px;font-family:${fonts.ui};font-size:13px;line-height:16px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#ffffff;text-decoration:none;">${esc(label)}</a>
  </td></tr>
</table>`;
}

/** Label/value summary card. Values are escaped here. */
export function summary(title: string, rows: [string, string][]) {
  const body = rows
    .map(
      ([label, value], i) => `<tr>
      <td style="padding:${i === 0 ? "0" : "14px"} 0 0;font-family:${fonts.ui};font-size:11px;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;color:${c.sandDark};">${esc(label)}</td>
    </tr>
    <tr>
      <td style="padding:4px 0 0;font-family:${fonts.serif};font-size:17px;line-height:26px;color:${c.ink};">${escLines(value)}</td>
    </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.card};border:1px solid ${c.line};">
  <tr><td style="padding:26px 28px 28px;">
    <p style="margin:0 0 18px;font-family:${fonts.display};font-size:24px;line-height:28px;color:${c.brand};">${esc(title)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>
  </td></tr>
</table>`;
}

/** Full document. `content` is trusted HTML built from the helpers above. */
export function layout({
  locale,
  title,
  preheader,
  content,
  showNote = true,
}: {
  locale: Locale;
  title: string;
  preheader: string;
  content: string;
  showNote?: boolean;
}) {
  const f = footerCopy[locale];
  const home = siteHref(locale);
  const social = socialLinks
    .filter((s) => s.icon !== "whatsapp")
    .map((s) => link(s.href, s.label))
    .join(SEP);
  const phoneDigits = PHONE_DISPLAY.replace(/\s/g, "");

  return `<!doctype html>
<html lang="${locale === "pt" ? "pt-PT" : "en-GB"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:${c.cream}; -webkit-text-size-adjust:100%; }
  a { color:${c.brand}; }
  @media (max-width: 620px) {
    .card { width:100% !important; }
    .px { padding-left:26px !important; padding-right:26px !important; }
    .h1 { font-size:36px !important; line-height:40px !important; }
    .sep { display:none !important; }
    .stack { display:block !important; }
    .lnk { display:inline-block !important; padding:4px 9px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${c.cream};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.cream}" style="background:${c.cream};">
  <tr><td align="center" style="padding:36px 12px 28px;">
    <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;">
      <!-- Header: logo → site -->
      <tr><td align="center" style="padding:44px 40px 30px;">
        <a href="${esc(home)}" target="_blank" style="text-decoration:none;">
          <img src="cid:${LOGO_CID}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="Quinta Casa da Adega" style="display:block;width:${LOGO_WIDTH}px;max-width:100%;height:auto;border:0;outline:none;">
        </a>
      </td></tr>
      <tr><td class="px" style="padding:0 48px;"><div style="height:1px;line-height:1px;font-size:1px;background:${c.brand};">&nbsp;</div></td></tr>
      <!-- Content -->
      <tr><td class="px" style="padding:44px 48px 48px;">${content}</td></tr>
    </table>

    <!-- Footer -->
    <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
      <tr><td class="px" align="center" style="padding:34px 48px 8px;font-family:${fonts.ui};">
        <p style="margin:0;font-size:11px;line-height:16px;letter-spacing:4px;text-transform:uppercase;color:${c.brand};">Quinta Casa da Adega</p>
        <div style="width:28px;height:1px;line-height:1px;font-size:1px;background:${c.sand};margin:16px auto;">&nbsp;</div>
        <p style="margin:0;font-family:${fonts.serif};font-size:14px;line-height:22px;color:${c.muted};">
          ${ADDRESS_LINES.map(esc).join(" · ")}
        </p>
        <p style="margin:6px 0 0;font-family:${fonts.serif};font-size:14px;line-height:22px;color:${c.muted};">
          <a class="stack" href="tel:${phoneDigits}" style="color:${c.muted};text-decoration:none;">${esc(PHONE_DISPLAY)}</a><span class="sep" style="color:${c.sand};">&nbsp;·&nbsp;</span><a class="stack" href="mailto:${CONTACT_EMAIL}" style="color:${c.muted};text-decoration:none;">${CONTACT_EMAIL}</a>
        </p>
        <p style="margin:16px 0 0;font-size:12px;line-height:18px;letter-spacing:1px;">
          ${link(home, f.site)}${SEP}${social}${SEP}${link(`https://wa.me/${WHATSAPP_NUMBER}`, "WhatsApp")}
        </p>
        ${showNote ? `<p style="margin:22px 0 0;font-size:11px;line-height:17px;color:#a8a39a;">${esc(f.note)}</p>` : ""}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
