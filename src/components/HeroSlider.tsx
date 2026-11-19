"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SLIDE_DELAY = 6000;

/**
 * Slider Revolution "wedding-planner" module: full-width image slider that
 * cross-fades between three backgrounds. Grid height 400px (desktop),
 * 345px (tablet), 354px (mobile).
 */
export function HeroSlider({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_DELAY);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-label={getDictionary(locale).hero.gallery}
      className="relative h-[354px] w-full overflow-hidden md:h-[345px] desk:h-[400px]"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
            i === active ? "z-[1] opacity-100" : "z-0 opacity-0",
          )}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.src}
            alt={getDictionary(locale).hero.slideAlts[i] ?? ""}
            fill
            loading="eager"
            // The first slide is the LCP element: preload it in <head>; later slides only fade in after it.
            preload={i === 0}
            fetchPriority={i === 0 ? "high" : "low"}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </section>
  );
}
