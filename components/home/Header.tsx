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
  { label: "Web Brief", href: "/web-brief" },
  { label: "Logo Brief", href: "/logo-brief" },
  { label: "Contact Us", href: "/contact-us" },
];

type RailTheme = "dark" | "light";

const railTheme: Record<
  RailTheme,
  {
    logo: string;
    text: string;
    textMuted: string;
    dot: string;
    border: string;
    hover: string;
  }
> = {
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

/**
 * Mobile top-bar background — two full gradient layers, one per theme,
 * crossfaded via opacity instead of swapping classes. A plain CSS
 * transition can't animate BETWEEN two different gradients (it can only
 * interpolate a single background-color), so stacking both and fading
 * opacity is what makes the navy → white swap look like a smooth color
 * change instead of an instant flip. Both also pan slowly via
 * `.gradient-bg-pan` so the bar has some ambient life even at rest.
 * Tokens only — var(--background)/var(--muted) are the existing
 * near-white surface tokens from globals.css, not new hex values.
 */
const navBarBgDark =
  "linear-gradient(120deg, var(--brand-navy) 0%, var(--brand-navy-light) 50%, var(--brand-navy) 100%)";
const navBarBgLight =
  "linear-gradient(120deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)";

/** Staggered fade+slide for a list of nav <li> elements, keyed on open state. */
function useNavStagger(
  open: boolean,
  listRef: React.RefObject<HTMLUListElement | null>,
) {
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
        },
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
  const isDark = theme === "dark";

  const desktopNavRef = useRef<HTMLUListElement>(null);
  const mobileNavRef = useRef<HTMLUListElement>(null);

  useNavStagger(isOpen, desktopNavRef);
  useNavStagger(isSheetOpen, mobileNavRef);

  return (
    <>
      {/*
        Mobile / tablet (< lg): fixed slim TOP bar — logo left, hamburger right.
        Desktop (lg+): original fixed vertical rail with dot-grid trigger,
        kept transparent so it blends with whatever section is behind it.
      */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex h-16 w-full items-center justify-between overflow-hidden border-b px-4",
          "sm:h-20 sm:px-6",
          "lg:inset-x-auto lg:left-0 lg:top-0 lg:h-screen lg:w-16 lg:grid lg:grid-rows-[1fr_1fr_1fr] lg:items-center lg:justify-items-center lg:border-b-0 lg:border-r lg:bg-transparent lg:px-0 lg:py-0",
          t.border,
        )}
      >
        {/* Animated navbar background — two gradient layers crossfaded by
            theme, mobile/tablet only (desktop rail stays transparent). */}
        <span
          aria-hidden
          className="gradient-bg-pan pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ease-out lg:hidden"
          style={{ backgroundImage: navBarBgDark, opacity: isDark ? 1 : 0 }}
        />
        <span
          aria-hidden
          className="gradient-bg-pan pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ease-out lg:hidden"
          style={{ backgroundImage: navBarBgLight, opacity: isDark ? 0 : 1 }}
        />

        {/* Logo — normal orientation on mobile, rotated bottom-to-top on desktop */}
        <Link
          href="/"
          aria-label="The Social Nexus home"
          className="animate-fade-in-down flex items-center justify-center"
        >
          <span className="block lg:origin-center shrink-0 lg:-rotate-90 lg:scale-155">
            <Image
              src={t.logo}
              alt="The Social Nexus"
              width={140}
              height={46}
              priority
              className="h-7 w-auto transition-opacity duration-300 sm:h-7 lg:h-6"
            />
          </span>
        </Link>

        {/* Mobile / tablet: hamburger trigger for Sheet, morphs into an X */}
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger
              className={cn(
                "relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-md transition-colors duration-300",
                t.text,
              )}
              aria-label={isSheetOpen ? "Close menu" : "Open menu"}
            >
              <Menu
                className={cn(
                  "absolute h-6 w-6 transition-all duration-300 ease-out",
                  isSheetOpen
                    ? "-rotate-45 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
              />
              <X
                className={cn(
                  "absolute h-6 w-6 transition-all duration-300 ease-out",
                  isSheetOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-45 scale-75 opacity-0",
                )}
              />
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[85vw] max-w-sm overflow-hidden border-none p-0 text-white sm:max-w-sm"
              style={{ background: leftPanelBg }}
            >
              {/* Ambient drifting glow — same treatment as the desktop
                  offcanvas panels below, so this sheet doesn't feel static
                  next to them. */}
              <div
                aria-hidden
                className="animate-float pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-brand-gold/10 blur-[90px]"
                style={{ animationDuration: "7s" }}
              />
              <div
                aria-hidden
                className="animate-float pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-brand-teal/15 blur-[100px]"
                style={{ animationDuration: "6s", animationDelay: "1s" }}
              />

              <VisuallyHidden>
                <SheetTitle>Navigation menu</SheetTitle>
                <SheetDescription>
                  The Social Nexus site navigation
                </SheetDescription>
              </VisuallyHidden>

              <div className="relative flex h-full flex-col justify-between overflow-y-auto p-6 sm:p-8">
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
                    <SheetClose className="press-scale flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                      <X className="h-5 w-5" />
                    </SheetClose>
                  </div>

                  <nav className="my-10">
                    <ul ref={mobileNavRef} className="">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsSheetOpen(false)}
                            className="group flex items-center text-2xl font-semibold text-white/60 transition-colors hover:text-white sm:text-3xl"
                          >
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
                      <p className="mb-1 text-xs font-bold text-white/50">
                        Email
                      </p>
                      <a
                        href="mailto:connect@thesocialnexus.co.uk"
                        className="break-all text-sm text-white transition-colors hover:text-brand-teal-light"
                      >
                        connect@thesocialnexus.co.uk
                      </a>
                    </li>
                    <li>
                      <p className="mb-1 text-xs font-bold text-white/50">
                        Phone
                      </p>
                      <a
                        href="tel:+447462254013"
                        className="text-sm text-white transition-colors hover:text-brand-teal-light"
                      >
                        +447462254013
                      </a>
                    </li>
                    <li>
                      <p className="mb-1 text-xs font-bold text-white/50">
                        Location
                      </p>
                      <span className="text-sm text-white">
                        Pakistan UK USA
                      </span>
                    </li>
                  </ul>

                  <p className="mt-6 text-xs text-white/40">
                    ©{" "}
                    <a
                      href="https://thesocialnexus.co.uk"
                      className="hover:text-brand-teal-light"
                    >
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
        <MagneticDotGrid
          onOpen={() => setIsOpen(true)}
          isOpen={isOpen}
          dotClass={t.dot}
        />

        {/* Contact us + phone, rotated — desktop rail only */}
        <a
          href="tel:+447462254013"
          className="hidden shrink-0 items-center lg:flex"
        >
          <span
            className={cn(
              "[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[16px] font-semibold tracking-wide transition-colors duration-300",
              t.textMuted,
            )}
          >
            Contact us
          </span>
          <span
            className={cn(
              "[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-base font-extrabold tracking-wide transition-colors duration-300",
              t.text,
              t.hover,
            )}
          >
            +447462254013
          </span>
        </a>
      </header>

      {/* Desktop-only: original two-panel offcanvas overlay */}
      <div
        className={`fixed inset-0 z-50 hidden transition-opacity duration-300 lg:block ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-labelledby="contact-dialog-title"
        aria-modal="true"
      >
        <VisuallyHidden>
          <h2 id="contact-dialog-title">Contact and navigation menu</h2>
        </VisuallyHidden>
        <div className="flex h-full w-full flex-row overflow-hidden">
          {/* Left panel — logo, contact info, footer. Gold-dark → navy corner glow (accent, ~20%) */}
          <div
            style={{ background: leftPanelBg }}
            className={`relative flex w-1/3 shrink-0 flex-col justify-between overflow-hidden p-12 transition-transform duration-500 ease-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Ambient drifting glow, layered under the static radial spotlight */}
            <div
              aria-hidden
              className="animate-float pointer-events-none absolute -left-16 -top-16 h-80 w-80 rounded-full bg-brand-gold/10 blur-[110px]"
              style={{ animationDuration: "7s" }}
            />

            <div className="relative">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-block"
              >
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
                  <p className="mb-1 text-sm font-bold text-white/60">
                    Location
                  </p>
                  <span className="text-lg text-white">Pakistan UK USA</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <p className="mb-6 text-sm text-white/50">
                ©{" "}
                <a
                  href="https://thesocialnexus.co.uk"
                  className="hover:text-brand-teal-light"
                >
                  TSN
                </a>{" "}
                {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
          </div>

          {/* Right panel — nav menu. Teal → navy-light glow (dominant, ~80%) */}
          <div
            style={{ background: rightPanelBg }}
            className={`relative flex flex-1 flex-col justify-center overflow-hidden px-24 py-16 transition-opacity delay-150 duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Ambient drifting glow, layered under the static radial spotlight */}
            <div
              aria-hidden
              className="animate-float pointer-events-none absolute -bottom-20 -right-16 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]"
              style={{ animationDuration: "6.5s", animationDelay: "0.8s" }}
            />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="press-scale absolute right-14 top-10 hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:flex"
            >
              <X className="h-5 w-5" />
            </button>

            <nav className="relative">
              <ul ref={desktopNavRef} className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center text-4xl max-w-xs font-bold uppercase text-white/50 transition-colors hover:text-white lg:text-4xl"
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
    gsap.to(tealFillRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(goldFillRef.current, {
      scale: 1,
      duration: 0.5,
      delay: 0.06,
      ease: "power3.out",
    });
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
      className="press-scale relative hidden h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-105 lg:flex"
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
            className={cn(
              "h-1.25 w-1.25 rounded-full transition-colors duration-300",
              dotClass,
            )}
          />
        ))}
      </span>
    </button>
  );
}

export default Header;
