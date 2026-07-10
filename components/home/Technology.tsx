"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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

    const targetScrollLeft =
      tabLeft - containerWidth / 2 + tabWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [activeIndex]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(startAuto, PAUSE_AFTER_CLICK_MS);
  };

  const active = tabs[activeIndex];

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight text-[#121212] sm:text-4xl lg:text-5xl">
          Technologies we use
        </h2>

        {/* Pill tab bar — horizontally scrollable on mobile so labels
            like "Mobile App Platform" never wrap or get squeezed;
            becomes an even-width, non-scrolling row from sm: up. */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Technology categories"
          className="scrollbar-none mx-auto mt-8 flex max-w-4xl items-center gap-1 overflow-x-auto rounded-full bg-linear-to-br from-[#3AB5C0] to-[#2a9faa] p-1.5 sm:mt-10 sm:flex-nowrap sm:overflow-visible"
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
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-200 sm:flex-1 sm:px-4 sm:py-2.5 sm:text-sm ${
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
        <div key={activeIndex} className="tsn-fade-in mt-10 sm:mt-16">
          <div className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 md:grid-cols-6">
            {active.items.map((tech) => (
              <div key={tech.slug} className="flex flex-col items-center gap-2 sm:gap-3">
                <div
                  className="flex h-16 w-18 items-center justify-center bg-white ring-1 ring-neutral-200 sm:h-20 sm:w-22"
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
                    className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                  />
                </div>
                <p className="text-center text-xs font-medium text-[#121212] sm:text-sm">
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
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default TechnologiesSection;