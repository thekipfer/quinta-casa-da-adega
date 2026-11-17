"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const YEARS_AHEAD = 5;

type View = "days" | "months" | "years";

/** Builds a local "YYYY-MM-DD" string (no UTC conversion, so the day never shifts). */
export function toIsoDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function parseIsoDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return y && m && d ? { y, m: m - 1, d } : null;
}

/** "Sábado, 12 de junho de 2027" (pt-PT) / "Saturday 12 June 2027" (en-GB) */
export function formatLongDate(value: string, dateLocale: string) {
  const p = parseIsoDate(value);
  if (!p) return value;
  const text = new Intl.DateTimeFormat(dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(p.y, p.m, p.d));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

type QuizCalendarProps = {
  value: string;
  onChange: (value: string) => void;
  /** Year to open on when nothing is selected yet (e.g. the year chosen in step 1). */
  preferredYear?: number;
  locale: Locale;
};

/** Inline calendar in the site's palette. Click the month or year in the header to jump directly. */
export function QuizCalendar({ value, onChange, preferredYear, locale }: QuizCalendarProps) {
  const { calendar: t, dateLocale } = getDictionary(locale);
  const MONTHS = t.months;
  const WEEKDAYS = t.weekdays;
  const today = useMemo(() => {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  }, []);
  const maxYear = today.y + YEARS_AHEAD - 1;

  const [cursor, setCursor] = useState(() => {
    const selected = parseIsoDate(value);
    if (selected) return { y: selected.y, m: selected.m };
    if (preferredYear && preferredYear > today.y && preferredYear <= maxYear) return { y: preferredYear, m: today.m };
    return { y: today.y, m: today.m };
  });
  const [view, setView] = useState<View>("days");

  const selected = parseIsoDate(value);
  const isPastMonth = (y: number, m: number) => y < today.y || (y === today.y && m < today.m);
  const canPrev = !isPastMonth(cursor.m === 0 ? cursor.y - 1 : cursor.y, cursor.m === 0 ? 11 : cursor.m - 1);
  const canNext = !(cursor.y === maxYear && cursor.m === 11);

  const shiftMonth = (delta: number) => {
    setCursor(({ y, m }) => {
      const total = y * 12 + m + delta;
      return { y: Math.floor(total / 12), m: total % 12 };
    });
  };

  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const leadingBlanks = (new Date(cursor.y, cursor.m, 1).getDay() + 6) % 7; // Monday-first

  return (
    <div className="mx-auto w-full max-w-[400px] border border-hairline bg-white/75 px-4 pt-3 pb-4 sm:px-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canPrev || view !== "days"}
          aria-label={t.previousMonth}
          className="flex size-10 items-center justify-center text-ink transition-colors hover:text-brand disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setView((v) => (v === "months" ? "days" : "months"))}
            aria-expanded={view === "months"}
            className={cn(
              "flex items-center gap-1 px-2 py-1 font-display text-[26px] leading-none transition-colors hover:text-brand",
              view === "months" ? "text-brand" : "text-ink",
            )}
          >
            {MONTHS[cursor.m]}
            <ChevronDown
              className={cn("size-4 transition-transform", view === "months" && "rotate-180")}
              strokeWidth={1.5}
            />
          </button>
          <button
            type="button"
            onClick={() => setView((v) => (v === "years" ? "days" : "years"))}
            aria-expanded={view === "years"}
            className={cn(
              "flex items-center gap-1 px-2 py-1 font-display text-[26px] leading-none transition-colors hover:text-brand",
              view === "years" ? "text-brand" : "text-ink",
            )}
          >
            {cursor.y}
            <ChevronDown
              className={cn("size-4 transition-transform", view === "years" && "rotate-180")}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => shiftMonth(1)}
          disabled={!canNext || view !== "days"}
          aria-label={t.nextMonth}
          className="flex size-10 items-center justify-center text-ink transition-colors hover:text-brand disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-2 h-px bg-hairline/70" aria-hidden="true" />

      {/* Body: fixed height so switching views never makes the modal jump */}
      <div className="mt-3 h-[256px]">
        {view === "days" && (
          <div key={`${cursor.y}-${cursor.m}`} className="qcda-quiz-step">
            <div className="grid grid-cols-7 text-center" aria-hidden="true">
              {WEEKDAYS.map((w, i) => (
                <span
                  key={w}
                  className={cn(
                    "pb-2 font-ui text-[11px] font-medium tracking-[0.12em] uppercase",
                    i >= 5 ? "text-brand" : "text-body",
                  )}
                >
                  {w}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5" role="grid" aria-label={`${MONTHS[cursor.m]} ${cursor.y}`}>
              {Array.from({ length: leadingBlanks }, (_, i) => (
                <span key={`b${i}`} aria-hidden="true" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const d = i + 1;
                const iso = toIsoDate(cursor.y, cursor.m, d);
                const past =
                  cursor.y < today.y ||
                  (cursor.y === today.y && (cursor.m < today.m || (cursor.m === today.m && d < today.d)));
                const isToday = cursor.y === today.y && cursor.m === today.m && d === today.d;
                const isSelected = selected?.y === cursor.y && selected.m === cursor.m && selected.d === d;
                const weekend = (leadingBlanks + i) % 7 >= 5;
                return (
                  <div key={d} className="flex justify-center">
                    <button
                      type="button"
                      disabled={past}
                      onClick={() => onChange(iso)}
                      aria-pressed={isSelected}
                      aria-label={formatLongDate(iso, dateLocale)}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full font-serif text-[17px] transition-all duration-200",
                        isSelected
                          ? "scale-105 bg-brand text-white shadow-[0_6px_14px_-6px_rgba(113,101,74,0.8)]"
                          : "hover:bg-sand/40",
                        !isSelected && (weekend ? "text-brand" : "text-ink"),
                        !isSelected && isToday && "ring-1 ring-sand",
                        past && "pointer-events-none text-hairline",
                      )}
                    >
                      {d}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "months" && (
          <div className="qcda-quiz-step grid h-full grid-cols-3 content-center gap-2">
            {MONTHS.map((name, m) => {
              const disabled = isPastMonth(cursor.y, m);
              const active = m === cursor.m;
              return (
                <button
                  key={name}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setCursor((c) => ({ ...c, m }));
                    setView("days");
                  }}
                  className={cn(
                    "h-[52px] border font-serif text-[18px] transition-colors",
                    active ? "border-brand bg-brand text-white" : "border-hairline text-ink hover:border-brand",
                    disabled && "pointer-events-none border-transparent text-hairline",
                  )}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        )}

        {view === "years" && (
          <div className="qcda-quiz-step grid h-full grid-cols-1 content-center gap-2">
            {Array.from({ length: YEARS_AHEAD }, (_, i) => today.y + i).map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  // Keep the month valid when jumping back to the current year.
                  setCursor((c) => ({ y, m: y === today.y ? Math.max(c.m, today.m) : c.m }));
                  setView("days");
                }}
                className={cn(
                  "h-[44px] border font-display text-[24px] transition-colors",
                  y === cursor.y ? "border-brand bg-brand text-white" : "border-hairline text-ink hover:border-brand",
                )}
              >
                {y}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
