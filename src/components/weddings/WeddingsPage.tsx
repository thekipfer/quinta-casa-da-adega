import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Breadcrumbs, Container, WeddingCard } from "@/components/weddings/parts";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";
import { getWeddings, weddingsUi } from "@/lib/weddings";

/** /casamentos (pt) and /en/weddings (en) — every real wedding as a two-column masonry grid, newest first. */
export function WeddingsPage({ locale }: { locale: Locale }) {
  const ui = weddingsUi[locale];
  const weddings = getWeddings(locale);
  // Deterministic masonry: alternate weddings between two columns so each keeps its photo's own proportions.
  const columns = [weddings.filter((_, i) => i % 2 === 0), weddings.filter((_, i) => i % 2 === 1)];

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader locale={locale} current={routes.weddings[locale]} alternates={routes.weddings} />

      <main className="pt-[40px] pb-[80px] desk:pt-[70px] desk:pb-[120px]">
        <Container>
          <Breadcrumbs items={[{ label: ui.home, href: routes.home[locale] }, { label: ui.title }]} />
          <SplitText
            as="h1"
            text={ui.title}
            className="mt-6 font-display text-[52px] leading-[0.9] font-light tracking-[-0.04em] text-brand uppercase desk:mt-8 desk:text-[110px]"
          />

          <div className="mt-10 grid gap-[30px] md:grid-cols-2 md:items-start desk:mt-[60px]">
            {columns.map((column, c) => (
              <div key={c} className="flex flex-col gap-[30px]">
                {column.map((wedding) => (
                  <WeddingCard
                    key={wedding.slug}
                    locale={locale}
                    wedding={wedding}
                    sizes="(min-width: 1148px) 535px, (min-width: 768px) 50vw, 100vw"
                  />
                ))}
              </div>
            ))}
          </div>
        </Container>
      </main>

      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
