import type { Metadata } from "next";
import { SITE_ICONS, SITE_URL } from "@/lib/content";

/**
 * "Política de Cookies" page (/politica-de-cookies), text from quintacasadaadega.com/politica-de-cookies-ue/.
 * The wording is the estate's legal copy and is kept verbatim; only its presentation is new.
 * Portuguese only for now (the live English counterpart is /en/eu-cookies-policy/).
 */

export const COOKIES_HREF = "/politica-de-cookies";
export const PRIVACY_HREF = "/politica-de-privacidade";

export type CategoryIcon = "shield" | "sliders" | "chart" | "megaphone";
export type RetentionIcon = "session" | "persistent";

export const cookiePolicy = {
  meta: {
    title: "Política de Cookies (UE) | Quinta Casa da Adega",
    description:
      "Saiba que cookies o website da Quinta Casa da Adega utiliza, para que servem e como pode gerir ou retirar o seu consentimento.",
  },
  hero: {
    eyebrow: "Informação legal",
    title: "Política de Cookies",
    updated: "Última atualização: novembro de 2026",
    lead: "Explicamos, de forma simples, que cookies utilizamos, para que servem e como pode controlá-los a qualquer momento.",
  },
  toc: "Índice",
  backToTop: "Voltar ao início",
  sections: {
    what: {
      id: "o-que-sao-cookies",
      title: "O que são cookies?",
      paragraphs: [
        "O website da Quinta Casa da Adega, disponível em https://quintacasadaadega.com/, utiliza cookies e tecnologias semelhantes para proporcionar uma experiência de navegação mais simples, eficiente e personalizada.",
        "Os cookies são pequenos ficheiros de texto armazenados no dispositivo do utilizador (computador, tablet ou smartphone) quando visita um website. Estes ficheiros permitem reconhecer o dispositivo em visitas futuras, memorizar preferências e melhorar o funcionamento do website.",
      ],
    },
    types: {
      id: "tipos-de-cookies",
      title: "Que tipos de cookies utilizamos?",
      intro: "O website poderá utilizar as seguintes categorias de cookies:",
      categories: [
        {
          icon: "shield",
          title: "Cookies estritamente necessários",
          text: "São essenciais para o correto funcionamento do website, permitindo a navegação, a segurança e o acesso às funcionalidades principais. Não requerem consentimento prévio.",
          badge: "Sempre ativos",
          essential: true,
        },
        {
          icon: "sliders",
          title: "Cookies de funcionalidade",
          text: "Permitem memorizar determinadas preferências do utilizador, como o idioma ou outras configurações de navegação, proporcionando uma experiência mais personalizada.",
          badge: "Com consentimento",
          essential: false,
        },
        {
          icon: "chart",
          title: "Cookies analíticos e de desempenho",
          text: "Permitem compreender como os visitantes utilizam o website, identificar as páginas mais consultadas e analisar o desempenho geral, ajudando-nos a melhorar continuamente a experiência de navegação.",
          badge: "Com consentimento",
          essential: false,
        },
        {
          icon: "megaphone",
          title: "Cookies de marketing e publicidade",
          text: "Podem ser utilizados para apresentar conteúdos publicitários relevantes, medir a eficácia das campanhas e compreender a interação dos visitantes com os nossos conteúdos.",
          badge: "Com consentimento",
          essential: false,
        },
      ] satisfies { icon: CategoryIcon; title: string; text: string; badge: string; essential: boolean }[],
      note: "Estes cookies podem ser disponibilizados por serviços de terceiros.",
    },
    thirdParty: {
      id: "cookies-de-terceiros",
      title: "Cookies de terceiros",
      paragraphs: [
        "O nosso website poderá integrar serviços externos que utilizam cookies próprios, nomeadamente ferramentas de análise estatística, publicidade digital, redes sociais ou serviços de comunicação.",
        "Estes serviços poderão incluir, consoante as integrações efetivamente instaladas:",
      ],
      services: ["Google Analytics", "Google Ads", "Meta (Facebook e Instagram)", "Outros serviços de análise ou marketing digital"],
      outro: "A utilização destes serviços está sujeita às respetivas políticas de privacidade e cookies.",
    },
    consent: {
      id: "consentimento",
      title: "Consentimento e gestão de cookies",
      paragraphs: [
        "Ao visitar o nosso website pela primeira vez, será apresentado um aviso de cookies que permite aceitar, rejeitar ou personalizar a utilização de cookies não essenciais.",
        "Os cookies estritamente necessários ao funcionamento do website poderão ser utilizados sem consentimento. Os restantes apenas serão ativados mediante consentimento prévio do utilizador.",
        "O utilizador poderá, a qualquer momento, alterar ou retirar o seu consentimento através das definições de cookies disponibilizadas no website.",
      ],
      callout: "A recusa de determinados cookies poderá limitar algumas funcionalidades, sem comprometer o acesso às funcionalidades essenciais.",
      choices: ["Aceitar", "Rejeitar", "Personalizar"],
    },
    disable: {
      id: "desativar-cookies",
      title: "Como desativar os cookies?",
      paragraphs: [
        "O utilizador poderá também configurar o seu navegador para bloquear ou eliminar cookies.",
        "As instruções podem ser consultadas nas páginas de ajuda dos principais navegadores:",
      ],
      browsers: [
        { name: "Google Chrome", href: "https://support.google.com/chrome/answer/95647?hl=pt-PT" },
        { name: "Mozilla Firefox", href: "https://support.mozilla.org/pt-PT/kb/clear-cookies-and-site-data-firefox" },
        { name: "Safari", href: "https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" },
        {
          name: "Microsoft Edge",
          href: "https://support.microsoft.com/pt-pt/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use",
        },
      ],
      openHelp: "Abrir ajuda",
      outro: "Tenha em atenção que a desativação de determinados cookies poderá afetar o funcionamento de algumas funcionalidades do website.",
    },
    data: {
      id: "protecao-de-dados",
      title: "Proteção de dados pessoais",
      paragraphs: [
        "Em determinadas circunstâncias, os cookies poderão recolher informações consideradas dados pessoais, como identificadores online ou informações relativas à utilização do website.",
        "O tratamento desses dados será realizado em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável.",
      ],
      privacyBefore: "Para obter mais informações sobre a forma como recolhemos, utilizamos e protegemos os seus dados pessoais, consulte a nossa ",
      privacyLink: "Política de Privacidade",
      privacyAfter: ".",
    },
    retention: {
      id: "conservacao",
      title: "Conservação dos cookies",
      intro: "Os cookies podem ser temporários ou persistentes.",
      kinds: [
        {
          icon: "session",
          title: "Cookies de sessão",
          text: "São eliminados automaticamente quando o utilizador fecha o navegador.",
        },
        {
          icon: "persistent",
          title: "Cookies persistentes",
          text: "Permanecem armazenados no dispositivo durante um período definido ou até serem eliminados manualmente.",
        },
      ] satisfies { icon: RetentionIcon; title: string; text: string }[],
      outro: "O período de conservação depende da finalidade e das características de cada cookie.",
    },
    changes: {
      id: "alteracoes",
      title: "Alterações à Política de Cookies",
      paragraphs: [
        "A Quinta Casa da Adega reserva-se o direito de atualizar esta Política de Cookies sempre que necessário, nomeadamente em resultado de alterações legislativas, tecnológicas ou funcionais do website.",
        "Recomendamos a consulta periódica desta página para se manter informado sobre a utilização de cookies.",
      ],
    },
    contacts: {
      id: "contactos",
      title: "Contactos",
      intro:
        "Para qualquer questão relacionada com esta Política de Cookies ou com a utilização dos seus dados pessoais, poderá contactar-nos através dos seguintes meios:",
      name: "Quinta Casa da Adega",
      websiteLabel: "Website",
      website: "https://quintacasadaadega.com/",
      locationLabel: "Localização",
      location: "Gradil, Mafra, Portugal",
      emailLabel: "Email",
      email: "hello@quintacasadaadega.com",
    },
  },
  copyright: "© 2026 Quinta Casa da Adega. Todos os direitos reservados.",
} as const;

/** Section order, also used for the table of contents. */
export const cookieSectionOrder = [
  "what",
  "types",
  "thirdParty",
  "consent",
  "disable",
  "data",
  "retention",
  "changes",
  "contacts",
] as const satisfies readonly (keyof typeof cookiePolicy.sections)[];

export function cookiesMetadata(): Metadata {
  const { title, description } = cookiePolicy.meta;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: COOKIES_HREF },
    // Same as the live page: legal boilerplate is kept out of search results, links are still followed.
    robots: { index: false, follow: true },
    icons: SITE_ICONS,
    openGraph: { type: "article", locale: "pt_PT", url: COOKIES_HREF, siteName: "Quinta Casa da Adega", title, description },
  };
}
