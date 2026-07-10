"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useHeaderTheme } from "@/contexts/header-theme-contexts";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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

/**
 * Panel background treatments — built from the exact globals.css tokens.
 * Gold is the ~20% accent, so its glow stays low-opacity and corner-seeded;
 * teal is the ~80% dominant color, so it gets the larger/brighter glow.
 */
const leftPanelBg =
  "radial-gradient(circle at 12% 10%, rgb(218 173 9 / 0.22), transparent 52%), var(--brand-navy)";
const rightPanelBg =
  "radial-gradient(circle at 88% 90%, rgb(59 179 194 / 0.20), transparent 55%), var(--brand-navy-light)";

/** Staggered fade+slide for a list of nav <li> elements, keyed on open state. */
function useNavStagger(open: boolean, listRef: React.RefObject<HTMLUListElement | null>) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    if (!items.length) return;

    if (open) {
      gsap.fromTo(
        items,
        { autoAlpha: 0, x: -24 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.22,
          ease: "power3.out",
          overwrite: true,
        }
      );
    } else {
      gsap.to(items, {
        autoAlpha: 0,
        x: -16,
        duration: 0.25,
        stagger: 0.025,
        ease: "power2.in",
        overwrite: true,
      });
    }
  }, [open, listRef]);
}

const Header = () => {
  // desktop two-panel offcanvas
  const [isOpen, setIsOpen] = useState(false);
  // mobile/tablet side sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const theme = useHeaderTheme();
  const t = railTheme[theme];

  const desktopNavRef = useRef<HTMLUListElement>(null);
  const mobileNavRef = useRef<HTMLUListElement>(null);

  useNavStagger(isOpen, desktopNavRef);
  useNavStagger(isSheetOpen, mobileNavRef);

  return (
    <>
      {/*
        Mobile / tablet (< lg): fixed slim TOP bar — logo left, hamburger right.
        Desktop (lg+): original fixed vertical rail with dot-grid trigger.
      */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b lg:bg-transparent bg-brand-navy px-4 transition-colors duration-300",
          "sm:h-20 sm:px-6",
          "lg:inset-x-auto lg:left-0 lg:top-0 lg:h-screen lg:w-19 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:px-0 lg:py-18",
          t.border
        )}
      >
        {/* Logo — normal orientation on mobile, rotated bottom-to-top on desktop */}
        <Link
          href="/"
          aria-label="The Social Nexus home"
          className="flex items-center justify-center"
        >
          <span className="block lg:origin-center lg:-rotate-90 lg:scale-155">
            <Image
              src={t.logo}
              alt="The Social Nexus"
              width={140}
              height={46}
              priority
              className="h-7 w-auto transition-opacity duration-300 sm:h-8 lg:h-8"
            />
          </span>
        </Link>

        {/* Mobile / tablet: hamburger trigger for Sheet */}
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md transition-colors duration-300",
                  t.text
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm border-none p-0 text-white sm:max-w-sm"
              style={{ background: leftPanelBg }}
            >
              <VisuallyHidden>
                <SheetTitle>Navigation menu</SheetTitle>
                <SheetDescription>The Social Nexus site navigation</SheetDescription>
              </VisuallyHidden>

              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                      <Image
                        src="/TSN-White-Logo.webp"
                        alt="The Social Nexus"
                        width={140}
                        height={40}
                        className="h-8 w-auto"
                      />
                    </Link>
                    <SheetClose>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="flex h-9 w-9 md:hidden cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </SheetClose>
                  </div>

                  <nav className="mt-10">
                    <ul ref={mobileNavRef} className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsSheetOpen(false)}
                            className="group flex items-center py-2.5 text-2xl font-extrabold uppercase text-white/60 transition-colors hover:text-white sm:text-3xl"
                          >
                            <span className="h-2 w-0 shrink-0 bg-brand-teal-light opacity-0 transition-all duration-300 ease-out group-hover:mr-3 group-hover:w-6 group-hover:opacity-100" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div>
                  <ul className="space-y-5 border-t border-white/10 pt-6">
                    <li>
                      <p className="mb-1 text-xs font-bold text-white/50">Email</p>
                      <a
                        href="mailto:connect@thesocialnexus.co.uk"
                        className="break-all text-sm text-white transition-colors hover:text-brand-teal-light"
                      >
                        connect@thesocialnexus.co.uk
                      </a>
                    </li>
                    <li>
                      <p className="mb-1 text-xs font-bold text-white/50">Phone</p>
                      <a
                        href="tel:+447462254013"
                        className="text-sm text-white transition-colors hover:text-brand-teal-light"
                      >
                        +447462254013
                      </a>
                    </li>
                    <li>
                      <p className="mb-1 text-xs font-bold text-white/50">Location</p>
                      <span className="text-sm text-white">Pakistan UK USA</span>
                    </li>
                  </ul>

                  <p className="mt-6 text-xs text-white/40">
                    ©{" "}
                    <a href="https://thesocialnexus.co.uk" className="hover:text-brand-teal-light">
                      TSN
                    </a>{" "}
                    {new Date().getFullYear()}. All rights reserved
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop: magnetic circular trigger — 9-dot grid with cursor-tracking color spread */}
        <MagneticDotGrid onOpen={() => setIsOpen(true)} isOpen={isOpen} dotClass={t.dot} />

        {/* Contact us + phone, rotated — desktop rail only */}
        <a href="tel:+447462254013" className="hidden items-center lg:flex">
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

      {/* Desktop-only: original two-panel offcanvas overlay */}
      <div
        className={`fixed inset-0 z-50 hidden transition-opacity duration-300 lg:block ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full w-full flex-row overflow-hidden">
          {/* Left panel — logo, contact info, footer. Gold-dark → navy corner glow (accent, ~20%) */}
          <div
            style={{ background: leftPanelBg }}
            className={`flex w-1/3 shrink-0 flex-col justify-between p-12 transition-transform duration-500 ease-out ${
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

          {/* Right panel — nav menu. Teal → navy-light glow (dominant, ~80%) */}
          <div
            style={{ background: rightPanelBg }}
            className={`relative flex flex-1 flex-col justify-center px-24 py-16 transition-opacity delay-150 duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute right-14 top-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <nav>
              <ul ref={desktopNavRef} className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center text-4xl font-extrabold uppercase text-white/50 transition-colors hover:text-white lg:text-4xl"
                    >
                      <span className="h-2 w-0 shrink-0 bg-brand-gold opacity-0 transition-all duration-400 ease-out group-hover:mr-4 group-hover:w-10 group-hover:opacity-100 sm:group-hover:w-12" />
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

/**
 * MagneticDotGrid
 * ------------------------------------------------------------------
 * Desktop rail trigger, now a true circle. On hover, a fill layer's
 * transform-origin snaps to the exact cursor position and scales up
 * from 0 — teal spreading first, gold trailing slightly behind it —
 * so the color visibly spreads outward from wherever the mouse enters.
 * Keeps tracking on mousemove; scales back down toward the exit point
 * on mouse-leave. The 9 dots stay on top (z-10) throughout.
 */
function MagneticDotGrid({
  onOpen,
  isOpen,
  dotClass,
}: {
  onOpen: () => void;
  isOpen: boolean;
  dotClass: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const tealFillRef = useRef<HTMLSpanElement>(null);
  const goldFillRef = useRef<HTMLSpanElement>(null);

  const setOrigin = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const origin = `${x}% ${y}%`;
    if (tealFillRef.current) tealFillRef.current.style.transformOrigin = origin;
    if (goldFillRef.current) goldFillRef.current.style.transformOrigin = origin;
  };

  const handleEnter = (e: ReactMouseEvent<HTMLButtonElement>) => {
    setOrigin(e);
    gsap.to(tealFillRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(goldFillRef.current, { scale: 1, duration: 0.5, delay: 0.06, ease: "power3.out" });
  };

  const handleMove = (e: ReactMouseEvent<HTMLButtonElement>) => setOrigin(e);

  const handleLeave = (e: ReactMouseEvent<HTMLButtonElement>) => {
    setOrigin(e);
    gsap.to([tealFillRef.current, goldFillRef.current], {
      scale: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label="Open menu"
      aria-expanded={isOpen}
      className="relative hidden h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-105 lg:mt-8 lg:flex"
    >
      <span
        ref={tealFillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-brand-teal/70"
        style={{ transformOrigin: "50% 50%" }}
      />
      <span
        ref={goldFillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-brand-gold/40 mix-blend-overlay"
        style={{ transformOrigin: "50% 50%" }}
      />
      <span className="relative z-10 grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1.25 w-1.25 rounded-full transition-colors duration-300", dotClass)}
          />
        ))}
      </span>
    </button>
  );
}

export default Header;