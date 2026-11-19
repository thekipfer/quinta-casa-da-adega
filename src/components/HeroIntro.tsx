import { SplitText } from "@/components/SplitText";
import { ProposalButton } from "@/components/ProposalButton";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Headline block that overlaps the bottom of the hero slider (margin-top: -110px on desktop). */
export function HeroIntro({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;

  return (
    <section className="relative z-[2] mt-[23px] px-5 text-center desk:-mt-[110px]">
      <div className="mx-auto max-w-[650px]">
        {/* The page's main heading: the first thing visitors read ("Apenas 15 casamentos por ano"). */}
        <SplitText
          as="h1"
          text={t.headline}
          className="-mt-[60px] mb-5 font-display text-[50px] leading-[40px] font-normal text-white uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.15)] desk:mt-0 desk:text-[90px] desk:leading-[70px]"
        />
        <p className="qcda-hero-rise mx-auto mb-5 max-w-[319px] font-serif text-[22px] leading-[35px] text-white italic [--rise-delay:0.9s] desk:max-w-none">
          {t.lead}
        </p>
        <div className="qcda-hero-rise [--rise-delay:1.15s]">
          <ProposalButton locale={locale}>{t.cta}</ProposalButton>
        </div>
      </div>
    </section>
  );
}
