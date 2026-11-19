"use client";

import { WhatsAppIcon } from "@/components/icons";
import { useScrollY } from "@/hooks/use-appear";
import { whatsappHref } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 540;

/**
 * Fixed WhatsApp button (replaced the "TOP" button) that opens a chat with Samyra.
 * White circle with the brand-brown WhatsApp mark; a "talk to Samyra" label slides out on hover (desktop).
 * Sits tucked into the bottom-right corner on mobile.
 */
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).whatsapp;
  const visible = useScrollY() > SHOW_AFTER;

  return (
    <a
      href={whatsappHref(t.samyraMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatAria}
      className={cn(
        "group fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-[1000] flex size-[54px] items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_10px_rgba(24,14,1,0.25)] transition-[opacity,visibility,transform] duration-300 hover:scale-105 desk:right-[50px] desk:bottom-[75px] desk:size-[58px]",
        visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] hidden -translate-y-1/2 translate-x-2 bg-brand px-3.5 py-2 font-ui text-[13px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 desk:block"
      >
        {t.floatLabel}
      </span>
      <WhatsAppIcon className="size-[26px]" />
    </a>
  );
}
