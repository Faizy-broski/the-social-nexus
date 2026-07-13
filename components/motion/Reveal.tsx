"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";

type RevealVariant = "up" | "left" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  /** Mirrors .reveal / .reveal-left / .reveal-right / .reveal-scale */
  variant?: RevealVariant;
  /** Adds a subtle rotateX perspective-pop — reserved for the Hero and
   *  section headers, not the default sitewide treatment. */
  richer?: boolean;
  /** Seconds, mirrors the .delay-* utilities. */
  delay?: number;
  /** Mirrors useReveal's unobserve-after-first-trigger (default true). */
  once?: boolean;
  /** Mirrors IntersectionObserver's threshold (default matches useReveal's 0.15). */
  amount?: number;
  className?: string;
  /** Tag to render, e.g. "h2" for a heading. Defaults to "div". */
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p";
};

const OUT_SMOOTH = [0.16, 1, 0.3, 1] as const; // --ease-out-smooth
const SPRING = [0.34, 1.56, 0.64, 1] as const; // --ease-spring

function hiddenState(variant: RevealVariant, richer: boolean) {
  const base =
    variant === "up"
      ? { opacity: 0, y: 28 }
      : variant === "left"
        ? { opacity: 0, x: -40 }
        : variant === "right"
          ? { opacity: 0, x: 40 }
          : { opacity: 0, scale: 0.94 };

  return richer ? { ...base, rotateX: -8, transformPerspective: 800 } : base;
}

function visibleState(variant: RevealVariant, richer: boolean) {
  const base =
    variant === "up" || variant === "left" || variant === "right"
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 1, scale: 1 };

  return richer ? { ...base, rotateX: 0 } : base;
}

/**
 * Motion-driven replacement for the useReveal()/.reveal* CSS pattern, used
 * only where a section is being upgraded to a richer entrance (section
 * headers, Hero) — the plain CSS reveal system stays everywhere else.
 *
 * The site's blanket `prefers-reduced-motion` CSS rule (globals.css) only
 * neuters CSS transitions/animations; Motion's WAAPI/rAF-driven animations
 * are untouched by it, so the useReducedMotion() check below is the ONLY
 * thing enforcing reduced motion here — don't remove it.
 */
export function Reveal({
  children,
  variant = "up",
  richer = false,
  delay = 0,
  once = true,
  amount = 0.15,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: hiddenState(variant, richer),
    visible: visibleState(variant, richer),
  };

  const isSpring = variant === "scale";
  const MotionTag = m[as];

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once, amount, margin: "0px 0px -60px 0px" }}
      variants={variants}
      transition={{
        duration: isSpring ? 0.4 : 0.7,
        ease: isSpring ? SPRING : OUT_SMOOTH,
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
