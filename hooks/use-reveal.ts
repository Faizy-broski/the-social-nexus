"use client";

import { useEffect, useRef } from "react";

/**
 * Pairs with the .reveal / .reveal-scale / .reveal-left / .reveal-right
 * utility classes in globals.css. Attach the returned ref to any element
 * carrying one of those classes and it will pick up `.is-visible` the
 * first time it scrolls into view.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal">...</div>
 *
 * For a staggered group, add `stagger-children` to the parent instead —
 * no hook needed, it animates on mount via CSS nth-child delays.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion users immediately, no observer needed
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}