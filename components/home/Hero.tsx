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

      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-80 bg-linear-to-r from-[#d9b85c]/75 via-[#79b990]/70 to-[#20b8c7]/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-20 sm:gap-10 sm:px-10 sm:py-24 md:px-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-16 lg:py-8 xl:justify-between xl:gap-10 xl:pl-25 xl:pr-6">
        {/* Left copy */}
        <div className="w-full max-w-md pt-16 text-center sm:max-w-lg sm:pt-20 lg:max-w-2xl lg:py-8 lg:pt-0 lg:text-left xl:max-w-175">
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

            <span className="block text-[26px] xs:text-[30px] sm:text-[40px] lg:text-[46px] xl:text-[66px]">
              Digital Impact
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-90 text-[12px] font-medium leading-[1.6] text-white/90 sm:mt-6 sm:max-w-110 sm:text-[14px] lg:mx-0 lg:max-w-120 lg:text-[15px]">
            We combine software engineering, artificial intelligence, design,
            and performance marketing to create powerful digital ecosystems
            that drive measurable business growth worldwide.
          </p>
        </div>

        {/* Right form */}
        <div className="relative w-full max-w-90 shrink-0 sm:max-w-105 lg:max-w-100 xl:max-w-90">
          <div className="rounded-2xl border border-white/35 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-6">
            <form className="space-y-2">
              <FormField label="Full Name" placeholder="Full Name" />
              <FormField label="Phone Number" placeholder="07XXX XXXXXX" />
              <FormField label="Email" placeholder="socialnexus@gmail.com" />

              <div>
                <label className="mb-1.5 block text-[12px] font-bold sm:text-[13px]">
                  Additional Information
                </label>
                <textarea
                  placeholder="Tell us about your needs..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-white/20 bg-white/30 px-3.5 py-2.5 text-[12px] font-medium text-white placeholder:text-white/70 outline-none backdrop-blur-md focus:ring-2 focus:ring-white/40 sm:px-4 sm:py-3 sm:text-[13px]"
                />
              </div>

              <Button
                type="submit"
                className="h-10 w-full rounded-full bg-[#36b9c5] text-[13px] font-bold text-white hover:bg-[#2caab5] sm:h-11.5 sm:text-[14px]"
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
      <label className="mb-1.5 block text-[12px] font-bold sm:text-[13px]">{label}</label>
      <input
        placeholder={placeholder}
        className="h-9.5 w-full rounded-full border border-white/20 bg-white/30 px-4 text-[12px] font-medium text-white placeholder:text-white/70 outline-none backdrop-blur-md focus:ring-2 focus:ring-white/40 sm:h-10.5 sm:px-5 sm:text-[13px]"
      />
    </div>
  );
}