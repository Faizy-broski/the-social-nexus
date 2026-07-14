"use client";

import {
  forwardRef,
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  /** If provided, renders as a Next.js <Link>. Omit for a <button>. */
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  /** Fill color that spreads from the cursor's entry point. Any bg-* class. */
  fillClassName?: string;
  /**
   * How far the button follows the cursor, 0–1. Small values (0.2–0.35) feel
   * "magnetic"; anything higher starts to feel like the button is chasing
   * the mouse rather than being pulled by it.
   */
  magneticStrength?: number;
  type?: "button" | "submit";
  "aria-label"?: string;
};

/**
 * MagneticButton
 * ------------------------------------------------------------------
 * Same interaction as the Header's MagneticDotGrid trigger, generalized
 * into a reusable component:
 *  - On mouse enter, a fill layer's transform-origin snaps to the exact
 *    entry point and scales up from 0, so color visibly spreads outward
 *    from wherever the cursor entered — not just a flat hover swap.
 *  - While hovered, the button itself nudges toward the cursor position
 *    (magnetic pull), scaled down by `magneticStrength` so it feels
 *    responsive without flying across the page.
 *  - On leave, the fill scales back down toward the exit point and the
 *    button eases back to rest with a light overshoot.
 *
 * NOTE: the content span below MUST be its own inline-flex row. Tailwind's
 * preflight sets `svg { display: block }`, so any icon passed in as a
 * child (e.g. lucide-react icons) will break onto its own line above
 * sibling text if this wrapper is a plain (non-flex) span — the outer
 * `items-center gap-*` classes only affect direct flex children, and
 * this span is the only direct child, not the icon/text inside it.
 */
export const MagneticButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  MagneticButtonProps
>(function MagneticButton(
  {
    href,
    onClick,
    children,
    className,
    fillClassName = "bg-brand-gold",
    magneticStrength = 0.3,
    type = "button",
    ...rest
  },
  forwardedRef,
) {
  const localRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const setRefs = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const setFillOrigin = (e: ReactMouseEvent) => {
    const el = localRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (fillRef.current) fillRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleEnter = (e: ReactMouseEvent) => {
    setFillOrigin(e);
    gsap.to(fillRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
  };

  const handleMove = (e: ReactMouseEvent) => {
    const el = localRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // magnetic pull — offset from center, scaled down
    const relX = e.clientX - rect.left - rect.width / 4;
    const relY = e.clientY - rect.top - rect.height / 4;
    gsap.to(el, {
      x: relX * magneticStrength,
      y: relY * magneticStrength,
      duration: 0.4,
      ease: "power2.out",
    });

    setFillOrigin(e);
  };

  const handleLeave = (e: ReactMouseEvent) => {
    setFillOrigin(e);
    gsap.to(fillRef.current, { scale: 0, duration: 0.8, ease: "power3.inOut" });
    gsap.to(localRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const sharedProps = {
    onMouseEnter: handleEnter,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: cn(
      "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden will-change-transform",
      className,
    ),
    ...rest,
  };

  const fillAndContent = (
    <>
      <span
        ref={fillRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 scale-0 rounded-[inherit]",
          fillClassName,
        )}
        style={{ transformOrigin: "50% 50%" }}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} ref={setRefs as never} {...sharedProps} onClick={onClick}>
        {fillAndContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} ref={setRefs as never} {...sharedProps}>
      {fillAndContent}
    </button>
  );
});

export default MagneticButton;