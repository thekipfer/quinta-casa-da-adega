"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { QuoteIcon, StarIcon } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Continuous drift speed on tablet/desktop, in px per second. */
const SPEED = 75;
/** After the visitor scrolls/swipes/drags, wait this long before the drift resumes. */
const RESUME_AFTER_INTERACTION_MS = 2500;
/**
 * The list is rendered several times back-to-back so the loop is seamless:
 * whenever the position drifts past one full set it jumps by exactly one set.
 * Four sets keep scrollable room beyond one loop on viewports up to ~4000px wide.
 */
const COPIES = 4;
/** Below this width the track becomes a one-card-at-a-time slider with arrows (no drift). */
const MOBILE_QUERY = "(max-width: 767px)";

/** "Renato Ferreira" → "RF", "Larissa" → "L". */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- geometry helpers (all relative to the scroll content) ---------- */

function cardAt(el: HTMLElement, i: number) {
  return el.children[i] as HTMLElement | undefined;
}

/** Width of one full set of `count` cards (distance from item 0 to its first duplicate). */
function loopWidth(el: HTMLElement, count: number) {
  const first = cardAt(el, 0);
  const dup = cardAt(el, count);
  return first && dup ? dup.offsetLeft - first.offsetLeft : 0;
}

/** scrollLeft that centres card `i` in the track. */
function centeredScroll(el: HTMLElement, i: number) {
  const first = cardAt(el, 0);
  const card = cardAt(el, i);
  if (!first || !card) return el.scrollLeft;
  return card.offsetLeft - first.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2;
}

/** Index of the card currently closest to the centre of the track. */
function centeredIndex(el: HTMLElement) {
  const first = cardAt(el, 0);
  const second = cardAt(el, 1);
  if (!first || !second) return 0;
  const step = second.offsetLeft - first.offsetLeft;
  return Math.round((el.scrollLeft + el.clientWidth / 2 - first.offsetWidth / 2) / step);
}

