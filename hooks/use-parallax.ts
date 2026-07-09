"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks a container's position in the viewport and returns a
 * proportional pixel offset for a translateY parallax effect — the
 * image scrolls slower than the page, creating depth.
 *
 * Deliberately NOT background-attachment: fixed:
 *  - unsupported on iOS Safari
 *  - breaks inside any ancestor with a transform/backdrop-filter
 *    (e.g. our glass-panel sections), since that creates a new
 *    containing block and "fixed" positioning stops being relative
 *    to the viewport
 */
export function useParallax(speed = 0.25, clamp = 100) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let frame: number | null = null;

    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = Math.max(-clamp, Math.min(clamp, rect.top * speed));
      setOffset(next);
    }

    function onScroll() {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        measure();
        frame = null;
      });
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [speed, clamp]);

  return { containerRef, offset };
}