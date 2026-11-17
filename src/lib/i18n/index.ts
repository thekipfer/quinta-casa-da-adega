import type { Metadata } from "next";
import { SITE_ICONS, SITE_URL } from "@/lib/content";
import { en } from "@/lib/i18n/en";
import { pt } from "@/lib/i18n/pt";
import type { Dictionary, Locale } from "@/lib/i18n/types";

export type { Dictionary, Locale };

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const locales = Object.values(dictionaries);

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Page metadata for the home page in `locale`, with hreflang alternates pointing at every language. */
export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const { title, description } = t.meta;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: t.homeHref,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l.htmlLang, l.homeHref])),
        "x-default": pt.homeHref,
      },
    },
    icons: SITE_ICONS,
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: locales.filter((l) => l.locale !== locale).map((l) => l.ogLocale),
      url: t.homeHref,
      siteName: "Quinta Casa da Adega",
      title,
      description,
      images: [{ url: "/seo/og-image.jpg", width: 1024, height: 683, alt: t.meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/seo/og-image.jpg"],
    },
  };
}
