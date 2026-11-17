"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/types";
import { weddingsUi } from "@/lib/weddings";
import type { ImageAsset } from "@/types/content";

type Photo = ImageAsset & { alt: string };

/** Three-column photo grid; each photo opens a full-screen lightbox (arrows / swipe / Esc). */
export function WeddingGallery({ locale, photos, title }: { locale: Locale; photos: Photo[]; title: string }) {
  const ui = weddingsUi[locale];
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const count = photos.length;
  const step = useCallback((delta: number) => setOpen((i) => (i === null ? i : (i + delta + count) % count)), [count]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  // Focus the close button on open; hand focus back to the thumbnail that opened the lightbox on close.
  const isOpen = open !== null;
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
    else triggerRef.current?.focus();
  }, [isOpen]);

  const photo = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-[10px] md:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={ui.enlarge(i + 1, count)}
              className="group block w-full cursor-zoom-in overflow-hidden"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1148px) 370px, (min-width: 768px) 33vw, 50vw"
                className="block aspect-[2/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      {photo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ui.gallery(title)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="relative h-[85vh] w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="92vw" className="object-contain" priority />
          </div>

          <p className="absolute top-5 left-6 font-ui text-[14px] tracking-[0.08em] text-white/80" aria-live="polite">
            {open! + 1} / {count}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={ui.closeGallery}
            className="absolute top-3 right-3 p-3 text-white/80 transition-colors hover:text-white"
          >
            <X className="size-7" strokeWidth={1.4} />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label={ui.previousPhoto}
                className="absolute top-1/2 left-1 -translate-y-1/2 p-3 text-white/80 transition-colors hover:text-white desk:left-4"
              >
                <ChevronLeft className="size-9" strokeWidth={1.2} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label={ui.nextPhoto}
                className="absolute top-1/2 right-1 -translate-y-1/2 p-3 text-white/80 transition-colors hover:text-white desk:right-4"
              >
                <ChevronRight className="size-9" strokeWidth={1.2} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
