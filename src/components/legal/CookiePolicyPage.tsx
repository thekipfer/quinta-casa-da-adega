import Image from "next/image";
import {
  ArrowUpRight,
  ChartNoAxesColumn,
  Clock3,
  Globe,
  HardDrive,
  Mail,
  MapPin,
  Megaphone,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitText } from "@/components/SplitText";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LegalToc } from "@/components/legal/LegalToc";
import { Reveal } from "@/components/orcamento/Reveal";
import { Breadcrumbs } from "@/components/weddings/parts";
import { getDictionary } from "@/lib/i18n";
import { getConsentCopy } from "@/lib/i18n/consent";
import {
  COOKIES_HREF,
  PRIVACY_HREF,
  cookiePolicy,
  cookieSectionOrder,
  type CategoryIcon,
  type RetentionIcon,
} from "@/lib/i18n/cookies";
import { cn } from "@/lib/utils";

const categoryIcons: Record<CategoryIcon, typeof ShieldCheck> = {
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  chart: ChartNoAxesColumn,
  megaphone: Megaphone,
};
const retentionIcons: Record<RetentionIcon, typeof Clock3> = { session: Clock3, persistent: HardDrive };

const pad = (n: number) => String(n).padStart(2, "0");
const body = "font-serif text-[19px] leading-[1.75] text-body";

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-hairline pt-10 pb-12 first:border-t-0 first:pt-0 desk:pt-12 desk:pb-14">
      <Reveal className="grid items-baseline gap-x-4 gap-y-1 sm:grid-cols-[72px_1fr]">
        <span className="font-display text-[44px] leading-none font-light text-sand [font-variant-numeric:lining-nums]">{pad(n)}</span>
        <h2 className="font-display text-[34px] leading-[1.05] text-brand desk:text-[42px]">{title}</h2>
      </Reveal>
      <div className="mt-6 flex flex-col gap-5 sm:pl-[88px]">{children}</div>
    </section>
  );
}

function P({ children, delay = 1 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal as="p" delay={delay} className={body}>
      {children}
    </Reveal>
  );
}

