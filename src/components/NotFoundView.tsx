import Image from "next/image";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const copy = {
  pt: {
    docTitle: "Página não encontrada | Quinta Casa da Adega",
    title: "Esta página não existe",
    text: "Talvez a ligação esteja incompleta, ou a página tenha mudado de lugar. A quinta continua exatamente onde a deixou.",
    home: "Voltar ao início",
    contact: "Pedir proposta",
    contactHref: "/orcamento",
  },
  en: {
    docTitle: "Page not found | Quinta Casa da Adega",
    title: "This page doesn’t exist",
    text: "The link may be incomplete, or the page may have moved. The estate is still right where you left it.",
    home: "Back to home",
    contact: "Request a proposal",
    contactHref: "/en/quote",
  },
} as const;

/**
 * Runs before first paint on the global 404: for /en/... URLs it switches <html lang> and sets a
 * data-locale flag that swaps the visible copy to English (see the in-data-[locale=en] classes).
 * The tab title stays language-neutral ("404 | Quinta Casa da Adega", set in global-not-found.tsx).
 */
const pickLocaleScript = `(function(){if(/^\\/en(\\/|$)/.test(location.pathname)){var d=document.documentElement;d.lang="en-GB";d.dataset.locale="en";}})();`;

type NotFoundViewProps =
  /** Inside a root layout, where the language is known. */
  | { locale: Locale; bilingual?: false }
  /** Global 404 (no layout, language unknown at render time): renders both and shows the one matching the URL. */
  | { locale?: undefined; bilingual: true };

/**
 * Minimal 404: logo, a large light "404" with hairlines and the theme's pink asterisk,
 * one line of copy and two ways back. Elements rise in one after another.
 */
export function NotFoundView(props: NotFoundViewProps) {
  const ptHidden = "in-data-[locale=en]:hidden";
  const enOnly = "hidden in-data-[locale=en]:contents";

  // In bilingual mode each locale-specific piece is rendered twice and one copy is hidden.
  const localized = (render: (l: Locale) => ReactNode) =>
    props.bilingual ? (
      <>
        <span className={cn("contents", ptHidden)}>{render("pt")}</span>
        <span lang="en-GB" className={enOnly}>
          {render("en")}
        </span>
      </>
    ) : (
      render(props.locale)
    );

  return (
    <main className="flex min-h-svh flex-col items-center bg-white px-6 text-center">
      {props.bilingual ? (
        <script dangerouslySetInnerHTML={{ __html: pickLocaleScript }} />
      ) : (
        <title>{copy[props.locale].docTitle}</title>
      )}

      {localized((l) => (
        <a href={routes.home[l]} aria-label="Quinta Casa da Adega" className="qcda-hero-rise mt-10 desk:mt-14">
          <Image
            src="/images/logo-quinta.png"
            alt="Quinta Casa da Adega"
            width={142}
            height={100}
            priority
            className="h-[72px] w-auto desk:h-[90px]"
          />
        </a>
      ))}

      <div className="flex w-full max-w-[560px] flex-1 flex-col items-center justify-center py-16">
        <p
          aria-hidden="true"
          className="qcda-hero-rise font-display text-[120px] leading-[0.8] font-light tracking-[0.04em] text-brand [--rise-delay:0.1s] [font-variant-numeric:lining-nums] desk:text-[180px]"
        >
          404
        </p>

        <div aria-hidden="true" className="qcda-hero-rise mt-8 flex w-full max-w-[260px] items-center gap-4 [--rise-delay:0.2s]">
          <span className="h-px flex-1 bg-hairline" />
          <span className="-mb-3 font-display text-[44px] leading-none font-light text-[#e0bdb6]">*</span>
          <span className="h-px flex-1 bg-hairline" />
        </div>

        {localized((l) => (
          <>
            <h1 className="qcda-hero-rise mt-6 font-display text-[34px] leading-[1.1] font-normal text-ink uppercase [--rise-delay:0.3s] desk:text-[42px]">
              {copy[l].title}
            </h1>
            <p className="qcda-hero-rise mt-4 max-w-[440px] font-serif text-[19px] leading-[1.55] text-body italic [--rise-delay:0.4s]">
              {copy[l].text}
            </p>
            <div className="qcda-hero-rise mt-10 flex flex-col items-center gap-6 [--rise-delay:0.5s] sm:flex-row sm:gap-10">
              <a href={routes.home[l]} className="qcda-btn qcda-btn--filled hover:bg-brand-deep">
                {copy[l].home}
              </a>
              <a href={copy[l].contactHref} className="qcda-textual text-ink transition-colors hover:text-brand">
                <span>{copy[l].contact}</span>
              </a>
            </div>
          </>
        ))}
      </div>

      <p className="pb-8 font-ui text-[12px] tracking-[0.2em] text-body/70 uppercase">Gradil · Mafra · Portugal</p>
    </main>
  );
}
