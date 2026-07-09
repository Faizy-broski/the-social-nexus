"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * TechnologiesSection
 * ------------------------------------------------------------------
 * "Technologies we use" — a gradient pill tab bar that auto-advances
 * every 2s (matching the AUTO_INTERVAL your Elementor Custom Code JS
 * already used), pausing for 6s after a manual click, looping forever.
 * Each tab swap cross-fades the icon grid.
 *
 * Brand tokens:
 *   tab bar gradient   linear-gradient(135deg, #3AB5C0, #2a9faa)
 *   active pill        white bg, #3AB5C0 text
 *
 * Icon assets you'll need to drop in /public/tech/ — placeholders
 * below since I can't pull your WP media library. Slug = lowercase,
 * spaces → hyphens (e.g. "React Native" → react-native.svg).
 *
 * Two things I corrected rather than reproduced from your HTML:
 *  - The Database tab listed "Firebase" three times in a row (likely
 *    a copy-paste artifact) — deduped to one.
 *  - The Design tab included "Pinecone" and "ChromaDB" (vector DB
 *    tools, reused from the Database tab's icons) — dropped those
 *    two since they don't fit a "Design" tools list. Add them back
 *    if that inclusion was actually intentional.
 */

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
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const item = (name: string): TechItem => ({ name, slug: slugify(name) });

const tabs: TechTab[] = [
  {
    label: "Web Platform",
    items: [
      item("React Native"),
      item("Shopify"),
      item("Express"),
      item("Laravel"),
      item("WordPress"),
      item("Three Js"),
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
      item("Unreal Engine"),
    ],
  },
  {
    label: "Database",
    items: [
      item("MongoDB"),
      item("PostgreSQL"),
      item("Supabase"),
      item("MySql"),
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
      item("Adobe XD"),
      item("Adobe Photoshop"),
      item("Adobe Illustrator"),
      item("Canva"),
      item("Framer"),
      item("Blender"),
      item("Invision"),
      item("Sketch"),
    ],
  },
];

export function TechnologiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(startAuto, PAUSE_AFTER_CLICK_MS);
  };

  const active = tabs[activeIndex];

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-extrabold uppercase tracking-tight text-[#121212] sm:text-5xl">
          Technologies we use
        </h2>

        {/* Pill tab bar */}
        <div
          role="tablist"
          aria-label="Technology categories"
          className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center gap-1 rounded-full bg-linear-to-br from-[#3AB5C0] to-[#2a9faa] p-1.5 sm:flex-nowrap"
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.label}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleManualSelect(index)}
                className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-white font-semibold text-[#3AB5C0] shadow"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Icon grid — remounts on tab change so the fade-in replays */}
        <div key={activeIndex} className="tsn-fade-in mt-16">
          <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-6">
            {active.items.map((tech) => (
              <div key={tech.slug} className="flex flex-col items-center gap-3">
                <div
                  className="flex h-20 w-22 items-center justify-center bg-white ring-1 ring-neutral-200"
                  style={{
                    clipPath:
                      "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)",
                  }}
                >
                  <Image
                    src={`/tech/${tech.slug}.svg`}
                    alt={tech.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </div>
                <p className="text-center text-sm font-medium text-[#121212]">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tsn-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tsn-fade-in {
          animation: tsn-fade-in 0.35s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .tsn-fade-in { animation: none; }
        }
      `}</style>
    </section>
  );
}

export default TechnologiesSection;