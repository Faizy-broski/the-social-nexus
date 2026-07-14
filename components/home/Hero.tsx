"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import LogoCarousel from "./LogoCarousel";
import { useInView } from "@/hooks/use-in-view";
import {
  heroContactFormSchema,
  type HeroContactFormValues,
} from "@/lib/validations/hero-contact";

const OUT_SMOOTH = [0.16, 1, 0.3, 1] as const; // --ease-out-smooth

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: OUT_SMOOTH },
  },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<HeroContactFormValues>({
    resolver: zodResolver(heroContactFormSchema as any),
    defaultValues: { fullName: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(values: HeroContactFormValues) {
    try {
      const response = await fetch("/api/contact-hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to send message.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong sending your message. Please try again.",
      });
    }
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: videoInViewRef, inView: videoInView } =
    useInView<HTMLVideoElement>({ threshold: 0 });

  const setVideoRefs = (node: HTMLVideoElement | null) => {
    videoRef.current = node;
    videoInViewRef.current = node;
  };

  // Once the hero scrolls out of view (it's only ever the first section)
  // there's no reason to keep decoding a looping background video — pause
  // it, and resume automatically if the user scrolls back up.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (videoInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoInView]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background video — poster/preload intentionally omitted: there's no
          static frame asset to show, and `poster` pointing at a missing file
          used to 404 and stall the LCP paint. `preload="metadata"` keeps the
          full 1.9MB file out of the critical request chain while still
          letting `autoPlay` kick the fetch off once the video is in view. */}
      <video
        ref={setVideoRefs}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Static fallback for reduced-motion users — the gradient overlay
          below already paints instantly, so this is just the navy base. */}
      <div className="absolute inset-0 hidden bg-brand-navy motion-reduce:block" />

      {/* Gradient overlay — teal → navy, driven by globals.css hero tokens */}
      <div className="hero-teal-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-20 sm:gap-12 sm:px-10 sm:py-24 md:px-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-16 lg:py-8 xl:justify-between xl:gap-12 xl:pr-6">
        {/* Left copy */}
        <m.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          style={{ perspective: 1000 }}
          className="w-full max-w-md pt-16 text-center sm:max-w-lg sm:pt-20 lg:max-w-xl lg:py-8 lg:pt-0 lg:text-left xl:max-w-175"
        >
          <m.div
            variants={itemVariants}
            className="mb-4 inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-[10px] font-medium tracking-[0.18em] backdrop-blur-sm sm:mb-5 sm:px-5 sm:text-[12px] sm:tracking-[0.26em]"
          >
            The Social Nexus
          </m.div>

          <m.h1
            variants={itemVariants}
            className="font-extrabold uppercase leading-[1.08] tracking-wider sm:leading-[1.02]"
          >
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

            <span className="block text-[26px] xs:text-[30px] sm:text-[40px] lg:text-[46px] xl:text-[66px] gradient-text-animated">
              Digital Impact
            </span>
          </m.h1>

          <m.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-90 text-[12px] font-medium leading-[1.6] text-white/90 sm:mt-6 sm:max-w-110 sm:text-[14px] lg:mx-0 lg:max-w-120 lg:text-[15px] text-justify"
          >
            We combine software engineering, artificial intelligence, design,
            and performance marketing to create powerful digital ecosystems
            that drive measurable business growth worldwide.
          </m.p>
        </m.div>

        {/* Right form — smaller, tighter glass panel, all colors from globals.css */}
        <m.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          style={{ perspective: 1000 }}
          className="relative w-full max-w-sm shrink-0 sm:max-w-md lg:max-w-md xl:max-w-md"
        >
          <m.div
            variants={itemVariants}
            className="glass-panel rounded-2xl p-5 shadow-lg sm:p-6"
          >
            <div className="mb-4">
              <h2 className="text-base font-bold text-white sm:text-lg">
                Let&apos;s Build Something Great
              </h2>
              <p className="mt-1 text-[11px] font-medium text-white/80 sm:text-[12px]">
                Tell us about your project and we&apos;ll get back to you.
              </p>
            </div>

            {isSubmitted ? (
              <div className="animate-scale-in flex flex-col items-center justify-center gap-3 py-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-brand-teal" />
                <p className="text-sm font-semibold text-white">
                  Message sent — we&apos;ll be in touch soon.
                </p>
                <button
                  type="button"
                  className="text-[12px] font-medium text-white/70 underline underline-offset-2 hover:text-white"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="stagger-children space-y-1"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <FormField
                  label="Full Name"
                  placeholder="Full Name"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
                <FormField
                  label="Phone Number"
                  placeholder="07XXX XXXXXX"
                  type="tel"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <FormField
                  label="Email"
                  placeholder="socialnexus@gmail.com"
                  type="email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <div>
                  <label className="mb-1.5 block text-[12px] font-bold sm:text-[13px]">
                    Additional Information
                  </label>
                  <textarea
                    placeholder="Tell us about your needs..."
                    rows={3}
                    className="glass-input w-full resize-none rounded-xl px-3.5 py-2.5 text-[12px] font-medium text-white placeholder:text-white/70 outline-none transition-shadow focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-[13px]"
                    {...register("message")}
                  />
                  {errors.message?.message && (
                    <p className="mt-1 text-[11px] text-red-300">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {errors.root?.message && (
                  <p className="text-[11px] text-red-300">
                    {errors.root.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-cta press-scale h-10 w-full rounded-full text-[13px] font-bold sm:h-11 sm:text-[14px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </m.div>
        </m.div>
      </div>

      <LogoCarousel />
    </section>
  );
}

const FormField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }
>(function FormField({ label, error, ...inputProps }, ref) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-bold sm:text-[13px]">{label}</label>
      <input
        ref={ref}
        className="glass-input h-10 w-full rounded-full px-4 text-[12px] font-medium text-white placeholder:text-white/70 outline-none transition-shadow focus:ring-2 focus:ring-primary sm:h-11 sm:px-5 sm:text-[13px]"
        {...inputProps}
      />
      {error && <p className="mt-1 text-[11px] text-red-300">{error}</p>}
    </div>
  );
});