/** /politica-de-cookies — the estate's cookie policy, verbatim copy with an editorial layout. */
export function CookiePolicyPage() {
  const c = cookiePolicy;
  const s = c.sections;
  const t = getDictionary("pt");
  const tocItems = cookieSectionOrder.map((key) => ({ id: s[key].id, title: s[key].title }));
  const n = (key: (typeof cookieSectionOrder)[number]) => cookieSectionOrder.indexOf(key) + 1;

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      {/* No nav item is current on legal pages */}
      <SiteHeader locale="pt" current={COOKIES_HREF} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-cream">
          <Image
            src="/images/h2-img8.webp"
            alt=""
            aria-hidden="true"
            width={355}
            height={368}
            className="pointer-events-none absolute -right-16 -bottom-20 w-[260px] opacity-40 select-none desk:right-[6%] desk:-bottom-10 desk:w-[380px] desk:opacity-50"
          />
          <div className="relative mx-auto w-full max-w-[1148px] px-6 pt-10 pb-16 desk:pt-14 desk:pb-24">
            <Reveal variant="fade">
              <Breadcrumbs items={[{ label: t.nav.left[0].label, href: t.homeHref }, { label: c.hero.title }]} />
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-10 font-ui text-[12px] font-medium tracking-[0.24em] text-sand-dark uppercase desk:mt-14">
                {c.hero.eyebrow}
              </p>
            </Reveal>
            <SplitText
              as="h1"
              text={c.hero.title}
              className="mt-4 font-display text-[50px] leading-[0.92] font-light tracking-[-0.03em] text-brand uppercase desk:text-[96px]"
            />
            <Reveal delay={3}>
              <p className="mt-8 max-w-[620px] font-serif text-[21px] leading-[1.6] text-body italic">{c.hero.lead}</p>
            </Reveal>
            <Reveal delay={4}>
              <p className="mt-6 inline-flex items-center gap-2 border-t border-sand/60 pt-3 font-ui text-[13px] tracking-[0.06em] text-body">
                <time dateTime="2026-11">{c.hero.updated}</time>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Body: sticky index + sections */}
        <div className="mx-auto grid w-full max-w-[1148px] gap-10 px-6 py-14 desk:grid-cols-[260px_minmax(0,1fr)] desk:gap-20 desk:py-24">
          <aside className="desk:sticky desk:top-[110px] desk:self-start">
            <LegalToc label={c.toc} items={tocItems} />
          </aside>

          <article className="min-w-0 max-w-[760px]">
            {/* 1 — what */}
            <Section id={s.what.id} n={n("what")} title={s.what.title}>
              {s.what.paragraphs.map((p, i) => (
                <P key={i} delay={1 + i}>
                  {p}
                </P>
              ))}
            </Section>

            {/* 2 — types, as cards */}
            <Section id={s.types.id} n={n("types")} title={s.types.title}>
              <P>{s.types.intro}</P>
              <div className="grid gap-4 sm:grid-cols-2">
                {s.types.categories.map((cat, i) => {
                  const Icon = categoryIcons[cat.icon];
                  return (
                    <Reveal
                      key={cat.title}
                      delay={1 + i}
                      className={cn(
                        "flex flex-col border p-6 transition-shadow duration-500 hover:shadow-[0_18px_40px_-28px_rgba(84,70,44,0.6)]",
                        cat.essential ? "border-brand/40 bg-cream" : "border-hairline bg-white",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-11 items-center justify-center rounded-full border border-sand/70 bg-white text-brand">
                          <Icon className="size-5" strokeWidth={1.4} />
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 font-ui text-[10px] font-medium tracking-[0.16em] uppercase",
                            cat.essential ? "bg-brand text-white" : "border border-sand/70 text-brand",
                          )}
                        >
                          {cat.badge}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-[24px] leading-tight text-ink">{cat.title}</h3>
                      <p className="mt-2 font-serif text-[17px] leading-[1.65] text-body">{cat.text}</p>
                    </Reveal>
                  );
                })}
              </div>
              <P delay={2}>
                <span className="italic">{s.types.note}</span>
              </P>
            </Section>

            {/* 3 — third parties, as chips */}
            <Section id={s.thirdParty.id} n={n("thirdParty")} title={s.thirdParty.title}>
              {s.thirdParty.paragraphs.map((p, i) => (
                <P key={i} delay={1 + i}>
                  {p}
                </P>
              ))}
              <Reveal as="ul" delay={2} className="flex flex-wrap gap-2.5">
                {s.thirdParty.services.map((svc) => (
                  <li
                    key={svc}
                    className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 font-ui text-[14px] text-ink"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-sand" />
                    {svc}
                  </li>
                ))}
              </Reveal>
              <P delay={3}>{s.thirdParty.outro}</P>
            </Section>

            {/* 4 — consent */}
            <Section id={s.consent.id} n={n("consent")} title={s.consent.title}>
              <P>{s.consent.paragraphs[0]}</P>
              <Reveal delay={2} className="flex flex-wrap gap-2">
                {s.consent.choices.map((choice, i) => (
                  <span
                    key={choice}
                    className={cn(
                      "px-5 py-2 font-ui text-[13px] font-medium tracking-[0.08em] uppercase",
                      i === 0 ? "bg-brand text-white" : "border border-brand/50 text-brand",
                    )}
                  >
                    {choice}
                  </span>
                ))}
              </Reveal>
              {s.consent.paragraphs.slice(1).map((p, i) => (
                <P key={i} delay={2 + i}>
                  {p}
                </P>
              ))}
              <Reveal delay={3} className="border-l-2 border-sand bg-cream px-6 py-5">
                <p className="font-serif text-[18px] leading-[1.65] text-ink italic">{s.consent.callout}</p>
              </Reveal>
              <Reveal delay={4}>
                <CookieSettingsButton className="qcda-btn qcda-btn--filled hover:bg-brand-deep">
                  {getConsentCopy("pt").policyButton}
                </CookieSettingsButton>
              </Reveal>
            </Section>

            {/* 5 — disable, with browser help links */}
            <Section id={s.disable.id} n={n("disable")} title={s.disable.title}>
              {s.disable.paragraphs.map((p, i) => (
                <P key={i} delay={1 + i}>
                  {p}
                </P>
              ))}
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.disable.browsers.map((b, i) => (
                  <Reveal as="li" key={b.name} delay={1 + i}>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 border border-hairline bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand">
                        <Globe className="size-5" strokeWidth={1.4} />
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="font-display text-[21px] leading-tight text-ink">{b.name}</span>
                        <span className="font-ui text-[11px] tracking-[0.16em] text-body uppercase">{s.disable.openHelp}</span>
                      </span>
                      <ArrowUpRight
                        className="size-5 text-sand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                        strokeWidth={1.4}
                      />
                    </a>
                  </Reveal>
                ))}
              </ul>
              <P delay={2}>{s.disable.outro}</P>
            </Section>

            {/* 6 — personal data */}
            <Section id={s.data.id} n={n("data")} title={s.data.title}>
              {s.data.paragraphs.map((p, i) => (
                <P key={i} delay={1 + i}>
                  {p}
                </P>
              ))}
              <P delay={3}>
                {s.data.privacyBefore}
                <a href={PRIVACY_HREF} className="text-brand underline decoration-sand underline-offset-4 transition-colors hover:text-brand-deep">
                  {s.data.privacyLink}
                </a>
                {s.data.privacyAfter}
              </P>
            </Section>

            {/* 7 — retention, as two cards */}
            <Section id={s.retention.id} n={n("retention")} title={s.retention.title}>
              <P>{s.retention.intro}</P>
              <div className="grid gap-4 sm:grid-cols-2">
                {s.retention.kinds.map((k, i) => {
                  const Icon = retentionIcons[k.icon];
                  return (
                    <Reveal key={k.title} delay={1 + i} className="border border-hairline bg-white p-6">
                      <Icon className="size-6 text-brand" strokeWidth={1.4} />
                      <h3 className="mt-4 font-display text-[24px] leading-tight text-ink">{k.title}</h3>
                      <p className="mt-2 font-serif text-[17px] leading-[1.65] text-body">{k.text}</p>
                    </Reveal>
                  );
                })}
              </div>
              <P delay={2}>{s.retention.outro}</P>
            </Section>

            {/* 8 — changes */}
            <Section id={s.changes.id} n={n("changes")} title={s.changes.title}>
              {s.changes.paragraphs.map((p, i) => (
                <P key={i} delay={1 + i}>
                  {p}
                </P>
              ))}
            </Section>

            {/* 9 — contacts card */}
            <Section id={s.contacts.id} n={n("contacts")} title={s.contacts.title}>
              <P>{s.contacts.intro}</P>
              <Reveal delay={2} className="bg-cream p-7 desk:p-9">
                <p className="font-display text-[28px] leading-tight text-brand">{s.contacts.name}</p>
                <dl className="mt-5 flex flex-col gap-3 font-serif text-[18px] text-body">
                  <div className="flex items-center gap-3">
                    <dt className="sr-only">{s.contacts.emailLabel}</dt>
                    <Mail className="size-5 shrink-0 text-sand" strokeWidth={1.4} aria-hidden="true" />
                    <dd>
                      <a href={`mailto:${s.contacts.email}`} className="transition-colors hover:text-brand">
                        {s.contacts.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="sr-only">{s.contacts.websiteLabel}</dt>
                    <Globe className="size-5 shrink-0 text-sand" strokeWidth={1.4} aria-hidden="true" />
                    <dd>
                      <a href={s.contacts.website} className="transition-colors hover:text-brand">
                        quintacasadaadega.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="sr-only">{s.contacts.locationLabel}</dt>
                    <MapPin className="size-5 shrink-0 text-sand" strokeWidth={1.4} aria-hidden="true" />
                    <dd>{s.contacts.location}</dd>
                  </div>
                </dl>
                <a href={`mailto:${s.contacts.email}`} className="qcda-btn qcda-btn--filled mt-7 hover:bg-brand-deep">
                  {s.contacts.emailLabel}: {s.contacts.email}
                </a>
              </Reveal>
            </Section>

            <p className="mt-4 border-t border-hairline pt-6 font-ui text-[13px] text-body">{c.copyright}</p>
          </article>
        </div>
      </main>

      <SiteFooter locale="pt" />
      <WhatsAppFloat locale="pt" />
    </div>
  );
}
