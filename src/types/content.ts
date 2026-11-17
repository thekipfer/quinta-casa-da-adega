export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface LegalLink extends NavItem {
  short?: string;
  external?: boolean;
}

export interface HeroSlide {
  src: string;
}

export interface Testimonial {
  text: string;
  author: string;
  date: string;
}

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

export interface ServiceBanner {
  title: string;
  href: string;
  image: ImageAsset;
}

export interface BlogPost {
  title: string;
  href: string;
  image: string;
  date: string;
  dateHref: string;
  category: string;
  categoryHref: string;
  excerpt: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "whatsapp";
}

export interface QuizChoiceStep {
  kind: "single" | "multi";
  key: "year" | "guests" | "services";
  /** A "\n" marks the desktop line break; on small screens the title wraps naturally. */
  title: string;
  subtitle: string;
  options: string[];
  optional?: boolean;
}

export interface QuizDateStep {
  kind: "date";
  key: "date";
  title: string;
  subtitle: string;
  optional?: false;
}

export type QuizStep = QuizChoiceStep | QuizDateStep;