/**
 * Testimonials.
 * - Tablet/desktop: full-width ticker drifting left in an infinite loop; pauses on hover/focus;
 *   scrollable by trackpad, shift+wheel, touch and mouse drag.
 * - Mobile: wide cards, one at a time, scroll-snap + previous/next arrows, finger swipe and mouse drag,
 *   infinite in both directions.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).testimonials;
  const COUNT = t.items.length;
  const scrollerRef = useRef<HTMLUListElement>(null);
  const hoveredRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const dragRef = useRef<{ startX: number; startScroll: number; startIdx: number; mobile: boolean } | null>(null);
  const snapTimerRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  /** Scroll-snap is suspended while a mouse drag is in progress and while its release animation settles. */
  const [snapSuspended, setSnapSuspended] = useState(false);
  const [active, setActive] = useState(0);

  const markInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  /* ---------- tablet/desktop drift ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pos = mobile.matches ? centeredScroll(el, COUNT) : loopWidth(el, COUNT);
    el.scrollLeft = pos;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      frame = requestAnimationFrame(tick);

      // Mobile is driven by snap + arrows; looping is handled in the scroll listener below.
      if (mobile.matches) {
        pos = el.scrollLeft;
        return;
      }

      const loop = loopWidth(el, COUNT);
      const manual =
        hoveredRef.current ||
        dragRef.current !== null ||
        Date.now() - lastInteractionRef.current < RESUME_AFTER_INTERACTION_MS;

      pos = manual || reduceMotion ? el.scrollLeft : pos + SPEED * dt;

      // Content repeats every `loop` px, so jumping by exactly one loop is invisible;
      // do it before the real scroll limit so the drift never stalls.
      if (loop > 0) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        let shift = 0;
        if (pos >= Math.min(loop * 2, maxScroll - 1)) shift = -loop;
        else if (pos <= 1) shift = loop;
        if (shift !== 0) {
          pos += shift;
          if (dragRef.current) dragRef.current.startScroll += shift;
        }
      }

      if (Math.abs(el.scrollLeft - pos) > 0.5) el.scrollLeft = pos;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [COUNT]);

  /* ---------- mobile: counter + seamless wrap after a swipe settles ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const mobile = window.matchMedia(MOBILE_QUERY);
    let idle = 0;
    let current = 0;

    const onScroll = () => {
      if (!mobile.matches) return;
      current = ((centeredIndex(el) % COUNT) + COUNT) % COUNT;
      setActive(current);

      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        if (dragRef.current) return; // never move the track under an active drag
        // Keep the visible card inside the middle copies so both directions stay infinite.
        const settled = centeredIndex(el);
        if (settled < COUNT) el.scrollLeft += loopWidth(el, COUNT);
        else if (settled >= COUNT * (COPIES - 1)) el.scrollLeft -= loopWidth(el, COUNT);
      }, 160);
    };

    // Re-centre on the current card when crossing into mobile.
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) el.scrollLeft = centeredScroll(el, COUNT + current);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    mobile.addEventListener("change", onBreakpoint);
    return () => {
      el.removeEventListener("scroll", onScroll);
      mobile.removeEventListener("change", onBreakpoint);
      window.clearTimeout(idle);
    };
  }, [COUNT]);

  /** Smoothly centre the card `dir` steps away from card `from` (dir 0 = snap back to it). */
  const slideFrom = (from: number, dir: -1 | 0 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    let idx = from;
    // Jump (invisibly) into the middle copies first if we're near either end.
    if (idx + dir < COUNT || idx + dir >= COUNT * (COPIES - 1)) {
      const shift = idx + dir < COUNT ? COUNT : -COUNT;
      el.scrollLeft += centeredScroll(el, idx + shift) - centeredScroll(el, idx);
      idx += shift;
    }
    el.scrollTo({ left: centeredScroll(el, idx + dir), behavior: "smooth" });
  };

  const go = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    markInteraction();
    slideFrom(centeredIndex(el), dir);
  };

  /* ---------- mouse drag (all widths; touch & pen use native scrolling) ---------- */
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    markInteraction();
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault(); // don't start a text selection
    window.clearTimeout(snapTimerRef.current);
    dragRef.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      startIdx: centeredIndex(el),
      mobile: window.matchMedia(MOBILE_QUERY).matches,
    };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
    setSnapSuspended(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el) return;
    el.scrollLeft = drag.startScroll - (e.clientX - drag.startX);
  };

  const endDrag = (e: PointerEvent<HTMLUListElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    scrollerRef.current?.releasePointerCapture(e.pointerId);
    dragRef.current = null;
    setDragging(false);
    markInteraction();

    if (drag.mobile) {
      // Slider behaviour: a short flick is enough to change card; otherwise snap back.
      const dx = e.clientX - drag.startX;
      const dir = dx < -40 ? 1 : dx > 40 ? -1 : 0;
      slideFrom(drag.startIdx, dir);
      snapTimerRef.current = window.setTimeout(() => setSnapSuspended(false), 500);
    } else {
      setSnapSuspended(false);
    }
  };

  const items = Array.from({ length: COPIES }, (_, copy) =>
    t.items.map((item) => ({ ...item, copy, key: `${copy}-${item.author}` })),
  ).flat();

  return (
    <section className="bg-sand pt-20 pb-[70px] desk:pt-[100px] desk:pb-[50px]">
      <div className="mx-auto max-w-[1100px] px-6 desk:px-0">
        <h3 className="mx-auto max-w-[308px] text-center font-display text-[38px] leading-[38px] font-normal text-cream md:max-w-[770px]">
          {t.intro}
        </h3>
        <QuoteIcon className="mx-auto mt-[50px] block text-white" />
      </div>

      {/* Small side margins; the track itself fades to transparent at both edges. */}
      <div className="mt-[44px] px-4 md:px-8 desk:px-10">
        <ul
          ref={scrollerRef}
          aria-label={t.list}
          tabIndex={0}
          onMouseEnter={() => (hoveredRef.current = true)}
          onMouseLeave={() => (hoveredRef.current = false)}
          onFocus={() => (hoveredRef.current = true)}
          onBlur={() => (hoveredRef.current = false)}
          onWheel={markInteraction}
          onTouchStart={markInteraction}
          onTouchMove={markInteraction}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn(
            "flex w-full gap-3 overflow-x-auto overscroll-x-contain py-4 [scrollbar-width:none] focus-visible:outline-none md:gap-6 desk:gap-8 [&::-webkit-scrollbar]:hidden",
            "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]",
            snapSuspended ? "snap-none" : "snap-x snap-mandatory md:snap-none",
            dragging ? "cursor-grabbing select-none" : "cursor-grab",
          )}
        >
          {items.map((item) => (
            <li
              key={item.key}
              aria-hidden={item.copy !== 1 ? true : undefined}
              className="flex w-[calc(100%-40px)] shrink-0 snap-center snap-always pt-9 md:w-[340px] desk:w-[360px]"
            >
              <article className="relative flex w-full flex-col rounded-[28px] border border-white/70 bg-[#fbf8f3]/75 px-6 pt-14 pb-8 shadow-[0_18px_40px_-24px_rgba(84,70,44,0.45)] backdrop-blur-sm md:px-7 desk:px-9">
                <span
                  aria-hidden="true"
                  className="absolute -top-9 left-1/2 flex size-[72px] -translate-x-1/2 items-center justify-center rounded-full bg-white font-display text-[28px] leading-none tracking-[0.04em] text-brand shadow-[0_8px_24px_-12px_rgba(84,70,44,0.5)] ring-1 ring-sand/40"
                >
                  {initials(item.author)}
                </span>

                <p className="text-center font-display text-[26px] leading-[30px] font-normal tracking-[0.02em] text-brand">
                  {item.author}
                </p>
                <p className="mt-1 text-center font-ui text-[12px] leading-[18px] font-light tracking-[0.18em] text-brand/60 uppercase">
                  {item.date}
                </p>

                <span aria-hidden="true" className="mx-auto mt-5 block h-px w-10 bg-sand" />

                <p className="mt-5 flex-1 font-ui text-[15px] leading-[26px] font-light whitespace-pre-line text-[#5c5240]">
                  {item.text}
                </p>

                <div className="mt-7 flex justify-center gap-[6px] text-[#b89a6c]" role="img" aria-label={t.rating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Mobile slider controls */}
        <div className="mt-4 flex items-center justify-center gap-6 md:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.previous}
            className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-[#fbf8f3]/75 text-brand shadow-[0_8px_20px_-12px_rgba(84,70,44,0.5)] transition-[background-color,transform] duration-200 active:scale-95 active:bg-white"
          >
            <ChevronLeft className="size-5" strokeWidth={1.25} />
          </button>
          <span className="min-w-[64px] text-center font-ui text-[13px] font-light tracking-[0.2em] text-brand" aria-live="polite">
            {pad(active + 1)} / {pad(COUNT)}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.next}
            className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-[#fbf8f3]/75 text-brand shadow-[0_8px_20px_-12px_rgba(84,70,44,0.5)] transition-[background-color,transform] duration-200 active:scale-95 active:bg-white"
          >
            <ChevronRight className="size-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </section>
  );
}
