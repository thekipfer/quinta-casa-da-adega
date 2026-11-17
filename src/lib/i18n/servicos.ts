/**
 * Services list (/servicos · /en/services) and service detail pages (/servicos/<slug> · /en/services/<slug>).
 * Portuguese copy, dates, galleries and prev/next order come from the live site
 * (quintacasadaadega.com/categoria/servicos/ and /servico/casamento/<slug>/); English is translated from it.
 * The slug is shared by both languages.
 */
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/types";
import { itemPaths, routes } from "@/lib/routes";
import { localizedMetadata } from "@/lib/seo";
import type { ImageAsset } from "@/types/content";

export const servicesHref = (locale: Locale) => routes.services[locale];
export const serviceHref = (locale: Locale, slug: string) => itemPaths("services", slug)[locale];

export type ServiceImage = ImageAsset & { alt: string };

/** A service with its copy in one language — what the pages render. */
export interface Service {
  slug: string;
  title: string;
  /** Short summary for <meta name="description">. */
  metaDescription: string;
  description: string;
  date: string;
  /** Card image on the services grid (also the share/OG image). */
  cover: ServiceImage;
  gallery: ServiceImage[];
}

type Copy = Pick<Service, "title" | "metaDescription" | "description" | "date">;
type Photo = { name: string; height?: number; alt: Record<Locale, string> };

interface ServiceSource {
  slug: string;
  copy: Record<Locale, Copy>;
  cover: Photo;
  gallery: Photo[];
}

const photo = (name: string, pt: string, en: string, height?: number): Photo => ({ name, height, alt: { pt, en } });

const tablePhoto = (n: number) =>
  photo(`decoracao-de-mesas-${n}`, "Decoração de mesas na Quinta Casa da Adega", "Table decoration at Quinta Casa da Adega");
const tableHero = photo(
  "decoracao-de-mesas-3",
  "Mesa Decorativa de Casamento - Quinta Casa da Adega - Mafra - Gradil - Portugal",
  "Decorated wedding table - Quinta Casa da Adega - Mafra - Gradil - Portugal",
);
const teamPhoto = (n: number) =>
  photo(`equipa-especializada-${n}`, "Equipa especializada da Quinta Casa da Adega", "The specialist team at Quinta Casa da Adega");
const floralPhoto = (n: number, height?: number) =>
  photo(`design-floral-${n}`, "Design floral na Quinta Casa da Adega", "Floral design at Quinta Casa da Adega", height);

/** In the live site's order (newest first), which also drives the prev/next links. */
const sources: ServiceSource[] = [
  {
    slug: "decoracao-de-mesas",
    copy: {
      pt: {
        title: "Decoração de Mesas",
        metaDescription:
          "Explore como a nossa decoração transforma cada detalhe, realçando a beleza natural da Quinta Casa da Adega e criando um cenário único, sofisticado e memorável",
        description:
          "Explore como a nossa decoração transforma cada detalhe, realçando a beleza natural da Quinta Casa da Adega e criando um cenário único, sofisticado e memorável para o seu grande dia.",
        date: "1 de Junho, 2024",
      },
      en: {
        title: "Table Decoration",
        metaDescription:
          "See how our decoration transforms every detail, enhancing the natural beauty of Quinta Casa da Adega and creating a unique, sophisticated and memorable setting.",
        description:
          "See how our decoration transforms every detail, enhancing the natural beauty of Quinta Casa da Adega and creating a unique, sophisticated and memorable setting for your big day.",
        date: "1 June, 2024",
      },
    },
    cover: tableHero,
    gallery: [tablePhoto(1), tablePhoto(2), tableHero, tablePhoto(4)],
  },
  {
    slug: "equipa-especializada",
    copy: {
      pt: {
        title: "Equipa Especializada",
        metaDescription:
          "Nossa equipe especializada na Quinta Casa Da Adega está dedicada a tornar seu evento memorável. Com profissionalismo e atenção aos detalhes, cuidamos de cada",
        description:
          "Nossa equipe especializada na Quinta Casa Da Adega está dedicada a tornar seu evento memorável. Com profissionalismo e atenção aos detalhes, cuidamos de cada aspecto para garantir que sua celebração seja perfeita. Estamos aqui para oferecer suporte em todos os momentos, desde o planejamento até a execução, garantindo que cada detalhe contribua para uma experiência única e inesquecível.",
        date: "2 de Novembro, 2021",
      },
      en: {
        title: "Specialist Team",
        metaDescription:
          "Our specialist team at Quinta Casa da Adega is dedicated to making your event memorable. With professionalism and attention to detail, we take care of every aspect.",
        description:
          "Our specialist team at Quinta Casa da Adega is dedicated to making your event memorable. With professionalism and attention to detail, we take care of every aspect to make sure your celebration is perfect. We are here to support you at every stage, from planning to execution, so that every detail contributes to a unique and unforgettable experience.",
        date: "2 November, 2021",
      },
    },
    cover: teamPhoto(3),
    gallery: [
      teamPhoto(1),
      photo(
        "equipa-especializada-2",
        "Detalhes do cenário da Quinta Casa da Adega para celebrações inesquecíveis",
        "Setting details at Quinta Casa da Adega for unforgettable celebrations",
      ),
      teamPhoto(3),
      teamPhoto(4),
      photo(
        "equipa-especializada-5",
        "Quinta exclusiva para eventos e casamentos no campo em Mafra",
        "Exclusive countryside venue for weddings and events in Mafra",
      ),
      teamPhoto(6),
    ],
  },
  {
    slug: "design-floral",
    copy: {
      pt: {
        title: "Design Floral",
        metaDescription:
          "Na Quinta Casa Da Adega, o design floral é cuidadosamente criado para complementar cada espaço, desde cerimônias íntimas até grandes recepções. Nossa equipe",
        description:
          "Na Quinta Casa Da Adega, o design floral é cuidadosamente criado para complementar cada espaço, desde cerimônias íntimas até grandes recepções. Nossa equipe de especialistas em design floral trabalha para capturar a essência do seu estilo pessoal, utilizando flores frescas e arranjos artísticos que adicionam um toque de elegância e sofisticação ao seu evento. De bouquets deslumbrantes a arranjos de mesa encantadores, cada detalhe floral é meticulosamente planejado para criar uma atmosfera memorável e cheia de beleza natural.",
        date: "2 de Novembro, 2021",
      },
      en: {
        title: "Floral Design",
        metaDescription:
          "At Quinta Casa da Adega, floral design is carefully created to complement every space, from intimate ceremonies to grand receptions.",
        description:
          "At Quinta Casa da Adega, floral design is carefully created to complement every space, from intimate ceremonies to grand receptions. Our team of floral design specialists works to capture the essence of your personal style, using fresh flowers and artistic arrangements that add a touch of elegance and sophistication to your event. From stunning bouquets to enchanting table centrepieces, every floral detail is meticulously planned to create a memorable atmosphere full of natural beauty.",
        date: "2 November, 2021",
      },
    },
    cover: floralPhoto(4, 1025),
    gallery: [floralPhoto(1), floralPhoto(2), floralPhoto(3, 1025), floralPhoto(4, 1025)],
  },
];

