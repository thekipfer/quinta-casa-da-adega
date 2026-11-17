"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageAsset } from "@/types/content";

/** Photo slider beside the hero title: one photo at a time, endless autoplay with the live site's timing. */
const GAP = 30;
const PAUSE_MS = 500; // Qi "speed" → autoplay delay
const GLIDE_MS = 2000; // Qi "speedAnimation" → slide transition

type AboutSliderProps = {
  slides: (ImageAsset & { alt: string })[];
  label: string;
};

export function AboutSlider({ slides, label }: AboutSliderProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const wrappedRef = useRef(false);
  const indexRef = useRef(0);
  const count = slides.length;
  // A clone of the first slide at the end lets the loop wrap seamlessly.
  const looped = [...slides, slides[0]];

  const place = useCallback(
    (i: number, animate: boolean) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const step = viewport.clientWidth + GAP;
      track.style.transition = animate ? `transform ${GLIDE_MS}ms ease` : "none";
      track.style.transform = `translate3d(${-i * step}px, 0, 0)`;
    },
    [],
  );

  // Keep the current slide aligned when the viewport actually changes width (not on every slide change,
  // which would cancel the running glide).
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let width = viewport.clientWidth;
    const ro = new ResizeObserver(() => {
      if (viewport.clientWidth === width) return;
      width = viewport.clientWidth;
      place(indexRef.current, false);
    });
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [place]);

  useEffect(() => {
    indexRef.current = index;
    place(index, index !== 0);
  }, [index, place]);

  // Autoplay: wait PAUSE_MS after each glide finishes, then advance.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The timer starts when a glide starts, so it covers glide + pause. Right after a wrap the glide is already over;
    // on first load give the photos a moment before the first move.
    const delay = index !== 0 ? GLIDE_MS + PAUSE_MS : wrappedRef.current ? PAUSE_MS : 2000;
    wrappedRef.current = false;
    const id = window.setTimeout(() => setIndex((i) => i + 1), delay);
    return () => window.clearTimeout(id);
  }, [index]);

  // After gliding onto the clones, jump back to the real first slide without animating.
  const onTransitionEnd = () => {
    if (index >= count) {
      wrappedRef.current = true;
      place(0, false);
      setIndex(0);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="relative h-[450px] w-full min-w-0"
    >
      <div ref={viewportRef} className="h-full overflow-hidden">
        <div ref={trackRef} className="flex h-full gap-[30px] will-change-transform" onTransitionEnd={onTransitionEnd}>
          {looped.map((s, i) => (
            <div
              key={`${s.src}-${i}`}
              className="h-full shrink-0 basis-full"
              aria-hidden={i >= count}
            >
              <Image
                src={s.src}
                alt={i >= count ? "" : s.alt}
                width={s.width}
                height={s.height}
                sizes="(min-width: 1025px) 550px, 100vw"
                priority={i === 0}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
