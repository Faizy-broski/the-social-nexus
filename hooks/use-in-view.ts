"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Continuous (not one-shot) viewport visibility tracker — unlike
 * useReveal, `inView` flips back to false once the element scrolls back
 * out, so callers can start/stop expensive work (video playback, canvas
 * loops, carousel autoscroll) exactly while it's on screen.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0, rootMargin: "200px 0px" }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
