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
  /** Search-result title (before " | Quinta Casa da Adega"): couple, "wedding" and place. */
  seoTitle: string;
  /** ISO date (yyyy-mm-dd) — used for ordering and <time dateTime>. */
  date: string;
  /** Date as shown on the page. */
  dateLabel: string;
  /** Meta description / share text: style, season and where at the estate it happened (all visible in the photos). */
  description: string;
  /** Body copy, one string per paragraph. */
  content: string[];
  /** Card image on the weddings grid and the social share image. */
  cover: Img;
  /** Photo for the home-page "Casamentos na Quinta" section, shown cropped to 3:2 (falls back to `cover`). */
  landscape: Img & { position?: string };
  gallery: Img[];
}

type WeddingCopy = Pick<Wedding, "title" | "seoTitle" | "dateLabel" | "description" | "content">;
type Caption = Record<Locale, string>;
type Photo = ImageAsset & { caption: Caption };

interface WeddingSource {
  slug: string;
  couple: string;
  date: string;
  copy: Record<Locale, WeddingCopy>;
  cover: Photo;
  /** `position` is the CSS object-position of the 3:2 crop, for portrait photos. */
  landscape?: Photo & { position?: string };
  gallery: Photo[];
}

/** Gallery photos: [file, PT caption, EN caption] — each caption describes what is actually in the photo. */
const photos = (slug: string, width: number, height: number, items: [string, string, string][]): Photo[] =>
  items.map(([file, pt, en]) => ({ src: `/images/casamentos/${slug}/${file}`, width, height, caption: { pt, en } }));

