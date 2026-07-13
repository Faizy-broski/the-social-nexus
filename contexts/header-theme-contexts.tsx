"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type RailTheme = "dark" | "light";

const HeaderThemeContext = createContext<RailTheme>("dark");
export const useHeaderTheme = () => useContext(HeaderThemeContext);

// how far past the fixed rail (in px) to sample — must clear the rail's
// own width so elementFromPoint doesn't just hit the header itself
const SAMPLE_X_OFFSET = 90;

function getLuminanceFromColor(color: string): number | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return null;

  const [, r, g, b, a] = match;
  if (a !== undefined && parseFloat(a) === 0) return null; // fully transparent — keep looking up the tree

  const [rn, gn, bn] = [r, g, b].map(Number);
  return (0.299 * rn + 0.587 * gn + 0.114 * bn) / 255;
}

/**
 * Walks up from the sampled element looking for either:
 *  1. an explicit data-header-theme override (escape hatch for
 *     image/video-background sections, which have no readable
 *     background-color), or
 *  2. the first ancestor with a non-transparent background-color,
 *     used to compute luminance automatically.
 */
function detectThemeAt(el: Element | null): RailTheme {
  let node: Element | null = el;

  while (node) {
    const override = node.getAttribute("data-header-theme");
    if (override === "dark" || override === "light") return override;

    const bg = getComputedStyle(node).backgroundColor;
    const luminance = getLuminanceFromColor(bg);
    if (luminance !== null) return luminance > 0.6 ? "light" : "dark";

    node = node.parentElement;
  }

  return "dark";
}

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<RailTheme>("dark");
  const frame = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function detect() {
      const x = SAMPLE_X_OFFSET;
      const y = window.innerHeight / 2;
      const el = document.elementFromPoint(x, y);
      setTheme(detectThemeAt(el));
    }

    function onScrollOrResize() {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(detect);
    }

    detect();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // Re-detect on route change too — if the user navigates while already
    // scrolled to the top, no scroll event fires and the header theme
    // would otherwise go stale until they manually scroll.
  }, [pathname]);

  return (
    <HeaderThemeContext.Provider value={theme}>{children}</HeaderThemeContext.Provider>
  );
}