import type { MetadataRoute } from "next";
import { SITE_URL, heroSlides } from "@/lib/content";
import { getServices } from "@/lib/i18n/servicos";
import { PRIVACY_HREF } from "@/lib/i18n/privacidade";
import { itemPaths, routes, type LocalizedPaths } from "@/lib/routes";
import { getWeddings } from "@/lib/weddings";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** One entry per Portuguese URL, with its English counterpart as an hreflang alternate (and vice versa). */
function localized(paths: LocalizedPaths, priority: number, images: string[] = []): MetadataRoute.Sitemap {
  const languages = { "pt-PT": abs(paths.pt), "en-GB": abs(paths.en), "x-default": abs(paths.pt) };
  return (["pt", "en"] as const).map((locale) => ({
    url: abs(paths[locale]),
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
    ...(images.length ? { images: images.map(abs) } : {}),
  }));
}

/**
 * Every public, indexable page. Left out on purpose: the cookie policy and thank-you pages (robots
 * noindex), the 404, and /servicos · /en/services (no list page; they redirect home).
 * No lastModified: the content has no reliable per-page edit date, and a build timestamp would be inaccurate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const weddings = getWeddings("pt");
  const services = getServices("pt");

  return [
    ...localized(routes.home, 1, heroSlides.map((s) => s.src)),
    ...localized(routes.about, 0.9, ["/images/sobre/ceremony-editorial.webp"]),
    ...localized(routes.weddings, 0.8, weddings.map((w) => w.cover.src)),
    ...weddings.flatMap((w) => localized(itemPaths("weddings", w.slug), 0.7, w.gallery.map((p) => p.src))),
    ...services.flatMap((s) => localized(itemPaths("services", s.slug), 0.6, s.gallery.map((p) => p.src))),
    ...localized(routes.quote, 0.9),
    { url: abs(PRIVACY_HREF), changeFrequency: "yearly", priority: 0.2 },
  ];
}
