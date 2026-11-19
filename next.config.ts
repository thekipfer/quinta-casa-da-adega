import type { NextConfig } from "next";

const WEDDING_SLUGS = ["erika-simon", "larissa-daniel"];
const SERVICE_SLUGS = ["decoracao-de-mesas", "equipa-especializada", "design-floral"];

/** WordPress portfolio items lived under /servico/casamento/<slug> (pt) and /en/servico/weeding/<slug> (en). */
const portfolioRedirects = (prefix: string, weddings: string, services: string) => [
  ...WEDDING_SLUGS.map((slug) => ({ source: `${prefix}/${slug}`, destination: `${weddings}/${slug}`, permanent: true })),
  ...SERVICE_SLUGS.map((slug) => ({ source: `${prefix}/${slug}`, destination: `${services}/${slug}`, permanent: true })),
];

const nextConfig: NextConfig = {
  // Two root layouts and no top-level one: unmatched URLs are served by app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
  // Serve AVIF first (smaller at the same quality), WebP as fallback; next/image picks per browser.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Every URL of the WordPress site this app replaces (its sitemap_index.xml, checked 2026-11-19) → the
   * matching page here, so rankings and backlinks carry over.
   * permanent: true  → 308, an exact equivalent exists.
   * permanent: false → 307, a stopgap: no equivalent yet (blog, English legal pages), sent to the closest page.
   */
  async redirects() {
    return [
      // English pages from this app's earlier versions / the WordPress site.
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/en/wedding-venue-mafra", destination: "/en/about", permanent: true },
      { source: "/en/category-3/weedings", destination: "/en/weddings", permanent: true },
      { source: "/en/category-3/weddings", destination: "/en/weddings", permanent: true },
      { source: "/en/category-3/services", destination: "/en", permanent: true },
      // The services list page was removed (the individual services stay) → home.
      { source: "/en/services", destination: "/en", permanent: true },
      { source: "/servicos", destination: "/", permanent: true },
      { source: "/en/wedding-venue-rental", destination: "/en/quote", permanent: true },
      { source: "/en/wedding-gallery-in-portugal", destination: "/en/weddings", permanent: true },
      { source: "/en/servico/weeding", destination: "/en/weddings", permanent: true },
      ...portfolioRedirects("/en/servico/weeding", "/en/weddings", "/en/services"),

      // Portuguese pages from the WordPress site.
      { source: "/quinta-para-casamento-mafra", destination: "/sobre", permanent: true },
      { source: "/galeria-de-casamentos-em-portugal", destination: "/casamentos", permanent: true },
      { source: "/categoria/casamentos", destination: "/casamentos", permanent: true },
      { source: "/categoria/servicos", destination: "/", permanent: true },
      { source: "/servico/casamento", destination: "/casamentos", permanent: true },
      ...portfolioRedirects("/servico/casamento", "/casamentos", "/servicos"),

      // Stopgaps: English legal pages don't exist yet → the Portuguese ones.
      { source: "/en/privacy-policy", destination: "/politica-de-privacidade", permanent: false },
      { source: "/en/eu-cookies-policy", destination: "/politica-de-cookies", permanent: false },

      // Stopgaps: the blog isn't migrated yet → the closest section (also keeps the home "Journal" links working).
      { source: "/tipos-de-decoracao-para-casamento", destination: "/servicos/decoracao-de-mesas", permanent: false },
      { source: "/casamento-rustico-com-toque-de-elegancia", destination: "/casamentos", permanent: false },
      { source: "/blog", destination: "/casamentos", permanent: false },
      { source: "/casamentos-reais", destination: "/casamentos", permanent: false },
      { source: "/inspiracao-e-estilo-de-casamento", destination: "/casamentos", permanent: false },
      { source: "/:year(\\d{4})/:month(\\d{2})", destination: "/casamentos", permanent: false },
      { source: "/en/types-of-wedding-decoration", destination: "/en/services/decoracao-de-mesas", permanent: false },
      { source: "/en/rustic-wedding-with-elegant-touch", destination: "/en/weddings", permanent: false },
      { source: "/en/casamentos-reais", destination: "/en/weddings", permanent: false },
      { source: "/en/inspiracao-e-estilo-de-casamento", destination: "/en/weddings", permanent: false },
      { source: "/en/:year(\\d{4})/:month(\\d{2})", destination: "/en/weddings", permanent: false },
    ];
  },
};

export default nextConfig;
