import { WhatsAppIcon } from "@/components/icons";
import { CheckIcon } from "@/components/orcamento/FormIcons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealImage } from "@/components/about/RevealImage";
import { Reveal } from "@/components/orcamento/Reveal";
import { whatsappHref } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getThankYou, thankYouImage } from "@/lib/i18n/obrigado";
import { routes } from "@/lib/routes";

/** /obrigado (pt) and /en/thank-you (en) — where the proposal form lands once the request is sent. */
export function ThankYouPage({ locale }: { locale: Locale }) {
  const t = getThankYou(locale);
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fcfbf9]">
      <SiteHeader locale={locale} current={routes.quote[locale]} alternates={routes.thankYou} />

      <main>
        <section className="mx-auto grid w-full max-w-[1148px] items-center gap-12 px-6 pt-14 pb-16 desk:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] desk:gap-16 desk:pt-[100px] desk:pb-[110px]">
          <div>
            <Reveal>
              <span className="qcda-orc-success inline-flex size-16 items-center justify-center rounded-full bg-brand text-white">
                <CheckIcon className="qcda-orc-check size-8" />
              </span>
              <p className="mt-8 font-ui text-[12px] font-medium tracking-[0.24em] text-sand-dark uppercase">{t.eyebrow}</p>
            </Reveal>
            <SplitText
              as="h1"
              text={t.title}
              className="mt-3 font-display text-[64px] leading-[0.9] font-light tracking-[-0.03em] text-brand uppercase desk:text-[110px]"
            />
            <Reveal delay={2}>
              <p className="mt-7 max-w-[540px] font-serif text-[20px] leading-[1.6] text-body desk:text-[22px]">{t.lead}</p>
              <p className="mt-4 max-w-[540px] border-l-2 border-sand pl-4 font-serif text-[16px] leading-[1.5] text-body italic">
                {t.spam}
              </p>
            </Reveal>
            <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a href={t.primary.href} className="qcda-btn qcda-btn--filled hover:bg-brand-deep">
                {t.primary.label}
              </a>
              <a href={t.secondary.href} className="qcda-textual text-ink hover:text-brand">
                <span>{t.secondary.label}</span>
              </a>
            </Reveal>
          </div>

          <RevealImage
            image={{ ...thankYouImage, alt: t.imageAlt }}
            sizes="(min-width: 1025px) 470px, 100vw"
            from="right"
            className="aspect-[4/5]"
            imageClassName="h-full object-cover"
          />
        </section>

        {/* What happens next */}
        <section className="bg-[#f3efea] py-16 desk:py-[100px]">
          <div className="mx-auto w-full max-w-[1148px] px-6">
            <SplitText
              as="h2"
              text={t.stepsTitle}
              className="font-display text-[44px] leading-[0.95] font-light tracking-[-0.02em] text-brand uppercase desk:text-[64px]"
            />
            <ol className="mt-10 grid gap-8 md:grid-cols-3 desk:mt-14 desk:gap-12">
              {t.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={1 + i} className="border-t border-sand/70 pt-6">
                  <span className="font-display text-[44px] leading-none font-light text-sand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[28px] leading-[1.1] text-brand">{step.title}</h3>
                  <p className="mt-3 font-serif text-[18px] leading-[1.6] text-body">{step.text}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={4}>
              <a
                href={whatsappHref(dict.whatsapp.contactMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-3 font-ui text-[17px] text-brand transition-colors hover:text-brand-deep"
              >
                <WhatsAppIcon className="size-[18px]" />
                {t.whatsapp}
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