const image = (p: Photo, locale: Locale): ServiceImage => ({
  src: `/images/servicos/${p.name}.jpg`,
  width: 1536,
  height: p.height ?? 1024,
  alt: p.alt[locale],
});

const localize = (s: ServiceSource, locale: Locale): Service => ({
  slug: s.slug,
  ...s.copy[locale],
  cover: image(s.cover, locale),
  gallery: s.gallery.map((p) => image(p, locale)),
});

const localized: Record<Locale, Service[]> = {
  pt: sources.map((s) => localize(s, "pt")),
  en: sources.map((s) => localize(s, "en")),
};

/** Every slug, for generateStaticParams (identical in both languages). */
export const serviceSlugs = sources.map((s) => s.slug);

export function getServices(locale: Locale): Service[] {
  return localized[locale];
}

export function getService(locale: Locale, slug: string) {
  return localized[locale].find((s) => s.slug === slug);
}

/**
 * Neighbours as the live site links them: "Post anterior" is the next-older item,
 * "Próximo post" the next-newer one.
 */
export function getServiceNeighbours(locale: Locale, slug: string) {
  const list = localized[locale];
  const i = list.findIndex((s) => s.slug === slug);
  return {
    previous: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
    next: i > 0 ? list[i - 1] : undefined,
  };
}

/** Interface copy of the services list and detail pages. */
export const servicesUi = {
  pt: {
    home: "Home",
    title: "Serviços",
    category: "Categoria:",
    date: "Data:",
    share: "Partilhar",
    shareOn: (network: string) => `Partilhar no ${network}`,
    navigation: "Navegação entre serviços",
    previous: "Post anterior",
    all: "Todos os serviços",
    next: "Próximo post",
    others: "Outros serviços",
  },
  en: {
    home: "Home",
    title: "Services",
    category: "Category:",
    date: "Date:",
    share: "Share",
    shareOn: (network: string) => `Share on ${network}`,
    navigation: "Service navigation",
    previous: "Previous post",
    all: "All services",
    next: "Next post",
    others: "Other services",
  },
} satisfies Record<Locale, unknown>;

const listMeta: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Serviços | Quinta Casa da Adega",
    description:
      "Decoração de mesas, design floral e uma equipa especializada para o vosso casamento na Quinta Casa da Adega, em Mafra.",
  },
  en: {
    title: "Services | Quinta Casa da Adega",
    description:
      "Table decoration, floral design and a specialist team for your wedding at Quinta Casa da Adega in Mafra.",
  },
};

export function servicesMetadata(locale: Locale): Metadata {
  return localizedMetadata({ locale, paths: routes.services, ...listMeta[locale], image: localized[locale][0].cover });
}

export function serviceMetadata(locale: Locale, service: Service): Metadata {
  return localizedMetadata({
    locale,
    paths: itemPaths("services", service.slug),
    title: `${service.title} | Quinta Casa da Adega`,
    description: service.metaDescription,
    image: service.cover,
  });
}
