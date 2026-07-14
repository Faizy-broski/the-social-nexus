import type { Metadata } from "next";

import { LogoBriefForm } from "@/components/logo-brief/logo-brief-form";
import NetworkLines from "@/components/contact/network-lines";

export const metadata: Metadata = {
  title: "Logo Brief | The Social Nexus",
  description:
    "Share your logo requirements with The Social Nexus so our design team can start crafting the right identity for your brand.",
};

export default function LogoBriefPage() {
  return (
    <main className="relative overflow-hidden bg-brand-navy">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="container-section relative py-14 sm:py-20 lg:py-28">
        <div className="scroll-reveal-row mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-teal sm:text-sm">
            Let&apos;s get started
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            <span className="gradient-text-animated">Logo Brief</span>
          </h1>
          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Tell us about your brand and what you're picturing, and our design
            team will start bringing your logo to life. Fields marked with *
            are required.
          </p>
        </div>

        <div className="scroll-reveal-row mx-auto max-w-3xl rounded-2xl bg-brand-navy-light/60 p-6 ring-1 ring-white/10 sm:p-8 lg:p-10">
          <LogoBriefForm />
        </div>
      </div>
    </main>
  );
}
