"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type LegalTocProps = {
  label: string;
  items: { id: string; title: string }[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Numbered index of a legal page. Desktop: sticky list that highlights the section in view.
 * Mobile: a collapsible "Índice" panel above the text.
 */
export function LegalToc({ label, items }: LegalTocProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    // A section counts as "current" while it crosses a band near the top of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  const list = () => (
    <ol className="flex flex-col">
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group flex items-baseline gap-3 border-l py-2 pl-4 transition-colors duration-300",
                isActive ? "border-brand text-brand" : "border-hairline text-body hover:border-sand hover:text-ink",
              )}
            >
              <span className={cn("font-display text-[15px] transition-colors [font-variant-numeric:lining-nums]", isActive ? "text-brand" : "text-sand-dark")}>
                {pad(i + 1)}
              </span>
              <span className="font-serif text-[16px] leading-snug">{item.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Mobile / tablet */}
      <details className="group/toc border border-hairline bg-white desk:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-ui text-[12px] font-medium tracking-[0.22em] text-ink uppercase">
          {label}
          <ChevronDown className="size-4 text-sand transition-transform duration-300 group-open/toc:rotate-180" strokeWidth={1.5} />
        </summary>
        <div className="border-t border-hairline px-5 py-3">{list()}</div>
      </details>

      {/* Desktop */}
      <nav aria-label={label} className="hidden desk:block">
        <p className="mb-4 font-ui text-[12px] font-medium tracking-[0.22em] text-sand-dark uppercase">{label}</p>
        {list()}
      </nav>
    </>
  );
}
