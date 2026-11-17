import type {
  BlogPost,
  ImageAsset,
  LegalLink,
  NavItem,
  QuizStep,
  ServiceBanner,
  Testimonial,
} from "@/types/content";

export type Locale = "pt" | "en";

/**
 * Every piece of copy on the home page. Components receive a `locale` prop (serialisable across
 * the server/client boundary) and look the dictionary up themselves, so functions are allowed here.
 */
export interface Dictionary {
  locale: Locale;
  /** BCP 47 tag for <html lang> and hreflang. */
  htmlLang: string;
  ogLocale: string;
  /** Locale passed to Intl for long dates in the proposal quiz. */
  dateLocale: string;
  homeHref: string;

  meta: { title: string; description: string; ogImageAlt: string };

  nav: {
    left: NavItem[];
    right: NavItem[];
    mobile: NavItem[];
    footer: NavItem[];
    legal: LegalLink[];
  };

  header: {
    mainMenu: string;
    secondaryMenu: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    mobileMenu: string;
    social: string;
    language: string;
  };

  hero: { gallery: string; headline: string; lead: string; cta: string };

  testimonials: {
    intro: string;
    list: string;
    previous: string;
    next: string;
    rating: string;
    items: Testimonial[];
  };

  services: { discover: string; items: ServiceBanner[] };

  quinta: {
    titleLead: string;
    titleRest: string;
    description: string;
    cta: { label: string; href: string };
    leftImage: ImageAsset & { alt: string };
    rightImage: ImageAsset & { alt: string };
  };

  journal: { titleLines: string[]; readMore: string; posts: BlogPost[] };

  callToAction: { headline: string; button: string };

  footer: {
    homeAria: string;
    tagline: string;
    explore: string;
    contacts: string;
    viewMap: string;
    proposalHeading: string;
    proposalTitle: string;
    proposalText: string;
    proposalButton: string;
    legal: string;
    madeBy: string;
  };

  whatsapp: {
    /** Pre-filled text for the footer WhatsApp contact link. */
    contactMessage: string;
    /** Pre-filled text for the floating "talk to Samyra" button. */
    samyraMessage: string;
    floatLabel: string;
    floatAria: string;
  };

  quiz: {
    steps: QuizStep[];
    close: string;
    closeDialog: string;
    progress: (step: number, total: number) => string;
    sent: string;
    noDateYet: string;
    errorDate: string;
    errorChoice: string;
    skip: string;
    next: string;
    back: string;
    contactTitle: string;
    contactSubtitle: string;
    namesLabel: string;
    namesPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    errorContact: string;
    submit: string;
    thanks: (names: string) => string;
    successText: string;
    openWhatsApp: string;
    backToSite: string;
    /** Labels for the WhatsApp message the quiz sends to the estate. */
    message: {
      intro: string;
      couple: string;
      year: string;
      date: string;
      noDate: string;
      guests: string;
      interests: string;
      email: string;
      phone: string;
    };
  };

  calendar: {
    months: string[];
    /** Monday first. */
    weekdays: string[];
    previousMonth: string;
    nextMonth: string;
  };
}
