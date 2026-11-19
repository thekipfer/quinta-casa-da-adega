import { CallToAction } from "@/components/CallToAction";
import { HeroIntro } from "@/components/HeroIntro";
import { HeroSlider } from "@/components/HeroSlider";
import { JsonLd } from "@/components/JsonLd";
import { QuintaSection } from "@/components/QuintaSection";
import { ServiceBanners } from "@/components/ServiceBanners";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Testimonials } from "@/components/Testimonials";
import { WeddingsHomeSection } from "@/components/WeddingsHomeSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import type { Locale } from "@/lib/i18n";
import { graph, venueSchema, websiteSchema } from "@/lib/schema";

/** The home page, rendered in `locale` (served at / for Portuguese and /en for English). */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-sand">
      <JsonLd data={graph(websiteSchema(), venueSchema(locale))} />
      <SiteHeader locale={locale} />
      <main>
        <HeroSlider locale={locale} />
        <HeroIntro locale={locale} />
        <Testimonials locale={locale} />
        <ServiceBanners locale={locale} />
        <QuintaSection locale={locale} />
        <WeddingsHomeSection locale={locale} />
        <CallToAction locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <WhatsAppFloat locale={locale} />
    </div>
  );
}
