/**
 * Schema.org JSON-LD builders. Every fact here already appears on the site (address, phone, email,
 * social profiles, "15 weddings a year, one per day", outdoor ceremony, plan B, São Silvestre view).
 * Capacity, prices and coordinates are deliberately absent: none of them is published by the venue.
 */
import { MAPS_HREF, PHONE_DISPLAY, SITE_URL, socialLinks } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/i18n/orcamento";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";

export const VENUE_ID = `${SITE_URL}/#venue`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`);
const inLanguage: Record<Locale, string> = { pt: "pt-PT", en: "en-GB" };

const venueCopy: Record<
  Locale,
  { description: string; features: string[]; services: { name: string; slug: string }[] }
> = {
  pt: {
    description:
      "Quinta para casamentos em Gradil, Mafra, perto de Lisboa. Cerimónias ao ar livre com vista para a Igreja de São Silvestre, plano B preparado para qualquer condição e apenas 15 casamentos por ano — um casamento por dia.",
    features: [
      "Cerimónia ao ar livre",
      "Plano B preparado para qualquer condição",
      "Vista para a Igreja de São Silvestre",
      "Um casamento por dia",
      "Visitas privadas à quinta",
    ],
    services: [
      { name: "Decoração de mesas", slug: "decoracao-de-mesas" },
      { name: "Design floral", slug: "design-floral" },
      { name: "Equipa especializada", slug: "equipa-especializada" },
    ],
  },
  en: {
    description:
      "Wedding venue in Gradil, Mafra, near Lisbon, Portugal. Outdoor ceremonies overlooking São Silvestre Church, a plan B ready for any weather and only 15 weddings a year — one wedding per day.",
    features: [
      "Outdoor ceremony",
      "Plan B ready for any weather",
      "View of São Silvestre Church",
      "One wedding per day",
      "Private visits to the estate",
    ],
    services: [
      { name: "Table decoration", slug: "decoracao-de-mesas" },
      { name: "Floral design", slug: "design-floral" },
      { name: "Specialist team", slug: "equipa-especializada" },
    ],
  },
};

/** Places couples come from — the venue serves them, it isn't located there. */
const areaServed = [
  { "@type": "City", name: "Mafra" },
  { "@type": "City", name: "Lisboa" },
  { "@type": "City", name: "Sintra" },
  { "@type": "City", name: "Cascais" },
  { "@type": "City", name: "Oeiras" },
  { "@type": "City", name: "Odivelas" },
  { "@type": "Country", name: "Portugal" },
  { "@type": "Country", name: "United Kingdom" },
];

/** The venue itself: a LocalBusiness that is also an EventVenue (wedding venue). */
export function venueSchema(locale: Locale) {
  const copy = venueCopy[locale];
  return {
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": VENUE_ID,
    name: "Quinta Casa da Adega",
    alternateName: locale === "pt" ? "Quinta para casamentos em Mafra" : "Wedding venue near Lisbon",
    description: copy.description,
    url: abs(routes.home[locale]),
    logo: abs("/images/logo-quinta.png"),
    image: [abs("/seo/og-image.jpg"), abs("/images/sobre/ceremony-editorial.webp"), abs("/images/hero-1.webp")],
    telephone: `+${PHONE_DISPLAY.replace(/\D/g, "")}`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua das Forças Armadas, 34",
      postalCode: "2665-118",
      addressLocality: "Gradil, Mafra",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    hasMap: MAPS_HREF,
    sameAs: socialLinks.filter((s) => s.icon !== "whatsapp").map((s) => s.href),
    areaServed,
    knowsLanguage: ["pt-PT", "en"],
    slogan: locale === "pt" ? "Apenas 15 casamentos por ano" : "Only 15 weddings a year",
    amenityFeature: copy.features.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "pt" ? "Serviços para casamentos" : "Wedding services",
      itemListElement: copy.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: abs(`${routes.services[locale]}/${s.slug}`),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Quinta Casa da Adega",
    inLanguage: ["pt-PT", "en-GB"],
    publisher: { "@id": VENUE_ID },
  };
}

/** Breadcrumb trail; the last item (current page) may omit its path. */
export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: abs(item.path) } : {}),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/** A list page (weddings, services) and the items it links to. */
export function collectionSchema(locale: Locale, path: string, name: string, items: { name: string; path: string }[]) {
  return {
    "@type": "CollectionPage",
    url: abs(path),
    name,
    inLanguage: inLanguage[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": VENUE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: abs(item.path) })),
    },
  };
}

export function serviceSchema(
  locale: Locale,
  s: { name: string; description: string; path: string; image: string; serviceType: string },
) {
  return {
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: abs(s.path),
    image: abs(s.image),
    inLanguage: inLanguage[locale],
    provider: { "@id": VENUE_ID },
    areaServed,
  };
}

/** A real wedding's photo story: an image gallery taken at the venue on the wedding day. */
export function weddingGallerySchema(
  locale: Locale,
  w: { title: string; description: string; path: string; date: string; images: { src: string; alt: string }[] },
) {
  return {
    "@type": "ImageGallery",
    name: w.title,
    description: w.description,
    url: abs(w.path),
    inLanguage: inLanguage[locale],
    dateCreated: w.date,
    contentLocation: { "@id": VENUE_ID },
    isPartOf: { "@id": WEBSITE_ID },
    image: w.images.map((img) => ({ "@type": "ImageObject", contentUrl: abs(img.src), caption: img.alt })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
