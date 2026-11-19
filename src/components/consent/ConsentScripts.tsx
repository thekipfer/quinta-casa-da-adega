"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { consentServerSnapshot, consentSnapshot, subscribeConsent, type ConsentRecord } from "@/lib/consent";
import { trackLinkClick, trackRouteView } from "@/lib/meta-events";
import { applyConsentToTags, trackPageView } from "@/lib/tracking";

/**
 * Loads analytics/marketing tags only after the matching consent, and re-applies every change
 * (accept, partial save, withdrawal from the footer). Also wires the Meta Pixel event plan
 * (src/lib/meta-events.ts); those events are queued/dropped by consent in tracking.ts. Renders nothing.
 */
export function ConsentScripts() {
  const raw = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    if (raw === "pending" || raw === "none") return; // no decision yet → nothing loads
    applyConsentToTags(JSON.parse(raw) as ConsentRecord);
  }, [raw]);

  useEffect(() => {
    // ViewContent for interest pages, on the first page too (queued until consent is decided).
    trackRouteView(pathname);
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  // Contact (WhatsApp / phone / email) and FindLocation (maps) for any link on the site, including
  // ones added later (modals, menus), via one delegated listener.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (link) trackLinkClick(link.getAttribute("href") ?? "");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
