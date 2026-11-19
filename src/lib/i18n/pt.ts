import { quintaImages, serviceImages } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/types";
import { itemPaths, routes } from "@/lib/routes";

export const pt: Dictionary = {
  locale: "pt",
  htmlLang: "pt-PT",
  ogLocale: "pt_PT",
  dateLocale: "pt-PT",
  homeHref: "/",

  meta: {
    title: "Quinta para Casamento perto de Lisboa | Quinta Casa da Adega",
    description:
      "Quinta para casamentos em Mafra, perto de Lisboa, Sintra e Ericeira. Cerimónia ao ar livre, plano B elegante e apenas 15 casamentos por ano — um por dia.",
    ogImageAlt: "Quinta para casamento em Mafra - Quinta Casa da Adega",
  },

  nav: {
    left: [
      { label: "Início", href: routes.home.pt, current: true },
      { label: "A Nossa Quinta", href: routes.about.pt },
    ],
    right: [
      { label: "Casamentos", href: routes.weddings.pt },
      { label: "Contacto", href: routes.quote.pt },
    ],
    mobile: [
      { label: "Início", href: routes.home.pt, current: true },
      { label: "A Quinta", href: routes.about.pt },
      { label: "Casamentos", href: routes.weddings.pt },
      { label: "Contacte-nos", href: routes.quote.pt },
    ],
    footer: [
      { label: "Início", href: routes.home.pt },
      { label: "A Nossa Quinta", href: routes.about.pt },
      { label: "Casamentos", href: routes.weddings.pt },
      { label: "Contacto", href: routes.quote.pt },
    ],
    legal: [
      { label: "Política de Privacidade", short: "Privacidade", href: "/politica-de-privacidade" },
      { label: "Política de Cookies", short: "Cookies", href: "/politica-de-cookies" },
      { label: "Livro de Reclamações", href: "https://www.livroreclamacoes.pt/Inicio/", external: true },
    ],
  },

  header: {
    mainMenu: "Menu principal",
    secondaryMenu: "Menu secundário",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    menu: "Menu",
    mobileMenu: "Menu móvel",
    social: "Redes sociais",
    language: "Idioma",
  },

  hero: {
    gallery: "Galeria",
    headline: "Apenas 15 casamentos por ano",
    lead: "Charmosa, rústica e exclusiva, a Quinta Casa da Adega transforma o vosso dia num momento inesquecível.",
    cta: "Peça a sua proposta",
    slideAlts: [
      "Tenda de casamento com mesas postas e candeeiros, junto à casa da Quinta Casa da Adega",
      "Tenda iluminada à noite com a mesa do jantar de casamento",
      "Noivos a caminhar junto a uma mesa comprida posta no campo florido da quinta",
    ],
  },

  testimonials: {
    intro:
      "Cada casamento que recebemos torna-se parte da nossa história. Estes são alguns dos testemunhos de quem viveu este momento connosco.",
    list: "Testemunhos",
    previous: "Testemunho anterior",
    next: "Próximo testemunho",
    rating: "5 de 5 estrelas",
    items: [
      {
        text: "Escolhemos a Quinta Casa da Adega pelo seu ambiente encantador, rodeado pela natureza e próximo de Lisboa e Ericeira. Adorámos o jardim para a cerimónia, a tenda iluminada, a excelente comida e os detalhes únicos que tornaram o nosso dia especial. Destacamos ainda a Samyra e toda a equipa pela dedicação, atenção e profissionalismo. Uma quinta que recomendamos vivamente!",
        author: "Renato Ferreira",
        date: "25/09/2026",
      },
      {
        text: "Ótimo profissionalismo, buffet e serviço de mesa impecáveis (no qual recebemos inúmeros elogios) e ambiente perfeito!\nA Quinta Casa da Adega é um lugar acolhedor e preparado para realizar o seu sonho.",
        author: "Larissa",
        date: "01/08/2025",
      },
      {
        text: "A Quinta Casa da Adega foi o palco perfeito para o nosso casamento. Os nossos convidados ainda falam da comida deliciosa e da boa disposição da equipa que cuidou de nós nesse dia. A simpatia e a atenção da Samyra (que continuaram até depois do casamento) fizeram toda a diferença. Planeámos tudo a partir do estrangeiro e os elogios foram mais que muitos. Obrigada. (Traduzido do inglês)",
        author: "Margarida",
        date: "05/08/2025",
      },
      {
        text: "Tivemos um casamento perfeito na Quinta Casa da Adega. Todo o processo foi fácil, a equipa sempre disponível e os fornecedores impecáveis. No grande dia, tudo estava lindo — comida excelente, decoração fiel ao que pedimos e uma equipa incansável do início ao fim. Recomendamos a 100%.",
        author: "Rita",
        date: "Enviado a 26/08/2025",
      },
      {
        text: "Tivemos nosso casamento dos sonhos na Quinta Casa da Adega, e nada teria sido possível sem a incrível ajuda da Samyra. O espaço é lindo, o serviço excelente e as indicações de fornecedores foram perfeitas. Para quem organiza tudo de fora, é o local ideal. Recomendo de coração — faria tudo de novo! (Traduzido do inglês)",
        author: "Erika",
        date: "02/11/2025",
      },
    ],
  },

  services: {
    discover: "Descobrir",
    items: [
      {
        title: "Decoração",
        href: itemPaths("services", "decoracao-de-mesas").pt,
        image: serviceImages.quinta,
        alt: "Mesa de casamento comprida posta no relvado da quinta, com vista para os campos de Mafra",
      },
      {
        title: "Catering",
        href: itemPaths("services", "catering").pt,
        image: serviceImages.catering,
        alt: "Prato de petiscos com azeitonas e enchidos servido num casamento na quinta",
      },
      {
        title: "Floral Design",
        href: itemPaths("services", "design-floral").pt,
        image: serviceImages.floral,
        alt: "Mesa com flores vermelhas e cor de laranja sob uma pérgula com luzes suspensas",
      },
      {
        title: "Planeamento",
        href: itemPaths("services", "equipa-especializada").pt,
        image: serviceImages.planning,
        alt: "Vestido de noiva pendurado numa árvore junto às mesas redondas da receção",
      },
    ],
  },

  quinta: {
    titleLead: "A",
    titleRest: "Quinta",
    description:
      "Um espaço intimista e sofisticado, a apenas 1 hora de Lisboa, com vista para a Igreja de São Silvestre e um pôr do sol inesquecível.",
    cta: { label: "Saiba mais", href: routes.about.pt },
    leftImage: { ...quintaImages.left, alt: "Quinta Casa da Adega_Quinta para Casamento em Portugal" },
    rightImage: { ...quintaImages.right, alt: "Noivos na escadaria de pedra da Quinta Casa da Adega" },
  },

  weddingsHome: {
    titleLines: ["Casamentos", "na Quinta"],
    viewWedding: "Ver casamento",
    viewAll: "Ver todos os casamentos",
  },

  callToAction: {
    headline: "Aqui começa o vosso 'Sim'",
    button: "Solicitar Proposta",
  },

  footer: {
    homeAria: "Quinta Casa da Adega — início",
    tagline: "Charmosa, rústica e exclusiva — uma quinta para casamentos em Mafra, a poucos minutos de Lisboa.",
    explore: "Explorar",
    contacts: "Contactos",
    viewMap: "Ver no mapa",
    proposalHeading: "Pedido de proposta",
    proposalTitle: "Apenas 15 casamentos\npor ano.",
    proposalText: "Garantam já a vossa data — respondemos com uma proposta personalizada.",
    proposalButton: "Peça a sua proposta",
    legal: "Informação legal",
    madeBy: "Made by",
  },

  whatsapp: {
    contactMessage:
      "Olá, encontrei seu site e estou interessado(a) em saber mais sobre os serviços da Quinta Casa da Adega.",
    samyraMessage:
      "Olá Samyra! Encontrei o site da Quinta Casa da Adega e gostaria de saber mais sobre casamentos na quinta.",
    floatLabel: "Fale com a Samyra",
    floatAria: "Falar com a Samyra no WhatsApp",
  },

  quiz: {
    steps: [
      {
        kind: "single",
        key: "year",
        // \u00A0 keeps "o vosso casamento?" and "— as datas…" from splitting into an awkward wrap on phones.
        title: "Para quando estão a planear\no\u00A0vosso\u00A0casamento?",
        subtitle: "Realizamos apenas 15 casamentos por ano\u00A0— as datas são reservadas com antecedência.",
        options: ["2027", "2028", "2029", "Ainda não decidimos"],
      },
      {
        kind: "single",
        key: "guests",
        title: "Quantos convidados esperam?",
        subtitle: "Uma estimativa é suficiente para preparar a vossa proposta.",
        options: ["Até 80", "80 a 120", "120 a 160", "160 a 200", "Mais de 200"],
      },
      {
        kind: "date",
        key: "date",
        title: "Já têm uma data em mente?",
        subtitle: "Escolham o dia no calendário — verificamos a disponibilidade para vós.",
      },
      {
        kind: "multi",
        key: "services",
        title: "O que gostariam de incluir?",
        subtitle: "Escolham todas as opções que fizerem sentido.",
        options: [
          "Catering e gastronomia",
          "Decoração floral",
          "Wedding Planning",
          "Bar e bebidas",
          "Música e entretenimento",
          "Fotografia e videografia",
        ],
        optional: true,
      },
    ],
    close: "Fechar",
    closeDialog: "Fechar pedido de proposta",
    progress: (step, total) => `Pedido de proposta · ${step} de ${total}`,
    sent: "Pedido enviado",
    noDateYet: "Ainda não temos data definida",
    errorDate: "Escolham um dia no calendário ou indiquem que ainda não têm data.",
    errorChoice: "Escolham uma opção para continuar.",
    skip: "Saltar",
    next: "Seguinte",
    back: "Voltar",
    contactTitle: "Contem-nos sobre vós",
    contactSubtitle: "Respondemos com a vossa proposta personalizada em menos de 24 horas.",
    namesLabel: "Nome dos noivos",
    namesPlaceholder: "Ana & Miguel",
    emailLabel: "Email",
    emailPlaceholder: "nome@email.com",
    phoneLabel: "Telemóvel",
    phonePlaceholder: "+351 912 345 678",
    messageLabel: "Algo mais que devamos saber? (opcional)",
    errorContact: "Preencham o nome, um email válido e o telemóvel.",
    submit: "Enviar pedido",
    thanks: (names) => `Obrigado${names ? `, ${names}` : ""}!`,
    successText:
      "Abrimos o WhatsApp com o vosso pedido já preenchido — basta carregar em enviar. Entraremos em contacto brevemente com a vossa proposta.",
    openWhatsApp: "Abrir WhatsApp",
    backToSite: "Voltar ao site",
    message: {
      intro: "Olá! Gostaríamos de pedir uma proposta para o nosso casamento na Quinta Casa da Adega.",
      couple: "Noivos",
      year: "Ano",
      date: "Data pretendida",
      noDate: "Ainda sem data definida",
      guests: "Convidados",
      interests: "Interesses",
      email: "Email",
      phone: "Telemóvel",
    },
  },

  calendar: {
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    weekdays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    previousMonth: "Mês anterior",
    nextMonth: "Mês seguinte",
  },
};
