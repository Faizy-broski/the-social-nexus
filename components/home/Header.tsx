"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHeaderTheme } from "@/contexts/header-theme-contexts";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact-us" },
];

type RailTheme = "dark" | "light";

const railTheme: Record<RailTheme, {
  logo: string;
  text: string;
  textMuted: string;
  dot: string;
  border: string;
  hover: string;
}> = {
  dark: {
    logo: "/TSN-White-Logo.webp",
    text: "text-white",
    textMuted: "text-white/70",
    dot: "bg-white",
    border: "border-white/20",
    hover: "hover:text-brand-teal-light",
  },
  light: {
    logo: "/TSN-Black-Logo.webp",
    text: "text-brand-navy",
    textMuted: "text-brand-navy/60",
    dot: "bg-brand-navy",
    border: "border-black/10",
    hover: "hover:text-brand-teal",
  },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // lock body scroll while the offcanvas is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);


  const theme = useHeaderTheme();
const t = railTheme[theme];

  return (
    <>
      {/* Fixed vertical rail — logo (rotated), 9-dot trigger, contact info */}
      <header
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center justify-between border-r bg-transparent py-12 transition-colors duration-300 lg:w-18",
          t.border
        )}
      >
        {/* Logo, rotated so it reads bottom-to-top */}
        <Link
          href="/"
          aria-label="The Social Nexus home"
          className="flex items-center justify-center"
        >
          <span className="block origin-center -rotate-90 scale-125">
            <Image
              src={t.logo}
              alt="The Social Nexus"
              width={140}
              height={46}
              priority
              className="h-8 w-auto transition-opacity duration-300"
            />
          </span>
        </Link>

        {/* 9-dot grid trigger — opens the offcanvas menu */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="mt-8 grid cursor-pointer grid-cols-3 gap-1.5 rounded-md transition-opacity hover:opacity-70"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={cn("h-[5px] w-[5px] rounded-full transition-colors duration-300", t.dot)}
            />
          ))}
        </button>

        {/* Contact us + phone — each rotated independently so both read
            bottom-to-top, in the same direction as the logo, while still
            sitting side by side left-to-right in a normal flex row. */}
        <a href="tel:+447462254013" className="flex items-center">
          <span
            className={cn(
              "[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[16px] font-semibold tracking-wide transition-colors duration-300",
              t.textMuted
            )}
          >
            Contact us
          </span>
          <span
            className={cn(
              "[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-md font-extrabold tracking-wide transition-colors duration-300",
              t.text,
              t.hover
            )}
          >
            +447462254013
          </span>
        </a>
      </header>

      {/* Offcanvas overlay — always dark, unaffected by rail theme */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full w-full flex-col lg:flex-row">
          {/* Left panel — logo, contact info, footer */}
          <div
            className={`flex w-full flex-col justify-between bg-brand-navy-light p-8 transition-transform duration-500 ease-out sm:p-12 lg:w-1/3 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/TSN-White-Logo.webp"
                  alt="The Social Nexus"
                  width={180}
                  height={46}
                  className="h-20 w-auto"
                />
              </Link>

              <ul className="mt-14 space-y-8">
                <li>
                  <p className="mb-1 text-sm font-bold text-white/60">Email</p>
                  <a
                    href="mailto:connect@thesocialnexus.co.uk"
                    className="text-lg text-white transition-colors hover:text-brand-teal-light"
                  >
                    connect@thesocialnexus.co.uk
                  </a>
                </li>
                <li>
                  <p className="mb-1 text-sm font-bold text-white/60">Phone</p>
                  <a
                    href="tel:+447462254013"
                    className="text-lg text-white transition-colors hover:text-brand-teal-light"
                  >
                    +447462254013
                  </a>
                </li>
                <li>
                  <p className="mb-1 text-sm font-bold text-white/60">Location</p>
                  <span className="text-lg text-white">Pakistan UK USA</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-6 text-sm text-white/50">
                ©{" "}
                <a href="https://thesocialnexus.co.uk" className="hover:text-brand-teal-light">
                  TSN
                </a>{" "}
                {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
          </div>

          {/* Right panel — nav menu, stacked vertically per menu-item */}
          <div
            className={`relative flex flex-1 flex-col justify-center bg-brand-navy px-8 py-16 transition-opacity delay-150 duration-500 sm:px-16 lg:px-24 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute right-8 top-8 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-14 sm:top-10"
            >
              <X className="h-5 w-5" />
            </button>

            <nav>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center text-4xl font-extrabold uppercase text-white/50 transition-colors hover:text-white sm:text-5xl lg:text-4xl"
                    >
                      <span className="h-2 w-0 shrink-0 bg-white opacity-0 transition-all duration-400 ease-out group-hover:mr-4 group-hover:w-10 group-hover:opacity-100 sm:group-hover:w-12" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;