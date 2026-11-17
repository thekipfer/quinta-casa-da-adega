import { CalendarDays, House, TreePine } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { ProposalButton } from "@/components/ProposalButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AboutAccordion } from "@/components/about/AboutAccordion";
import { AboutSlider } from "@/components/about/AboutSlider";
import { DividedColumns } from "@/components/about/DividedColumns";
import { Pillars } from "@/components/about/Pillars";
import { RevealImage } from "@/components/about/RevealImage";
import { PHONE_DISPLAY, whatsappHref } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { ABOUT_HREF, aboutSlides, getAboutContent, type FeatureIcon } from "@/lib/i18n/about";

function LatinCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z" fill="currentColor" />
    </svg>
  );
}

function FeatureGlyph({ icon }: { icon: FeatureIcon }) {
  const cls = "mt-1 size-[18px] shrink-0 text-body";
  if (icon === "house") return <House className={cls} strokeWidth={1.6} aria-hidden="true" />;
  if (icon === "tree") return <TreePine className={cls} strokeWidth={1.6} aria-hidden="true" />;
  if (icon === "cross") return <LatinCross className="mt-[5px] size-4 shrink-0 text-body" />;
  return <CalendarDays className={cls} strokeWidth={1.6} aria-hidden="true" />;
}

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1148px] px-6 ${className ?? ""}`}>{children}</div>;
}

/** "A Nossa Quinta" / "Our Venue" page, served at /sobre (pt) and /en/about (en). */
export function AboutPage({ locale }: { locale: Locale }) {
  const c = getAboutContent(locale);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader locale={locale} current={ABOUT_HREF[locale]} alternates={ABOUT_HREF} />

      <main>
        {/* Hero: title + intro + textual CTA, photo slider on the right */}
        <section className="pt-[60px] pb-10 desk:pt-[100px] desk:pb-[60px]">
          <Container className="grid items-center gap-12 desk:grid-cols-2 desk:gap-0">
            <div className="desk:pr-[60px]">
              <SplitText
                as="h1"
                text={c.hero.title}
                className="font-display text-[52px] leading-[0.78] font-light tracking-[-0.04em] text-brand uppercase desk:text-[120px]"
              />
              <p className="mt-[50px] font-serif text-[20px] leading-[28px] text-body">{c.hero.description}</p>
              <ProposalButton locale={locale} variant="textual" className="mt-10">
                {c.hero.cta}
              </ProposalButton>
            </div>
            <AboutSlider slides={aboutSlides} label={c.hero.gallery} />
          </Container>
        </section>

        {/* Story */}
        <section className="pb-10 desk:pb-0">
          <Container>
            <DividedColumns left={c.storyTop[0]} right={c.storyTop[1]} />
            <RevealImage image={c.storyImage} sizes="(min-width: 1148px) 1100px, 100vw" className="my-8 desk:my-[30px]" />
            <DividedColumns left={c.storyBottom[0]} right={c.storyBottom[1]} />
          </Container>
        </section>

        {/* Decoração · Equipa · Cerimónia */}
        <section className="py-[60px] desk:pt-[100px] desk:pb-[120px]">
          <Pillars items={c.pillars} />
        </section>

        {/* Onde os sonhos ganham forma — copy on the left, two photos bleeding off the right edge */}
        <section className="py-[60px] desk:py-[100px]">
          <div className="grid gap-12 desk:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] desk:gap-0">
            <div className="px-6 desk:ml-auto desk:w-full desk:max-w-[574px] desk:pr-10">
              <SplitText
                as="h2"
                text={c.dreams.title}
                className="font-display text-[40px] leading-[0.9] font-normal text-brand uppercase desk:text-[75px] desk:leading-[55px]"
              />
              <ul className="mt-10 flex flex-col gap-[22px] desk:mt-[50px]">
                {c.dreams.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 font-serif text-[18px] leading-[26px] text-body">
                    <FeatureGlyph icon={f.icon} />
                    {f.text}
                  </li>
                ))}
              </ul>
              <ProposalButton locale={locale} className="mt-[50px]">
                {c.dreams.cta}
              </ProposalButton>
            </div>
            <div className="flex h-[420px] gap-3 px-6 desk:h-[565px] desk:gap-5 desk:pr-0 desk:pl-[22px]">
              <RevealImage
                image={c.dreams.images[0]}
                sizes="(min-width: 1025px) 240px, 33vw"
                className="h-full flex-[231]"
                imageClassName="h-full object-cover"
              />
              <RevealImage
                image={c.dreams.images[1]}
                sizes="(min-width: 1025px) 460px, 66vw"
                from="right"
                delay={0.2}
                className="h-full flex-[447]"
                imageClassName="h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Testemunhos — same component as the home page */}
        <Testimonials locale={locale} />

        {/* Porque nós? */}
        <section className="py-[60px] desk:py-[100px]">
          <Container className="grid gap-12 desk:grid-cols-2 desk:gap-0">
            <div className="desk:pr-[110px]">
              <h2 className="font-display text-[48px] leading-[50px] font-normal tracking-[-0.04em] text-brand uppercase desk:text-[62px]">
                {c.why.title}
              </h2>
              <p className="mt-5 max-w-[440px] font-serif text-[18px] leading-[28px] text-body">{c.why.description}</p>
              <a
                href={whatsappHref(t.whatsapp.contactMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="qcda-textual mt-[30px] text-ink transition-colors hover:text-brand"
              >
                <span>{c.why.whatsapp}</span>
              </a>
            </div>
            <AboutAccordion items={c.why.items} />
          </Container>
        </section>

        {/* Disponibilidade limitada — copy + a card that opens the proposal quiz */}
        <section className="pt-[40px] pb-[80px] desk:pt-[80px] desk:pb-[110px]">
          <Container className="grid items-center gap-12 desk:grid-cols-2 desk:gap-0">
            <div className="desk:pr-[100px]">
              <h2 className="font-display text-[48px] leading-[50px] font-normal tracking-[-0.02em] text-brand uppercase desk:text-[62px] desk:leading-[55px]">
                {c.availability.title}
              </h2>
              <p className="mt-6 max-w-[430px] font-ui text-[18px] leading-[28px] text-body">{c.availability.text}</p>
              <p className="mt-4 max-w-[430px] font-ui text-[18px] leading-[28px] text-[#93325f]">
                {c.availability.note}
              </p>
              <a
                href={whatsappHref(t.whatsapp.contactMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-ui text-[18px] leading-[28px] text-brand transition-colors hover:text-brand-deep"
              >
                <WhatsAppIcon className="size-4" />
                {c.availability.whatsappLabel}: {PHONE_DISPLAY}
              </a>
            </div>
            <div className="border border-sand/60 bg-[#faf7f1] p-[30px] desk:max-w-[420px] desk:justify-self-center">
              <p className="font-display text-[34px] leading-[1.05] text-brand">{c.availability.cardTitle}</p>
              <p className="mt-4 font-serif text-[18px] leading-[28px] text-body">{c.availability.cardText}</p>
              <ProposalButton locale={locale} className="mt-7 w-full">
                {c.availability.cardCta}
              </ProposalButton>
              <p className="mt-4 text-center font-serif text-[15px] text-body italic">{c.availability.responseTime}</p>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
