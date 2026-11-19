import type { Metadata } from "next";
import { SITE_ICONS, SITE_URL } from "@/lib/content";
import { getDictionary, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy for the "A Nossa Quinta" / "Our Venue" page (/sobre and /en/about), taken from
 * quintacasadaadega.com/quinta-para-casamento-mafra/ and its /en/wedding-venue-mafra/ translation.
 * Kept separate from the home-page dictionaries in pt.ts / en.ts.
 */

export const ABOUT_HREF: Record<Locale, string> = routes.about;

type Img = ImageAsset & { alt: string };

const img = (src: string, width: number, height: number, alt: string): Img => ({ src, width, height, alt });

/** Hero slider photos, shared by both languages (alt text is the estate's own, kept in Portuguese). */
const SLIDE_ALT = "Quinta Casa da Adega – casamentos e eventos rústicos";
export const aboutSlides: Img[] = [
  img("/images/sobre/slide-01.webp", 1280, 854, SLIDE_ALT),
  img("/images/sobre/slide-02.jpg", 1138, 738, SLIDE_ALT),
  img("/images/sobre/slide-03.webp", 1280, 853, SLIDE_ALT),
  img("/images/sobre/slide-04.webp", 1280, 853, SLIDE_ALT),
  img("/images/sobre/slide-05.webp", 960, 640, SLIDE_ALT),
  img("/images/sobre/slide-06.jpg", 1080, 862, SLIDE_ALT),
  img("/images/sobre/slide-07.jpg", 956, 675, SLIDE_ALT),
  img("/images/sobre/slide-08.webp", 960, 640, SLIDE_ALT),
  img("/images/sobre/slide-09.jpg", 1600, 1067, SLIDE_ALT),
  img("/images/sobre/slide-10.webp", 960, 640, SLIDE_ALT),
  img("/images/sobre/slide-11.jpeg", 1280, 960, SLIDE_ALT),
  img("/images/sobre/slide-12.jpg", 1000, 750, SLIDE_ALT),
  img("/images/sobre/slide-13.jpg", 1600, 1200, SLIDE_ALT),
];

export type PillarIcon = "decoracao" | "equipa" | "cerimonia";
export type FeatureIcon = "house" | "tree" | "cross" | "calendar";

export interface AboutContent {
  meta: { title: string; description: string };
  hero: { title: string; description: string; cta: string; gallery: string };
  storyTop: [string, string];
  storyImage: Img;
  storyBottom: [string, string];
  pillars: { icon: PillarIcon; title: string; text: string }[];
  dreams: {
    title: string;
    features: { icon: FeatureIcon; text: string }[];
    cta: string;
    images: [Img, Img];
  };
  why: {
    title: string;
    description: string;
    whatsapp: string;
    items: { title: string; text: string }[];
  };
  /** Real questions couples ask, answered only with facts published on the site. Also emitted as FAQPage JSON-LD. */
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
    more: string;
    contact: string;
  };
  availability: {
    title: string;
    text: string;
    note: string;
    whatsappLabel: string;
    cardTitle: string;
    cardText: string;
    cardCta: string;
    responseTime: string;
  };
}

