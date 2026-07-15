"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import LoadingScreen from "@/components/shared/LoadingScreen";

// Every route's static content renders fast enough that Suspense-based
// loading.tsx never gets a chance to show, and prefetching can make
// navigations instant before the loader would even mount. Holding
// LoadingScreen up for a fixed beat here — driven by Template's own
// mount lifecycle, not data fetching — is what guarantees it's always
// seen, on every client-side navigation.
const LOADER_DURATION_MS = 550;

// Module state, not a cookie/localStorage: it only needs to survive for
// the lifetime of this JS session, and must start `false` identically on
// the server and on the client's first hydration pass (both evaluate this
// module fresh) so the very first paint never shows the loader — that
// first paint is what Lighthouse/Core Web Vitals measure, and holding it
// behind an opaque overlay for half a second was pure self-inflicted LCP
// cost. Subsequent client-side navigations remount Template with this
// already flipped to `true`, so the branded loader still plays for those.
let hasNavigatedOnce = false;

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
  const [showLoader, setShowLoader] = useState(() => hasNavigatedOnce);
  // Captured once: whether THIS mount is the very first (no loader, so
  // there's nothing to cross-fade from — content should just be there,
  // not animate in from opacity:0 and gate LCP on a Framer Motion tick).
  const isFirstLoad = useRef(!hasNavigatedOnce).current;

  useEffect(() => {
    hasNavigatedOnce = true;
    if (!showLoader) return;
    const timer = setTimeout(() => setShowLoader(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        initial={reduceMotion || isFirstLoad ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: showLoader ? 0 : 1, y: showLoader ? 12 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: showLoader ? 0 : 0.1 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
