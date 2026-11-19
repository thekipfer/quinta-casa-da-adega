import { ChevronLeft, ChevronRight } from "lucide-react";
import { FacebookIcon, PinterestIcon, XIcon } from "@/components/icons";
import { RevealImage } from "@/components/about/RevealImage";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Breadcrumbs } from "@/components/servicos/Breadcrumbs";
import { RiseIn } from "@/components/servicos/RiseIn";
import { ServiceCard } from "@/components/servicos/ServiceCard";
import { SITE_URL } from "@/lib/content";
import { getServiceNeighbours, getServices, serviceHref, servicesUi, type Service } from "@/lib/i18n/servicos";
import type { Locale } from "@/lib/i18n/types";
import { itemPaths, routes } from "@/lib/routes";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * /servicos/<slug> (pt) and /en/services/<slug> (en) — theme "portfolio single": 2-column gallery, title + description with a
 * Categoria / Data / share sidebar, previous · back-to-list · next navigation, then the other services.
 */
export function ServiceDetailPage({ locale, service }: { locale: Locale; service: Service }) {
  const ui = servicesUi[locale];
  const { previous, next } = getServiceNeighbours(locale, service.slug);
  const others = getServices(locale).filter((s) => s.slug !== service.slug);
  const url = `${SITE_URL}${serviceHref(locale, service.slug)}`;
  const share = [
    { label: ui.shareOn("Facebook"), href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, Icon: FacebookIcon },
    {
      label: ui.shareOn("X"),
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(service.title)}`,
      Icon: XIcon,
    },
    {
      label: ui.shareOn("Pinterest"),
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(
        SITE_URL + service.cover.src,
      )}&description=${encodeURIComponent(service.title)}`,
      Icon: PinterestIcon,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <JsonLd
        data={graph(
          serviceSchema(locale, {
            name: service.seoTitle,
            description: service.metaDescription,
            path: serviceHref(locale, service.slug),
            image: service.cover.src,
            serviceType: service.serviceType,
          }),
          breadcrumbSchema([
            { name: ui.home, path: routes.home[locale] },
            { name: service.title },
          ]),
        )}
      />
      {/* No "Serviços" menu item any more: "" matches no item, so none (not even Home) is marked current. */}
      <SiteHeader locale={locale} current="" alternates={itemPaths("services", service.slug)} />
      <main className="mx-auto w-full max-w-[1148px] px-6 pt-10 pb-[100px] desk:pt-[54px] desk:pb-[150px]">
        <Breadcrumbs
          items={[
            { label: ui.home, href: routes.home[locale] },
            { label: service.title },
          ]}
        />

        {/* Gallery */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 desk:mt-[39px] desk:gap-[30px]">
          {service.gallery.map((image, i) => (
            <RevealImage
              key={image.src}
              image={image}
              sizes="(min-width: 1025px) 535px, (min-width: 768px) 50vw, 100vw"
              from={i % 2 === 0 ? "left" : "right"}
              delay={(i % 2) * 0.15}
              className="aspect-[535/357]"
              imageClassName="h-full object-cover"
            />
          ))}
        </div>

        {/* Title, description and info sidebar */}
        <div className="mt-[45px] grid gap-12 desk:mt-[54px] desk:grid-cols-[1fr_245px] desk:gap-10">
          <div>
            <SplitText
              as="h1"
              text={service.title}
              className="font-display text-[44px] leading-[0.78] font-normal text-brand uppercase desk:text-[62px] desk:leading-[0.7]"
            />
            <RiseIn as="p" className="mt-[30px] max-w-[571px] font-serif text-[18px] leading-[28px] text-body desk:mt-[45px]">
              {service.description}
            </RiseIn>
          </div>

          <RiseIn as="aside" delay={300}>
            <InfoBlock label={ui.category}>
              {ui.title}
            </InfoBlock>
            <InfoBlock label={ui.date} className="mt-[30px]">
              {service.date}
            </InfoBlock>
            <ul className="mt-5 flex gap-2" aria-label={ui.share}>
              {share.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-[31px] items-center justify-center rounded-full border border-ink/60 text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon className="size-[12px]" />
                  </a>
                </li>
              ))}
            </ul>
          </RiseIn>
        </div>

        {/* Previous · back to list · next */}
        <nav
          aria-label={ui.navigation}
          className="mt-[90px] grid grid-cols-[1fr_auto_1fr] items-center desk:mt-[130px]"
        >
          <div>
            {previous && (
              <a href={serviceHref(locale, previous.slug)} className="group inline-flex items-center gap-4 font-ui text-[17px] leading-[35px] text-ink">
                <ChevronLeft className="size-9 text-[#e0bdb6] transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={0.8} />
                <span className="hidden transition-colors group-hover:text-brand md:inline">{ui.previous}</span>
              </a>
            )}
          </div>
          <span aria-hidden="true" />
          <div className="flex justify-end">
            {next && (
              <a href={serviceHref(locale, next.slug)} className="group inline-flex items-center gap-4 font-ui text-[17px] leading-[35px] text-ink">
                <span className="hidden transition-colors group-hover:text-brand md:inline">{ui.next}</span>
                <ChevronRight className="size-9 text-[#e0bdb6] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={0.8} />
              </a>
            )}
          </div>
        </nav>

        {/* Other services */}
        <section aria-label={ui.others} className="mt-[60px] grid grid-cols-1 gap-5 md:grid-cols-2 desk:mt-[80px] desk:gap-[30px]">
          {others.map((s, i) => (
            <ServiceCard key={s.slug} locale={locale} service={s} delay={(i % 2) * 0.15} />
          ))}
        </section>
      </main>
      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}

function InfoBlock({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(className)}>
      <h2 className="font-display text-[25px] leading-[18px] font-medium text-brand uppercase">{label}</h2>
      <p className="mt-[15px] font-serif text-[18px] leading-[35px] text-body">{children}</p>
    </div>
  );
}
