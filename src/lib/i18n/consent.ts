import type { ConsentCategory } from "@/lib/consent";
import type { Locale } from "@/lib/i18n/types";

export interface ConsentCopy {
  title: string;
  text: string;
  policyLabel: string;
  policyHref: string;
  accept: string;
  reject: string;
  customize: string;
  settingsTitle: string;
  settingsText: string;
  necessaryTitle: string;
  necessaryText: string;
  alwaysOn: string;
  categories: Record<ConsentCategory, { title: string; text: string }>;
  save: string;
  acceptAll: string;
  back: string;
  close: string;
  footerLink: string;
  policyButton: string;
}

const pt: ConsentCopy = {
  title: "Respeitamos a vossa privacidade",
  text: "Usamos cookies essenciais para o site funcionar. Com a vossa autorização, usamos também cookies para analisar visitas e personalizar conteúdos.",
  policyLabel: "Política de Cookies",
  policyHref: "/politica-de-cookies",
  accept: "Aceitar",
  reject: "Rejeitar",
  customize: "Personalizar",
  settingsTitle: "Preferências de cookies",
  settingsText: "Escolham que cookies podemos usar. Podem mudar de ideias a qualquer momento em “Definições de cookies”, no rodapé.",
  necessaryTitle: "Estritamente necessários",
  necessaryText: "Essenciais para a navegação, a segurança e as funcionalidades principais.",
  alwaysOn: "Sempre ativos",
  categories: {
    functional: { title: "Funcionalidade", text: "Memorizam preferências, como o idioma." },
    analytics: { title: "Análise e desempenho", text: "Ajudam-nos a perceber como o site é usado, para o melhorarmos." },
    marketing: { title: "Marketing", text: "Medem campanhas e mostram conteúdos relevantes (ex.: Google, Meta)." },
  },
  save: "Guardar escolhas",
  acceptAll: "Aceitar todos",
  back: "Voltar",
  close: "Fechar preferências de cookies",
  footerLink: "Definições de cookies",
  policyButton: "Alterar definições de cookies",
};

const en: ConsentCopy = {
  title: "We respect your privacy",
  text: "We use essential cookies to make the site work. With your permission, we also use cookies to analyse visits and personalise content.",
  policyLabel: "Cookie Policy",
  policyHref: "/politica-de-cookies",
  accept: "Accept",
  reject: "Reject",
  customize: "Customise",
  settingsTitle: "Cookie preferences",
  settingsText: "Choose which cookies we may use. You can change your mind at any time under “Cookie settings” in the footer.",
  necessaryTitle: "Strictly necessary",
  necessaryText: "Essential for browsing, security and the site's core features.",
  alwaysOn: "Always on",
  categories: {
    functional: { title: "Functionality", text: "Remember preferences, such as language." },
    analytics: { title: "Analytics & performance", text: "Help us understand how the site is used, so we can improve it." },
    marketing: { title: "Marketing", text: "Measure campaigns and show relevant content (e.g. Google, Meta)." },
  },
  save: "Save choices",
  acceptAll: "Accept all",
  back: "Back",
  close: "Close cookie preferences",
  footerLink: "Cookie settings",
  policyButton: "Change cookie settings",
};

const copy: Record<Locale, ConsentCopy> = { pt, en };

export function getConsentCopy(locale: Locale): ConsentCopy {
  return copy[locale];
}
