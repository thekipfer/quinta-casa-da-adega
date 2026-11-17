import type { Metadata } from "next";
import { SITE_ICONS, SITE_URL } from "@/lib/content";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import type { LocalizedPaths } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Metadata for a page that exists in every language at `paths`: canonical for `locale`,
 * hreflang alternates for each language (Portuguese as x-default), Open Graph and Twitter cards.
 */
export function localizedMetadata({
  locale,
  paths,
  title,
  description,
  image,
  type = "website",
}: {
  locale: Locale;
  paths: LocalizedPaths;
  title: string;
  description: string;
  image: ImageAsset & { alt: string };
  type?: "website" | "article";
}): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: paths[locale],
      languages: {
        ...Object.fromEntries(locales.map((l) => [l.htmlLang, paths[l.locale]])),
        "x-default": paths.pt,
      },
    },
    icons: SITE_ICONS,
    openGraph: {
      type,
      locale: t.ogLocale,
      alternateLocale: locales.filter((l) => l.locale !== locale).map((l) => l.ogLocale),
      url: paths[locale],
      siteName: "Quinta Casa da Adega",
      title,
      description,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
  };
}
