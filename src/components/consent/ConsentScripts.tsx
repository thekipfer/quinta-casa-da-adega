"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { consentServerSnapshot, consentSnapshot, subscribeConsent, type ConsentRecord } from "@/lib/consent";
import { applyConsentToTags, trackPageView } from "@/lib/tracking";

/**
 * Loads analytics/marketing tags only after the matching consent, and re-applies every change
 * (accept, partial save, withdrawal from the footer). Renders nothing.
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
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}
