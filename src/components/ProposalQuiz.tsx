"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { QuizCalendar, formatLongDate } from "@/components/QuizCalendar";
import { whatsappHref } from "@/lib/content";
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { QuizChoiceStep } from "@/types/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Answers = {
  year: string;
  date: string;
  dateUnknown: boolean;
  guests: string;
  services: string[];
  names: string;
  email: string;
  phone: string;
  message: string;
};

const emptyAnswers: Answers = {
  year: "",
  date: "",
  dateUnknown: false,
  guests: "",
  services: [],
  names: "",
  email: "",
  phone: "",
  message: "",
};

/** The quiz answers as a pre-filled WhatsApp message, written in the visitor's language. */
function buildWhatsAppUrl(a: Answers, dict: Dictionary) {
  const m = dict.quiz.message;
  const lines = [
    m.intro,
    "",
    `• ${m.couple}: ${a.names}`,
    `• ${m.year}: ${a.year}`,
    `• ${m.date}: ${a.date ? formatLongDate(a.date, dict.dateLocale) : m.noDate}`,
    `• ${m.guests}: ${a.guests}`,
    `• ${m.interests}: ${a.services.length ? a.services.join(", ") : "—"}`,
    `• ${m.email}: ${a.email}`,
    `• ${m.phone}: ${a.phone}`,
  ];
  if (a.message.trim()) lines.push("", a.message.trim());
  return whatsappHref(lines.join("\n"));
}

type ProposalQuizProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