const pt: AboutContent = {
  meta: {
    title: "Quinta para Casamento em Mafra | Quinta Casa da Adega",
    description:
      "Conheça a Quinta Casa da Adega, em Gradil, Mafra: um espaço rústico e intimista com vista para a Igreja de São Silvestre. Apenas um casamento por dia.",
  },
  hero: {
    title: "A Nossa História",
    description:
      "A Quinta Casa da Adega nasceu de um sonho: criar um lugar onde cada celebração se vive com intimidade, beleza e significado. Hoje, abrimos as portas a um número muito limitado de casais, preservando a essência exclusiva que torna cada casamento verdadeiramente único.",
    cta: "Peça a sua proposta",
    gallery: "Galeria da Quinta",
  },
  storyTop: [
    "Desde os anos 80, este espaço tem sido palco de encontros, tradições e momentos inesquecíveis. O que começou como um refúgio familiar transformou-se, ao longo dos anos, num lugar onde o tempo abranda e cada detalhe ganha significado.",
    "Em 2018, a Quinta foi adquirida pela nossa família, ainda sem receber eventos. Foi apenas em 2024 que decidimos concretizar o verdadeiro propósito deste lugar: dedicá-lo exclusivamente à celebração de casamentos, com disponibilidade limitada a partir de 2025.",
  ],
  storyImage: img(
    "/images/sobre/ceremony-editorial.webp",
    1600,
    854,
    "Quinta Casa da Adega – quinta para casamento elegante em Mafra, Portugal, com espaço exterior para cerimónia e receção",
  ),
  storyBottom: [
    "Mais do que um espaço, a Quinta tornou-se um lugar de memórias, marcado pela hospitalidade e pelo sentimento raro de estar verdadeiramente em casa.",
    "Hoje, cada casamento que recebemos torna-se parte desta história — cuidadosamente preservada para que continue especial, rara e inesquecível.",
  ],
  pillars: [
    { icon: "decoracao", title: "Decoração", text: "Criamos ambientes elegantes e personalizados, pensados exclusivamente para cada casal." },
    { icon: "equipa", title: "Equipa", text: "Uma equipa dedicada acompanha cada detalhe, garantindo uma experiência tranquila e irrepreensível." },
    { icon: "cerimonia", title: "Cerimónia", text: "Cada momento é preparado com precisão, para que possa viver o seu dia sem preocupações." },
  ],
  dreams: {
    title: "Onde os Sonhos Ganham Forma",
    features: [
      { icon: "house", text: "Plano B elegante, preparado para qualquer condição" },
      { icon: "tree", text: "Enquadramento natural de beleza intemporal" },
      { icon: "cross", text: "Vista privilegiada para a Igreja de São Silvestre" },
      { icon: "calendar", text: "Exclusividade absoluta: apenas 15 casamentos por ano" },
    ],
    cta: "Ver disponibilidade",
    images: [
      img("/images/sobre/dreams-bride.jpg", 958, 1466, "Noiva de costas com acessório dourado no cabelo"),
      img("/images/sobre/dreams-champagne.jpg", 1038, 1404, "Noivos a abrir champanhe junto à torre de taças"),
    ],
  },
  why: {
    title: "Porque nós?",
    description:
      "Para preservar a qualidade, a privacidade e a experiência de cada casal, aceitamos um número muito limitado de celebrações por ano.",
    whatsapp: "Estamos no WhatsApp",
    items: [
      {
        title: "Visitas privadas e exclusivas",
        text: "Cada visita é realizada de forma privada, permitindo-lhe conhecer a Quinta com tranquilidade e imaginar, sem pressa, cada momento do seu dia.",
      },
      {
        title: "Acompanhamento personalizado",
        text: "Desde o primeiro contacto até ao dia do casamento, a nossa equipa acompanha-o pessoalmente, garantindo que tudo acontece como idealizou.",
      },
      {
        title: "Exclusividade total",
        text: "A Quinta é reservada para apenas um casamento por dia, assegurando total privacidade e uma experiência verdadeiramente exclusiva.",
      },
    ],
  },
  faq: {
    eyebrow: "Dúvidas",
    title: "Perguntas Frequentes",
    description: "Respostas às dúvidas mais comuns dos noivos sobre casar na Quinta Casa da Adega.",
    more: "Não encontram a resposta?",
    contact: "Falem connosco no WhatsApp",
    items: [
      {
        question: "Quantos casamentos realizam por ano?",
        answer:
          "Apenas 15 casamentos por ano, com um único casamento por dia. A quinta fica reservada para vós, com total privacidade.",
      },
      {
        question: "Onde fica a Quinta Casa da Adega?",
        answer:
          "Na Rua das Forças Armadas, 34, em Gradil, no concelho de Mafra — perto de Lisboa, Sintra e Ericeira, num enquadramento natural com vista para a Igreja de São Silvestre.",
      },
      {
        question: "A cerimónia pode ser ao ar livre?",
        answer:
          "Sim. A cerimónia pode decorrer ao ar livre, no jardim da quinta. Para qualquer condição meteorológica, existe um plano B elegante já preparado.",
      },
      {
        question: "Podemos visitar a quinta antes de decidir?",
        answer:
          "Sim. As visitas são privadas e sem compromisso, para conhecerem a quinta com tranquilidade. Podem agendá-las através do pedido de proposta ou pelo WhatsApp.",
      },
      {
        question: "Que serviços estão disponíveis para o casamento?",
        answer:
          "Decoração de mesas, design floral, catering e planeamento, com uma equipa especializada que acompanha cada detalhe, desde o primeiro contacto até ao dia do casamento.",
      },
      {
        question: "Como pedimos um orçamento?",
        answer:
          "Preencham o pedido de proposta no site ou falem connosco pelo WhatsApp. Respondemos com uma proposta personalizada em 24 a 48 horas.",
      },
      {
        question: "Recebem casais que vivem no estrangeiro?",
        answer:
          "Sim. Vários dos nossos casais planearam o casamento a partir do estrangeiro, com o acompanhamento da nossa equipa desde o primeiro contacto até ao grande dia.",
      },
      {
        question: "Com quanta antecedência devemos reservar?",
        answer:
          "Como realizamos apenas 15 casamentos por ano, as datas mais procuradas são reservadas com antecedência — algumas datas de 2027 já estão reservadas. Recomendamos que nos contactem assim que tiverem uma data em mente.",
      },
    ],
  },
  availability: {
    title: "Disponibilidade limitada",
    text: "Para garantir a excelência e dedicação que nos define, realizamos apenas 15 casamentos por ano.",
    note: "Algumas datas para 2027 já se encontram reservadas.",
    whatsappLabel: "WhatsApp",
    cardTitle: "Verificar disponibilidade",
    cardText: "Contem-nos como imaginam o vosso dia — data, número de convidados e o que gostariam de incluir.",
    cardCta: "Verificar disponibilidade",
    responseTime: "Resposta personalizada em 24–48 horas",
  },
};

