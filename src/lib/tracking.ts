import type { ConsentRecord } from "@/lib/consent";

/**
 * Consent-gated loading of third-party tags. NOTHING here runs until the visitor has given the
 * matching consent (see ConsentScripts):
 *   - Google tag (GA4 / Google Ads) — Consent Mode v2, "basic" implementation: gtag.js is not even
 *     downloaded until Analytics (GA4) or Marketing (Ads) is granted, so no requests or cookies before that.
 *   - Meta Pixel — loaded only with Marketing consent; revoked (and its cookies removed) on withdrawal.
 *
 * IDs come from environment variables; leave them empty and no tag is ever loaded.
 * Never add these tags anywhere else in the codebase — they would bypass consent.
 */
export const trackingConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
};

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
  fbq?: Fbq;
  _fbq?: Fbq;
} & Record<`ga-disable-${string}`, boolean | undefined>;

const w = () => window as unknown as TrackingWindow;

function injectScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Expire every cookie whose name matches, on the current host and the parent domain. */
export function deleteCookies(pattern: RegExp) {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host, `.${host}`, parts.length > 2 ? `.${parts.slice(-2).join(".")}` : ""].filter(
    (d, i, all) => all.indexOf(d) === i,
  );
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (!name || !pattern.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
    }
  }
}

/* ---------- Google tag (GA4 + Google Ads) with Consent Mode v2 ---------- */

const googleState = { loaded: false, ga4: false, ads: false };

function consentModeState(r: ConsentRecord) {
  const v = (on: boolean) => (on ? "granted" : "denied");
  return {
    analytics_storage: v(r.analytics),
    ad_storage: v(r.marketing),
    ad_user_data: v(r.marketing),
    ad_personalization: v(r.marketing),
    functionality_storage: v(r.functional),
    personalization_storage: v(r.functional),
    security_storage: "granted",
  };
}

function applyGoogle(r: ConsentRecord) {
  const { ga4Id, googleAdsId } = trackingConfig;
  if (!ga4Id && !googleAdsId) return;
  const wantsGa4 = !!ga4Id && r.analytics;
  const wantsAds = !!googleAdsId && r.marketing;

  if (!googleState.loaded) {
    if (!wantsGa4 && !wantsAds) return; // basic mode: no consent → the tag never loads
    const win = w();
    win.dataLayer = win.dataLayer ?? [];
    win.gtag = function gtag() {
      // gtag.js expects the Arguments object, exactly as Google's snippet pushes it.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
    // Defaults first (everything denied), then the visitor's actual choice.
    win.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500,
    });
    win.gtag("set", "ads_data_redaction", true);
    win.gtag("consent", "update", consentModeState(r));
    win.gtag("js", new Date());
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(wantsGa4 ? ga4Id : googleAdsId)}`);
    googleState.loaded = true;
  } else {
    w().gtag?.("consent", "update", consentModeState(r));
  }

  const gtag = w().gtag!;
  if (ga4Id) w()[`ga-disable-${ga4Id}`] = !r.analytics;
  if (wantsGa4 && !googleState.ga4) {
    gtag("config", ga4Id);
    googleState.ga4 = true;
  }
  if (wantsAds && !googleState.ads) {
    gtag("config", googleAdsId);
    googleState.ads = true;
  }
  // Withdrawal: remove what was already stored.
  if (!r.analytics) deleteCookies(/^_ga($|_)|^_gid$|^_gat/);
  if (!r.marketing) deleteCookies(/^_gcl_|^_gac_|^__gads$|^__gpi$/);
}

/* ---------- Meta Pixel ---------- */

export type MetaEvent = {
  name: string;
  params?: Record<string, unknown>;
  /** Unique id per event, so a future Conversions API (server) event can be deduplicated against it. */
  eventID?: string;
  /** trackCustom instead of a standard event. */
  custom?: boolean;
};

/** granted: Marketing consent is on. denied: the visitor refused or withdrew it. */
const metaState = { loaded: false, granted: false, denied: false };
/**
 * Events fired before the visitor has decided (e.g. a page's ViewContent on first load, which runs
 * before the consent effect). Sent once Marketing is granted, dropped if it is refused. Capped.
 */
let metaQueue: MetaEvent[] = [];

function sendMeta(e: MetaEvent) {
  const fbq = w().fbq;
  if (!fbq) return;
  const method = e.custom ? "trackCustom" : "track";
  if (e.eventID) fbq(method, e.name, e.params ?? {}, { eventID: e.eventID });
  else fbq(method, e.name, e.params ?? {});
}

/**
 * Track a Meta Pixel event. Never sends anything without Marketing consent: before a decision it is
 * queued, after a refusal it is dropped, and with no Pixel ID configured it is a no-op.
 */
export function trackMetaEvent(e: MetaEvent) {
  if (!trackingConfig.metaPixelId || metaState.denied) return;
  if (metaState.loaded && metaState.granted) sendMeta(e);
  else if (metaQueue.length < 20) metaQueue.push(e);
}

function installFbq() {
  const win = w();
  if (win.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  win.fbq = fbq;
  win._fbq = fbq;
  injectScript("https://connect.facebook.net/en_US/fbevents.js");
}

function applyMeta(r: ConsentRecord) {
  const { metaPixelId } = trackingConfig;
  if (!metaPixelId) return;
  if (r.marketing) {
    if (!metaState.loaded) {
      installFbq();
      w().fbq!("consent", "grant");
      w().fbq!("init", metaPixelId);
      w().fbq!("track", "PageView");
      metaState.loaded = true;
    } else {
      w().fbq?.("consent", "grant");
    }
    metaState.granted = true;
    metaState.denied = false;
    // Events from before the decision (this page's ViewContent, a click while the banner was open…).
    const queued = metaQueue;
    metaQueue = [];
    queued.forEach(sendMeta);
  } else {
    if (metaState.loaded) w().fbq?.("consent", "revoke");
    metaState.granted = false;
    metaState.denied = true;
    metaQueue = [];
    deleteCookies(/^_fbp$|^_fbc$/);
  }
}

/** Apply a consent decision to every configured tag (load, update or revoke). Idempotent. */
export function applyConsentToTags(r: ConsentRecord) {
  applyGoogle(r);
  applyMeta(r);
}

/** Client-side navigations: GA4 counts them itself (history events); the Pixel needs a PageView. */
export function trackPageView() {
  if (metaState.loaded && metaState.granted) w().fbq?.("track", "PageView");
}
