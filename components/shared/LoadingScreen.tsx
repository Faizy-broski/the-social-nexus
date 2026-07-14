"use client";

import Image from "next/image";
import NetworkLines from "@/components/contact/network-lines";

/**
 * LoadingScreen
 * ------------------------------------------------------------------
 * Shared branded loading visual. Used two ways:
 *   1. As the Suspense fallback for every route's `loading.tsx`
 *      (streams in during a genuinely slow server render).
 *   2. As a deliberate, timed overlay mounted by `app/template.tsx`
 *      on every client-side navigation, so the loading moment always
 *      plays even when the destination page has no async work to
 *      suspend on.
 *
 * Uses /favicon.ico directly (your actual mark) rather than a
 * hand-traced approximation, so the two-tone teal/gold shape and
 * proportions are pixel-accurate to the real logo.
 *
 * Layers, back to front:
 *   1. bg-brand-navy + ambient glow + NetworkLines (same "Nexus"
 *      motif used across every dark section on the site)
 *   2. a slowly rotating conic-gradient ring behind the mark —
 *      reads as a loading spinner without being a literal spinner
 *   3. the mark itself: spring-in on mount, then a soft breathing
 *      pulse + glow while the route is loading
 *   4. a diagonal shine sweep across the mark, looping
 *   5. wordmark + animated loading dots
 *
 * prefers-reduced-motion: reduce -> everything holds at its resting
 * frame, no spin/pulse/sweep — the mark and wordmark stay visible,
 * just static.
 */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-brand-navy">
      {/* ambient network glow — same treatment as every other dark section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 bottom-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="relative flex flex-col items-center">
        {/* rotating conic glow ring behind the mark — the "spinner" cue */}
        <div className="tsn-load-ring pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-xl sm:h-48 sm:w-48" />

        {/* the mark itself */}
        <div className="tsn-load-mark-in relative h-20 w-20 sm:h-24 sm:w-24">
          <div className="tsn-load-breathe relative h-full w-full">
            <Image
              src="/favicon.ico"
              alt="The Social Nexus"
              fill
              priority
              sizes="96px"
              className="object-contain drop-shadow-[0_0_18px_rgba(59,179,194,0.45)]"
            />
            {/* diagonal shine sweep, masked to the mark's own alpha shape */}
            <div
              className="tsn-load-shine pointer-events-none absolute inset-0"
              style={{
                maskImage: "url(/favicon.ico)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url(/favicon.ico)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
          </div>
        </div>

        {/* wordmark + loading dots */}
        <div className="tsn-load-fade-up mt-8 flex flex-col items-center gap-3 sm:mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
            The Social Nexus
          </p>
          <div className="flex items-center gap-1.5">
            <span className="tsn-load-dot h-1.5 w-1.5 rounded-full bg-brand-teal" />
            <span
              className="tsn-load-dot h-1.5 w-1.5 rounded-full bg-brand-teal-light"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="tsn-load-dot h-1.5 w-1.5 rounded-full bg-brand-gold"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tsn-load-mark-in {
          0% { opacity: 0; transform: scale(0.55) rotate(-18deg); }
          60% { opacity: 1; transform: scale(1.08) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .tsn-load-mark-in {
          animation: tsn-load-mark-in 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes tsn-load-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .tsn-load-breathe {
          animation: tsn-load-breathe 2.4s ease-in-out 0.85s infinite;
        }

        @keyframes tsn-load-ring-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .tsn-load-ring {
          background: conic-gradient(
            from 0deg,
            var(--brand-teal),
            var(--brand-gold),
            var(--brand-teal-light),
            var(--brand-teal)
          );
          animation: tsn-load-ring-spin 3.2s linear infinite;
        }

        @keyframes tsn-load-shine-sweep {
          0% { transform: translateX(-120%) translateY(-120%) rotate(25deg); }
          55%, 100% { transform: translateX(120%) translateY(120%) rotate(25deg); }
        }
        .tsn-load-shine {
          background: linear-gradient(
            115deg,
            transparent 40%,
            rgb(255 255 255 / 0.85) 50%,
            transparent 60%
          );
          background-size: 60% 300%;
          animation: tsn-load-shine-sweep 2.6s ease-in-out 1s infinite;
        }

        @keyframes tsn-load-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tsn-load-fade-up {
          animation: tsn-load-fade-up 0.6s ease-out 0.5s both;
        }

        @keyframes tsn-load-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.15); }
        }
        .tsn-load-dot {
          animation: tsn-load-dot 1.1s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .tsn-load-mark-in,
          .tsn-load-breathe,
          .tsn-load-ring,
          .tsn-load-shine,
          .tsn-load-fade-up,
          .tsn-load-dot {
            animation: none;
          }
          .tsn-load-mark-in { opacity: 1; transform: none; }
          .tsn-load-fade-up { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
