"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the card's edge. */
  maxTilt?: number;
  /** Scale applied while hovered. */
  scale?: number;
};

/**
 * Pointer-tracked 3D tilt, additive on top of whatever hover CSS the child
 * already has (translate/shadow/etc.) — this only adds the rotation layer.
 * Renders as an inert passthrough on touch devices (no fine pointer) and
 * when the user prefers reduced motion, so the card's existing CSS hover
 * state is the only thing that fires there.
 */
export function TiltCard({ children, className, maxTilt = 8, scale = 1.02 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tiltEnabled, setTiltEnabled] = useState(false);
  // Cached on pointerenter instead of re-read via getBoundingClientRect() on
  // every pointermove — the card's position/size doesn't change mid-hover,
  // and this backs every product/portfolio/thumbnail card sitewide.
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    // window.matchMedia is unavailable during SSR, so this can only be read
    // post-mount — there's no lazy useState initializer that avoids a
    // hydration mismatch here (the server has no pointer type to render).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTiltEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  const active = tiltEnabled && !reduceMotion;

  const handlePointerEnter = () => {
    if (!active) return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const rect = rectRef.current;
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
  };

  const handlePointerLeave = () => {
    rectRef.current = null;
    rotateX.set(0);
    rotateY.set(0);
  };

  if (!active) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      whileHover={{ scale }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </m.div>
  );
}

export default TiltCard;
