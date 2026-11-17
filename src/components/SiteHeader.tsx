"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FacebookIcon, InstagramIcon, MenuOpenIcon, WhatsAppIcon } from "@/components/icons";
import { useScrollY } from "@/hooks/use-appear";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PHONE_DISPLAY, WHATSAPP_SHORT_HREF, socialLinks } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem, SocialLink } from "@/types/content";

const socialIcon: Record<SocialLink["icon"], typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};

const HEADER_HEIGHT = 130;

type HeaderProps = {
  locale: Locale;
  /** Href of the page being shown; marks the matching nav item as current. Defaults to each item's static `current` flag. */
  current?: string;
  /** Counterpart of this page in each language, for the language switcher (falls back to each language's home). */
  alternates?: Partial<Record<Locale, string>>;
};

const isCurrent = (item: NavItem, current?: string) => (current === undefined ? !!item.current : item.href === current);

function NavList({ items, current, className }: { items: NavItem[]; current?: string; className?: string }) {
  return (
    <ul className={cn("flex h-full items-center gap-[46px]", className)}>
      {items.map((item) => (
        <li key={item.label} className="h-full">
          <a
            href={item.href}
            aria-current={isCurrent(item, current) ? "page" : undefined}
            className="qcda-nav-link font-ui text-[17px] leading-[35px] font-normal text-ink"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function HeaderRow({ compact, locale, current, alternates }: HeaderProps & { compact: boolean }) {
  const t = getDictionary(locale);
  return (
    <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-6">
      <nav aria-label={t.header.mainMenu} className="flex h-full justify-end pr-[77px]">
        <NavList items={t.nav.left} current={current} />
      </nav>
      <Link href={t.homeHref} className="block" aria-label="Quinta Casa da Adega">
        <Image
          src="/images/logo-quinta.png"
          alt="Quinta Casa da Adega"
          width={compact ? 114 : 142}
          height={compact ? 80 : 100}
          priority={!compact}
          className={compact ? "h-[80px] w-[114px]" : "h-[100px] w-[142px]"}
        />
      </Link>
      <div className="flex h-full items-center pl-[69px]">
        <nav aria-label={t.header.secondaryMenu} className="h-full">
          <ul className="flex h-full items-center gap-[46px]">
            {t.nav.right.map((item) => (
              <li key={item.label} className="h-full">
                <a
                  href={item.href}
                  aria-current={isCurrent(item, current) ? "page" : undefined}
                  className="qcda-nav-link font-ui text-[17px] leading-[35px] text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex h-full items-center">
              <LanguageSwitcher locale={locale} alternates={alternates} flags={false} />
            </li>
          </ul>
        </nav>
        {!compact && (
          <div className="ml-auto flex items-center">
            <span className="mr-[19px] h-4 w-px bg-hairline" aria-hidden="true" />
            <a
              href={WHATSAPP_SHORT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${PHONE_DISPLAY}`}
              className="font-ui text-[17px] leading-[35px] whitespace-nowrap text-brand"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function SiteHeader({ locale, current, alternates }: HeaderProps) {
  const t = getDictionary(locale);
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const stickyVisible = scrollY >= HEADER_HEIGHT;

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // The fullscreen menu only exists below the desktop breakpoint; close it if the viewport grows past it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Desktop header (≥1025px) */}
      <header className="relative z-[100] hidden h-[130px] bg-white desk:block">
        <HeaderRow compact={false} locale={locale} current={current} alternates={alternates} />
        <span className="absolute right-6 bottom-0 left-6 h-px bg-brand" aria-hidden="true" />
      </header>

      {/* Desktop sticky header — slides down once scrolled past the header height */}
      <div
        className={cn(
          "fixed top-0 left-0 z-[100] hidden h-[80px] w-full bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.1)] transition-transform duration-500 desk:block",
          stickyVisible ? "translate-y-0" : "-translate-y-full",
        )}
        aria-hidden={!stickyVisible}
      >
        <HeaderRow compact locale={locale} current={current} alternates={alternates} />
      </div>

      {/* Mobile / tablet header */}
      <header className="relative z-[100] h-[80px] bg-white desk:hidden">
        <div className="flex h-full items-center justify-between px-6">
          <Link href={t.homeHref} aria-label="Quinta Casa da Adega" className="pl-[5px]">
            <Image src="/images/logo-quinta.png" alt="Quinta Casa da Adega" width={85} height={60} priority className="h-[60px] w-[85px]" />
          </Link>
          {/* Language switcher lives only in the fullscreen menu on mobile/tablet */}
          <div className="flex items-center">
            <a
              href={WHATSAPP_SHORT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="mx-[10px] flex size-[35px] items-center justify-center rounded-full border border-brand bg-white text-brand"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.header.openMenu}
              className="ml-5 flex h-[35px] items-center text-ink"
            >
              <MenuOpenIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[1050] flex flex-col overflow-y-auto bg-white transition-[opacity,visibility] duration-500 desk:hidden",
          menuOpen ? "qcda-mmenu-open visible opacity-100" : "invisible opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t.header.menu}
      >
        {/* Top bar mirrors the header so logo and close sit exactly where logo and burger were */}
        <div className="flex h-[80px] shrink-0 items-center justify-between border-b border-hairline/60 px-6">
          <Link href={t.homeHref} aria-label="Quinta Casa da Adega" className="pl-[5px]" onClick={() => setMenuOpen(false)}>
            <Image src="/images/logo-quinta.png" alt="Quinta Casa da Adega" width={85} height={60} className="h-[60px] w-[85px]" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={t.header.closeMenu}
            className="-mr-2 flex size-11 items-center justify-center text-ink transition-colors hover:text-brand"
          >
            <X className="size-6" strokeWidth={1.25} />
          </button>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-[max(28px,env(safe-area-inset-bottom))]">
          {/* Centred list in the original style, vertically centred in the free space */}
          <nav aria-label={t.header.mobileMenu} className="flex flex-1 items-center justify-center py-10">
            <ul className="qcda-mmenu-list flex flex-col items-center gap-2 text-center">
              {t.nav.mobile.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isCurrent(item, current) ? "page" : undefined}
                    className={cn(
                      "relative block px-2 py-1 font-display text-[40px] leading-[1.05] font-light tracking-[-1.2px] uppercase transition-colors duration-300",
                      isCurrent(item, current) ? "text-body" : "text-brand active:text-body",
                    )}
                  >
                    {item.label}
                    {isCurrent(item, current) && (
                      <span
                        className="absolute top-1/2 -left-3 size-1.5 -translate-y-1/2 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Discreet footer: social links + language */}
          <div className="qcda-mmenu-foot flex items-center justify-between border-t border-hairline/60 pt-5">
            <ul className="flex gap-2" aria-label={t.header.social}>
              {socialLinks.map((s) => {
                const Icon = socialIcon[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-full border border-hairline text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <Icon className="size-[14px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitcher locale={locale} alternates={alternates} />
          </div>
        </div>
      </div>
    </>
  );
}
