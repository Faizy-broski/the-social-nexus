"use client";

import { Home, ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * NotFoundActions
 * ------------------------------------------------------------------
 * Split out from global-not-found.tsx (a Server Component, since it
 * exports `metadata`) because these buttons need an onClick handler
 * that forces a hard navigation — and functions can't be passed as
 * props from a Server Component into a Client Component.
 *
 * Why hard navigation: global-not-found.tsx renders its own
 * <html>/<body>, completely outside the app's normal root layout.
 * Next's client-side router can fail to soft-navigate from that
 * separate document tree back into the normal layout tree, which is
 * why Link alone wasn't redirecting. window.location.href forces a
 * real browser navigation/full reload, which always works.
 */
export default function NotFoundActions() {
  return (
    <div className="animate-fade-in-up delay-500 mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:gap-5">
      <MagneticButton
        href="/"
        onClick={() => {
          window.location.href = "/";
        }}
        fillClassName="bg-brand-gold"
        className="brand-cta h-12 rounded-full px-7 text-sm font-semibold sm:text-base"
      >
        <Home className="h-4 w-4" /> Back to Home
      </MagneticButton>

      <MagneticButton
        href="/contact-us"
        onClick={() => {
          window.location.href = "/contact-us";
        }}
        fillClassName="bg-brand-teal/20"
        className="press-scale group h-12 rounded-full border border-white/25 px-7 text-sm font-semibold text-white hover:border-brand-teal hover:text-brand-teal-light sm:text-base"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Contact Us
      </MagneticButton>
    </div>
  );
}