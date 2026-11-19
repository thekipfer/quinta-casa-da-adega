/**
 * Cookie consent record (GDPR / ePrivacy). Stored in localStorage — keeping the visitor's own choice is
 * itself strictly necessary, so it needs no consent. Optional categories default to OFF (no pre-ticked boxes)
 * and the choice expires after six months, after which the banner asks again.
 *
 * Analytics/marketing tags are loaded only through src/lib/tracking.ts (ConsentScripts), which reacts to
 * CONSENT_EVENT. Anything else that would set non-essential cookies must check `hasConsent(category)` first.
 */

export type ConsentCategory = "functional" | "analytics" | "marketing";

export type ConsentChoices = Record<ConsentCategory, boolean>;

export interface ConsentRecord extends ConsentChoices {
  necessary: true;
  /** Bump when categories or purposes change, so everyone is asked again. */
  version: number;
  /** ISO timestamp of the decision (proof of consent). */
  date: string;
}

export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;
export const CONSENT_EVENT = "qcda:consent-change";
export const OPEN_SETTINGS_EVENT = "qcda:open-cookie-settings";

const STORAGE_KEY = "qcda-cookie-consent";

export const ALL_OFF: ConsentChoices = { functional: false, analytics: false, marketing: false };
export const ALL_ON: ConsentChoices = { functional: true, analytics: true, marketing: true };

function isValid(record: unknown): record is ConsentRecord {
  if (!record || typeof record !== "object") return false;
  const r = record as Partial<ConsentRecord>;
  if (r.version !== CONSENT_VERSION || typeof r.date !== "string") return false;
  const age = Date.now() - new Date(r.date).getTime();
  return Number.isFinite(age) && age >= 0 && age < CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

/** The stored decision, or null when the visitor hasn't decided (or it expired / storage is blocked). */
export function readConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = { necessary: true, ...choices, version: CONSENT_VERSION, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage blocked (private mode): the choice still applies for this page view.
  }
  cachedRaw = undefined;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  return record;
}

export function hasConsent(category: ConsentCategory): boolean {
  if (typeof window === "undefined") return false;
  return readConsent()?.[category] ?? false;
}

/** Re-open the preferences panel (footer link, cookie policy page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/* ---------- useSyncExternalStore plumbing ---------- */

let cachedRaw: string | undefined;

/** Client snapshot: the stored record as a string ("none" when undecided). Stable between changes. */
export function consentSnapshot(): string {
  if (cachedRaw === undefined) {
    const record = readConsent();
    cachedRaw = record ? JSON.stringify(record) : "none";
  }
  return cachedRaw;
}

/** Server snapshot: unknown until hydration, so nothing consent-dependent renders on the server. */
export function consentServerSnapshot(): string {
  return "pending";
}

export function subscribeConsent(onChange: () => void) {
  const handler = () => {
    cachedRaw = undefined;
    onChange();
  };
  window.addEventListener(CONSENT_EVENT, handler);
  window.addEventListener("storage", handler); // other tabs
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
