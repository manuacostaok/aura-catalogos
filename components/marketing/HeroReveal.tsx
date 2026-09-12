"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Entrance stagger for above-the-fold content only. Renders fully visible
 * by default (no inline hidden state in the JSX) — JS hides-then-reveals
 * synchronously pre-paint via useLayoutEffect, so a slow/failed script
 * never leaves the headline invisible, unlike a scroll-triggered reveal.
 */
export function HeroReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = root.querySelectorAll<HTMLElement>(".hero-reveal-item");
    if (items.length === 0) return;

    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(14px)";
    });

    let cancelled = false;
    import("animejs").then(({ animate, stagger }) => {
      if (cancelled) return;
      animate(items, {
        opacity: [0, 1],
        translateY: [14, 0],
        delay: stagger(110, { start: 80 }),
        duration: 700,
        ease: "outQuad",
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
