"use client";

import Image from "next/image";
import { useAppear } from "@/hooks/use-appear";
import type { PillarIcon } from "@/lib/i18n/about";
import { cn } from "@/lib/utils";

const pillarIcons: Record<PillarIcon, string> = {
  decoracao: "/images/sobre/icon-decoracao.png",
  equipa: "/images/sobre/icon-equipa.png",
  cerimonia: "/images/sobre/icon-cerimonia.png",
};

/**
 * Stagger per column (0 / 180 / 360ms), and inside each column the drawing, title and text follow
 * one another. Full literal class names so Tailwind generates them.
 */
const delays = [
  { icon: "delay-[0ms]", title: "delay-[200ms]", text: "delay-[350ms]" },
  { icon: "delay-[180ms]", title: "delay-[380ms]", text: "delay-[530ms]" },
  { icon: "delay-[360ms]", title: "delay-[560ms]", text: "delay-[710ms]" },
];

const hidden = "motion-safe:opacity-0";
const reduced = "motion-reduce:transition-none";

type PillarsProps = { items: { icon: PillarIcon; title: string; text: string }[] };

/** Decoração · Equipa · Cerimónia: the drawings settle in, then each title and text rise in, column by column. */
export function Pillars({ items }: PillarsProps) {
  const [observe, appeared] = useAppear<HTMLDivElement>("0px 0px -15% 0px");

  return (
    <div ref={observe} className="mx-auto grid w-full max-w-[1148px] gap-14 px-6 md:grid-cols-3 md:gap-10">
      {items.map((p, i) => {
        const d = delays[i % delays.length];
        return (
          <div key={p.title} className="flex flex-col items-center text-center">
            <Image
              src={pillarIcons[p.icon]}
              alt=""
              width={158}
              height={127}
              className={cn(
                "h-[127px] w-[158px] transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                d.icon,
                reduced,
                appeared ? "opacity-100" : cn(hidden, "motion-safe:translate-y-5 motion-safe:scale-[0.88] motion-safe:blur-[3px]"),
              )}
            />
            <h2
              className={cn(
                "mt-10 font-display text-[30px] leading-[0.72] font-medium text-brand uppercase transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                d.title,
                reduced,
                appeared ? "opacity-100" : cn(hidden, "motion-safe:translate-y-4"),
              )}
            >
              {p.title}
            </h2>
            <p
              className={cn(
                "mt-[18px] max-w-[340px] font-serif text-[18px] leading-[28px] text-body transition-[opacity,transform,filter] duration-[900ms] ease-out",
                d.text,
                reduced,
                appeared ? "opacity-100" : cn(hidden, "motion-safe:translate-y-3 motion-safe:blur-[2px]"),
              )}
            >
              {p.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
