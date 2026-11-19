import type { Locale } from "@/lib/i18n/types";

/**
 * Every page's path in each language. English lives under /en with only the section ("category")
 * segment translated — item slugs (a wedding or a service) are the same in both languages:
 *   /casamentos/larissa-daniel  ↔  /en/weddings/larissa-daniel
 */
export const routes = {
  home: { pt: "/", en: "/en" },
  about: { pt: "/sobre", en: "/en/about" },
  services: { pt: "/servicos", en: "/en/services" },
  weddings: { pt: "/casamentos", en: "/en/weddings" },
  quote: { pt: "/orcamento", en: "/en/quote" },
  /** Shown after the proposal form is sent (noindex; also the Google Ads conversion URL). */
  thankYou: { pt: "/obrigado", en: "/en/thank-you" },
} satisfies Record<string, Record<Locale, string>>;

export type Section = keyof typeof routes;
export type LocalizedPaths = Record<Locale, string>;

/** Paths of one item (`/<section>/<slug>`) in every language. */
export function itemPaths(section: Section, slug: string): LocalizedPaths {
  const base = routes[section];
  return { pt: `${base.pt}/${slug}`, en: `${base.en}/${slug}` };
}
