import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old English URLs (the WordPress site's and this app's previous /about) → their /en/<section> pages.
  async redirects() {
    return [
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/en/wedding-venue-mafra", destination: "/en/about", permanent: true },
      { source: "/en/category-3/weedings", destination: "/en/weddings", permanent: true },
      { source: "/en/category-3/weddings", destination: "/en/weddings", permanent: true },
      { source: "/en/category-3/services", destination: "/en/services", permanent: true },
      { source: "/en/wedding-venue-rental", destination: "/en/quote", permanent: true },
    ];
  },
};

export default nextConfig;
