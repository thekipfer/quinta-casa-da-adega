"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useAppear } from "@/hooks/use-appear";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ServiceBanner } from "@/types/content";

/**
 * Four service banners. On scroll-in each card is revealed bottom-up with a staggered
 * image settle, then its number and title tab rise in. Hover: slow zoom, inset frame,
 * and a "Descobrir" line that unfolds beneath the title.
 */
export function ServiceBanners({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).services;

  return (
    <section className="px-6 pt-[50px] desk:px-10 desk:pt-[70px]">
      <ul className="mx-auto grid max-w-[1480px] grid-cols-1 gap-[10px] md:grid-cols-2 desk:grid-cols-4 desk:gap-4">
        {t.items.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} discover={t.discover} />
        ))}
      </ul>
    </section>
  );
}

/** Each card observes itself, so stacked cards on mobile animate as they scroll into view. */
function ServiceCard({ service: s, index: i, discover }: { service: ServiceBanner; index: number; discover: string }) {
  const [observe, appeared] = useAppear<HTMLLIElement>("0px 0px -12% 0px");

  return (
    <li ref={observe} className={cn("qcda-svc group relative overflow-hidden", appeared && "is-appeared")}>
      <div className="qcda-svc__media">
        <Image
          src={s.image.src}
          alt={s.alt}
          width={s.image.width}
          height={s.image.height}
          sizes="(min-width: 1025px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="block h-[456px] w-full object-cover md:h-[520px] desk:aspect-[3/4] desk:h-auto"
        />
      </div>

      {/* Legibility gradient, deepens on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(24,14,1)]/55 via-[rgb(24,14,1)]/5 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Inset hairline frame that draws in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[18px] scale-[1.04] border border-white/60 opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className="qcda-svc__index absolute top-6 left-6 flex items-center gap-3 font-ui text-[13px] font-medium tracking-[0.2em] text-white"
      >
        {String(i + 1).padStart(2, "0")}
        <span className="h-px w-8 bg-white/70 transition-all duration-700 group-hover:w-14" />
      </span>

      <div className="qcda-svc__tab absolute right-0 bottom-[6px] left-0 flex justify-center px-4">
        <div className="bg-brand px-[29px] pt-5 pb-3 text-center transition-[padding,background-color] duration-500 group-hover:bg-brand-deep group-hover:px-[36px]">
          <h3 className="font-display text-[25px] leading-[25px] font-normal text-white uppercase">{s.title}</h3>
          <div className="qcda-svc__more grid transition-[grid-template-rows,opacity] duration-500 ease-out">
            <span className="flex items-center justify-center gap-2 overflow-hidden font-ui text-[12px] font-medium tracking-[0.2em] text-white/85 uppercase">
              <span className="pt-3 pb-1">{discover}</span>
              <ArrowRight
                className="mt-2 size-3.5 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </div>
      </div>

      <a href={s.href} className="absolute inset-0" aria-label={s.title} />
    </li>
  );
}
