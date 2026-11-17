"use client";

import { Fragment, type CSSProperties, type ElementType } from "react";
import { useAppear } from "@/hooks/use-appear";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

/** Char-by-char rise-in reveal, equivalent to the theme's Splitting.js "qodef--has-appear". */
export function SplitText({ text, as: Tag = "h2", className }: SplitTextProps) {
  const [observe, appeared] = useAppear<HTMLElement>();
  const words = text.split(" ");
  const offsets = words.reduce<number[]>((acc, _w, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + [...words[i - 1]].length);
    return acc;
  }, []);

  return (
    <Tag ref={observe} className={cn("qcda-split", appeared && "is-appeared", className)} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="qcda-word" aria-hidden="true">
            {[...word].map((ch, ci) => (
              <span
                key={ci}
                className="qcda-char"
                style={{ "--char-index": offsets[wi] + ci } as CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
