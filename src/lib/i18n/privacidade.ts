import type { Metadata } from "next";
import { SITE_ICONS, SITE_URL } from "@/lib/content";

/**
 * "Política de Privacidade" (/politica-de-privacidade) — copy taken verbatim from
 * quintacasadaadega.com/politica-de-privacidade/. Portuguese only for now.
 */

export const PRIVACY_HREF = "/politica-de-privacidade";

export type PrivacyIcon = "user" | "rings" | "browser" | "edit" | "erase" | "undo" | "hand";

/** One block of a section's body, in reading order. */
export type PrivacyBlock =
  | { kind: "text"; text: string }
  /** Plain bulleted list. */
  | { kind: "list"; items: string[] }
  /** List shown as small icon cards (used where each item is a distinct "thing"). */
  | { kind: "cards"; items: { icon: PrivacyIcon; text: string }[] }
  /** Highlighted reassurance line. */
  | { kind: "note"; text: string };

export interface PrivacySection {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}

export const privacy = {
  meta: {
    title: "Política de Privacidade | Quinta Casa da Adega",
    description:
      "Na Quinta Casa da Adega, valorizamos a confiança de quem visita o nosso site e utiliza os nossos serviços. A presente Política de Privacidade explica de que forma recolhemos, utilizamos e protegemos os seus dados pessoais.",
  },
  breadcrumbHome: "Início",
  eyebrow: "Informação legal",
  title: "Política de Privacidade",
  intro:
    "Na Quinta Casa da Adega, valorizamos a confiança de quem visita o nosso site e utiliza os nossos serviços. A presente Política de Privacidade explica de que forma recolhemos, utilizamos e protegemos os seus dados pessoais, em conformidade com o Regulamento Geral de Proteção de Dados (RGPD).",
  updatedLabel: "Última atualização",
  updated: { iso: "2025-08-01", label: "1 de agosto de 2025" },
  compliance: "Em conformidade com o RGPD",
  tocTitle: "Índice",
  sections: [
    {
      id: "recolha-de-informacao",
      title: "Recolha de Informação",
      blocks: [
        { kind: "text", text: "Podemos recolher os seguintes dados pessoais quando utiliza o nosso site:" },
        {
          kind: "cards",
          items: [
            {
              icon: "user",
              text: "Nome, email e telefone (quando preenche formulários de contacto ou agendamento de visita);",
            },
            {
              icon: "rings",
              text: "Informações relativas ao seu casamento (ex.: data prevista, número de convidados, preferências);",
            },
            {
              icon: "browser",
              text: "Dados técnicos de navegação (através de cookies, como endereço IP, navegador utilizado e páginas visitadas).",
            },
          ],
        },
      ],
    },
    {
      id: "finalidade",
      title: "Finalidade da Utilização dos Dados",
      blocks: [
        { kind: "text", text: "Os dados recolhidos são utilizados exclusivamente para:" },
        {
          kind: "list",
          items: [
            "Entrar em contacto e responder aos pedidos de informação;",
            "Agendar visitas à Quinta Casa da Adega;",
            "Enviar comunicações relacionadas com os nossos serviços;",
            "Melhorar a experiência de navegação no site.",
          ],
        },
        { kind: "note", text: "Não partilhamos os seus dados com terceiros para fins comerciais." },
      ],
    },
    {
      id: "conservacao",
      title: "Conservação dos Dados",
      blocks: [
        {
          kind: "text",
          text: "Os dados pessoais serão conservados apenas durante o tempo necessário para cumprir as finalidades para as quais foram recolhidos, respeitando os prazos legais aplicáveis.",
        },
      ],
    },
    {
      id: "direitos",
      title: "Direitos do Utilizador",
      blocks: [
        { kind: "text", text: "De acordo com a legislação em vigor, tem o direito de:" },
        {
          kind: "cards",
          items: [
            { icon: "edit", text: "Aceder, corrigir ou atualizar os seus dados pessoais;" },
            { icon: "erase", text: "Solicitar a eliminação dos seus dados;" },
            { icon: "undo", text: "Retirar o consentimento a qualquer momento;" },
            { icon: "hand", text: "Opor-se ao tratamento dos seus dados, quando aplicável." },
          ],
        },
        { kind: "text", text: "Para exercer estes direitos, pode contactar-nos através do email:" },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          kind: "text",
          text: "Utilizamos cookies para melhorar o funcionamento do site, analisar estatísticas de utilização e personalizar conteúdos. Pode gerir as suas preferências de cookies diretamente no seu navegador.",
        },
      ],
    },
    {
      id: "seguranca",
      title: "Segurança",
      blocks: [
        {
          kind: "text",
          text: "Implementamos medidas de segurança adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração ou divulgação indevida.",
        },
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações à Política de Privacidade",
      blocks: [
        {
          kind: "text",
          text: "Reservamo-nos o direito de atualizar esta Política de Privacidade sempre que necessário. Recomendamos a sua consulta periódica.",
        },
      ],
    },
  ] satisfies PrivacySection[],
  /** Section id whose last paragraph is followed by the contact email link. */
  emailAfterSection: "direitos",
  contact: {
    // The live page's "Get in Touch with Us Here" block, in Portuguese.
    title: "Dúvidas sobre os seus dados?",
    text: "Fale connosco — teremos todo o gosto em ajudar.",
    button: "Enviar email",
    addressLabel: "Morada",
    emailLabel: "Email",
    phoneLabel: "Telemóvel",
    address: ["Rua das Forças Armadas, nº 34", "2665-118 Gradil · Portugal"],
  },
};

export function privacyMetadata(): Metadata {
  const { title, description } = privacy.meta;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: PRIVACY_HREF },
    icons: SITE_ICONS,
    openGraph: {
      type: "website",
      locale: "pt_PT",
      url: PRIVACY_HREF,
      siteName: "Quinta Casa da Adega",
      title,
      description,
      images: [{ url: "/seo/og-image.jpg", width: 1024, height: 683, alt: "Quinta Casa da Adega" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/seo/og-image.jpg"] },
  };
}
