"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

/**
 * Wraps {children} only (Header/Footer/HeaderThemeProvider/LetsTalkBadge/
 * LetsMake/WhatsappButton live in layout.tsx as siblings and persist across
 * navigation untouched). template.tsx remounts on every route change, so
 * this is entrance-only — no AnimatePresence/exit animation, since by the
 * time a new Template instance mounts the old one (and any AnimatePresence
 * inside it) is already gone; a coordinated cross-fade would need to live
 * in layout.tsx instead, which isn't worth the added latency/complexity here.
 *
 * `LazyMotion` + `domAnimation` (not the full motion.* import, not domMax)
 * keeps Motion's bundle to the minimal feature set every Reveal/TiltCard
 * usage sitewide needs. `strict` makes any file that imports `motion.div`
 * directly (instead of `m.div`) throw, so that stays enforced by the
 * tooling rather than just convention.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
