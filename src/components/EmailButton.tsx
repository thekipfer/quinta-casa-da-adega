"use client";

import { useEffect, useState, type ReactNode } from "react";

type EmailButtonProps = {
  email: string;
  className?: string;
  children: ReactNode;
  /** Shown under the button once the address is copied, e.g. "Email copiado". */
  copiedLabel: string;
};

/** Copies `text`; uses the Clipboard API when available, else the legacy execCommand route. Resolves to success. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy route.
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

/**
 * A mailto: link that also copies the address to the clipboard. mailto: only works when the visitor has a mail
 * app set up (it does nothing for webmail-only users), so the copied address plus the visible confirmation make
 * sure the click always gives them the email.
 */
export function EmailButton({ email, className, children, copiedLabel }: EmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 5000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <>
      <a
        href={`mailto:${email}`}
        className={className}
        onClick={() => {
          // Don't prevent the default: the mail app still opens when there is one.
          copyText(email).then(setCopied);
        }}
      >
        {children}
      </a>
      <p aria-live="polite" className="mt-3 min-h-[24px] font-ui text-[15px] text-brand">
        {copied && (
          <>
            {copiedLabel}: <span className="font-medium">{email}</span>
          </>
        )}
      </p>
    </>
  );
}
