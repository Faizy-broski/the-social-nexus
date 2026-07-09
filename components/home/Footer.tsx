"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 320 512" className="h-4 w-4 fill-current">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current">
        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
      </svg>
    ),
  },
];

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
];

const offices = [
  { label: "Pakistan", flag: "/footer/flags/pk.svg" },
  { label: "USA", flag: "/footer/flags/us.svg" },
  { label: "United Kingdom", flag: "/footer/flags/gb.svg" },
];

const phoneNumbers = ["+44 7402 843322", "+44 7462 254013"];

export function SiteFooter() {
  const { containerRef, offset } = useParallax(0.25);

  return (
    <>
      {/* Parallax banner, faded into the panel below */}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 top-10 h-[420px] hidden md:block"
      >
        <div
          className="absolute inset-x-0 -top-[30%] left-29 -right-29 h-[158%] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <Image
            src="/footer-parallax.jpeg"
            alt=""
            fill
            priority={false}
            className="object-cover"
          />
        </div>
      </div>
      <footer className="relative overflow-hidden max-w-6xl  bg-[#0B0E13] text-white">
        <div className="relative flex justify-center mx-auto max-w-5xl px-6 pt-20 pb-10 lg:px-8">
          {/* Brand / nav grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Brand + tagline + socials */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/footer/tsn-logo-white.svg"
                  alt="The Social Nexus"
                  width={160}
                  height={54}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                Crafting premium digital experiences that define the future.
                Where creativity meets cutting-edge technology.
              </p>
              <ul className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border border-white/15",
                        "text-white/70 transition-colors hover:border-[#2FD4C9] hover:text-[#2FD4C9]",
                      )}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
                Information
              </h4>
              <ul className="mt-5 space-y-3">
                {infoLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-[#2FD4C9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office locations */}
            <div className="lg:col-span-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
                Office Locations
              </h4>
              <ul className="mt-5 space-y-3">
                {offices.map((office) => (
                  <li key={office.label} className="flex items-center gap-3">
                    <span className="relative h-4 w-6 overflow-hidden rounded-[2px] ring-1 ring-white/10">
                      <Image
                        src={office.flag}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span className="text-sm text-white/70">
                      {office.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12">
              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/10" />

              {/* Copyright */}
              <p className="text-xs text-white/40">
                &copy; <span className="font-semibold text-white/60">TSN</span>{" "}
                {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
          </div>
          {/* "Have a project" CTA — its own grid column, everything centered
              to match the reference screenshot exactly. */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Have a project in your mind?
            </h2>

            <Link
              href="/contact-us"
              className="mt-8 flex h-32 w-32 items-center justify-center rounded-full border border-white/25 text-sm font-medium text-white transition-colors hover:border-[#2FD4C9] hover:text-[#2FD4C9]"
            >
              Contact Us
            </Link>

            <ul className="mt-8 space-y-2">
              {phoneNumbers.map((number) => (
                <li key={number}>
                  <a
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#2FD4C9]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {number}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:info@thesocialnexus.org"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#2FD4C9]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  info@thesocialnexus.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SiteFooter;
