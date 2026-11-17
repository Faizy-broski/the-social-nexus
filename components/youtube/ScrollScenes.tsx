"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { LucideIcon } from "lucide-react";
import type { YoutubeShowcaseItem } from "@/lib/youtube-management-content";

/**
 * Scroll-driven scenes for the YouTube page. Each one is a different device
 * on purpose (parallax, pin + crossfade, word scrub, offset reveal, pinned
 * horizontal pan, line draw) so no two neighbouring sections move alike.
 * Every scene falls back to a static layout under prefers-reduced-motion.
 */

const SECTION_X =
  "px-5 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12";
const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* 1. Hero: layered parallax                                           */
/* ------------------------------------------------------------------ */

export function HeroScroll({
  background,
  children,
  className,
}: {
  background: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduce ? 1 : 0.2],
  );

  return (
    <section ref={ref} className={className}>
      <m.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        {background}
      </m.div>
      <m.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl"
      >
        {children}
      </m.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Pinned crossfade list                                            */
/* ------------------------------------------------------------------ */

type PinnedItem = { icon: LucideIcon; title: string; description: string };

function PinnedCard({ item }: { item: PinnedItem }) {
  const Icon = item.icon;
  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
      <Icon className="h-9 w-9 text-brand-gold" aria-hidden="true" />
      <h3 className="mt-6 text-2xl font-semibold text-brand-teal-light sm:text-3xl">
        {item.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
        {item.description}
      </p>
    </div>
  );
}

export function PinnedList({
  items,
  children,
}: {
  items: PinnedItem[];
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  if (reduce) {
    return (
      <div className={`py-16 sm:py-20 ${SECTION_X}`}>
        <div className="mx-auto max-w-6xl">
          {children}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <PinnedCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ height: `${items.length * 30 + 70}vh` }}
      className="relative"
    >
      <div
        className={`sticky top-0 flex h-screen items-center pt-20 lg:pt-0 ${SECTION_X}`}
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            {children}
            <ul className="mt-8 hidden space-y-2 lg:block">
              {items.map((item, i) => (
                <li
                  key={item.title}
                  className={`text-lg font-medium transition-all duration-500 ${
                    i === active
                      ? "translate-x-2 text-white"
                      : "text-white/25"
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[20rem] sm:min-h-[22rem]">
            {items.map((item, i) => (
              <m.div
                key={item.title}
                aria-hidden={i !== active}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : i < active ? -28 : 28,
                }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute inset-0"
              >
                <PinnedCard item={item} />
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Word-by-word text scrub                                          */
/* ------------------------------------------------------------------ */

function Word({
  word,
  progress,
  range,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <m.span style={{ opacity: reduce ? 1 : opacity }} className="inline-block">
        {word}
      </m.span>{" "}
    </>
  );
}

export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          reduce={reduce}
        />
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Offset reveal: managed column rises while DIY dims               */
/* ------------------------------------------------------------------ */

export function ScrollCompare({
  diy,
  managed,
}: {
  diy: ReactNode;
  managed: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.55"],
  });
  const diyOpacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.55]);
  const managedY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, 0]);
  const managedScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.95, 1]);

  return (
    <div ref={ref} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
      <m.div
        style={{ opacity: diyOpacity }}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
      >
        {diy}
      </m.div>
      <m.div
        style={{ y: managedY, scale: managedScale }}
        className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
      >
        {managed}
      </m.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Pinned horizontal pan: the showcase (the peak of the page)       */
/* ------------------------------------------------------------------ */

function ShowcaseCard({ item }: { item: YoutubeShowcaseItem }) {
  return (
    <article className="w-[78vw] shrink-0 sm:w-[52vw] lg:w-[34vw] lg:max-w-140">
      <div
        className="relative aspect-video overflow-hidden rounded-2xl border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`,
        }}
      >
        <p className="absolute inset-0 flex items-center p-5 text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.35)] sm:p-7 sm:text-3xl">
          {item.thumbnailText}
        </p>
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/80">
          Sample
        </span>
        <span className="absolute bottom-3 right-3 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {item.duration}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
          {item.channel}
        </p>
        <p className="mt-1 text-sm text-white/50">{item.niche}</p>
        <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/50">
              Subscribers
            </dt>
            <dd className="mt-1 text-lg font-semibold text-white">
              {item.subsBefore}
              <span className="px-1.5 text-white/30">→</span>
              <span className="text-brand-teal-light">{item.subsAfter}</span>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/50">
              Avg. views
            </dt>
            <dd className="mt-1 text-lg font-semibold text-white">
              {item.viewsBefore}
              <span className="px-1.5 text-white/30">→</span>
              <span className="text-brand-teal-light">{item.viewsAfter}</span>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function HorizontalShowcase({
  items,
  children,
  note,
}: {
  items: YoutubeShowcaseItem[];
  children: ReactNode;
  note?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [maxX, setMaxX] = useState(0);
  const [startX, setStartX] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const header = headerRef.current;
      if (!track || !header) return;
      // Below lg there is no fixed left rail; from lg up it is 4rem wide and
      // the track is clipped at its edge (see the wrapper below).
      const rail = window.innerWidth >= 1024 ? 64 : 0;
      // First card lines up with the heading's left edge.
      const start = Math.max(0, header.getBoundingClientRect().left - rail);
      // scrollWidth already includes the padding we set last time, so take
      // it back out before adding the freshly measured start offset.
      const currentPad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const content = track.scrollWidth - currentPad;
      setStartX(start);
      setMaxX(Math.max(0, start + content - (window.innerWidth - rail)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  const header = (
    <div
      ref={headerRef}
      className={`mx-auto w-full max-w-6xl ${reduce ? "" : "mb-8 sm:mb-10"}`}
    >
      {children}
      {note && <p className="mt-3 text-xs text-white/40">{note}</p>}
    </div>
  );

  if (reduce) {
    return (
      <div className={`py-16 sm:py-20 ${SECTION_X}`}>
        {header}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 [&>article]:w-auto">
          {items.map((item) => (
            <ShowcaseCard key={item.channel} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ height: `${items.length * 55 + 105}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 lg:pt-0">
        <div className={SECTION_X}>{header}</div>
        <div className="overflow-hidden lg:ml-16">
          <m.div
            ref={trackRef}
            style={{ x, paddingLeft: startX }}
            className="flex w-max gap-6 pr-12 sm:gap-10"
          >
            {items.map((item) => (
              <ShowcaseCard key={item.channel} item={item} />
            ))}
          </m.div>
        </div>
        <div className={`mt-8 sm:mt-10 ${SECTION_X}`}>
          <div className="mx-auto h-px w-full max-w-6xl bg-white/10">
            <m.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-px bg-brand-teal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Line-draw timeline                                               */
/* ------------------------------------------------------------------ */

type Step = { number: string; title: string; description: string };

function TimelineStep({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 0.7) / total],
    [0.25, 1],
  );
  return (
    <m.li
      style={{ opacity: reduce ? 1 : opacity }}
      className="relative pb-12 last:pb-0"
    >
      <span className="absolute -left-8.5 top-2 h-3 w-3 rounded-full border-2 border-brand-teal bg-brand-navy sm:-left-12.5" />
      <span className="text-3xl font-semibold text-brand-gold">{step.number}</span>
      <h3 className="mt-2 text-xl font-semibold text-brand-teal-light sm:text-2xl">
        {step.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
        {step.description}
      </p>
    </m.li>
  );
}

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.55"],
  });

  return (
    <div ref={ref} className="relative ml-2 mt-12 pl-8 sm:ml-4 sm:pl-12">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
      <m.div
        style={{
          scaleY: reduce ? 1 : scrollYProgress,
          transformOrigin: "top",
        }}
        className="absolute bottom-0 left-0 top-0 w-px bg-brand-teal"
      />
      <ol>
        {steps.map((step, i) => (
          <TimelineStep
            key={step.number}
            step={step}
            index={i}
            total={steps.length}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}
      </ol>
    </div>
  );
}
