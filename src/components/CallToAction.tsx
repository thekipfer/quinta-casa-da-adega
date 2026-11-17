import { SplitText } from "@/components/SplitText";
import { ProposalButton } from "@/components/ProposalButton";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Full-bleed photo with a dark overlay; split-text headline + CTA anchored bottom-right. */
export function CallToAction({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).callToAction;

  return (
    <section className="relative flex min-h-[746px] items-end overflow-hidden bg-[url('/images/hero-1.webp')] bg-cover bg-center desk:min-h-[650px]">
      <div className="absolute inset-0 bg-[rgb(24,14,1)] opacity-[0.24]" aria-hidden="true" />
      <div className="relative w-full px-[30px] pb-[70px] desk:flex desk:justify-end desk:px-0 desk:pr-[6%] desk:pb-[75px]">
        <div className="max-w-[240px] desk:w-[595px] desk:max-w-none">
          <SplitText
            text={t.headline}
            className="font-display text-[48px] leading-[0.8em] font-normal tracking-[-0.04em] text-white uppercase desk:text-[62px]"
          />
          <ProposalButton locale={locale} className="mt-[37px]">
            {t.button}
          </ProposalButton>
        </div>
      </div>
    </section>
  );
}
