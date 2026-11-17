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