/** Newest first, matching the original category page. */
const sources: WeddingSource[] = [
  {
    slug: "erika-simon",
    couple: "Erika & Simon",
    date: "2025-10-04",
    copy: {
      pt: {
        title: "Erika & Simon",
        seoTitle: "Casamento de Erika & Simon em Mafra",
        dateLabel: "4 de Outubro, 2025",
        description:
          "Casamento de Erika & Simon em outubro de 2025 na Quinta Casa da Adega: flores brancas, cerimónia no jardim e jantar sob a tenda no pátio, com família e amigos.",
        content: [
          "O casamento da Erika & Simon foi uma celebração repleta de amor, alegria e momentos especiais, partilhados com família e amigos na Quinta Casa da Adega.",
        ],
      },
      en: {
        title: "Erika & Simon",
        seoTitle: "Erika & Simon’s Wedding near Lisbon",
        dateLabel: "4 October, 2025",
        description:
          "Erika & Simon’s October 2025 wedding at Quinta Casa da Adega: all-white florals, a garden ceremony and dinner under the marquee in the courtyard with family and friends.",
        content: [
          "Erika & Simon’s wedding was a celebration full of love, joy and special moments, shared with family and friends at Quinta Casa da Adega.",
        ],
      },
    },
    cover: {
      src: "/images/casamentos/erika-simon/capa.jpg",
      width: 1067,
      height: 1600,
      caption: {
        pt: "Erika e Simon a caminhar de mãos dadas no relvado da Quinta Casa da Adega",
        en: "Erika and Simon walking hand in hand across the lawn at Quinta Casa da Adega",
      },
    },
    landscape: {
      src: "/images/casamentos/erika-simon/capa.jpg",
      width: 1067,
      height: 1600,
      // Portrait photo: frame the crop on the couple, from their faces down to the bride's hem.
      position: "50% 53%",
      caption: {
        pt: "Erika e Simon a caminhar de mãos dadas no relvado da Quinta Casa da Adega",
        en: "Erika and Simon walking hand in hand across the lawn at Quinta Casa da Adega",
      },
    },
    gallery: photos("erika-simon", 1067, 1600, [
      ["foto-2.jpg", "Pátio de entrada da quinta no dia do casamento", "The estate’s entrance courtyard on the wedding day"],
      [
        "foto-4.jpg",
        "Noiva acompanhada a descer a escadaria de pedra para a cerimónia",
        "The bride escorted down the stone staircase to the ceremony",
      ],
      ["foto-10.jpg", "Ramo de noiva de flores brancas", "The bride’s all-white bouquet"],
      ["foto-33.jpg", "Noivos a beijar-se rodeados pelos convidados", "The couple kissing, surrounded by their guests"],
      [
        "foto-25.jpg",
        "Mesa posta com toalha branca, flores brancas e marcador de lugar",
        "Place setting with white linen, white flowers and a name card",
      ],
      [
        "foto-27.jpg",
        "Mesas compridas do jantar sob a tenda transparente no pátio de pedra",
        "Long dinner tables under the clear marquee in the stone courtyard",
      ],
      [
        "foto-28.jpg",
        "Mesas no pátio com luzes suspensas, junto à casa coberta de hera",
        "Courtyard tables and string lights beside the ivy-covered house",
      ],
      ["foto-29.jpg", "Centro de mesa com flores brancas e velas", "White floral centrepiece with candles"],
      ["foto-19.jpg", "Noiva a dançar no relvado entre os convidados", "The bride dancing on the lawn among the guests"],
      ["foto-20.jpg", "Noiva com uma dama de honor vestida de verde", "The bride with a bridesmaid in green"],
      ["foto-22.jpg", "Fotografia de família em frente à porta de madeira em arco", "Family photo in front of the arched wooden door"],
      ["foto-14.jpg", "Noivos de mãos dadas, com uma taça de champanhe", "The couple holding hands, champagne glass in hand"],
      ["foto-12.jpg", "Noivos a cortar o bolo de casamento branco", "The couple cutting the white wedding cake"],
      ["foto-11.jpg", "Bolo de casamento branco de três andares com flores", "Three-tier white wedding cake decorated with flowers"],
      [
        "foto-6.jpg",
        "Cerimónia ao ar livre no jardim, com pétalas brancas no relvado",
        "Outdoor garden ceremony with white petals on the lawn",
      ],
    ]),
  },
  {
    slug: "larissa-daniel",
    couple: "Larissa & Daniel",
    date: "2025-09-02",
    copy: {
      pt: {
        title: "Casamento Larissa & Daniel",
        seoTitle: "Casamento de Larissa & Daniel em Mafra",
        dateLabel: "2 de Setembro, 2025",
        description:
          "Casamento de Larissa & Daniel em setembro de 2025 na Quinta Casa da Adega: flores coloridas, cerimónia ao ar livre sob a árvore e jantar iluminado por luzes suspensas.",
        content: [
          "O casamento de Larissa & Daniel foi marcado por cores vibrantes, flores naturais e uma atmosfera romântica. Entre uma cerimónia ao ar livre e um jantar iluminado por luzes suspensas, cada detalhe refletiu a personalidade do casal e a beleza intemporal da Quinta Casa da Adega.",
        ],
      },
      en: {
        title: "Larissa & Daniel’s Wedding",
        seoTitle: "Larissa & Daniel’s Wedding near Lisbon",
        dateLabel: "2 September, 2025",
        description:
          "Larissa & Daniel’s September 2025 wedding at Quinta Casa da Adega: vibrant flowers, an open-air ceremony beneath the tree and a dinner lit by hanging lights.",
        content: [
          "Larissa & Daniel’s wedding was defined by vibrant colours, natural flowers and a romantic atmosphere. From an open-air ceremony to a dinner lit by hanging lights, every detail reflected the couple’s personality and the timeless beauty of Quinta Casa da Adega.",
        ],
      },
    },
    cover: {
      src: "/images/casamentos/larissa-daniel/capa.jpg",
      width: 1138,
      height: 738,
      caption: {
        pt: "Larissa e Daniel junto à tenda de lona da quinta, ao fim da tarde",
        en: "Larissa and Daniel by the estate’s canvas tent in the late afternoon",
      },
    },
    landscape: {
      src: "/images/casamentos/larissa-daniel/foto-5.webp",
      width: 1280,
      height: 854,
      caption: {
        pt: "Larissa e Daniel na escadaria de pedra em frente à porta de madeira em arco",
        en: "Larissa and Daniel on the stone staircase in front of the arched wooden door",
      },
    },
    gallery: [
      ...photos("larissa-daniel", 1138, 1707, [
        [
          "foto-1.webp",
          "Noivos abraçados no campo junto à tenda de lona, com a luz do entardecer",
          "The couple embracing in the field by the canvas tent, in the evening light",
        ],
        [
          "foto-2.webp",
          "Noivos a beijar-se junto às mesas do pátio com velas azuis e flores coloridas",
          "The couple kissing beside courtyard tables with blue candles and colourful flowers",
        ],
        [
          "foto-3.webp",
          "Cerimónia ao ar livre sob a árvore, entre arcos de flores coloridas",
          "Open-air ceremony beneath the tree, framed by colourful floral arches",
        ],
        [
          "foto-4.webp",
          "Noivos à noite entre os arcos de flores, com luzes suspensas e a vila iluminada ao fundo",
          "The couple at night between the floral arches, with string lights and the village lit up behind",
        ],
      ]),
      ...photos("larissa-daniel", 1280, 854, [
        [
          "foto-5.webp",
          "Noivos na escadaria de pedra em frente à porta de madeira em arco",
          "The couple on the stone staircase in front of the arched wooden door",
        ],
      ]),
    ],
  },
];

const toImg = ({ caption, ...p }: Photo, locale: Locale): Img => ({ ...p, alt: caption[locale] });

function localize(w: WeddingSource, locale: Locale): Wedding {
  return {
    slug: w.slug,
    date: w.date,
    ...w.copy[locale],
    cover: toImg(w.cover, locale),
    landscape: { ...toImg(w.landscape ?? w.cover, locale), position: w.landscape?.position },
    gallery: w.gallery.map((p) => toImg(p, locale)),
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
    title: "Casamentos Reais em Mafra | Quinta Casa da Adega",
    description:
      "Casamentos reais na Quinta Casa da Adega, em Gradil, Mafra — histórias de amor celebradas com família e amigos na nossa quinta, perto de Lisboa.",
  },
  en: {
    title: "Real Weddings near Lisbon | Quinta Casa da Adega",
    description:
      "Real weddings at Quinta Casa da Adega in Gradil, Mafra — love stories celebrated with family and friends at our estate near Lisbon, Portugal.",
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
    title: `${w.seoTitle} | Quinta Casa da Adega`,
    description: w.description,
    image: w.cover,
    type: "article",
  });
}
