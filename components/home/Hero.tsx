"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoCarousel from "./LogoCarousel";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* top accent bar */}
      {/* <div className="absolute inset-x-0 top-0 z-30 h-1.5 bg-[#0B1020]" /> */}

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
      >
        {/* Optional additional format for broader browser support */}
        {/* <source src="/videos/hero-bg.webm" type="video/webm" /> */}
      </video>

      {/* Static fallback for reduced-motion users (video is hidden via motion-reduce:hidden above) */}
      <div className="absolute inset-0 hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-center motion-reduce:block" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-80 bg-linear-to-r from-[#d9b85c]/75 via-[#79b990]/70 to-[#20b8c7]/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1760px] items-center justify-between gap-10 pl-[80px] pr-6 pt-8 sm:pl-[100px]">
        {/* Left copy */}
        <div className="max-w-[700px] py-8">
          <div className="mb-5 inline-flex rounded-full border border-white/40 bg-white/10 px-5 py-1.5 text-[12px] font-medium tracking-[0.26em] backdrop-blur-sm">
            The Social Nexus
          </div>

          <h1 className="font-extrabold uppercase leading-[1.02] tracking-wider">
            <span className="block text-[34px] sm:text-[44px] lg:text-[50px] xl:text-[66px]">
              Transforming
            </span>

            <span className="flex flex-wrap items-center gap-x-4">
              <span className="text-[34px] sm:text-[44px] lg:text-[50px] xl:text-[66px]">
                Business
              </span>
              <span className="text-[15px] font-semibold leading-[1.15] sm:text-[18px] lg:text-[20px]">
                Growth With
                <br />
                Technology,
              </span>
            </span>

            <span className="block text-[34px] sm:text-[44px] lg:text-[50px] xl:text-[66px]">
              Digital Impact
            </span>
          </h1>

          <p className="mt-6 max-w-[480px] text-[14px] font-medium leading-[1.6] text-white/90 sm:text-[15px]">
            We combine software engineering, artificial intelligence, design,
            and performance marketing to create powerful digital ecosystems
            that drive measurable business growth worldwide.
          </p>
        </div>

        {/* Right form */}
        <div className="relative w-full max-w-120 shrink-0">
          <div className="rounded-2xl border border-white/35 bg-white/10 p-7 shadow-2xl backdrop-blur-md">
            <form className="space-y-2">
              <FormField label="Full Name" placeholder="Full Name" />
              <FormField label="Phone Number" placeholder="07XXX XXXXXX" />
              <FormField label="Email" placeholder="socialnexus@gmail.com" />

              <div>
                <label className="mb-1.5 block text-[13px] font-bold">
                  Additional Information
                </label>
                <textarea
                  placeholder="Tell us about your needs..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-white/20 bg-white/30 px-4 py-3 text-[13px] font-medium text-white placeholder:text-white/70 outline-none backdrop-blur-md focus:ring-2 focus:ring-white/40"
                />
              </div>

              <Button
                type="submit"
                className="h-[46px] w-full rounded-full bg-[#36b9c5] text-[14px] font-bold text-white hover:bg-[#2caab5]"
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
      <label className="mb-1.5 block text-[13px] font-bold">{label}</label>
      <input
        placeholder={placeholder}
        className="h-[42px] w-full rounded-full border border-white/20 bg-white/30 px-5 text-[13px] font-medium text-white placeholder:text-white/70 outline-none backdrop-blur-md focus:ring-2 focus:ring-white/40"
      />
    </div>
  );
}