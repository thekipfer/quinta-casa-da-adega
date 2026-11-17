"use client";

import type { ElementType, ReactNode } from "react";
import { useAppear } from "@/hooks/use-appear";
import { cn } from "@/lib/utils";

/** Stagger steps of 120ms, as literal classes so Tailwind generates them (consumed by .qcda-orc-reveal). */
const delays = [
  "[--orc-d:0ms]",
  "[--orc-d:120ms]",
  "[--orc-d:240ms]",
  "[--orc-d:360ms]",
  "[--orc-d:480ms]",
  "[--orc-d:600ms]",
  "[--orc-d:720ms]",
] as const;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** 0–6, each step waits 120ms longer. */
  delay?: number;
  /** "rise" (default): fade + lift + unblur. "fade": opacity only. "left"/"right": slide in sideways. */
  variant?: "rise" | "fade" | "left" | "right";
  className?: string;
  id?: string;
};

/** Plays its entrance once, when scrolled into view (see the "Orçamento page" block in globals.css). */
export function Reveal({ children, as: Tag = "div", delay = 0, variant = "rise", className, id }: RevealProps) {
  const [observe, appeared] = useAppear<HTMLElement>("0px 0px -12% 0px");

  return (
    <Tag
      ref={observe}
      id={id}
      className={cn(
        "qcda-orc-reveal",
        variant !== "rise" && `qcda-orc-reveal--${variant}`,
        delays[Math.max(0, Math.min(delays.length - 1, delay))],
        appeared && "is-appeared",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
