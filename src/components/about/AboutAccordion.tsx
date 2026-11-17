"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type AboutAccordionProps = { items: { title: string; text: string }[] };

/** "Porque nós?" accordion: brand square with +/−, first item open, one open at a time. */
export function AboutAccordion({ items }: AboutAccordionProps) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.title} className="border-b border-hairline/80">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-[26px] py-[15px] pr-2.5 pl-[5px] text-left"
              >
                <span
                  aria-hidden="true"
                  className="relative flex size-[35px] shrink-0 items-center justify-center bg-brand transition-colors duration-300"
                >
                  <span className="absolute h-px w-4 bg-white" />
                  <span
                    className={cn("absolute h-4 w-px bg-white transition-transform duration-300", isOpen && "scale-y-0")}
                  />
                </span>
                <span className="font-display text-[22px] leading-[1.1] font-medium text-brand uppercase sm:text-[25px]">
                  {item.title}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-[30px] pl-[66px] font-serif text-[18px] leading-[28px] text-body">{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
