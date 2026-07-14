import Image from "next/image";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NetworkLines from "@/components/contact/network-lines";
import NotFoundActions from "@/components/home/NotFoundActions";

/**
 * global-not-found.tsx
 * ------------------------------------------------------------------
 * Handles every unmatched URL app-wide. Unlike a route-segment
 * not-found.tsx, this bypasses the root layout entirely (no Header,
 * LetsMake, Footer, WhatsappButton) instead of rendering wrapped
 * inside it — so it needs its own <html>/<body> and its own font +
 * globals.css import, same as layout.tsx normally provides.
 *
 * Everything below animates on MOUNT (animate-fade-in-*, not
 * scroll-reveal-row) since the whole page is already in view the
 * instant it renders — there's nothing to scroll to.
 *
 * This stays a Server Component (it exports `metadata`, which
 * requires that). The two CTA buttons need an onClick that forces a
 * hard navigation, and functions can't be passed from a Server
 * Component into a Client Component as props — so they live in
 * NotFoundActions, a small "use client" component, instead.
 */

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "404 – Page Not Found | Social Nexus",
  description: "The page you're looking for doesn't exist, moved, or never made it past the drawing board.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} data-scroll-behavior="smooth">
      <body>
        <main className="relative flex h-screen items-center justify-center overflow-hidden bg-brand-navy px-6 py-8 text-white">
          {/* ambient network glow — same "Nexus" motif as every other dark section */}
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
            <div
              className="animate-float absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"
              style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
            />
            <NetworkLines />
          </div>

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
            {/* small mark above the big 404, quiet nod to the brand rather
                than repeating the full loading-screen treatment */}
            <div className="animate-fade-in-down relative h-12 w-12 opacity-90 sm:h-14 sm:w-14">
              <Image src="/favicon.ico" alt="The Social Nexus" fill className="object-contain" />
            </div>

            <h1 className="animate-fade-in-up delay-150 mt-6 text-[90px] font-extrabold leading-none tracking-tight sm:text-[130px] lg:text-[160px]">
              <span className="gradient-text-animated">404</span>
            </h1>

            <h2 className="animate-fade-in-up delay-300 mt-2 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
              Lost in the Nexus
            </h2>

            <p className="animate-fade-in-up delay-500 mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              The page you&rsquo;re looking for doesn&rsquo;t exist, moved, or
              never made it past the drawing board. Let&rsquo;s get you back on
              track.
            </p>

            <NotFoundActions />
          </div>
        </main>
      </body>
    </html>
  );
}