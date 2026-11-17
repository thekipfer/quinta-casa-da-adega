import { RevealImage } from "@/components/about/RevealImage";
import { serviceHref, servicesHref, servicesUi, type Service } from "@/lib/i18n/servicos";
import type { Locale } from "@/lib/i18n/types";

/**
 * "Info on image" portfolio card: photo (curtain reveal on scroll) with the category and title over a soft gradient.
 * Hover deepens the gradient and draws a hairline under the title.
 */
export function ServiceCard({ locale, service, delay = 0 }: { locale: Locale; service: Service; delay?: number }) {
  return (
    <article className="group relative">
      <RevealImage
        image={service.cover}
        sizes="(min-width: 1025px) 535px, (min-width: 768px) 50vw, 100vw"
        delay={delay}
        className="aspect-[535/357]"
        imageClassName="h-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(24,14,1)]/60 via-[rgb(24,14,1)]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Text layer sits above the card link (z-3 vs z-2) but lets clicks through, except on the category link. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] px-6 pb-6 desk:px-10 desk:pb-[35px]">
        <a
          href={servicesHref(locale)}
          className="pointer-events-auto font-ui text-[12px] font-medium tracking-[0.2em] text-white/80 uppercase transition-colors hover:text-white"
        >
          {servicesUi[locale].title}
        </a>
        <h2 className="mt-2 font-display text-[28px] leading-[1] font-normal text-white uppercase desk:text-[32px]">
          {service.title}
        </h2>
        <span
          aria-hidden="true"
          className="mt-3 block h-px w-0 bg-white/80 transition-all duration-500 ease-out group-hover:w-16"
        />
      </div>
      {/* Whole card is the link to the service page */}
      <a href={serviceHref(locale, service.slug)} className="absolute inset-0 z-[2]" aria-label={service.title} />
    </article>
  );
}
