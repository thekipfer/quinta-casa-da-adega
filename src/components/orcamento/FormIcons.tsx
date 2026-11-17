import type { SVGProps } from "react";
import type { GuestRange } from "@/lib/i18n/orcamento";

type IconProps = SVGProps<SVGSVGElement>;

/** One guest silhouette (head + shoulders) drawn at x, scaled by s. */
function Figure({ x, s = 1, y = 0 }: { x: number; s?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="7" r="3.4" />
      <path d="M-6 21v-1.6a6 6 0 0 1 12 0V21" />
    </g>
  );
}

/** Guest-count icons: more silhouettes as the range grows (front row slightly larger, back row smaller). */
export function GuestIcon({ range, ...props }: IconProps & { range: GuestRange }) {
  return (
    <svg viewBox="0 0 48 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" {...props}>
      {range === "0-60" && (
        <>
          <Figure x={19} />
          <Figure x={29} />
          <path d="M24 5.2c-.9-1-2.6-.5-2.6.9 0 1.2 2.6 2.7 2.6 2.7s2.6-1.5 2.6-2.7c0-1.4-1.7-1.9-2.6-.9Z" fill="currentColor" stroke="none" />
        </>
      )}
      {range === "60-90" && (
        <>
          <Figure x={14} s={0.85} y={2.4} />
          <Figure x={34} s={0.85} y={2.4} />
          <Figure x={24} />
        </>
      )}
      {range === "90-120" && (
        <>
          <Figure x={9} s={0.8} y={3} />
          <Figure x={39} s={0.8} y={3} />
          <Figure x={18} s={0.92} y={1.2} />
          <Figure x={30} s={0.92} y={1.2} />
        </>
      )}
      {range === "120+" && (
        <>
          <Figure x={6} s={0.72} y={4} />
          <Figure x={42} s={0.72} y={4} />
          <Figure x={14} s={0.84} y={2.4} />
          <Figure x={34} s={0.84} y={2.4} />
          <Figure x={24} />
        </>
      )}
    </svg>
  );
}

/** Thin-line envelope matching the guest icons' stroke weight. */
export function EnvelopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.6 6.6 7.3 6a1.8 1.8 0 0 0 2.2 0l7.3-6" />
    </svg>
  );
}

/** Thin-line WhatsApp mark (speech bubble + handset) to sit alongside the envelope. */
export function WhatsAppLineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4.2 19.8 5.3 16A8.5 8.5 0 1 1 8.4 19z" />
      <path d="M9.3 8.4c.2-.5.6-.5.9-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.7-.5c.2-.1.4-.1.6 0l1.6.7c.4.2.5.4.5.6v.5c0 .3 0 .7-.5.9-.7.4-1.6.5-2.4.2a9.6 9.6 0 0 1-5-5c-.3-.8-.2-1.7.3-2.3Z" />
    </svg>
  );
}

/** Small check used on selected option tiles. */
export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m3.5 8.4 2.9 2.8 6.1-6.4" />
    </svg>
  );
}
