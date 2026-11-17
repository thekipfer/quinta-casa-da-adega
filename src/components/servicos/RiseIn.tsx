"use client";

import type { ElementType, ReactNode } from "react";
import { useAppear } from "@/hooks/use-appear";
import { cn } from "@/lib/utils";

type RiseInProps = {
  as?: ElementType;
  /** Delay in ms (one of the Tailwind-safe values below). */
  delay?: 0 | 150 | 300;
  className?: string;
  children: ReactNode;
};

const delays = { 0: "delay-0", 150: "delay-150", 300: "delay-300" } as const;

/** Fades and lifts its content in (with a slight unblur) once it scrolls into view. */
export function RiseIn({ as: Tag = "div", delay = 0, className, children }: RiseInProps) {
  const [observe, appeared] = useAppear<HTMLElement>("0px 0px -12% 0px");

  return (
    <Tag
      ref={observe}
      className={cn(
        "transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        delays[delay],
        appeared ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[3px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
