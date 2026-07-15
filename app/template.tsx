"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import LoadingScreen from "@/components/shared/LoadingScreen";

// Every route's static content renders fast enough that Suspense-based
// loading.tsx never gets a chance to show, and prefetching can make
// navigations instant before the loader would even mount. Holding
// LoadingScreen up for a fixed beat here — driven by Template's own
// mount lifecycle, not data fetching — is what guarantees it's always
// seen, on every navigation and every reload.
const LOADER_DURATION_MS = 550;

/**
 * Wraps {children} only (Header/Footer/HeaderThemeProvider/LetsTalkBadge/
 * LetsMake/WhatsappButton live in layout.tsx as siblings and persist across
 * navigation untouched). template.tsx remounts on every route change, so
 * the loader-to-content sequence below runs fresh every time — no need to
 * coordinate an exit animation with the previous Template instance, which
 * is already gone by the time this one mounts.
 *
 * `LazyMotion` + `domAnimation` (not the full motion.* import, not domMax)
 * keeps Motion's bundle to the minimal feature set every Reveal/TiltCard
 * usage sitewide needs. `strict` makes any file that imports `motion.div`
 * directly (instead of `m.div`) throw, so that stays enforced by the
 * tooling rather than just convention.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {showLoader && (
          <m.div key="route-loader" exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <LoadingScreen />
          </m.div>
        )}
      </AnimatePresence>
      <m.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: showLoader ? 0 : 1, y: showLoader ? 12 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: showLoader ? 0 : 0.1 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
