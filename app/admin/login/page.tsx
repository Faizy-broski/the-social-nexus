import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin Login — The Social Nexus" };

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-navy px-4 py-12 text-white">
      {/* Same teal -> navy hero gradient the public site opens with, so the
          admin login still reads as "The Social Nexus" and not a generic
          bolted-on tool. */}
      <div className="hero-teal-overlay absolute inset-0" />

      <Link
        href="/"
        className="press-scale group absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Back to home
      </Link>

      {/* Ambient glow orbs — matching Footer's "Nexus" network motif */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-teal/25 blur-[110px]" />
        <div
          className="animate-float absolute -right-16 top-0 h-72 w-72 rounded-full bg-brand-gold/15 blur-[100px]"
          style={{ animationDelay: "1s", animationDuration: "5.5s" }}
        />
      </div>

      {/* Faint grid texture for depth, echoing the "digital ecosystem" brand language */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="animate-scale-in relative z-10 w-full max-w-sm">
        <div className="glass-panel rounded-2xl p-8 shadow-2xl backdrop-blur-2xl sm:p-9">
          <div className="mb-7 flex flex-col items-center text-center">
            <Image
              src="/TSN-White-Logo.webp"
              alt="The Social Nexus"
              width={150}
              height={50}
              className="h-9 w-auto"
              priority
            />

            <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <ShieldCheck className="h-5 w-5 text-brand-teal-light" />
            </div>

            <h1 className="mt-4 text-xl font-bold tracking-tight">Admin Access</h1>
            <p className="mt-1.5 text-[13px] font-medium text-white/60">
              Sign in to manage portfolio, services &amp; FAQs.
            </p>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-[11px] font-medium tracking-wide text-white/35">
          The Social Nexus &middot; Internal use only
        </p>
      </div>
    </div>
  );
}
