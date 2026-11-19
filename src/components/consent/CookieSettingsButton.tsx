"use client";

import { openCookieSettings } from "@/lib/consent";
import { cn } from "@/lib/utils";

/** Re-opens the cookie preferences panel (footer link, cookie policy page). */
export function CookieSettingsButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={cn("cursor-pointer", className)}>
      {children}
    </button>
  );
}
