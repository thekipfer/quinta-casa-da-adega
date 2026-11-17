import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { ProposalButton } from "@/components/ProposalButton";
import { ADDRESS_LINES, MAPS_HREF, PHONE_DISPLAY, PHONE_HREF, socialLinks, whatsappHref } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/content";

const socialIcon: Record<SocialLink["icon"], typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};

/**
 * Footer. Desktop: brand · explorar · contactos · proposta in a 12-col grid, legal links in the
 * bottom bar. Mobile: centred brand block, Explorar links in two columns, contacts and a
 * proposal card full-width; legal links sit discreetly in the bottom bar.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.footer;

  return (
    <footer className="relative overflow-hidden bg-brand text-white">
      {/* Decorative pampas grass */}
      <Image
        src="/images/h2-img8.webp"
        alt=""
        aria-hidden="true"
        width={355}
        height={368}
        className="pointer-events-none absolute -right-20 -bottom-16 w-[300px] opacity-[0.14] select-none desk:-right-10 desk:w-[420px]"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 desk:px-10">
        <div className="grid grid-cols-1 gap-y-12 pt-16 pb-12 desk:grid-cols-12 desk:gap-x-10 desk:pt-24 desk:pb-20">
          {/* Brand */}
          <div className="flex flex-col items-center text-center desk:col-span-4 desk:items-start desk:text-left">
            <Link href={dict.homeHref} className="inline-block" aria-label={t.homeAria}>
              <Image
                src="/images/logo-light.png"
                alt="Quinta Casa da Adega"
                width={200}
                height={157}
                className="h-auto w-[170px] desk:w-[190px]"
              />
            </Link>
            <p className="mt-6 max-w-[320px] font-serif text-[18px] leading-[1.6] text-white/80 italic">
              {t.tagline}
            </p>
            <ul className="mt-7 flex gap-3" aria-label={dict.header.social}>
              {socialLinks.map((s) => {
                const Icon = socialIcon[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-11 items-center justify-center rounded-full border border-sand/60 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-sand hover:bg-sand hover:text-brand"
                    >
                      <Icon className="size-[15px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ornament divider (mobile only) */}
          <div className="flex items-center gap-4 desk:hidden" aria-hidden="true">
            <span className="h-px flex-1 bg-white/15" />
            <span className="size-1.5 rotate-45 bg-sand" />
            <span className="h-px flex-1 bg-white/15" />
          </div>

          {/* Explorar + Contactos: one row on mobile (left and right margins), grid cells on desktop */}
          <div className="flex justify-between gap-6 md:grid md:grid-cols-2 desk:contents">
            <nav aria-label={t.explore} className="desk:col-span-2">
              <ColumnHeading>{t.explore}</ColumnHeading>
              <ul className="mt-6 flex flex-col gap-3.5">
                {dict.nav.footer.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contactos */}
            <div className="desk:col-span-3">
              <ColumnHeading>{t.contacts}</ColumnHeading>
              <ul className="mt-6 flex flex-col gap-3.5 font-serif text-[15px] leading-[1.45] md:text-[16px] text-white/85 desk:gap-4 desk:text-[17px] desk:leading-[1.5]">
                <li>
                  <a
                    href={MAPS_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-2.5 transition-colors hover:text-white desk:gap-3.5"
                  >
                    <MapPin className="mt-[3px] size-4 desk:mt-1 desk:size-[18px] shrink-0 text-sand" strokeWidth={1.4} />
                    <span>
                      {ADDRESS_LINES.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <span className="mt-1 inline-block font-ui text-[11px] font-medium tracking-[0.2em] text-sand uppercase underline-offset-4 group-hover:underline">
                        {t.viewMap}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={PHONE_HREF} className="flex items-center gap-2.5 transition-colors hover:text-white desk:gap-3.5">
                    <Phone className="size-4 desk:size-[18px] shrink-0 text-sand" strokeWidth={1.4} />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref(dict.whatsapp.contactMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 transition-colors hover:text-white desk:gap-3.5"
                  >
                    <WhatsAppIcon className="size-4 desk:size-[18px] shrink-0 text-sand" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Proposta */}
          <div className="desk:col-span-3">
            <div className="border border-white/15 bg-brand-deep/60 p-7 text-center desk:border-0 desk:bg-transparent desk:p-0 desk:text-left">
              <ColumnHeading className="justify-center desk:justify-start">{t.proposalHeading}</ColumnHeading>
              <p className="mt-5 font-display text-[30px] leading-[1.1] text-white">{t.proposalTitle}</p>
              <p className="mt-3 font-serif text-[17px] leading-[1.55] text-white/75 italic">{t.proposalText}</p>
              <ProposalButton locale={locale} variant="cream" className="mt-6 w-full desk:w-auto">
                {t.proposalButton}
              </ProposalButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/15 bg-brand-deep">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-3 px-6 py-6 text-center font-ui text-[13px] leading-[1.6] text-white/65 desk:flex-row desk:justify-between desk:px-10 desk:text-left">
          <p>
            © 2026 Quinta Casa da Adega
            <span className="mx-2 text-sand" aria-hidden="true">
              ·
            </span>
            <span className="whitespace-nowrap">Gradil, Mafra, Portugal</span>
          </p>

          {/* Legal links: discreet first row on mobile, centred in the bar on desktop */}
          <nav aria-label={t.legal} className="order-first desk:order-none">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-white/50 desk:gap-x-6 desk:text-[13px] desk:text-white/65">
              {dict.nav.legal.map((l, i) => (
                <li key={l.label} className="flex items-center gap-x-2">
                  {i > 0 && (
                    <span className="text-sand/70 desk:hidden" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="underline-offset-4 transition-colors duration-300 hover:text-white hover:underline desk:hover:no-underline"
                  >
                    <span className="desk:hidden">{l.short ?? l.label}</span>
                    <span className="hidden desk:inline">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p>
            {t.madeBy}{" "}
            <a
              href="https://thekipfer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 transition-colors duration-300 hover:text-sand"
            >
              The Kipfer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ColumnHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={cn("flex items-center gap-3 font-ui text-[12px] font-medium tracking-[0.24em] text-sand uppercase", className)}
    >
      {children}
    </h3>
  );
}

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group/link inline-flex items-center font-serif text-[16px] leading-[1.35] text-white/85 desk:text-[18px] transition-colors duration-300 hover:text-white"
    >
      <span
        className="mr-0 h-px w-0 bg-sand transition-all duration-300 group-hover/link:mr-2.5 group-hover/link:w-3"
        aria-hidden="true"
      />
      {children}
    </a>
  );
}
