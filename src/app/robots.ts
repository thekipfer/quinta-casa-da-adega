import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/**
 * Everything public is crawlable (including /_next/static and /_next/image, which Google needs to
 * render pages and index photos). Only API routes are excluded. Noindex pages (cookie policy, 404)
 * stay crawlable so Google can see their noindex tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
