"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { CalendarHeart, MessageSquareHeart, PenLine, UserRound, UsersRound } from "lucide-react";
import { CheckIcon, EnvelopeIcon, GuestIcon, WhatsAppLineIcon } from "@/components/orcamento/FormIcons";
import { Reveal } from "@/components/orcamento/Reveal";
import { whatsappHref } from "@/lib/content";
import { CONTACT_EMAIL, getOrcamento, type ContactPreference, type GuestRange } from "@/lib/i18n/orcamento";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

const YEARS = [2026, 2027, 2028, 2029];
const UNDECIDED = "undecided";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "year" | "guests" | "name" | "email" | "phone";

/**
 * "Today" as "year-month", read only in the browser: the page is prerendered at build time, so the
 * server snapshot is "" (nothing disabled) and the client fills in the real date after hydration.
 */
const noop = () => () => {};
let todayKey = "";
const readToday = () => {
  if (!todayKey) {
    const now = new Date();
    todayKey = `${now.getFullYear()}-${now.getMonth()}`;
  }
  return todayKey;
};
const readTodayOnServer = () => "";

/** Shared look for every selectable tile; the hidden radio before it drives the checked state. */
const tile =
  "flex h-full w-full cursor-pointer border border-hairline bg-white text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-checked:shadow-[0_10px_24px_-14px_rgba(113,101,74,0.9)] peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 peer-focus-visible:ring-offset-2 peer-disabled:pointer-events-none peer-disabled:opacity-35";

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-2 -right-2 flex size-5 scale-50 items-center justify-center rounded-full bg-white text-brand opacity-0 shadow ring-1 ring-brand/30 transition-all duration-300 peer-checked:scale-100 peer-checked:opacity-100"
    >
      <CheckIcon className="size-3" />
    </span>
  );
}

function Step({
  n,
  icon,
  label,
  hint,
  error,
  children,
  delay,
}: {
  n: string;
  icon: ReactNode;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <Reveal as="fieldset" delay={delay} className="min-w-0">
      <legend className="flex w-full items-center gap-3">
        <span className="font-ui text-[11px] font-medium tracking-[0.2em] text-sand">{n}</span>
        <span className="text-brand">{icon}</span>
        <span className="font-display text-[22px] leading-tight text-ink sm:text-[24px]">{label}</span>
        {hint && <span className="font-serif text-[15px] text-body italic">({hint})</span>}
      </legend>
      <div className="mt-4">{children}</div>
      {error && (
        <p role="alert" className="mt-2 font-serif text-[15px] text-[#a1452f] italic">
          {error}
        </p>
      )}
    </Reveal>
  );
}

function TextInput({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-ui text-[12px] font-medium tracking-[0.14em] text-ink uppercase">{label}</span>
      <input
        {...props}
        aria-invalid={!!error}
        className={cn(
          "h-12 w-full border bg-white px-4 font-serif text-[18px] text-ink outline-none transition-colors placeholder:text-[#b0aba3] focus:border-brand",
          error ? "border-[#a1452f]" : "border-hairline",
        )}
      />
      {error && <span className="font-serif text-[14px] text-[#a1452f] italic">{error}</span>}
    </label>
  );
}

/** Compose links for the request email: the visitor's mail app (mailto) and the Gmail / Outlook web composers. */
function emailLinks(subject: string, body: string) {
  const to = encodeURIComponent(CONTACT_EMAIL);
  const su = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return {
    mailto: `mailto:${CONTACT_EMAIL}?subject=${su}&body=${b}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${b}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${b}`,
  };
}

