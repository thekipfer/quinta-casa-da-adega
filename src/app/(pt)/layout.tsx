import { fontVariables } from "@/app/fonts";
import { ConsentScripts } from "@/components/consent/ConsentScripts";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

// Root layout for the Portuguese site. /en has its own root layout so <html lang> is correct per language.
export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={getDictionary("pt").htmlLang} className={`${fontVariables} antialiased`}>
      <body>
        {children}
        <CookieConsent locale="pt" />
        <ConsentScripts />
      </body>
    </html>
  );
}
