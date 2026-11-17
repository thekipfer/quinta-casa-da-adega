import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";
import { localizedMetadata } from "@/lib/seo";

/**
 * Copy for the request-a-proposal page — /orcamento (pt) and /en/quote (en). Portuguese is based on
 * quintacasadaadega.com/orcamento/; English is translated from it.
 */

export const CONTACT_EMAIL = "hello@quintacasadaadega.com";

export type GuestRange = "0-60" | "60-90" | "90-120" | "120+";
export type ContactPreference = "whatsapp" | "email";

const pt = {
  meta: {
    title: "Quinta para Casamento em Mafra | Proposta Personalizada",
    description:
      "Descubra a Quinta Casa da Adega — a quinta para casamento em Mafra que une charme rústico, elegância e exclusividade. Solicite a sua proposta personalizada!",
  },
  hero: {
    title: "Aqui começa o vosso 'Sim'",
    // The live page says "Villa Dona Belida" here — a copy-paste slip from another venue.
    subtitle: "Descubra a disponibilidade da Quinta Casa da Adega para o vosso casamento.",
    cta: "Pedir proposta",
    image: {
      src: "/images/orcamento/hero-mesa.jpg",
      width: 1600,
      height: 1066,
      alt: "Mesa de casamento decorada no jardim da Quinta Casa da Adega",
    },
  },
  availability: {
    title: "Disponibilidade limitada",
    text: "Para preservar a exclusividade e a qualidade da experiência, realizamos um número muito limitado de celebrações por ano. Algumas das datas mais procuradas para 2027 já se encontram reservadas.",
    perks: [
      { icon: "clock" as const, text: "Resposta personalizada em 24–48 horas" },
      { icon: "key" as const, text: "Visita privada à quinta, sem compromisso" },
      { icon: "ring" as const, text: "Apenas 15 casamentos por ano — um por dia" },
    ],
    privacy: "Os seus dados são confidenciais e usados apenas para responder ao seu pedido.",
  },
  form: {
    eyebrow: "Pedido de proposta",
    title: "Verificar disponibilidade",
    intro: "Leva menos de um minuto. Respondemos com uma proposta feita à vossa medida.",
    dateLabel: "Quando pensam casar?",
    monthLabel: "Mês preferido",
    optional: "opcional",
    undecided: "Ainda não sabemos",
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    monthsLong: [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ],
    /** "<month> de <year>" in the request message. */
    formatDate: (month: string, year: string) => `${month} de ${year}`,
    guestsLabel: "Número aproximado de convidados",
    guests: [
      { value: "0-60", label: "Até 60", hint: "Íntimo" },
      { value: "60-90", label: "60 a 90", hint: "Acolhedor" },
      { value: "90-120", label: "90 a 120", hint: "Celebração" },
      { value: "120+", label: "120 ou mais", hint: "Grande festa" },
    ] as { value: GuestRange; label: string; hint: string }[],
    contactsLabel: "Os vossos contactos",
    nameLabel: "Nome",
    namePlaceholder: "Nome e apelido",
    emailLabel: "Email",
    emailPlaceholder: "nome@email.com",
    phoneLabel: "Telefone",
    phonePlaceholder: "+351 912 345 678",
    contactLabel: "Preferem ser contactados por?",
    contact: [
      { value: "whatsapp", label: "WhatsApp", hint: "Resposta mais rápida" },
      { value: "email", label: "Email", hint: "Proposta detalhada" },
    ] as { value: ContactPreference; label: string; hint: string }[],
    messageLabel: "Mensagem",
    messagePlaceholder: "Contem-nos como imaginam o vosso dia",
    submit: "Verificar disponibilidade",
    trust: ["Resposta em 24–48h", "Sem compromisso", "Dados confidenciais"],
    errors: {
      year: "Escolham um ano (ou “Ainda não sabemos”).",
      guests: "Indiquem o número aproximado de convidados.",
      name: "Indiquem o vosso nome.",
      email: "Indiquem um email válido.",
      phone: "Indiquem um telefone para vos contactarmos por WhatsApp.",
      summary: "Faltam alguns dados — vejam os campos assinalados.",
    },
    success: {
      title: "Obrigado!",
      whatsapp:
        "Abrimos o WhatsApp com o vosso pedido já preenchido — basta carregar em enviar. Respondemos em 24–48 horas.",
      email:
        "Abrimos o vosso email com o pedido já preenchido — basta carregar em enviar. Respondemos em 24–48 horas.",
      reopenWhatsapp: "Abrir WhatsApp novamente",
      reopenEmail: "Abrir email novamente",
      again: "Fazer outro pedido",
    },
    message: {
      intro: "Olá! Gostaríamos de verificar a disponibilidade da Quinta Casa da Adega para o nosso casamento.",
      date: "Data",
      undecided: "ainda sem data definida",
      guests: "Convidados",
      name: "Nome",
      email: "Email",
      phone: "Telefone",
      contact: "Preferência de contacto",
      subject: "Pedido de disponibilidade — Quinta Casa da Adega",
    },
  },
  location: {
    title: "Onde tudo começa",
    text: "No coração do Gradil, a Quinta Casa da Adega combina natureza, exclusividade e proximidade com Lisboa.",
    visit: "Agende a sua visita e descubra pessoalmente este cenário único.",
    cta: "Agendar uma visita",
    visitMessage: "Olá! Gostaríamos de agendar uma visita privada à Quinta Casa da Adega.",
    maps: "Ver no Google Maps",
    image: {
      src: "/images/orcamento/mapa-gradil.webp",
      width: 1536,
      height: 1024,
      alt: "Mapa ilustrado do Gradil com a localização da Quinta Casa da Adega",
    },
  },
  final: {
    title: "Rumo ao grande dia",
    text: "As datas para 2027 estão a esgotar. Agendem a vossa visita privada, sem compromisso, e descubram a Quinta Casa da Adega.",
    address: "Rua das Forças Armadas, nº 34, 2665-118 Gradil · Portugal",
    whatsapp: "Falar connosco no WhatsApp",
    whatsappMessage: "Olá! Gostaríamos de saber mais sobre casamentos na Quinta Casa da Adega.",
  },
};

