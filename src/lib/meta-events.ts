/**
 * Meta Pixel event plan for a wedding venue site. Every event goes through trackMetaEvent, so nothing
 * is sent without Marketing consent (see src/lib/tracking.ts).
 *
 *   PageView      every page (loader + client navigations)
 *   ViewContent   service, real-wedding, venue (A Nossa Quinta / The Venue) and proposal-form pages
 *   Lead          a proposal request actually sent: the /orcamento form (server accepted it) or the
 *                 home quiz (hands the request off to WhatsApp). This is the event to optimise ads for.
 *   Contact       clicks on WhatsApp, phone and email links anywhere on the site
 *   FindLocation  clicks on the Google Maps link ("Ver no mapa")
 *
 * Shared params: content_category / content_type for audiences and reporting, language ("pt" | "en").
 */
import { trackMetaEvent } from "@/lib/tracking";

type Lang = "pt" | "en";

const langOf = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt");

/** "design-floral" → "Design Floral", "erika-simon" → "Erika Simon". */
const humanize = (slug: string) =>
  decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

type RouteRule = {
  test: RegExp;
  content_category: string;
  content_type: string;
  /** Fixed name for single pages; otherwise the humanized slug (capture group 2) is used. */
  name?: string;
};

const routeRules: RouteRule[] = [
  { test: /^\/(servicos|en\/services)\/([^/]+)\/?$/, content_category: "Serviços", content_type: "service" },
  { test: /^\/(casamentos|en\/weddings)\/([^/]+)\/?$/, content_category: "Casamentos reais", content_type: "real_wedding" },
  { test: /^\/(casamentos|en\/weddings)\/?$/, content_category: "Casamentos reais", content_type: "real_weddings", name: "Casamentos" },
  { test: /^\/(sobre|en\/about)\/?$/, content_category: "A Quinta", content_type: "venue", name: "A Nossa Quinta" },
  { test: /^\/(orcamento|en\/quote)\/?$/, content_category: "Pedido de proposta", content_type: "proposal_form", name: "Pedido de proposta" },
];

/** ViewContent for the pages that show interest in the venue. Call on every route change (incl. first load). */
export function trackRouteView(pathname: string) {
  for (const rule of routeRules) {
    const m = rule.test.exec(pathname);
    if (!m) continue;
    const slug = m[2];
    trackMetaEvent({
      name: "ViewContent",
      params: {
        content_name: rule.name ?? humanize(slug ?? ""),
        content_category: rule.content_category,
        content_type: rule.content_type,
        ...(slug ? { content_ids: [slug] } : {}),
        language: langOf(pathname),
      },
    });
    return;
  }
}

function newEventId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/** A proposal request was sent. `source` distinguishes the full form from the quick quiz. */
export function trackLead(source: "proposal_form" | "quiz_whatsapp") {
  trackMetaEvent({
    name: "Lead",
    params: {
      content_name: "Pedido de proposta",
      content_category: "Casamento",
      lead_source: source,
      language: langOf(window.location.pathname),
    },
    eventID: newEventId(),
  });
}

/** Contact / FindLocation for a clicked link, or nothing for ordinary links. */
export function trackLinkClick(href: string) {
  const language = langOf(window.location.pathname);
  let method: string | null = null;
  if (/^(https?:)?\/\/(api\.whatsapp\.com|wa\.me|wa\.link|chat\.whatsapp\.com)\b/i.test(href) || href.startsWith("whatsapp:")) {
    method = "whatsapp";
  } else if (href.startsWith("tel:")) {
    method = "phone";
  } else if (href.startsWith("mailto:")) {
    method = "email";
  }
  if (method) {
    trackMetaEvent({ name: "Contact", params: { contact_method: method, language } });
    return;
  }
  if (/^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(href)) {
    trackMetaEvent({ name: "FindLocation", params: { content_name: "Quinta Casa da Adega", language } });
  }
}