/** The integrated "pedido de proposta" form. Sends the request through the visitor's chosen channel. */
export function OrcamentoForm({ locale }: { locale: Locale }) {
  const f = getOrcamento(locale).form;
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<number | null>(null);
  const [guests, setGuests] = useState<GuestRange | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState<ContactPreference>("whatsapp");
  const [message, setMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [sentHref, setSentHref] = useState<string | null>(null);
  const [sentText, setSentText] = useState("");
  const [copied, setCopied] = useState(false);
  const todayRaw = useSyncExternalStore(noop, readToday, readTodayOnServer);
  const today = todayRaw ? { y: Number(todayRaw.split("-")[0]), m: Number(todayRaw.split("-")[1]) } : null;

  const years = today ? YEARS.filter((y) => y >= today.y) : YEARS;
  const isPastMonth = (m: number) => !!today && Number(year) === today.y && m < today.m;

  const errors: Partial<Record<Field, string>> = {};
  if (!year) errors.year = f.errors.year;
  if (!guests) errors.guests = f.errors.guests;
  if (!name.trim()) errors.name = f.errors.name;
  if (!EMAIL_RE.test(email.trim())) errors.email = f.errors.email;
  if (contact === "whatsapp" && phone.replace(/\D/g, "").length < 9) errors.phone = f.errors.phone;
  const valid = Object.keys(errors).length === 0;
  const shown = showErrors ? errors : {};

  const buildText = () => {
    const m = f.message;
    const date =
      year === UNDECIDED
        ? m.undecided
        : month !== null
          ? f.formatDate(f.monthsLong[month], year)
          : year;
    const lines = [
      m.intro,
      "",
      `• ${m.date}: ${date}`,
      `• ${m.guests}: ${guests}`,
      `• ${m.name}: ${name.trim()}`,
      `• ${m.email}: ${email.trim()}`,
      ...(phone.trim() ? [`• ${m.phone}: ${phone.trim()}`] : []),
      `• ${m.contact}: ${contact === "whatsapp" ? "WhatsApp" : "Email"}`,
    ];
    if (message.trim()) lines.push("", message.trim());
    return lines.join("\n");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setShowErrors(true);
      const first = document.querySelector<HTMLElement>("#formulario [aria-invalid='true'], #formulario [data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const text = buildText();
    if (contact === "whatsapp") {
      const href = whatsappHref(text);
      window.open(href, "_blank", "noopener,noreferrer");
      setSentHref(href);
    } else {
      const href = emailLinks(f.message.subject, text).mailto;
      // Opens the visitor's mail app when one is registered; when none is, nothing happens, so the
      // thank-you panel also offers Gmail, Outlook and copy-to-clipboard.
      window.location.assign(href);
      setSentHref(href);
    }
    setSentText(text);
    // The thank-you panel is much shorter than the form; bring the card back into view so it's seen.
    requestAnimationFrame(() => document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const reset = () => {
    setYear("");
    setMonth(null);
    setGuests("");
    setMessage("");
    setShowErrors(false);
    setSentHref(null);
    setSentText("");
    setCopied(false);
  };

  const copyMessage = async () => {
    const full = `${CONTACT_EMAIL}\n${f.message.subject}\n\n${sentText}`;
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
    } catch {
      // Clipboard blocked (e.g. insecure context): leave the button as is; the address is shown below it.
    }
  };

  if (sentHref) {
    return (
      <div className="qcda-orc-success flex flex-col items-center px-2 py-10 text-center" aria-live="polite">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon className="qcda-orc-check size-8" />
        </span>
        <p className="mt-6 font-display text-[40px] leading-none text-ink">{f.success.title}</p>
        <p className="mt-4 max-w-[400px] font-serif text-[18px] leading-[1.6] text-body italic">
          {contact === "whatsapp" ? f.success.whatsapp : f.success.email}
        </p>
        <a
          href={sentHref}
          target={contact === "whatsapp" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="qcda-btn qcda-btn--filled mt-8 hover:bg-brand-deep"
        >
          {contact === "whatsapp" ? f.success.reopenWhatsapp : f.success.reopenEmail}
        </a>
        {contact === "email" && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="font-ui text-[11px] font-medium tracking-[0.2em] text-sand uppercase">{f.success.emailElsewhere}</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {(["gmail", "outlook"] as const).map((service) => (
                <a
                  key={service}
                  href={emailLinks(f.message.subject, sentText)[service]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-hairline bg-white px-5 py-2.5 font-ui text-[14px] text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  {service === "gmail" ? "Gmail" : "Outlook"}
                </a>
              ))}
              <button
                type="button"
                onClick={copyMessage}
                className="border border-hairline bg-white px-5 py-2.5 font-ui text-[14px] text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {copied ? f.success.copied : f.success.copy}
              </button>
            </div>
            <p className="font-serif text-[15px] text-body italic" aria-live="polite">
              {copied ? f.success.copyHint(CONTACT_EMAIL) : CONTACT_EMAIL}
            </p>
          </div>
        )}
        <button type="button" onClick={reset} className="qcda-textual mt-6 text-ink hover:text-brand">
          <span>{f.success.again}</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate name="pedido-proposta" autoComplete="on" className="flex flex-col gap-9">
      <Reveal delay={0}>
        <p className="font-ui text-[12px] font-medium tracking-[0.22em] text-sand uppercase">{f.eyebrow}</p>
        <h2 className="mt-2 font-display text-[36px] leading-[1.05] text-ink sm:text-[42px]">{f.title}</h2>
        <p className="mt-3 font-serif text-[17px] leading-[1.55] text-body italic">{f.intro}</p>
      </Reveal>

      {/* 01 — date */}
      <Step n="01" icon={<CalendarHeart className="size-5" strokeWidth={1.4} />} label={f.dateLabel} error={shown.year} delay={1}>
        <div role="radiogroup" data-error={!!shown.year} className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {[...years.map(String), UNDECIDED].map((y) => (
            <label key={y} className={cn("relative", y === UNDECIDED && "col-span-2 sm:col-span-1")}>
              <input
                type="radio"
                name="year"
                value={y}
                checked={year === y}
                onChange={() => {
                  setYear(y);
                  if (y === UNDECIDED) setMonth(null);
                }}
                className="peer sr-only"
              />
              <span className={cn(tile, "items-center justify-center px-2 py-3 text-center font-serif", y === UNDECIDED ? "text-[15px]" : "font-display text-[22px]")}>
                {y === UNDECIDED ? f.undecided : y}
              </span>
              <CheckBadge />
            </label>
          ))}
        </div>

        {/* Month row unfolds once a year is picked */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
            year && year !== UNDECIDED ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="mb-2.5 font-ui text-[12px] font-medium tracking-[0.14em] text-ink uppercase">
              {f.monthLabel} <span className="font-serif text-[14px] tracking-normal text-body normal-case italic">({f.optional})</span>
            </p>
            <div role="radiogroup" className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {f.months.map((label, m) => (
                <label key={label} className="relative">
                  <input
                    type="radio"
                    name="month"
                    value={m}
                    checked={month === m}
                    disabled={isPastMonth(m) || !year || year === UNDECIDED}
                    onChange={() => setMonth(m)}
                    className="peer sr-only"
                  />
                  <span className={cn(tile, "items-center justify-center py-2.5 font-serif text-[16px]")}>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Step>

      {/* 02 — guests */}
      <Step n="02" icon={<UsersRound className="size-5" strokeWidth={1.4} />} label={f.guestsLabel} error={shown.guests} delay={2}>
        <div role="radiogroup" data-error={!!shown.guests} className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {f.guests.map((g) => (
            <label key={g.value} className="relative">
              <input
                type="radio"
                name="guests"
                value={g.value}
                checked={guests === g.value}
                onChange={() => setGuests(g.value)}
                className="peer sr-only"
              />
              <span className={cn(tile, "group flex-col items-center gap-1.5 px-2 pt-4 pb-3 text-center")}>
                <GuestIcon range={g.value} className="h-7 w-12 transition-transform duration-500 group-hover:scale-110" />
                <span className="font-display text-[20px] leading-none">{g.label}</span>
                <span className="font-ui text-[10px] font-medium tracking-[0.18em] uppercase opacity-70">{g.hint}</span>
              </span>
              <CheckBadge />
            </label>
          ))}
        </div>
      </Step>

      {/* 03 — contact details */}
      <Step n="03" icon={<UserRound className="size-5" strokeWidth={1.4} />} label={f.contactsLabel} delay={3}>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label={f.nameLabel}
            name="name"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder={f.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={shown.name}
            className="sm:col-span-2"
          />
          <TextInput
            label={f.emailLabel}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            placeholder={f.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={shown.email}
          />
          <TextInput
            label={f.phoneLabel}
            type="tel"
            name="tel"
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="next"
            placeholder={f.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={shown.phone}
          />
        </div>
      </Step>

      {/* 04 — preferred channel */}
      <Step n="04" icon={<MessageSquareHeart className="size-5" strokeWidth={1.4} />} label={f.contactLabel} delay={4}>
        <div role="radiogroup" className="grid grid-cols-2 gap-2.5">
          {f.contact.map((c) => (
            <label key={c.value} className="relative">
              <input
                type="radio"
                name="contact"
                value={c.value}
                checked={contact === c.value}
                onChange={() => setContact(c.value)}
                className="peer sr-only"
              />
              <span className={cn(tile, "group items-center gap-3 px-4 py-3.5")}>
                {c.value === "whatsapp" ? (
                  <WhatsAppLineIcon className="size-7 shrink-0 transition-transform duration-500 group-hover:-rotate-6" />
                ) : (
                  <EnvelopeIcon className="size-7 shrink-0 transition-transform duration-500 group-hover:-rotate-6" />
                )}
                <span className="flex flex-col text-left">
                  <span className="font-display text-[20px] leading-none">{c.label}</span>
                  <span className="mt-1 font-serif text-[13px] leading-tight italic opacity-75">{c.hint}</span>
                </span>
              </span>
              <CheckBadge />
            </label>
          ))}
        </div>
      </Step>

      {/* 05 — message */}
      <Step n="05" icon={<PenLine className="size-5" strokeWidth={1.4} />} label={f.messageLabel} hint={f.optional} delay={5}>
        <textarea
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={f.messagePlaceholder}
          className="w-full resize-none border border-hairline bg-white px-4 py-3 font-serif text-[18px] text-ink outline-none transition-colors placeholder:text-[#b0aba3] focus:border-brand"
        />
      </Step>

      <Reveal delay={6}>
        {showErrors && !valid && (
          <p role="alert" className="mb-4 text-center font-serif text-[16px] text-[#a1452f] italic">
            {f.errors.summary}
          </p>
        )}
        <button type="submit" className="qcda-btn qcda-btn--filled qcda-orc-submit w-full py-4 text-[17px] hover:bg-brand-deep">
          {f.submit}
        </button>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5">
          {f.trust.map((item) => (
            <li key={item} className="flex items-center gap-1.5 font-ui text-[12px] tracking-[0.06em] text-body">
              <CheckIcon className="size-3.5 text-sand" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </form>
  );
}
