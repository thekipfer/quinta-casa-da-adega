import Image from "next/image";
import { ChevronDown, Clock3, Gem, KeyRound, MapPin, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Pillars } from "@/components/about/Pillars";
import { RevealImage } from "@/components/about/RevealImage";
import { OrcamentoForm } from "@/components/orcamento/OrcamentoForm";
import { Reveal } from "@/components/orcamento/Reveal";
import { MAPS_HREF, PHONE_DISPLAY, PHONE_HREF, whatsappHref } from "@/lib/content";
import { getAboutContent } from "@/lib/i18n/about";
import { CONTACT_EMAIL, getOrcamento } from "@/lib/i18n/orcamento";
import type { Locale } from "@/lib/i18n/types";
import { routes } from "@/lib/routes";

const perkIcons = { clock: Clock3, key: KeyRound, ring: Gem } as const;

/** /orcamento (pt) and /en/quote (en) — request-a-proposal page. */
export function OrcamentoPage({ locale }: { locale: Locale }) {
  const o = getOrcamento(locale);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fcfbf9]">
      {/* "Contacto" / "Contact" in the nav points here */}
      <SiteHeader locale={locale} current={routes.quote[locale]} alternates={routes.quote} />

      <main>
        {/* Hero — full-bleed photo with a slow settle, headline on the right */}
        <section className="relative flex min-h-[560px] items-end overflow-hidden desk:min-h-[640px] desk:items-center">
          <Image
            src={o.hero.image.src}
            alt={o.hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="qcda-orc-kenburns object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgb(24,14,1)]/70 via-[rgb(24,14,1)]/35 to-[rgb(24,14,1)]/20 desk:bg-gradient-to-l desk:from-[rgb(24,14,1)]/65 desk:via-[rgb(24,14,1)]/30" />
          <div className="relative mx-auto w-full max-w-[1148px] px-6 pt-24 pb-16 desk:py-24">
            <div className="desk:ml-auto desk:w-1/2 desk:pl-10">
              <SplitText
                as="h1"
                text={o.hero.title}
                className="font-display text-[54px] leading-[0.82] font-light tracking-[-0.03em] text-white uppercase desk:text-[96px]"
              />
              <Reveal delay={4}>
                <p className="mt-6 max-w-[460px] font-serif text-[20px] leading-[1.5] text-white/90 italic desk:text-[22px]">
                  {o.hero.subtitle}
                </p>
              </Reveal>
              <Reveal delay={5}>
                <a href="#pedido" className="qcda-btn qcda-btn--cream mt-8">
                  {o.hero.cta}
                </a>
              </Reveal>
            </div>
          </div>
          <a
            href="#pedido"
            aria-label={o.hero.cta}
            className="qcda-orc-bounce absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/80 transition-colors hover:text-white desk:block"
          >
            <ChevronDown className="size-7" strokeWidth={1.2} />
          </a>
        </section>

        {/* Disponibilidade limitada + integrated form */}
        <section className="scroll-mt-24 py-16 desk:py-[110px]" id="formulario">
          <div className="mx-auto grid w-full max-w-[1148px] gap-12 px-6 desk:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] desk:gap-16">
            <div className="desk:sticky desk:top-[110px] desk:self-start">
              <SplitText
                as="h2"
                text={o.availability.title}
                className="font-display text-[44px] leading-[0.9] font-light tracking-[-0.02em] text-brand uppercase desk:text-[56px]"
              />
              <Reveal delay={2}>
                <p className="mt-6 font-serif text-[19px] leading-[1.6] text-body">{o.availability.text}</p>
              </Reveal>
              <ul className="mt-8 flex flex-col gap-4">
                {o.availability.perks.map((perk, i) => {
                  const Icon = perkIcons[perk.icon];
                  return (
                    <Reveal as="li" key={perk.text} delay={3 + i} variant="left" className="flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-sand/70 bg-white text-brand">
                        <Icon className="size-5" strokeWidth={1.4} />
                      </span>
                      <span className="font-serif text-[18px] leading-snug text-ink">{perk.text}</span>
                    </Reveal>
                  );
                })}
              </ul>
              <Reveal delay={6}>
                <p className="mt-8 border-l-2 border-sand pl-4 font-serif text-[15px] leading-[1.5] text-body italic">
                  {o.availability.privacy}
                </p>
              </Reveal>
            </div>

            <Reveal id="pedido" delay={1} className="scroll-mt-32 border border-sand/45 bg-[#fbf8f3] p-6 shadow-[0_30px_60px_-40px_rgba(84,70,44,0.55)] sm:p-10">
              <OrcamentoForm locale={locale} />
            </Reveal>
          </div>
        </section>

        {/* Onde tudo começa — text + illustrated map */}
        <section className="py-16 desk:py-[100px]">
          <div className="mx-auto grid w-full max-w-[1148px] items-center gap-10 px-6 desk:grid-cols-2 desk:gap-16">
            <div>
              <SplitText
                as="h2"
                text={o.location.title}
                className="font-display text-[46px] leading-[0.9] font-light tracking-[-0.02em] text-brand uppercase desk:text-[68px]"
              />
              <Reveal delay={2}>
                <p className="mt-6 max-w-[440px] font-serif text-[19px] leading-[1.6] text-body">{o.location.text}</p>
              </Reveal>
              <Reveal delay={3}>
                <p className="mt-3 max-w-[440px] font-serif text-[19px] leading-[1.6] text-body">{o.location.visit}</p>
              </Reveal>
              <Reveal delay={4} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={whatsappHref(o.location.visitMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qcda-btn qcda-btn--filled hover:bg-brand-deep"
                >
                  {o.location.cta}
                </a>
                <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="qcda-textual text-ink hover:text-brand">
                  <span>{o.location.maps}</span>
                </a>
              </Reveal>
            </div>
            <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" aria-label={o.location.maps} className="group block">
              <RevealImage
                image={o.location.image}
                sizes="(min-width: 1025px) 540px, 100vw"
                from="right"
                imageClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            </a>
          </div>
        </section>

        <Testimonials locale={locale} />

        <section className="py-16 desk:py-[110px]">
          <Pillars items={getAboutContent(locale).pillars} />
        </section>

        {/* Rumo ao grande dia — closing call to action */}
        <section className="bg-[#f3efea] py-16 desk:py-[110px]">
          <div className="mx-auto grid w-full max-w-[1148px] items-center gap-10 px-6 desk:grid-cols-2 desk:gap-16">
            <div>
              <SplitText
                as="h2"
                text={o.final.title}
                className="font-display text-[46px] leading-[0.9] font-light tracking-[-0.02em] text-brand uppercase desk:text-[68px]"
              />
              <Reveal delay={2}>
                <p className="mt-6 max-w-[480px] font-serif text-[20px] leading-[1.6] text-body">{o.final.text}</p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-4">
              <Reveal delay={1} variant="right" className="flex items-start gap-4 font-serif text-[18px] text-body">
                <MapPin className="mt-1 size-5 shrink-0 text-sand" strokeWidth={1.4} />
                <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
                  {o.final.address}
                </a>
              </Reveal>
              <Reveal delay={2} variant="right" className="flex items-center gap-4 font-serif text-[18px] text-body">
                <Mail className="size-5 shrink-0 text-sand" strokeWidth={1.4} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-brand">
                  {CONTACT_EMAIL}
                </a>
              </Reveal>
              <Reveal delay={3} variant="right" className="flex items-center gap-4 font-serif text-[18px] text-body">
                <Phone className="size-5 shrink-0 text-sand" strokeWidth={1.4} />
                <a href={PHONE_HREF} className="transition-colors hover:text-brand">
                  {PHONE_DISPLAY}
                </a>
              </Reveal>
              <Reveal delay={4} variant="right" className="mt-3">
                <a
                  href={whatsappHref(o.final.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qcda-btn qcda-btn--filled w-full gap-3 hover:bg-brand-deep"
                >
                  <WhatsAppIcon className="size-[18px]" />
                  {o.final.whatsapp}
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
