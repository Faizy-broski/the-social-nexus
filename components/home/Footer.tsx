"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/use-parallax";
import { useReveal } from "@/hooks/use-reveal";
import MagneticButton from "@/components/home/MagneticButton";

const socialLinks = [
  // {
  //   label: "Facebook",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 320 512" className="h-4 w-4 fill-current">
  //       <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  //     </svg>
  //   ),
  // },
  {
    label: "Instagram",
    href: "https://www.instagram.com/the.socialnexus/",
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-social-nexus/",
    icon: (
      <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current">
        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
      </svg>
    ),
  },
];

const infoLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Web Brief", href: "/web-brief" },
  { label: "Logo Brief", href: "/logo-brief" },
  { label: "Portfolio", href: "/portfolio" },
];

const offices = [
  { label: "Pakistan", flag: "/flags/pak.webp" },
  { label: "USA", flag: "/flags/usa.webp" },
  { label: "United Kingdom", flag: "/flags/uk.webp" },
];

const phoneNumbers = ["+44 7462 254013"];

export function SiteFooter() {
  const { containerRef, offset } = useParallax(0.25);
  const gridRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <div className="relative md:pt-30 mt-6 overflow-hidden">
      {/* Parallax banner, faded into the panel below — desktop only,
          already correctly hidden on mobile/tablet */}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 top-10 hidden h-105 lg:block"
      >
        <div
          className="absolute inset-x-0 top-[-30%] left-6 -right-6 h-[158%] will-change-transform lg:left-29 lg:-right-29"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <Image
            src="/footer-parallax.avif"
            alt=""
            fill
            priority={false}
            sizes="(min-width: 1024px) 100vw, 0px"
            className="object-cover"
          />
        </div>
      </div>

      <footer className="relative max-w-6xl overflow-hidden lg:h-screen bg-[#0B0E13] text-white">
        {/* ambient network glow — same "Nexus" motif used on the other
            dark sections (Services/Portfolio), so the footer doesn't
            feel like a flat, unrelated dark panel at the end of the page */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-teal/15 blur-[110px]" />
          <div
            className="animate-float absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-gold/10 blur-[100px]"
            style={{ animationDelay: "1s", animationDuration: "5.5s" }}
          />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-5 pb-8 pt-14 sm:px-6 sm:pb-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:pl-17">
          {/* Brand / nav grid */}
          <div
            ref={gridRef}
            className="reveal stagger-children grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:flex-1"
          >
            {/* Brand + tagline + socials */}
            <div className="sm:col-span-2 lg:col-span-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/TSN-White-Logo.webp"
                  alt="The Social Nexus"
                  width={160}
                  height={54}
                  className="h-9 w-auto sm:h-10"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 sm:mt-5">
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
                        "text-white/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-6 hover:scale-110 hover:border-[#2FD4C9] hover:text-[#2FD4C9]",
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
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                Information
              </h3>
              <ul className="mt-4 space-y-3 sm:mt-5">
                {infoLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-white/60 transition-colors hover:text-[#2FD4C9]"
                    >
                      <span className="h-1.5 w-0 shrink-0 bg-[#2FD4C9] opacity-0 transition-all duration-300 ease-out group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office locations */}
            <div className="lg:col-span-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                Office Locations
              </h3>
              <ul className="mt-4 space-y-3 sm:mt-5">
                {offices.map((office) => (
                  <li key={office.label} className="group flex items-center gap-3">
                    <span className="relative h-4 w-6 overflow-hidden rounded-[2px] ring-1 ring-white/10 transition-transform duration-300 ease-out group-hover:scale-110">
                      <Image
                        src={office.flag}
                        alt=""
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </span>
                    <span className="text-sm text-white/70 transition-colors duration-300 group-hover:text-white">
                      {office.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-12 hidden lg:block">
              {/* Divider */}
              <div className="my-8 h-px w-full bg-white/10 sm:my-12" />

              {/* Copyright */}
              <p className="text-xs text-white/40">
                &copy; <span className="font-semibold text-white/60">TSN</span>{" "}
                {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
          </div>

          {/* "Have a project" CTA — stacks below the grid on mobile/
              tablet, sits as its own column on the right from lg: up */}
          <div
            ref={ctaRef}
            className="reveal-left flex flex-col items-start border-t border-white/10 pt-10 text-center lg:w-72 lg:shrink-0 lg:items-center lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-3xl">
              Have a project in your mind?
            </h2>

            <MagneticButton
              href="/contact-us"
              fillClassName="bg-[#2FD4C9]/15"
              magneticStrength={0.2}
              className="mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/25 text-xs font-medium text-white transition-colors hover:border-[#2FD4C9] hover:text-[#2FD4C9] sm:mt-8 sm:h-28 sm:w-28 sm:text-sm lg:h-32 lg:w-32"
            >
              Contact Us
            </MagneticButton>

            <ul className="mt-6 space-y-2 sm:mt-8">
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
        <div className="block lg:hidden">
              {/* Divider */}
              <div className="my-8 h-px w-full bg-white/10" />

              {/* Copyright */}
              <p className="text-xs text-white/40">
                &copy; <span className="font-semibold text-white/60">TSN</span>{" "}
                {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteFooter;