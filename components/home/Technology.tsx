"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const AUTO_INTERVAL_MS = 3000;
const PAUSE_AFTER_CLICK_MS = 4000;

type TechItem = {
  name: string;
  slug: string;
};

type TechTab = {
  label: string;
  items: TechItem[];
};

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Second argument overrides the auto-generated slug for items whose
 * display name doesn't match the actual filename in /public/tech —
 * e.g. "Adobe XD" displays that way but the file is just xd.png.
 * Confirmed against the actual /public/tech folder contents:
 *   Three Js         -> threejs      (file has no dash)
 *   Unreal Engine     -> unreal       (file drops "Engine")
 *   PostgreSQL        -> postgre-sql  (file has a dash mid-word)
 *   MySql             -> my-sql       (file has a dash mid-word)
 *   Adobe XD          -> xd           (file drops "Adobe")
 *   Adobe Photoshop   -> photoshop    (file drops "Adobe")
 *   Adobe Illustrator -> illustrator  (file drops "Adobe")
 *   Sketch            -> sketch-svgrepo-com (file keeps the download suffix)
 */
const item = (name: string, iconOverride?: string): TechItem => ({
  name,
  slug: iconOverride ?? slugify(name),
});

const tabs: TechTab[] = [
  {
    label: "Web Platform",
    items: [
      item("React Native"),
      item("Shopify"),
      item("Express"),
      item("Laravel"),
      item("WordPress"),
      item("Three Js", "threejs"),
    ],
  },
  {
    label: "Mobile App Platform",
    items: [
      item("React Native"),
      item("Shopify"),
      item("Expo"),
      item("Swift"),
      item("Kotlin"),
      item("Unity"),
      item("Unreal Engine", "unreal"),
    ],
  },
  {
    label: "Database",
    items: [
      item("MongoDB"),
      item("PostgreSQL", "postgre-sql"),
      item("Supabase"),
      item("MySql", "my-sql"),
      item("SqLite"),
      item("Vector Database"),
      item("Pinecone"),
      item("ChromaDB"),
      item("Firebase"),
    ],
  },
  {
    label: "Cloud & Devops",
    items: [
      item("AWS Lambda"),
      item("AWS EC2"),
      item("AWS S3"),
      item("Google Cloud"),
      item("MS Azure"),
      item("Docker"),
      item("Kubernetes"),
      item("GitHub"),
      item("GitLab"),
      item("BitBucket"),
    ],
  },
  {
    label: "Design",
    items: [
      item("Figma"),
      item("Adobe XD", "xd"),
      item("Adobe Photoshop", "photoshop"),
      item("Adobe Illustrator", "illustrator"),
      // item("Canva"),
      // item("Framer"),
      // item("Blender"),
      item("Invision"),
      // item("Sketch", "sketch-svgrepo-com"),
    ],
  },
];

export function TechnologiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement | null>(null);


  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % tabs.length);
    }, AUTO_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [startAuto]);

  // Keep the active pill scrolled into view on mobile — but scroll ONLY
  // the tab bar's own scroll container, never the page. scrollIntoView()
  // walks every scrollable ancestor (including the window), so if this
  // section is off-screen when the auto-advance timer fires, it was
  // yanking the whole page down to it. Manually computing scrollLeft on
  // tabListRef and calling scrollTo() there confines the scroll to just
  // that horizontal strip.
  useEffect(() => {
    const container = tabListRef.current;
    const activeTab = tabRefs.current[activeIndex];
    if (!container || !activeTab) return;

    const containerWidth = container.clientWidth;
    const tabLeft = activeTab.offsetLeft;
    const tabWidth = activeTab.offsetWidth;

    const targetScrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [activeIndex]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      startAuto();
      setIsPaused(false);
    }, PAUSE_AFTER_CLICK_MS);
  };

  const active = tabs[activeIndex];

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal variant="up" richer className="text-center">
          <p className="text-sm font-semibold text-brand-teal-dark">
            Technologies
          </p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="gradient-text-animated">Technologies</span> we use
          </h2>
        </Reveal>

        {/* Pill tab bar — horizontally scrollable on mobile so labels
            like "Mobile App Platform" never wrap or get squeezed;
            becomes an even-width, non-scrolling row from sm: up. */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Technology categories"
          className="scrollbar-none mx-auto mt-8 flex max-w-4xl items-center gap-1 overflow-x-auto rounded-full bg-linear-to-br from-brand-teal to-brand-teal-dark p-1.5 sm:mt-10 sm:flex-nowrap sm:overflow-visible"
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.label}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleManualSelect(index)}
                className={`press-scale relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-200 sm:flex-1 sm:px-4 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "bg-white font-semibold text-brand-teal shadow"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {tab.label}

                {/* Fill bar showing progress toward the next auto-advance.
                    Keyed on activeIndex so it restarts from 0 each time;
                    animation-play-state freezes it during the post-click
                    pause window instead of resetting, so it resumes from
                    wherever it was once auto-advance kicks back in. */}
                {isActive && (
                  <span
                    key={activeIndex}
                    aria-hidden
                    className="animate-tab-progress absolute inset-x-2 -bottom-0.5 h-[2.5px] origin-left scale-x-0 rounded-full bg-brand-gold/70"
                    style={{
                      animationDuration: `${AUTO_INTERVAL_MS}ms`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Icon grid — remounts on tab change so each tile replays its
            entrance via `.stagger-children` (globals.css), cascading in
            one tile at a time instead of the whole grid fading as a block. */}
        <div
          key={activeIndex}
          className="stagger-children mt-10 grid grid-cols-3 gap-x-4 gap-y-7 sm:mt-16 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 md:grid-cols-6"
        >
          {active.items.map((tech) => (
            <div
              key={tech.slug}
              className="group flex flex-col items-center gap-2 sm:gap-3"
            >
              <div className="relative">
                {/* teal glow bloom behind the tile on hover */}
                <span className="pointer-events-none cursor-pointer absolute inset-0 scale-50 rounded-2xl opacity-0 transition-all duration-300 ease-out" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-1 sm:h-20 sm:w-20">
                  <Image
                    src={`/tech/${tech.slug}.png`}
                    alt={tech.name}
                    width={36}
                    height={36}
                    className="h-12 w-12 object-contain transition-transform duration-300 ease-out group-hover:scale-110 sm:h-16 sm:w-16"
                  />
                </div>
              </div>
              <p className="text-center text-xs font-medium text-foreground transition-colors duration-300 group-hover:text-brand-teal-dark sm:text-sm">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologiesSection;
