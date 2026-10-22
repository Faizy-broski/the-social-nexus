import type { Metadata } from "next";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";
import { PricingView } from "@/components/pricing/PricingView";
import { getPublishedPricing } from "@/lib/data/pricing";

// Admin writes call revalidatePath("/pricing"); this is only the fallback.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Pricing & Packages | The Social Nexus",
  description:
    "Clear, upfront packages for websites, SEO and digital marketing from The Social Nexus. Compare what's included and pick the plan that fits your business.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing & Packages | The Social Nexus",
    description:
      "Clear, upfront packages for websites, SEO and digital marketing. Compare what's included and pick the plan that fits your business.",
    url: "https://thesocialnexus.co.uk/pricing",
  },
};

const HIGHLIGHTS = ["No hidden fees", "Built for Google from day one", "Real people for support"];

export default async function PricingPage() {
  const { plans, comparisonRows } = await getPublishedPricing();

  return (
    <main className="relative overflow-hidden bg-brand-navy text-white">
      {/* ambient network glow, same treatment as Contact/FAQ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="container-section relative py-14 sm:py-20 lg:py-24">
        {/* Hero */}
        <Reveal variant="up" richer className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-teal sm:text-sm">
            Pricing
          </span>
          <h1 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
            Simple packages, <span className="gradient-text-animated">serious results</span>
          </h1>
          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Pick the package that fits where your business is today. Every plan is built by our in-house team
            and can be tailored as you grow.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/75">
                <Check className="h-4 w-4 text-brand-teal" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {plans.length > 0 ? (
          <div className="mx-auto max-w-6xl">
            <PricingView plans={plans} comparisonRows={comparisonRows} />
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-brand-navy-light/60 p-8 text-center">
            <h2 className="text-xl font-semibold">Our packages are being updated</h2>
            <p className="mt-2 text-sm text-white/60">
              Get in touch and we&apos;ll send you a tailored quote within one business day.
            </p>
            <Link
              href="/contact-us"
              className="brand-cta press-scale mt-6 inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold"
            >
              Request a quote
            </Link>
          </div>
        )}

        {/* Need help choosing */}
        <Reveal
          variant="up"
          className="mx-auto mt-20 flex max-w-4xl flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/4 p-6 text-center sm:mt-24 sm:flex-row sm:p-8 sm:text-left"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
            <MessageCircle className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Need help choosing a package?</h2>
            <p className="mt-1 text-sm text-white/60">
              Tell us about your project and we&apos;ll recommend the right fit, or build a custom package around
              your goals.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="press-scale inline-flex h-11 shrink-0 items-center rounded-full border border-white/20 px-6 text-sm font-semibold transition-colors hover:border-brand-teal hover:text-brand-teal-light"
          >
            Talk to us
          </Link>
        </Reveal>

        {/* Closing CTA */}
        {/* <Reveal variant="up" className="mt-20 flex flex-col items-center text-center sm:mt-28">
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Still not sure? <span className="gradient-text">Let&apos;s talk it through.</span>
          </h2>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-brand-teal/15"
            magneticStrength={0.2}
            className="mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-white/25 text-center text-sm font-medium text-white transition-colors hover:border-brand-teal hover:text-brand-teal-light"
          >
            Contact Us
          </MagneticButton>
        </Reveal> */}
      </div>
    </main>
  );
}
