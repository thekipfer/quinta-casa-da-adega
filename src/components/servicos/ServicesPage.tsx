import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Breadcrumbs } from "@/components/servicos/Breadcrumbs";
import { ServiceCard } from "@/components/servicos/ServiceCard";
import { getServices, servicesUi } from "@/lib/i18n/servicos";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";

/** /servicos (pt) and /en/services (en) — breadcrumb title and the services grid (2 columns on desktop, as on the live site). */
export function ServicesPage({ locale }: { locale: Locale }) {
  const ui = servicesUi[locale];
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader locale={locale} current={routes.services[locale]} alternates={routes.services} />
      <main className="mx-auto w-full max-w-[1148px] px-6 pt-10 pb-[100px] desk:pt-[54px] desk:pb-[150px]">
        <Breadcrumbs items={[{ label: ui.home, href: routes.home[locale] }, { label: ui.title }]} />
        <h1 className="sr-only">{ui.title}</h1>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 desk:mt-[60px] desk:gap-[30px]">
          {getServices(locale).map((s, i) => (
            <ServiceCard key={s.slug} locale={locale} service={s} delay={(i % 2) * 0.15} />
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
