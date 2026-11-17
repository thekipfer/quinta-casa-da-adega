import { blogImages, quintaImages, serviceImages } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/types";
import { itemPaths, routes } from "@/lib/routes";

/**
 * English (UK) copy. Hero, testimonials, services, venue, journal and CTA texts and the page
 * links come from the official quintacasadaadega.com/en/ page (with its typos fixed);
 * the footer, quiz and accessibility labels are translated from the Portuguese version.
 */
export const en: Dictionary = {
  locale: "en",
  htmlLang: "en-GB",
  ogLocale: "en_GB",
  dateLocale: "en-GB",
  homeHref: "/en",

  meta: {
    title: "Wedding Venue near Lisbon | Quinta Casa da Adega",
    description:
      "Celebrate an exclusive and elegant wedding at Quinta Casa da Adega, surrounded by nature, just minutes from Lisbon. Your wedding venue near Lisbon.",
    ogImageAlt: "Wedding venue in Mafra - Quinta Casa da Adega",
  },

  nav: {
    left: [
      { label: "Home", href: routes.home.en, current: true },
      { label: "Our Venue", href: routes.about.en },
      { label: "Services", href: routes.services.en },
    ],
    right: [
      { label: "Weddings", href: routes.weddings.en },
      { label: "Contact", href: routes.quote.en },
    ],
    mobile: [
      { label: "Home", href: routes.home.en, current: true },
      { label: "The Venue", href: routes.about.en },
      { label: "Services", href: routes.services.en },
      { label: "Weddings", href: routes.weddings.en },
      { label: "Contact Us", href: routes.quote.en },
    ],
    footer: [
      { label: "Home", href: routes.home.en },
      { label: "Our Venue", href: routes.about.en },
      { label: "Services", href: routes.services.en },
      { label: "Weddings", href: routes.weddings.en },
      { label: "Contact", href: routes.quote.en },
    ],
    legal: [
      { label: "Privacy Policy", short: "Privacy", href: "/en/privacy-policy/" },
      // The cookie policy has no English version on the live site.
      { label: "Cookie Policy", short: "Cookies", href: "/politica-de-cookies/" },
      { label: "Complaints Book", href: "https://www.livroreclamacoes.pt/Inicio/", external: true },
    ],
  },

  header: {
    mainMenu: "Main menu",
    secondaryMenu: "Secondary menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    mobileMenu: "Mobile menu",
    social: "Social media",
    language: "Language",
  },

  hero: {
    gallery: "Gallery",
    headline: "Only 15 weddings a year",
    lead: "Charming, rustic, and exclusive, Quinta Casa da Adega turns your day into an unforgettable celebration.",
    cta: "Get my bespoke proposal",
  },

  testimonials: {
    intro:
      "Every wedding we host becomes part of our story. Here are some testimonials from couples who shared their special day with us.",
    list: "Testimonials",
    previous: "Previous testimonial",
    next: "Next testimonial",
    rating: "5 out of 5 stars",
    items: [
      {
        text: "We chose Quinta Casa da Adega for its charming atmosphere, surrounded by nature and conveniently located near Lisbon and Ericeira. We loved the garden ceremony, the beautifully illuminated marquee, the delicious food and the unique touches that made our day so special. A special mention goes to Samyra and her entire team for their dedication, care and professionalism. We highly recommend this venue!",
        author: "Renato Ferreira",
        date: "25/09/2026",
      },
      {
        text: "Excellent professionalism, flawless catering and table service (which received countless compliments), and the perfect setting!\nQuinta Casa da Adega is a welcoming venue, ready to make your dream come true.",
        author: "Larissa",
        date: "01/08/2025",
      },
      {
        text: "Quinta Casa da Adega was the perfect setting for our wedding. Our guests are still talking about the delicious food and the cheerful, attentive team who looked after us that day. The kindness and dedication of Samyra — which continued even after the wedding — made all the difference. We planned everything from abroad, and the compliments were endless. Thank you.",
        author: "Margarida",
        date: "05/08/2025",
      },
      {
        text: "We had a perfect wedding at Quinta Casa da Adega. The entire process was seamless, the team always available, and the vendors impeccable. On the big day, everything was beautiful — excellent food, décor exactly as we requested, and a tireless team from start to finish. We recommend them 100%.",
        author: "Rita",
        date: "Sent on 26/08/2025",
      },
      {
        text: "We had our dream wedding at Quinta Casa da Adega, and none of it would have been possible without the amazing help of Samyra. The venue is stunning, the service excellent, and the vendor recommendations were perfect. For those planning from abroad, it’s the ideal place. I wholeheartedly recommend it — I would do it all over again!",
        author: "Erika",
        date: "02/11/2025",
      },
    ],
  },

  services: {
    discover: "Discover",
    items: [
      { title: "The Venue", href: routes.about.en, image: serviceImages.quinta },
      { title: "Catering", href: routes.services.en, image: serviceImages.catering },
      { title: "Floral Design", href: itemPaths("services", "design-floral").en, image: serviceImages.floral },
      { title: "Planning", href: routes.services.en, image: serviceImages.planning },
    ],
  },

  quinta: {
    titleLead: "The",
    titleRest: "Estate",
    description:
      "An intimate and sophisticated venue, just one hour from Lisbon, with views of São Silvestre Church and an unforgettable sunset.",
    cta: { label: "Learn more", href: routes.about.en },
    leftImage: { ...quintaImages.left, alt: "Quinta Casa da Adega — wedding venue in Portugal" },
    rightImage: { ...quintaImages.right, alt: "" },
  },

  journal: {
    titleLines: ["The Estate", "Journal"],
    readMore: "Read More",
    posts: [
      {
        title: "Wedding Decoration Styles",
        href: "/en/types-of-wedding-decoration/",
        image: blogImages.decoration,
        date: "28 October, 2024",
        dateHref: "/en/2024/10/",
        category: "Wedding Inspiration & Style",
        categoryHref: "/en/inspiracao-e-estilo-de-casamento/",
        excerpt:
          "On a sunny spring Saturday, Quinta Casa da Adega had the honour of hosting a truly enchanting wedding....",
      },
      {
        title: "Rustic Wedding with a Touch of Elegance",
        href: "/en/rustic-wedding-with-elegant-touch/",
        image: blogImages.rustic,
        date: "3 July, 2024",
        dateHref: "/en/2024/07/",
        category: "Real Weddings at the Estate",
        categoryHref: "/en/casamentos-reais/",
        excerpt:
          "On a sunny spring Saturday, Quinta Casa da Adega had the honour of hosting a truly delightful wedding.",
      },
    ],
  },

  callToAction: {
    headline: "Where your ‘I do’ begins",
    button: "Request a proposal",
  },

  footer: {
    homeAria: "Quinta Casa da Adega — home",
    tagline: "Charming, rustic and exclusive — a wedding venue in Mafra, just minutes from Lisbon.",
    explore: "Explore",
    contacts: "Contact",
    viewMap: "View on map",
    proposalHeading: "Request a proposal",
    proposalTitle: "Only 15 weddings a year.",
    proposalText: "Secure your date today — we’ll reply with a bespoke proposal.",
    proposalButton: "Get my bespoke proposal",
    legal: "Legal information",
    madeBy: "Made by",
  },

  whatsapp: {
    contactMessage:
      "Hello, I found your website and would love to receive more information about weddings at Quinta Casa da Adega.",
    samyraMessage:
      "Hello Samyra! I found the Quinta Casa da Adega website and would love to know more about weddings at the estate.",
    floatLabel: "Talk to Samyra",
    floatAria: "Talk to Samyra on WhatsApp",
  },

  quiz: {
    steps: [
      {
        kind: "single",
        key: "year",
        title: "When are you planning to say\n‘I do’?",
        subtitle: "We host only 15 weddings a year\u00A0— dates book up early.",
        options: ["2027", "2028", "2029", "Not decided yet"],
      },
      {
        kind: "single",
        key: "guests",
        title: "How many guests are you expecting?",
        subtitle: "An estimate is enough for us to prepare your proposal.",
        options: ["Up to 80", "80 to 120", "120 to 160", "160 to 200", "More than 200"],
      },
      {
        kind: "date",
        key: "date",
        title: "Do you have a date in mind?",
        subtitle: "Pick the day on the calendar — we’ll check availability for you.",
      },
      {
        kind: "multi",
        key: "services",
        title: "What would you like to include?",
        subtitle: "Choose all the options that apply.",
        options: [
          "Catering & dining",
          "Floral design",
          "Wedding planning",
          "Bar & drinks",
          "Music & entertainment",
          "Photography & videography",
        ],
        optional: true,
      },
    ],
    close: "Close",
    closeDialog: "Close proposal request",
    progress: (step, total) => `Proposal request · ${step} of ${total}`,
    sent: "Request sent",
    noDateYet: "We don’t have a date yet",
    errorDate: "Pick a day on the calendar, or let us know you don’t have a date yet.",
    errorChoice: "Choose an option to continue.",
    skip: "Skip",
    next: "Next",
    back: "Back",
    contactTitle: "Tell us about you",
    contactSubtitle: "We’ll reply with your bespoke proposal within 24 hours.",
    namesLabel: "Couple’s names",
    namesPlaceholder: "Anna & Michael",
    emailLabel: "Email",
    emailPlaceholder: "name@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "+44 7700 900123",
    messageLabel: "Anything else we should know? (optional)",
    errorContact: "Please fill in your names, a valid email and your phone number.",
    submit: "Send request",
    thanks: (names) => `Thank you${names ? `, ${names}` : ""}!`,
    successText:
      "We’ve opened WhatsApp with your request already filled in — just tap send. We’ll be in touch shortly with your proposal.",
    openWhatsApp: "Open WhatsApp",
    backToSite: "Back to the site",
    message: {
      intro: "Hello! We would like to request a proposal for our wedding at Quinta Casa da Adega.",
      couple: "Couple",
      year: "Year",
      date: "Preferred date",
      noDate: "No date set yet",
      guests: "Guests",
      interests: "Interests",
      email: "Email",
      phone: "Phone",
    },
  },

  calendar: {
    months: [
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
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    previousMonth: "Previous month",
    nextMonth: "Next month",
  },
};
