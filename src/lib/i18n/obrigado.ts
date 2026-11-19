import type { Metadata } from "next";
import { SITE_ICONS, SITE_URL } from "@/lib/content";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";

/**
 * "Obrigado" / "Thank you" page (/obrigado · /en/thank-you), shown after the proposal form is sent.
 * Every promise here matches the site: confirmation email, bespoke proposal in 24–48 h, private visit.
 */

export const thankYouImage = {
  src: "/images/sobre/ceremony-editorial.webp",
  width: 1600,
  height: 854,
};

const content = {
  pt: {
    meta: { title: "Obrigado | Quinta Casa da Adega", description: "O vosso pedido de proposta foi recebido." },
    eyebrow: "Pedido recebido",
    title: "Obrigado",
    lead: "Recebemos o vosso pedido e enviámos-vos um email de confirmação. A nossa equipa responde com uma proposta personalizada em 24 a 48 horas.",
    spam: "Não encontram o email? Espreitem a pasta de spam ou de promoções.",
    stepsTitle: "Os próximos passos",
    steps: [
      { title: "Analisamos o vosso pedido", text: "Lemos cada detalhe com atenção para preparar algo à vossa medida." },
      { title: "Enviamos a vossa proposta", text: "Uma proposta personalizada, em 24 a 48 horas." },
      { title: "Visitam a quinta", text: "Uma visita privada e sem compromisso, para imaginarem o vosso dia." },
    ],
    primary: { label: "Conhecer a quinta", href: routes.about.pt },
    secondary: { label: "Ver casamentos reais", href: routes.weddings.pt },
    whatsapp: "Falar connosco no WhatsApp",
    imageAlt: "Mesa de casamento com flores brancas e vista para os campos, na Quinta Casa da Adega",
  },
  en: {
    meta: { title: "Thank you | Quinta Casa da Adega", description: "Your proposal request has been received." },
    eyebrow: "Request received",
    title: "Thank you",
    lead: "We’ve received your request and sent you a confirmation email. Our team will reply with a bespoke proposal within 24 to 48 hours.",
    spam: "Can’t find the email? Have a look in your spam or promotions folder.",
    stepsTitle: "What happens next",
    steps: [
      { title: "We review your request", text: "We read every detail carefully to prepare something tailored to you." },
      { title: "We send your proposal", text: "A bespoke proposal, within 24 to 48 hours." },
      { title: "You visit the estate", text: "A private visit with no obligation, to picture your day." },
    ],
    primary: { label: "Discover the estate", href: routes.about.en },
    secondary: { label: "See real weddings", href: routes.weddings.en },
    whatsapp: "Message us on WhatsApp",
    imageAlt: "Wedding table with white flowers overlooking the countryside at Quinta Casa da Adega",
  },
} satisfies Record<Locale, unknown>;

export const getThankYou = (locale: Locale) => content[locale];

/** Kept out of search results (noindex) and out of the sitemap: it only makes sense after a submission. */
export function thankYouMetadata(locale: Locale): Metadata {
  const { title, description } = content[locale].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: routes.thankYou[locale] },
    icons: SITE_ICONS,
  };
}