export type OrcamentoContent = typeof pt;

const en: OrcamentoContent = {
  meta: {
    title: "Wedding Venue in Mafra | Bespoke Proposal",
    description:
      "Discover Quinta Casa da Adega — the wedding venue in Mafra that brings together rustic charm, elegance and exclusivity. Request your bespoke proposal!",
  },
  hero: {
    title: "Where your ‘I do’ begins",
    subtitle: "Check Quinta Casa da Adega’s availability for your wedding.",
    cta: "Request a proposal",
    image: { ...pt.hero.image, alt: "Decorated wedding table in the garden at Quinta Casa da Adega" },
  },
  availability: {
    title: "Limited availability",
    text: "To preserve the exclusivity and quality of the experience, we host a very limited number of celebrations each year. Some of the most sought-after dates for 2027 are already booked.",
    perks: [
      { icon: "clock", text: "Personal reply within 24–48 hours" },
      { icon: "key", text: "Private visit to the estate, no obligation" },
      { icon: "ring", text: "Only 15 weddings a year — one per day" },
    ],
    privacy: "Your details are confidential and used only to reply to your request.",
  },
  form: {
    eyebrow: "Proposal request",
    title: "Check availability",
    intro: "It takes less than a minute. We’ll reply with a proposal tailored to you.",
    dateLabel: "When are you planning to marry?",
    monthLabel: "Preferred month",
    optional: "optional",
    undecided: "Not sure yet",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthsLong: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    formatDate: (month, year) => `${month} ${year}`,
    guestsLabel: "Approximate number of guests",
    guests: [
      { value: "0-60", label: "Up to 60", hint: "Intimate" },
      { value: "60-90", label: "60 to 90", hint: "Cosy" },
      { value: "90-120", label: "90 to 120", hint: "Celebration" },
      { value: "120+", label: "120 or more", hint: "Big party" },
    ],
    contactsLabel: "Your contact details",
    nameLabel: "Name",
    namePlaceholder: "First and last name",
    emailLabel: "Email",
    emailPlaceholder: "name@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "+44 7700 900123",
    contactLabel: "How would you like us to contact you?",
    contact: [
      { value: "whatsapp", label: "WhatsApp", hint: "Fastest reply" },
      { value: "email", label: "Email", hint: "Detailed proposal" },
    ],
    messageLabel: "Message",
    messagePlaceholder: "Tell us how you imagine your day",
    submit: "Check availability",
    trust: ["Reply within 24–48h", "No obligation", "Confidential details"],
    errors: {
      year: "Choose a year (or “Not sure yet”).",
      guests: "Tell us the approximate number of guests.",
      name: "Tell us your name.",
      email: "Enter a valid email address.",
      phone: "Enter a phone number so we can contact you on WhatsApp.",
      summary: "Some details are missing — see the highlighted fields.",
    },
    success: {
      title: "Thank you!",
      whatsapp:
        "We’ve opened WhatsApp with your request already filled in — just tap send. We’ll reply within 24–48 hours.",
      email: "We’ve opened your email with your request already filled in — just hit send. We’ll reply within 24–48 hours.",
      reopenWhatsapp: "Open WhatsApp again",
      reopenEmail: "Open email again",
      again: "Make another request",
    },
    message: {
      intro: "Hello! We would like to check Quinta Casa da Adega’s availability for our wedding.",
      date: "Date",
      undecided: "no date set yet",
      guests: "Guests",
      name: "Name",
      email: "Email",
      phone: "Phone",
      contact: "Contact preference",
      subject: "Availability request — Quinta Casa da Adega",
    },
  },
  location: {
    title: "Where it all begins",
    text: "In the heart of Gradil, Quinta Casa da Adega combines nature, exclusivity and proximity to Lisbon.",
    visit: "Book your visit and discover this unique setting in person.",
    cta: "Book a visit",
    visitMessage: "Hello! We would like to book a private visit to Quinta Casa da Adega.",
    maps: "View on Google Maps",
    image: { ...pt.location.image, alt: "Illustrated map of Gradil showing the location of Quinta Casa da Adega" },
  },
  final: {
    title: "Towards the big day",
    text: "Dates for 2027 are filling up fast. Book your private visit, with no obligation, and discover Quinta Casa da Adega.",
    address: pt.final.address,
    whatsapp: "Talk to us on WhatsApp",
    whatsappMessage: "Hello! We would like to know more about weddings at Quinta Casa da Adega.",
  },
};

const content: Record<Locale, OrcamentoContent> = { pt, en };

export function getOrcamento(locale: Locale): OrcamentoContent {
  return content[locale];
}

export function orcamentoMetadata(locale: Locale): Metadata {
  const { meta, hero } = content[locale];
  return localizedMetadata({ locale, paths: routes.quote, ...meta, image: hero.image });
}
