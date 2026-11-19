import type { Metadata } from "next";
import { fontVariables } from "@/app/fonts";
import { NotFoundView } from "@/components/NotFoundView";
import { SITE_ICONS } from "@/lib/content";
import "./globals.css";

// Served for any URL that matches no route. The app has two root layouts ((pt) and en) and no
// top-level one, so this file renders its own <html>, styles and fonts. It renders both languages;
// an inline script in NotFoundView shows the English copy for /en/... URLs before first paint.
export const metadata: Metadata = {
  // Language-neutral: the same document serves Portuguese and English URLs.
  title: "404 | Quinta Casa da Adega",
  description: "Página não encontrada · Page not found",
  icons: SITE_ICONS,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    // lang / data-locale are adjusted for /en/... URLs by the inline script before hydration.
    <html lang="pt-PT" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body>
        <NotFoundView bilingual />
      </body>
    </html>
  );
}
