"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Cookie, X } from "lucide-react";
import {
  ALL_OFF,
  ALL_ON,
  OPEN_SETTINGS_EVENT,
  consentServerSnapshot,
  consentSnapshot,
  saveConsent,
  subscribeConsent,
  type ConsentCategory,
  type ConsentChoices,
  type ConsentRecord,
} from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import { getConsentCopy } from "@/lib/i18n/consent";
import { cn } from "@/lib/utils";

const CATEGORIES: ConsentCategory[] = ["functional", "analytics", "marketing"];

function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange?: () => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:outline-none",
        checked ? "bg-brand" : "bg-hairline",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

/**
 * EU cookie-consent banner: a small non-blocking card. Reject and Accept are equally prominent on the
 * first layer; "Personalizar" opens per-category switches (all optional ones start OFF). Re-opened from
 * anywhere via openCookieSettings() (footer link, cookie policy page).
 */
export function CookieConsent({ locale }: { locale: Locale }) {
  const t = getConsentCopy(locale);
  const raw = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const record: ConsentRecord | null = raw === "pending" || raw === "none" ? null : (JSON.parse(raw) as ConsentRecord);
  const undecided = raw === "none";

  // Settings opened on demand after a decision exists (footer link). Before deciding, the banner is always shown.
  const [reopened, setReopened] = useState(false);
  const [view, setView] = useState<"banner" | "settings">("banner");
  const [choices, setChoices] = useState<ConsentChoices>(ALL_OFF);
  const titleId = useId();
  const textId = useId();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = () => {
      // Pre-fill with the current decision so the switches show what is in force.
      const current = consentSnapshot();
      setChoices(current === "none" ? ALL_OFF : { ...ALL_OFF, ...(JSON.parse(current) as ConsentChoices) });
      setView("settings");
      setReopened(true);
      requestAnimationFrame(() => cardRef.current?.querySelector<HTMLElement>("h2")?.focus());
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const visible = undecided || reopened;
  if (!visible) return null;

  const decide = (next: ConsentChoices) => {
    saveConsent(next);
    setReopened(false);
    setView("banner");
  };

  const openSettings = () => {
    setChoices(record ? { functional: record.functional, analytics: record.analytics, marketing: record.marketing } : ALL_OFF);
    setView("settings");
  };

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={textId}
      className="qcda-consent fixed inset-x-3 bottom-3 z-[1040] border border-sand/60 bg-[#fbf8f3]/97 shadow-[0_24px_60px_-24px_rgba(24,14,1,0.45)] backdrop-blur-md sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[420px]"
    >
      {view === "banner" ? (
        <div key="banner" className="qcda-consent-view p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-sand/70 bg-white text-brand">
              <Cookie className="size-[18px]" strokeWidth={1.4} />
            </span>
            <div>
              <h2 id={titleId} tabIndex={-1} className="font-display text-[22px] leading-tight text-ink outline-none">
                {t.title}
              </h2>
              <p id={textId} className="mt-1.5 font-serif text-[15px] leading-[1.55] text-body">
                {t.text}{" "}
                <a href={t.policyHref} className="text-brand underline decoration-sand underline-offset-[3px] hover:text-brand-deep">
                  {t.policyLabel}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Equal weight for Reject and Accept, as EU regulators require */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => decide(ALL_OFF)}
              className="h-11 border border-brand font-ui text-[14px] font-medium tracking-[0.04em] text-brand uppercase transition-colors hover:bg-brand hover:text-white"
            >
              {t.reject}
            </button>
            <button
              type="button"
              onClick={() => decide(ALL_ON)}
              className="h-11 border border-brand bg-brand font-ui text-[14px] font-medium tracking-[0.04em] text-white uppercase transition-colors hover:border-brand-deep hover:bg-brand-deep"
            >
              {t.accept}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button type="button" onClick={openSettings} className="qcda-textual text-[14px] text-ink hover:text-brand">
              <span>{t.customize}</span>
            </button>
          </div>
        </div>
      ) : (
        <div key="settings" className="qcda-consent-view max-h-[min(80vh,640px)] overflow-y-auto p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} tabIndex={-1} className="font-display text-[24px] leading-tight text-ink outline-none">
              {t.settingsTitle}
            </h2>
            {record && (
              <button
                type="button"
                onClick={() => {
                  setReopened(false);
                  setView("banner");
                }}
                aria-label={t.close}
                className="-mt-1 -mr-1 flex size-9 shrink-0 items-center justify-center text-ink transition-colors hover:text-brand"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            )}
          </div>
          <p id={textId} className="mt-1.5 font-serif text-[15px] leading-[1.55] text-body">
            {t.settingsText}
          </p>

          <ul className="mt-5 flex flex-col divide-y divide-hairline/70 border-y border-hairline/70">
            <li className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="font-display text-[19px] leading-tight text-ink">{t.necessaryTitle}</p>
                <p className="mt-0.5 font-serif text-[14px] leading-snug text-body">{t.necessaryText}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Switch checked disabled label={`${t.necessaryTitle} — ${t.alwaysOn}`} />
                <span className="font-ui text-[10px] leading-none tracking-[0.12em] whitespace-nowrap text-body uppercase">{t.alwaysOn}</span>
              </div>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="font-display text-[19px] leading-tight text-ink">{t.categories[cat].title}</p>
                  <p className="mt-0.5 font-serif text-[14px] leading-snug text-body">{t.categories[cat].text}</p>
                </div>
                <Switch
                  checked={choices[cat]}
                  label={t.categories[cat].title}
                  onChange={() => setChoices((c) => ({ ...c, [cat]: !c[cat] }))}
                />
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => decide(choices)}
              className="h-11 border border-brand font-ui text-[13px] font-medium tracking-[0.04em] text-brand uppercase transition-colors hover:bg-brand hover:text-white"
            >
              {t.save}
            </button>
            <button
              type="button"
              onClick={() => decide(ALL_ON)}
              className="h-11 border border-brand bg-brand font-ui text-[13px] font-medium tracking-[0.04em] text-white uppercase transition-colors hover:border-brand-deep hover:bg-brand-deep"
            >
              {t.acceptAll}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            {!record ? (
              <button type="button" onClick={() => setView("banner")} className="qcda-textual text-[14px] text-ink hover:text-brand">
                <span>{t.back}</span>
              </button>
            ) : (
              <span />
            )}
            <a href={t.policyHref} className="font-ui text-[12px] text-body underline decoration-sand underline-offset-[3px] hover:text-brand">
              {t.policyLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
