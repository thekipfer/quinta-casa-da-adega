"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors the theme's jQuery "appear" plugin: flips to true once the element
 * scrolls into view, and never flips back. Returns a callback ref.
 */
export function useAppear<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const [node, setNode] = useState<T | null>(null);
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    if (!node || appeared) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAppeared(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, appeared, rootMargin]);

  return [setNode, appeared] as const;
}

/**
 * True while the user is scrolling back up past `offset` — drives the "reveal on scroll up" sticky header.
 * Small movements under `tolerance` px are ignored so the header doesn't flicker.
 */
export function useRevealOnScrollUp(offset: number, tolerance = 8) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= offset) {
        setRevealed(false);
        last = y;
        return;
      }
      const delta = y - last;
      if (Math.abs(delta) < tolerance) return;
      setRevealed(delta < 0);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, tolerance]);
  return revealed;
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}
