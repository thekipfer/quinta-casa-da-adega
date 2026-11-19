"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type FaqAccordionProps = { items: { question: string; answer: string }[] };

/**
 * Light FAQ list — deliberately quieter than the "Porque nós?" accordion: sentence-case questions,
 * hairline separators and a thin round +/− instead of the filled brand square. All closed at first;
 * answers stay in the DOM (FAQPage JSON-LD mirrors them).
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="border-b border-hairline/70">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question} className="border-t border-hairline/70">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left desk:py-7"
              >
                <span className="font-display text-[23px] leading-[1.25] font-normal text-brand transition-colors group-hover:text-brand-deep desk:text-[27px]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    isOpen ? "border-brand bg-brand text-white" : "border-sand text-brand group-hover:border-brand",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className={cn("absolute h-3.5 w-px bg-current transition-transform duration-300", isOpen && "scale-y-0")}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[680px] pb-7 font-serif text-[18px] leading-[1.65] text-body">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
