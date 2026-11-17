import Image from "next/image";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const languageMeta: Record<Locale, { code: string; name: string; flag: string }> = {
  pt: { code: "PT", name: "Português", flag: "/images/flag-pt.svg" },
  en: { code: "EN", name: "English", flag: "/images/flag-en.svg" },
};

type LanguageSwitcherProps = {
  locale: Locale;
  /** "compact": small pill for headers. "menu": larger labelled control. */
  variant?: "compact" | "menu";
  /** Counterpart of the current page in each language; falls back to that language's home. */
  alternates?: Partial<Record<Locale, string>>;
  /** Show the round flag next to each language code (default true). */
  flags?: boolean;
  className?: string;
};

/** Segmented language switcher with round flags — the current language is filled, the other is a quiet link. */
export function LanguageSwitcher({
  locale,
  variant = "compact",
  alternates,
  flags = true,
  className,
}: LanguageSwitcherProps) {
  const menu = variant === "menu";

  return (
    <nav aria-label={getDictionary(locale).header.language} className={cn("flex items-center", className)}>
      <ul className={cn("flex items-center rounded-full border border-hairline bg-white", menu ? "p-1" : "p-[3px]")}>
        {locales.map(({ locale: code, homeHref, htmlLang }) => {
          const lang = languageMeta[code];
          const current = code === locale;
          return (
            <li key={code}>
              <a
                href={alternates?.[code] ?? homeHref}
                hrefLang={htmlLang}
                lang={htmlLang}
                aria-current={current ? "true" : undefined}
                title={lang.name}
                className={cn(
                  "group flex items-center justify-center rounded-full font-ui font-medium tracking-[0.12em] transition-colors duration-300",
                  menu ? "h-10 gap-2.5 pr-5 text-[13px]" : "h-[28px] gap-1.5 pr-2.5 text-[12px]",
                  flags ? (menu ? "pl-2" : "pl-[5px]") : menu ? "pl-5" : "pl-2.5",
                  current ? "pointer-events-none bg-brand text-white" : "text-ink hover:bg-sand/25 hover:text-brand",
                )}
              >
                {flags && (
                  <Image
                    src={lang.flag}
                    alt=""
                    width={20}
                    height={20}
                    className={cn(
                      "shrink-0 rounded-full object-cover ring-1 transition-opacity duration-300",
                      menu ? "size-6" : "size-[18px]",
                      current ? "ring-white/70" : "opacity-80 ring-hairline group-hover:opacity-100",
                    )}
                  />
                )}
                {menu ? lang.name : lang.code}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
