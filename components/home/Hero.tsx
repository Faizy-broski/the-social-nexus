"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoCarousel from "./LogoCarousel";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/hero-video.mp4"
        poster="/images/hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Static fallback for reduced-motion users */}
      <div className="absolute inset-0 hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-center motion-reduce:block" />

      {/* Gradient overlay — teal → navy, driven by globals.css hero tokens */}
      <div className="hero-teal-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-20 sm:gap-12 sm:px-10 sm:py-24 md:px-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-16 lg:py-8 xl:justify-between xl:gap-12 xl:pl-25 xl:pr-6">
        {/* Left copy */}
        <div className="w-full max-w-md pt-16 text-center sm:max-w-lg sm:pt-20 lg:max-w-xl lg:py-8 lg:pt-0 lg:text-left xl:max-w-175">
          <div className="mb-4 inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-[10px] font-medium tracking-[0.18em] backdrop-blur-sm sm:mb-5 sm:px-5 sm:text-[12px] sm:tracking-[0.26em]">
            The Social Nexus
          </div>

          <h1 className="font-extrabold uppercase leading-[1.08] tracking-wider sm:leading-[1.02]">
            <span className="block text-[26px] xs:text-[30px] sm:text-[40px] lg:text-[46px] xl:text-[66px]">
              Transforming
            </span>

            <span className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 lg:justify-start">
              <span className="text-[26px] xs:text-[30px] sm:text-[40px] lg:text-[46px] xl:text-[66px]">
                Business
              </span>
              <span className="text-left text-[12px] font-semibold leading-[1.15] sm:text-[17px] lg:text-[19px]">
                Growth With
                <br />
                Technology,
              </span>
            </span>

            <span className="block text-[26px] xs:text-[30px] sm:text-[40px] lg:text-[46px] xl:text-[66px] gradient-text">
              Digital Impact
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-90 text-[12px] font-medium leading-[1.6] text-white/90 sm:mt-6 sm:max-w-110 sm:text-[14px] lg:mx-0 lg:max-w-120 lg:text-[15px] text-justify">
            We combine software engineering, artificial intelligence, design,
            and performance marketing to create powerful digital ecosystems
            that drive measurable business growth worldwide.
          </p>
        </div>

        {/* Right form — enlarged glass panel, all colors from globals.css */}
        <div className="relative w-full max-w-md shrink-0 sm:max-w-xl lg:max-w-lg xl:max-w-md">
          <div className="glass-panel rounded-3xl p-6 shadow-lg sm:p-8 lg:p-9">
            <div className="mb-5 sm:mb-6">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Let&apos;s Build Something Great
              </h2>
              <p className="mt-1 text-[12px] font-medium text-white/80 sm:text-[13px]">
                Tell us about your project and we&apos;ll get back to you.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-3">
              <FormField label="Full Name" placeholder="Full Name" />
              <FormField label="Phone Number" placeholder="07XXX XXXXXX" />
              <FormField label="Email" placeholder="socialnexus@gmail.com" />

              <div>
                <label className="mb-2 block text-[13px] font-bold sm:text-[14px]">
                  Additional Information
                </label>
                <textarea
                  placeholder="Tell us about your needs..."
                  rows={5}
                  className="glass-input w-full resize-none rounded-2xl px-4 py-3.5 text-[13px] font-medium text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-primary sm:px-5 sm:py-4 sm:text-[14px]"
                />
              </div>

              <Button
                type="submit"
                className="brand-cta h-12 w-full rounded-full text-[14px] font-bold sm:h-13 sm:text-[15px]"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <LogoCarousel />
    </section>
  );
}

function FormField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-bold sm:text-[14px]">{label}</label>
      <input
        placeholder={placeholder}
        className="glass-input h-12 w-full rounded-full px-5 text-[13px] font-medium text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-primary sm:h-13 sm:px-6 sm:text-[14px]"
      />
    </div>
  );
}