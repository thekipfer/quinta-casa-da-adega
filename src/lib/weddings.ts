import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/types";
import { itemPaths, routes } from "@/lib/routes";
import { localizedMetadata } from "@/lib/seo";
import type { ImageAsset } from "@/types/content";

/**
 * Real weddings ("Casamentos") — copied from quintacasadaadega.com/categoria/casamentos/ and each
 * /servico/casamento/<slug>/ page. Served at /casamentos/<slug> (pt) and /en/weddings/<slug> (en);
 * the slug is shared by both languages. Photos live in public/images/casamentos/<slug>/.
 */

export const weddingsHref = (locale: Locale) => routes.weddings[locale];
export const weddingHref = (locale: Locale, slug: string) => itemPaths("weddings", slug)[locale];

type Img = ImageAsset & { alt: string };

/** A wedding with its copy in one language — what the pages render. */
export interface Wedding {
  slug: string;
  title: string;
  /** ISO date (yyyy-mm-dd) — used for ordering and <time dateTime>. */
  date: string;
  /** Date as shown on the page. */
  dateLabel: string;
  /** Meta description / share text. */
  description: string;
  /** Body copy, one string per paragraph. */
  content: string[];
  /** Card image on the weddings grid and the social share image. */
  cover: Img;
  gallery: Img[];
}

type WeddingCopy = Pick<Wedding, "title" | "dateLabel" | "description" | "content">;

interface WeddingSource {
  slug: string;
  couple: string;
  date: string;
  copy: Record<Locale, WeddingCopy>;
  cover: ImageAsset;
  gallery: ImageAsset[];
}

const altText: Record<Locale, (couple: string, n?: number) => string> = {
  pt: (couple, n) => `Casamento ${couple} na Quinta Casa da Adega${n ? ` – foto ${n}` : ""}`,
  en: (couple, n) => `${couple}’s wedding at Quinta Casa da Adega${n ? ` – photo ${n}` : ""}`,
};

const photos = (slug: string, files: string[], width: number, height: number): ImageAsset[] =>
  files.map((file) => ({ src: `/images/casamentos/${slug}/${file}`, width, height }));

/** Newest first, matching the original category page. */
const sources: WeddingSource[] = [
  {
    slug: "erika-simon",
    couple: "Erika & Simon",
    date: "2025-10-04",
    copy: {
      pt: {
        title: "Erika & Simon",
        dateLabel: "4 de Outubro, 2025",
        description:
          "O casamento da Erika & Simon foi uma celebração repleta de amor, alegria e momentos especiais, partilhados com família e amigos na Quinta Casa da Adega.",
        content: [
          "O casamento da Erika & Simon foi uma celebração repleta de amor, alegria e momentos especiais, partilhados com família e amigos na Quinta Casa da Adega.",
        ],
      },
      en: {
        title: "Erika & Simon",
        dateLabel: "4 October, 2025",
        description:
          "Erika & Simon’s wedding was a celebration full of love, joy and special moments, shared with family and friends at Quinta Casa da Adega.",
        content: [
          "Erika & Simon’s wedding was a celebration full of love, joy and special moments, shared with family and friends at Quinta Casa da Adega.",
        ],
      },
    },
    cover: { src: "/images/casamentos/erika-simon/capa.jpg", width: 1067, height: 1600 },
    gallery: photos(
      "erika-simon",
      ["2", "4", "10", "33", "25", "27", "28", "29", "19", "20", "22", "14", "12", "11", "6"].map((n) => `foto-${n}.jpg`),
      1067,
      1600,
    ),
  },
  {
    slug: "larissa-daniel",
    couple: "Larissa & Daniel",
    date: "2025-09-02",
    copy: {
      pt: {
        title: "Casamento Larissa & Daniel",
        dateLabel: "2 de Setembro, 2025",
        description:
          "Entre a luz suave do campo e a magia do entardecer, o casamento de Larissa & Daniel ganhou vida com detalhes vibrantes e cheios de personalidade...",
        content: [
          "O casamento de Larissa & Daniel foi marcado por cores vibrantes, flores naturais e uma atmosfera romântica. Entre uma cerimónia ao ar livre e um jantar iluminado por luzes suspensas, cada detalhe refletiu a personalidade do casal e a beleza intemporal da Quinta Casa da Adega.",
        ],
      },
      en: {
        title: "Larissa & Daniel’s Wedding",
        dateLabel: "2 September, 2025",
        description:
          "Between the soft countryside light and the magic of sunset, Larissa & Daniel’s wedding came to life with vibrant details full of personality...",
        content: [
          "Larissa & Daniel’s wedding was defined by vibrant colours, natural flowers and a romantic atmosphere. From an open-air ceremony to a dinner lit by hanging lights, every detail reflected the couple’s personality and the timeless beauty of Quinta Casa da Adega.",
        ],
      },
    },
    cover: { src: "/images/casamentos/larissa-daniel/capa.jpg", width: 1138, height: 738 },
    gallery: [
      ...photos("larissa-daniel", ["foto-1.webp", "foto-2.webp", "foto-3.webp", "foto-4.webp"], 1138, 1707),
      { src: "/images/casamentos/larissa-daniel/foto-5.webp", width: 1280, height: 854 },
    ],
  },
];

