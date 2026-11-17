"use client";

import { useState, type ReactNode } from "react";
import { ProposalQuiz } from "@/components/ProposalQuiz";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProposalButtonProps = {
  locale: Locale;
  children: ReactNode;
  className?: string;
  /** "filled" (brand) on light backgrounds, "cream" on brand-coloured backgrounds, "textual" underlined link. */
  variant?: "filled" | "cream" | "textual";
};

/** CTA that opens the proposal quiz modal. */
export function ProposalButton({ locale, children, className, variant = "filled" }: ProposalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={cn(
          "cursor-pointer",
          variant === "textual"
            ? "qcda-textual text-ink uppercase transition-colors hover:text-brand"
            : cn("qcda-btn", variant === "cream" ? "qcda-btn--cream" : "qcda-btn--filled"),
          className,
        )}
      >
        {variant === "textual" ? <span>{children}</span> : children}
      </button>
      <ProposalQuiz locale={locale} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
