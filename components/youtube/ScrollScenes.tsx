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
import Image from "next/image";
import { Play, type LucideIcon } from "lucide-react";
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

type PinnedItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Background photo, served from /public. */
  image: string;
};

// Different drift origins so neighbouring photos don't all move the same way.
const ORIGINS = ["20% 30%", "80% 40%", "40% 80%", "70% 20%"];

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
              <div
                key={item.title}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-brand-teal-light">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
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
      <div className="sticky top-0 h-screen overflow-hidden bg-brand-navy">
        {/* Photography: one full-bleed frame per service, crossfading while
            each drifts slowly so the stills read as footage. */}
        {items.map((item, i) => (
          <m.div
            key={item.image}
            aria-hidden="true"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="yt-kenburns absolute inset-0"
              style={{ transformOrigin: ORIGINS[i % ORIGINS.length] }}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="100vw"
                quality={70}
                priority={i === 0}
                className="object-cover"
              />
            </div>
          </m.div>
        ))}

        {/* Scrim only where the type sits: heavy on the left, clear on the
            right so the photograph stays the hero. */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-brand-navy via-brand-navy/75 to-brand-navy/5 lg:via-brand-navy/55" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-navy via-transparent to-brand-navy/70" />

        <div
          className={`relative flex h-full flex-col justify-between pb-20 pt-24 sm:pb-10 lg:pt-16 ${SECTION_X}`}
        >
          <div className="mx-auto w-full max-w-6xl">{children}</div>

          <div className="mx-auto w-full max-w-6xl">
            <div className="relative min-h-60 sm:min-h-64 lg:min-h-72">
              {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === active;
                return (
                  <m.div
                    key={item.title}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : i < active ? -24 : 24,
                      filter: isActive ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-x-0 bottom-0 max-w-2xl"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                      <Icon className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                      {item.description}
                    </p>
                  </m.div>
                );
              })}
            </div>

            {/* Progress rail: one tick per service; titles from lg up. */}
            <ul className="mt-8 grid grid-flow-col auto-cols-fr gap-2 sm:gap-3">
              {items.map((item, i) => (
                <li key={item.title}>
                  <span className="block h-px w-full bg-white/20">
                    <span
                      className={`block h-px origin-left bg-brand-gold transition-transform duration-700 ${
                        i <= active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                  <span
                    className={`mt-3 hidden text-[0.7rem] font-medium uppercase tracking-wide transition-colors duration-500 lg:block ${
                      i === active ? "text-white" : "text-white/35"
                    }`}
                  >
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
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

function ShowcaseCard({
  item,
  index,
  count,
  progress,
  animated,
}: {
  item: YoutubeShowcaseItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  // Which card the pan is currently "on", as a fractional index. Cards fade
  // and shrink slightly with distance from it, and the photo inside each
  // card slides against the card for depth.
  const focus = useTransform(progress, (v) => v * (count - 1));
  const distance = useTransform(focus, (f) => Math.min(Math.abs(index - f), 1));
  const scale = useTransform(distance, (d) => 1 - d * 0.06);
  const opacity = useTransform(distance, (d) => 1 - d * 0.5);
  const photoX = useTransform(focus, (f) => (index - f) * -36);

  return (
    <m.article
      style={animated ? { scale, opacity } : undefined}
      className="w-[80vw] shrink-0 sm:w-[56vw] lg:w-[38vw] lg:max-w-160"
    >
      <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-brand-navy-light">
        <m.div
          style={animated ? { x: photoX } : undefined}
          className="absolute -inset-x-10 inset-y-0"
        >
          <div className="yt-kenburns absolute inset-0">
            <Image
              src={item.image}
              alt={`${item.channel}: sample video thumbnail`}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              quality={70}
              className="object-cover"
            />
          </div>
        </m.div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/30" />

        <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/85 backdrop-blur-md">
          Sample
        </span>

        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
        >
          <Play className="ml-0.5 h-6 w-6 fill-white" />
        </span>

        <p className="absolute inset-x-5 bottom-5 pr-14 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
          {item.thumbnailText}
        </p>
        <span className="absolute bottom-4 right-4 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
          {item.duration}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <p className="text-base font-semibold text-white">{item.channel}</p>
          <p className="mt-0.5 text-sm text-white/50">{item.niche}</p>
        </div>
        <dl className="flex gap-7 sm:text-right">
          <div>
            <dt className="text-[0.65rem] uppercase tracking-wide text-white/45">
              Subscribers
            </dt>
            <dd className="mt-1 text-sm font-semibold text-white">
              {item.subsBefore}
              <span className="px-1 text-white/30">→</span>
              <span className="text-brand-teal-light">{item.subsAfter}</span>
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-wide text-white/45">
              Avg. views
            </dt>
            <dd className="mt-1 text-sm font-semibold text-white">
              {item.viewsBefore}
              <span className="px-1 text-white/30">→</span>
              <span className="text-brand-teal-light">{item.viewsAfter}</span>
            </dd>
          </div>
        </dl>
      </div>
    </m.article>
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
          {items.map((item, i) => (
            <ShowcaseCard
              key={item.channel}
              item={item}
              index={i}
              count={items.length}
              progress={scrollYProgress}
              animated={false}
            />
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
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] lg:ml-16">
          <m.div
            ref={trackRef}
            style={{ x, paddingLeft: startX }}
            className="flex w-max gap-6 pr-12 sm:gap-10"
          >
            {items.map((item, i) => (
              <ShowcaseCard
                key={item.channel}
                item={item}
                index={i}
                count={items.length}
                progress={scrollYProgress}
                animated
              />
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