function localize(w: WeddingSource, locale: Locale): Wedding {
  const alt = altText[locale];
  return {
    slug: w.slug,
    date: w.date,
    ...w.copy[locale],
    cover: { ...w.cover, alt: alt(w.couple) },
    gallery: w.gallery.map((p, i) => ({ ...p, alt: alt(w.couple, i + 1) })),
  };
}

const localized: Record<Locale, Wedding[]> = {
  pt: sources.map((w) => localize(w, "pt")),
  en: sources.map((w) => localize(w, "en")),
};

/** Every slug, for generateStaticParams (identical in both languages). */
export const weddingSlugs = sources.map((w) => w.slug);

export function getWeddings(locale: Locale): Wedding[] {
  return localized[locale];
}

export function getWedding(locale: Locale, slug: string): Wedding | undefined {
  return localized[locale].find((w) => w.slug === slug);
}

/** Older and newer neighbours in the newest-first list (the original's "Post anterior" / "Post seguinte"). */
export function getAdjacentWeddings(locale: Locale, slug: string) {
  const list = localized[locale];
  const i = list.findIndex((w) => w.slug === slug);
  return { previous: list[i + 1], next: i > 0 ? list[i - 1] : undefined };
}

/** Interface copy of the weddings list and detail pages. */
export const weddingsUi = {
  pt: {
    home: "Início",
    title: "Casamentos",
    category: "Categoria:",
    date: "Data:",
    share: "Partilhar:",
    shareOn: (network: string) => `Partilhar no ${network}`,
    otherWeddings: "Outros casamentos",
    previous: "Casamento anterior",
    next: "Casamento seguinte",
    more: "Mais casamentos",
    enlarge: (n: number, total: number) => `Ampliar foto ${n} de ${total}`,
    gallery: (title: string) => `${title} — galeria de fotos`,
    closeGallery: "Fechar galeria",
    previousPhoto: "Foto anterior",
    nextPhoto: "Foto seguinte",
  },
  en: {
    home: "Home",
    title: "Weddings",
    category: "Category:",
    date: "Date:",
    share: "Share:",
    shareOn: (network: string) => `Share on ${network}`,
    otherWeddings: "Other weddings",
    previous: "Previous wedding",
    next: "Next wedding",
    more: "More weddings",
    enlarge: (n: number, total: number) => `Enlarge photo ${n} of ${total}`,
    gallery: (title: string) => `${title} — photo gallery`,
    closeGallery: "Close gallery",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
  },
} satisfies Record<Locale, unknown>;

const listMeta: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Casamentos | Quinta Casa da Adega",
    description:
      "Casamentos reais na Quinta Casa da Adega, em Gradil, Mafra — histórias de amor celebradas com família e amigos na nossa quinta.",
  },
  en: {
    title: "Weddings | Quinta Casa da Adega",
    description:
      "Real weddings at Quinta Casa da Adega in Gradil, Mafra — love stories celebrated with family and friends at our estate.",
  },
};

export function weddingsMetadata(locale: Locale): Metadata {
  return localizedMetadata({
    locale,
    paths: routes.weddings,
    ...listMeta[locale],
    image: localized[locale][0].cover,
  });
}

export function weddingMetadata(locale: Locale, w: Wedding): Metadata {
  return localizedMetadata({
    locale,
    paths: itemPaths("weddings", w.slug),
    title: `${w.title} | Quinta Casa da Adega`,
    description: w.description,
    image: w.cover,
    type: "article",
  });
}
