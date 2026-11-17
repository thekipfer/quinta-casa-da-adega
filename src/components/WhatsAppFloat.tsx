"use client";

import { HeartOutlineIcon, WhatsAppIcon } from "@/components/icons";
import { useScrollY } from "@/hooks/use-appear";
import { whatsappHref } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 540;

/**
 * Fixed WhatsApp button (replaced the "TOP" button) that opens a chat with Samyra.
 * Same heart outline that draws itself on hover; a "talk to Samyra" label slides out on hover.
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
        "qcda-btt group fixed right-[50px] bottom-[75px] z-[1000] flex h-[55.22px] w-[59.5px] items-center justify-center text-white drop-shadow-[0_1px_4px_rgba(24,14,1,0.45)]",
        visible ? "visible opacity-100 transition-opacity duration-300" : "invisible opacity-0 transition-[opacity,visibility] duration-150",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] hidden -translate-y-1/2 translate-x-2 bg-brand px-3.5 py-2 font-ui text-[13px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 desk:block"
      >
        {t.floatLabel}
      </span>
      <HeartOutlineIcon className="absolute inset-0 h-auto w-[59px]" />
      <WhatsAppIcon className="relative -mt-[6px] size-[22px]" />
    </a>
  );
}
