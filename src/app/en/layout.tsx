import { fontVariables } from "@/app/fonts";
import { ConsentScripts } from "@/components/consent/ConsentScripts";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

// Root layout for the English site (sibling of app/(pt)/layout.tsx).
export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={getDictionary("en").htmlLang} className={`${fontVariables} antialiased`}>
      <body>
        {children}
        <CookieConsent locale="en" />
        <ConsentScripts />
      </body>
    </html>
  );
}
