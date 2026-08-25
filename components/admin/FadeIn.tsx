"use client";

import { m, useReducedMotion } from "motion/react";

const OUT_SMOOTH = [0.16, 1, 0.3, 1] as const;

/** Small entrance-animation wrapper shared across the admin dashboard —
 *  relies on the LazyMotion(domAnimation) provider mounted once in
 *  app/admin/(dashboard)/layout.tsx, so every admin page can use `m.*` /
 *  this without paying for another Motion feature bundle. */
export function FadeIn({
  children,
  delay = 0,
  className,
  y = 10,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: OUT_SMOOTH, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
