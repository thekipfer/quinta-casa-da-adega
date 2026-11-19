/**
 * Language-independent site data (contacts, images, social links).
 * All copy lives in the dictionaries under src/lib/i18n/.
 */
import type { HeroSlide, ImageAsset, SocialLink } from "@/types/content";

export const SITE_URL = "https://quintacasadaadega.com";

/** Favicon + Apple touch icon, shared by every page's metadata. */
export const SITE_ICONS = {
  icon: [{ url: "/images/cropped-FAVICON-1.webp", sizes: "512x512", type: "image/webp" }],
  apple: "/seo/apple-touch-icon.png",
};

export const PHONE_DISPLAY = "+351 913 733 457";
export const PHONE_HREF = "tel:+351913733457";
export const WHATSAPP_NUMBER = "351913733457";
export const WHATSAPP_SHORT_HREF = "http://wa.link/q9sjmd";

/** Opens a WhatsApp chat with the estate, pre-filled with `text`. */
export function whatsappHref(text: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
}

export const heroSlides: HeroSlide[] = [
  { src: "/images/hero-2.webp" },
  { src: "/images/hero-1.webp" },
  { src: "/images/hero-3.jpg" },
];

export const serviceImages = {
  quinta: { src: "/images/service-quinta.jpg", width: 682, height: 909 },
  catering: { src: "/images/service-catering.jpg", width: 682, height: 921 },
  floral: { src: "/images/service-floral.jpeg", width: 682, height: 921 },
  planning: { src: "/images/service-planeamento.jpg", width: 682, height: 909 },
} satisfies Record<string, ImageAsset>;

export const quintaImages = {
  left: { src: "/images/quinta-left.jpg", width: 1168, height: 1752 },
  right: { src: "/images/quinta-right.jpg", width: 1040, height: 1560 },
} satisfies Record<string, ImageAsset>;

export const ADDRESS_LINES = ["Rua das Forças Armadas, 34", "2665-118 Gradil, Mafra", "Portugal"];
export const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Quinta+Casa+da+Adega%2C+Rua+das+For%C3%A7as+Armadas+34%2C+2665-118+Gradil";

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/quintacasadaadega", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/QuintaCasadaAdega/", icon: "facebook" },
  { label: "WhatsApp", href: WHATSAPP_SHORT_HREF, icon: "whatsapp" },
];