const en: AboutContent = {
  meta: {
    title: "Wedding Venue in Mafra, near Lisbon | Quinta Casa da Adega",
    description:
      "Discover Quinta Casa da Adega in Gradil, Mafra: a rustic, intimate estate overlooking São Silvestre Church, hosting just one wedding a day near Lisbon.",
  },
  hero: {
    title: "Our Story",
    description:
      "Quinta Casa da Adega was born from a dream: to create a place where every celebration is experienced with intimacy, beauty and meaning. Today, we open our doors to a very select number of couples, preserving the exclusive essence that makes every wedding truly unique.",
    cta: "Request your proposal",
    gallery: "Estate gallery",
  },
  storyTop: [
    "Since the 1980s, this estate has been the setting for gatherings, traditions and unforgettable moments. What began as a family retreat has evolved over the years into a place where time slows down and every detail takes on meaning.",
    "In 2018, the estate was acquired by our family, at a time when it was not yet hosting events. It was only in 2024 that we decided to fulfil the true purpose of this special place: dedicating it exclusively to wedding celebrations, with limited availability starting in 2025.",
  ],
  storyImage: img(
    "/images/sobre/ceremony-editorial.webp",
    1600,
    854,
    "Quinta Casa da Adega – elegant wedding venue in Mafra, Portugal, with an outdoor ceremony and reception space",
  ),
  storyBottom: [
    "More than just a venue, the estate has become a place of cherished memories, defined by warm hospitality and the rare feeling of truly being at home.",
    "Today, every wedding we host becomes part of this story — thoughtfully preserved to ensure each celebration remains special, rare and unforgettable.",
  ],
  pillars: [
    { icon: "decoracao", title: "Decoration", text: "We create elegant, bespoke settings, thoughtfully designed for each couple." },
    { icon: "equipa", title: "Team", text: "A dedicated team takes care of every detail, ensuring a seamless and unforgettable experience." },
    { icon: "cerimonia", title: "Ceremony", text: "Every detail is carefully planned, so you can enjoy your special day without a worry." },
  ],
  dreams: {
    title: "Where Dreams Take Shape",
    features: [
      { icon: "house", text: "An elegant Plan B, ready for any weather conditions" },
      { icon: "tree", text: "A natural setting of timeless beauty" },
      { icon: "cross", text: "Stunning view of São Silvestre Church" },
      { icon: "calendar", text: "Absolute exclusivity: just 15 weddings per year" },
    ],
    cta: "Check availability",
    images: [
      img("/images/sobre/dreams-bride.jpg", 958, 1466, "Bride seen from behind with a golden hair accessory"),
      img("/images/sobre/dreams-champagne.jpg", 1038, 1404, "Newlyweds opening champagne beside a coupe tower"),
    ],
  },
  why: {
    title: "Why choose us?",
    description:
      "To preserve the quality, privacy and experience of every couple, we host only a very limited number of celebrations each year.",
    whatsapp: "We're on WhatsApp",
    items: [
      {
        title: "Private & exclusive tours",
        text: "Each visit is private, giving you the time and space to explore the estate at your own pace and envision every moment of your special day.",
      },
      {
        title: "Personalised support",
        text: "From your very first enquiry to your wedding day, our team is by your side every step of the way, ensuring everything unfolds just as you envisioned.",
      },
      {
        title: "Total exclusivity",
        text: "The estate is exclusively reserved for one wedding per day, ensuring complete privacy and a truly exclusive experience.",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    more: "Can’t find your answer?",
    contact: "Message us on WhatsApp",
    description: "Answers to the questions couples ask us most about getting married at Quinta Casa da Adega.",
    items: [
      {
        question: "How many weddings do you host each year?",
        answer:
          "Only 15 weddings a year, with a single wedding per day. The estate is reserved for you alone, with complete privacy.",
      },
      {
        question: "Where is Quinta Casa da Adega?",
        answer:
          "At Rua das Forças Armadas, 34, in Gradil, in the municipality of Mafra — near Lisbon, Sintra and Ericeira, in a natural setting overlooking São Silvestre Church.",
      },
      {
        question: "Can the ceremony be outdoors?",
        answer:
          "Yes. The ceremony can take place outdoors in the estate’s garden, and an elegant plan B is ready for any weather.",
      },
      {
        question: "Can we visit the estate before deciding?",
        answer:
          "Yes. Visits are private and come with no obligation, so you can get to know the estate at your own pace. Book one through the proposal request or on WhatsApp.",
      },
      {
        question: "What services are available for the wedding?",
        answer:
          "Table decoration, floral design, catering and planning, with a specialist team looking after every detail from the first contact to the wedding day.",
      },
      {
        question: "How do we request a quote?",
        answer:
          "Fill in the proposal request on the website or message us on WhatsApp. We reply with a bespoke proposal within 24 to 48 hours.",
      },
      {
        question: "Do you welcome couples who live abroad?",
        answer:
          "Yes. Many of our couples planned their wedding from abroad, supported by our team from the first contact to the big day — ideal for a destination wedding in Portugal.",
      },
      {
        question: "How far in advance should we book?",
        answer:
          "As we host only 15 weddings a year, the most sought-after dates are booked well in advance — some 2027 dates are already taken. We recommend getting in touch as soon as you have a date in mind.",
      },
    ],
  },
  availability: {
    title: "Limited availability",
    text: "To ensure the highest standards and personal attention that define us, we host just 15 weddings per year.",
    note: "Some dates for 2027 are already booked.",
    whatsappLabel: "WhatsApp",
    cardTitle: "Check availability",
    cardText: "Tell us how you imagine your day — the date, number of guests and what you would like to include.",
    cardCta: "Check availability",
    responseTime: "Personalised reply within 24–48 hours",
  },
};

const content: Record<Locale, AboutContent> = { pt, en };

export function getAboutContent(locale: Locale): AboutContent {
  return content[locale];
}

/** Metadata for /sobre and /en/about: own canonical, hreflang alternates between the two, og image of the ceremony lawn. */
export function aboutMetadata(locale: Locale): Metadata {
  const { title, description } = content[locale].meta;
  const t = getDictionary(locale);
  const image = content[locale].storyImage;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: ABOUT_HREF[locale],
      languages: {
        ...Object.fromEntries(locales.map((l) => [l.htmlLang, ABOUT_HREF[l.locale]])),
        "x-default": ABOUT_HREF.pt,
      },
    },
    icons: SITE_ICONS,
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: locales.filter((l) => l.locale !== locale).map((l) => l.ogLocale),
      url: ABOUT_HREF[locale],
      siteName: "Quinta Casa da Adega",
      title,
      description,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
  };
}
