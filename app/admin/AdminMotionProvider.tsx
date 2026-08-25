"use client";

import { LazyMotion, domAnimation } from "motion/react";

/** Loads the Motion `domAnimation` feature bundle once for the whole admin
 *  subtree, so `m.*` components (FadeIn, sidebar, cards, tables) work here
 *  independently of the marketing site's own LazyMotion in app/template.tsx
 *  — the admin layout renders outside that provider by design (see
 *  components/shared/SiteChrome.tsx / app/template.tsx's `/admin` bypass). */
export function AdminMotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
