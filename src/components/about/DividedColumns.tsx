"use client";

import { useAppear } from "@/hooks/use-appear";
import { cn } from "@/lib/utils";

const text = "font-serif text-[22px] leading-[35px] text-body";
/** Shared rise-in for both paragraphs; each adds its own delay. */
const rise =
  "transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/**
 * Two text columns split by a hairline (theme's "divided two column text").
 * Entrance: the hairline draws top-to-bottom, then the left and right paragraphs rise in one after the other.
 */
export function DividedColumns({ left, right }: { left: string; right: string }) {
  const [observe, appeared] = useAppear<HTMLDivElement>("0px 0px -15% 0px");
  const hidden = "translate-y-6 opacity-0 blur-[3px]";
  const shown = "translate-y-0 opacity-100 blur-0";

  return (
    <div ref={observe} className="relative grid py-8 desk:my-[70px] desk:grid-cols-2 desk:py-0">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-1/2 hidden w-px origin-top bg-hairline transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none desk:block",
          appeared ? "scale-y-100" : "scale-y-0",
        )}
      />
      <p className={cn(text, rise, "py-3 delay-[250ms] desk:py-20 desk:pr-[100px] desk:text-right", appeared ? shown : hidden)}>
        {left}
      </p>
      <p className={cn(text, rise, "py-3 delay-[450ms] desk:py-20 desk:pl-[100px]", appeared ? shown : hidden)}>
        {right}
      </p>
    </div>
  );
}