/** Multi-step proposal quiz shown as a modal. Submits the answers as a pre-filled WhatsApp message. */
export function ProposalQuiz({ locale, open, onClose }: ProposalQuizProps) {
  const dict = getDictionary(locale);
  const t = dict.quiz;
  const quizSteps = t.steps;
  const totalSteps = quizSteps.length + 1;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const reset = useCallback(() => {
    setStep(0);
    setAnswers(emptyAnswers);
    setSubmitted(false);
    setShowErrors(false);
  }, []);

  const close = useCallback(() => {
    onClose();
    // Start fresh next time once the modal has closed after a successful submit.
    if (submitted) reset();
  }, [onClose, reset, submitted]);

  // Keep the latest close handler in a ref so the open/close effect only runs on open changes.
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  }, [close]);

  // Scroll lock, Escape to close, focus trap, focus restore.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  // Move focus to the panel heading on open and on every step change.
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>("[data-step-title]")?.focus();
  }, [open, step, submitted]);

  if (!open) return null;

  const isContactStep = step === quizSteps.length;
  const current = isContactStep ? null : quizSteps[step];

  const stepValid = (() => {
    if (current) {
      if (current.kind === "date") return answers.date !== "" || answers.dateUnknown;
      if (current.optional) return true;
      const value = answers[current.key];
      return Array.isArray(value) ? value.length > 0 : value !== "";
    }
    return answers.names.trim() !== "" && EMAIL_RE.test(answers.email.trim()) && answers.phone.trim().length >= 9;
  })();

  const choose = (s: QuizChoiceStep, option: string) => {
    if (s.kind === "multi") {
      setAnswers((prev) => {
        const list = prev.services;
        return { ...prev, services: list.includes(option) ? list.filter((o) => o !== option) : [...list, option] };
      });
      return;
    }
    setAnswers((prev) => ({ ...prev, [s.key]: option }));
    // Single choice: advance automatically after a short beat so the selection is visible.
    advanceSoon();
  };

  const advanceSoon = () => {
    const from = step;
    window.setTimeout(() => {
      setShowErrors(false);
      setStep((n) => (n === from ? Math.min(n + 1, quizSteps.length) : n));
    }, 260);
  };

  const pickDate = (iso: string) => {
    // A picked date also pins down the year from step 1.
    setAnswers((p) => ({ ...p, date: iso, dateUnknown: false, year: iso.slice(0, 4) }));
    setShowErrors(false);
  };

  const markDateUnknown = () => {
    setAnswers((p) => ({ ...p, date: "", dateUnknown: true }));
    advanceSoon();
  };

  const next = () => {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((n) => Math.min(n + 1, quizSteps.length));
  };

  const back = () => {
    setShowErrors(false);
    setStep((n) => Math.max(n - 1, 0));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    window.open(buildWhatsAppUrl(answers, dict), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const emailInvalid = showErrors && !EMAIL_RE.test(answers.email.trim());
  const phoneInvalid = showErrors && answers.phone.trim().length < 9;
  const namesInvalid = showErrors && answers.names.trim() === "";

  return createPortal(
    <div className="fixed inset-0 z-[1100] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={t.close}
        tabIndex={-1}
        onClick={close}
        className="qcda-quiz-overlay absolute inset-0 cursor-default bg-[rgb(24,14,1)]/60 backdrop-blur-[3px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="qcda-quiz-panel relative flex max-h-[calc(100dvh-24px)] sm:max-h-[94dvh] w-full max-w-[720px] flex-col overflow-hidden bg-cream shadow-[0_30px_80px_-20px_rgba(24,14,1,0.55)]"
      >
        {/* Decorative pampas grass */}
        <Image
          src="/images/h2-img8.webp"
          alt=""
          aria-hidden="true"
          width={355}
          height={368}
          className="pointer-events-none absolute -right-[70px] -bottom-[60px] w-[260px] opacity-70 select-none sm:-right-[40px] sm:w-[320px]"
        />
        <Image
          src="/images/h2-img8.webp"
          alt=""
          aria-hidden="true"
          width={355}
          height={368}
          className="pointer-events-none absolute -top-[90px] -left-[110px] w-[230px] rotate-180 opacity-40 select-none"
        />

        <button
          type="button"
          onClick={close}
          aria-label={t.closeDialog}
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center text-ink transition-colors hover:text-brand"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>

        <div className="relative overflow-y-auto px-6 pt-10 pb-8 sm:px-14 sm:pt-10 sm:pb-10">
          {/* Header: envelope + progress */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/inner-icon-1.webp"
              alt=""
              aria-hidden="true"
              width={80}
              height={90}
              className="h-auto w-[52px] sm:w-[60px]"
            />
            <p className="mt-4 font-ui text-[13px] font-medium tracking-[0.18em] text-brand uppercase">
              {submitted ? t.sent : t.progress(step + 1, totalSteps)}
            </p>
            {!submitted && (
              <div className="mt-3 flex w-full max-w-[260px] gap-1.5" aria-hidden="true">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-[2px] flex-1 transition-colors duration-500",
                      i <= step ? "bg-brand" : "bg-hairline",
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {submitted ? (
            <SuccessView
              titleId={titleId}
              names={answers.names}
              whatsappUrl={buildWhatsAppUrl(answers, dict)}
              t={t}
              onClose={close}
            />
          ) : (
            <div key={step} className="qcda-quiz-step mt-7">
              {current ? (
                <>
                  <StepHeading id={titleId} title={current.title} subtitle={current.subtitle} />
                  {current.kind === "date" ? (
                    <div className="mt-6">
                      <QuizCalendar
                        value={answers.date}
                        onChange={pickDate}
                        preferredYear={Number(answers.year) || undefined}
                        locale={locale}
                      />
                      <div className="mx-auto mt-4 flex min-h-[28px] max-w-[400px] items-center justify-center text-center">
                        {answers.date ? (
                          <p className="font-serif text-[19px] text-ink italic" aria-live="polite">
                            {formatLongDate(answers.date, dict.dateLocale)}
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={markDateUnknown}
                            aria-pressed={answers.dateUnknown}
                            className="qcda-textual text-body hover:text-brand"
                          >
                            <span>{t.noDateYet}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      role={current.kind === "single" ? "radiogroup" : "group"}
                      aria-labelledby={titleId}
                      className="mx-auto mt-8 grid max-w-[520px] grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      {current.options.map((option) => {
                        const value = answers[current.key];
                        const selected = Array.isArray(value) ? value.includes(option) : value === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role={current.kind === "single" ? "radio" : "checkbox"}
                            aria-checked={selected}
                            onClick={() => choose(current, option)}
                            className={cn(
                              "group relative flex min-h-[56px] items-center justify-between gap-3 border px-5 py-3 text-left font-serif text-[19px] leading-tight transition-all duration-300",
                              selected
                                ? "border-brand bg-brand text-white"
                                : "border-hairline bg-white/70 text-ink hover:border-brand hover:bg-white",
                            )}
                          >
                            <span>{option}</span>
                            <span
                              aria-hidden="true"
                              className={cn(
                                "flex size-[18px] shrink-0 items-center justify-center border transition-colors",
                                current.kind === "single" && "rounded-full",
                                selected ? "border-white" : "border-hairline group-hover:border-brand",
                              )}
                            >
                              <span
                                className={cn(
                                  "size-[8px] bg-white transition-transform duration-300",
                                  current.kind === "single" && "rounded-full",
                                  selected ? "scale-100" : "scale-0",
                                )}
                              />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {showErrors && !stepValid && (
                    <p role="alert" className="mt-4 text-center font-serif text-[16px] text-[#a1452f] italic">
                      {current.kind === "date" ? t.errorDate : t.errorChoice}
                    </p>
                  )}

                  <StepNav
                    onBack={step > 0 ? back : undefined}
                    backLabel={t.back}
                    primary={
                      <button type="button" onClick={next} className="qcda-btn qcda-btn--filled hover:bg-brand-deep">
                        {current.optional && answers.services.length === 0 ? t.skip : t.next}
                      </button>
                    }
                  />
                </>
              ) : (
                <form name="pedido-proposta" autoComplete="on" onSubmit={submit} noValidate>
                  {/* name + autocomplete on every field lets the browser offer saved contacts/history on focus */}
                  <StepHeading
                    id={titleId}
                    title={t.contactTitle}
                    subtitle={t.contactSubtitle}
                  />
                  <div className="mx-auto mt-8 grid max-w-[520px] gap-4 sm:grid-cols-2">
                    <Field label={t.namesLabel} invalid={namesInvalid} className="sm:col-span-2">
                      <input
                        type="text"
                        name="name"
                        id="qcda-quiz-name"
                        autoComplete="name"
                        autoCapitalize="words"
                        enterKeyHint="next"
                        placeholder={t.namesPlaceholder}
                        value={answers.names}
                        aria-invalid={namesInvalid}
                        onChange={(e) => setAnswers((p) => ({ ...p, names: e.target.value }))}
                        className="qcda-quiz-input"
                      />
                    </Field>
                    <Field label={t.emailLabel} invalid={emailInvalid}>
                      <input
                        type="email"
                        name="email"
                        id="qcda-quiz-email"
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        enterKeyHint="next"
                        placeholder={t.emailPlaceholder}
                        value={answers.email}
                        aria-invalid={emailInvalid}
                        onChange={(e) => setAnswers((p) => ({ ...p, email: e.target.value }))}
                        className="qcda-quiz-input"
                      />
                    </Field>
                    <Field label={t.phoneLabel} invalid={phoneInvalid}>
                      <input
                        type="tel"
                        name="tel"
                        id="qcda-quiz-tel"
                        autoComplete="tel"
                        inputMode="tel"
                        enterKeyHint="next"
                        placeholder={t.phonePlaceholder}
                        value={answers.phone}
                        aria-invalid={phoneInvalid}
                        onChange={(e) => setAnswers((p) => ({ ...p, phone: e.target.value }))}
                        className="qcda-quiz-input"
                      />
                    </Field>
                    <Field label={t.messageLabel} className="sm:col-span-2">
                      <textarea
                        name="message"
                        id="qcda-quiz-message"
                        rows={3}
                        value={answers.message}
                        onChange={(e) => setAnswers((p) => ({ ...p, message: e.target.value }))}
                        className="qcda-quiz-input resize-none"
                      />
                    </Field>
                  </div>

                  {showErrors && !stepValid && (
                    <p role="alert" className="mt-4 text-center font-serif text-[16px] text-[#a1452f] italic">
                      {t.errorContact}
                    </p>
                  )}

                  <StepNav
                    onBack={back}
                    backLabel={t.back}
                    primary={
                      <button type="submit" className="qcda-btn qcda-btn--filled hover:bg-brand-deep">
                        {t.submit}
                      </button>
                    }
                  />
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Step title + subtitle. A "\n" in the title splits it into exactly two centred lines from `sm` up; below that it wraps (balanced). */
function StepHeading({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  const lines = title.split("\n");
  return (
    <div className="text-center">
      <h2
        id={id}
        data-step-title
        tabIndex={-1}
        className="font-display text-[32px] leading-[1.08] font-normal text-balance text-ink outline-none sm:text-[40px] md:text-[44px]"
      >
        {lines.map((line, i) => (
          <span key={i} className={cn(lines.length > 1 && "sm:block sm:whitespace-nowrap")}>
            {i > 0 && " "}
            {line}
          </span>
        ))}
      </h2>
      <p className="mx-auto mt-4 max-w-[440px] font-serif text-[18px] leading-[1.5] text-balance text-body italic">
        {subtitle}
      </p>
    </div>
  );
}

function StepNav({ onBack, backLabel, primary }: { onBack?: () => void; backLabel: string; primary: ReactNode }) {
  return (
    <div className="mx-auto mt-8 flex max-w-[520px] items-center justify-between gap-4">
      {onBack ? (
        <button type="button" onClick={onBack} className="qcda-textual text-ink hover:text-brand">
          <span>{backLabel}</span>
        </button>
      ) : (
        <span />
      )}
      {primary}
    </div>
  );
}

function Field({
  label,
  invalid,
  className,
  children,
}: {
  label: string;
  invalid?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", invalid && "qcda-quiz-field--invalid", className)}>
      <span className="font-ui text-[12px] font-medium tracking-[0.14em] text-ink uppercase">{label}</span>
      {children}
    </label>
  );
}

function SuccessView({
  titleId,
  names,
  whatsappUrl,
  t,
  onClose,
}: {
  titleId: string;
  names: string;
  whatsappUrl: string;
  t: Dictionary["quiz"];
  onClose: () => void;
}) {
  return (
    <div className="qcda-quiz-step mt-7 text-center">
      <h2
        id={titleId}
        data-step-title
        tabIndex={-1}
        className="font-display text-[38px] leading-[1.05] font-normal text-ink outline-none sm:text-[48px]"
      >
        {t.thanks(names.trim())}
      </h2>
      <p className="mx-auto mt-4 max-w-[440px] font-serif text-[18px] leading-[1.6] text-body italic">
        {t.successText}
      </p>
      <div className="mt-9 flex flex-col items-center gap-5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="qcda-btn qcda-btn--filled hover:bg-brand-deep"
        >
          {t.openWhatsApp}
        </a>
        <button type="button" onClick={onClose} className="qcda-textual text-ink hover:text-brand">
          <span>{t.backToSite}</span>
        </button>
      </div>
    </div>
  );
}
