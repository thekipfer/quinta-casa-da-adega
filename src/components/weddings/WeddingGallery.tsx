"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/types";
import { weddingsUi } from "@/lib/weddings";
import type { ImageAsset } from "@/types/content";

type Photo = ImageAsset & { alt: string };

/**
 * Masonry photo gallery (2 columns, 3 on tablet+): every photo keeps its own orientation and proportions — nothing is
 * cropped — and is served as the original file (`unoptimized`), so it shows at full quality. Each photo opens a
 * full-screen lightbox (arrows / swipe / Esc).
 */
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

  // Masonry: each photo, in order, goes to the currently shortest column (heights from the photos' own ratios).
  const columns = (n: number) => {
    const cols = Array.from({ length: n }, () => ({ height: 0, items: [] as number[] }));
    photos.forEach((p, i) => {
      const shortest = cols.reduce((a, b) => (b.height < a.height ? b : a));
      shortest.items.push(i);
      shortest.height += p.height / p.width;
    });
    return cols.map((c) => c.items);
  };

  const renderColumn = (items: number[], c: number) => (
    <ul key={c} className="flex min-w-0 flex-1 flex-col gap-[10px]">
      {items.map((i) => {
        const p = photos[i];
        return (
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
                unoptimized
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Two layouts so each column count gets its own balance; the hidden one is display:none, so its lazy images never load. */}
      <div className="flex gap-[10px] md:hidden">{columns(2).map(renderColumn)}</div>
      <div className="hidden gap-[10px] md:flex">{columns(3).map(renderColumn)}</div>

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
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill unoptimized className="object-contain" priority />
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
