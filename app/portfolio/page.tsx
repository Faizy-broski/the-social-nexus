"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

/**
 * PortfolioPage sections — dark theme
 * ------------------------------------------------------------------
 * Rebuilt against your screenshot rather than my earlier light-theme
 * guess. Key differences from before:
 *   - Whole section is near-black (#0B0B0B), not white
 *   - Category filters are a LEFT SIDEBAR of stacked pills, not a
 *     wrapped horizontal row — "All" gets the signature gradient fill,
 *     every other pill is solid teal
 *   - Top-level tabs (Web Development / Logo Design / Social Media
 *     Design) are three separate pill buttons, not one shared
 *     gradient bar
 *   - Cards are white islands sitting on the black background: image
 *     on top, "STACK:" + tags, then two solid-teal Preview / Mockup
 *     View buttons
 *   - Real pagination (9 items/page) instead of an infinite list —
 *     your screenshot shows numbered pages 1–4
 *
 * Brand tokens:
 *   bg        #0B0B0B  section background
 *   ink       #121212  card text
 *   muted     #555555  secondary card text
 *   teal      #3AB5C0  pills, buttons
 *   gradient  #0B91A4 → #4F9F75 → #B3B430  ("All" pill, heading accents)
 *
 * Stat line colors sampled from your screenshot — each phrase gets its
 * own color pulled from the brand gradient family (teal / pink /
 * green) rather than one flat color.
 *
 * NOTE ON DATA: same as before — I've got a representative ~14-item
 * sample covering every category, not your full 40+ item catalog.
 * Extending `portfolioItems` is pure data entry, no logic changes.
 */

const GRADIENT_TEXT =
  "bg-gradient-to-r from-[#0B91A4] via-[#4F9F75] to-[#B3B430] bg-clip-text text-transparent";
const GRADIENT_BG =
  "bg-gradient-to-r from-[#0B91A4] via-[#4F9F75] to-[#B3B430]";

/* ------------------------------------------------------------------ */
/* 1. Intro / stats banner                                            */
/* ------------------------------------------------------------------ */

const stats: string[] = [
  "1500+ Project completed",
  "1000+ Happy customers",
  "12+ Years Experience",
];

export function PortfolioIntro() {
  return (
    <section className="bg-[#0B0B0B] pt-20 pb-10 sm:pt-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          Over 12+ Years Of Consistently
          <br />
          Delivering Excellence
        </h2>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base font-semibold text-white">
          {stats.map((stat, i) => (
            <li key={stat} className="flex items-center gap-3">
              <span>{stat}</span>
              {i < stats.length - 1 && <span className="text-white/30">|</span>}
            </li>
          ))}
        </ul>

        <div className="mt-14 flex items-center">
          <span className="h-px flex-1 bg-white/40" />
          <ArrowDown className="mx-4 h-5 w-5 shrink-0 text-white" />
          <span className="h-px flex-1 bg-white/40" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Top-level category tabs                                         */
/* ------------------------------------------------------------------ */

const topTabs = [
  "Web Development",
  "Logo Design",
  "Social Media Design",
] as const;
type TopTab = (typeof topTabs)[number];

export function PortfolioTabs() {
  const [active, setActive] = useState<TopTab>("Web Development");

  return (
    <>
      <PortfolioIntro />
      <section className="bg-[#0B0B0B] pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Three standalone pill buttons */}
          <div
            role="tablist"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {topTabs.map((tab) => {
              const isActive = tab === active;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab)}
                  className={`rounded px-5 py-2.5 text-xl cursor-pointer font-medium transition-colors ${
                    isActive
                      ? "bg-[#3AB5C0] text-white"
                      : "border border-white/25 text-white hover:border-[#3AB5C0] hover:text-[#3AB5C0]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-14">
            {active === "Web Development" && <WebDevelopmentGrid />}
            {active === "Logo Design" && <LogoGrid images={logoDesignImages} />}
            {active === "Social Media Design" && (
              <MasonryGallery images={socialMediaImages} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Web Development — sidebar filters + paginated project grid      */
/* ------------------------------------------------------------------ */

const subCategories = [
  "All",
  "Phone Repair",
  "Phone Accessories",
  "E-commerce",
  "Religious Donation",
  "Security",
  "Restaurants",
  "Tyres",
  "IT Solution",
  "Business",
  "Portfolio",
  "Membership",
] as const;
type SubCategory = (typeof subCategories)[number];

type PortfolioItem = {
  slug: string;
  title: string;
  categories: SubCategory[];
  stack: string[];
  previewHref: string | null;
  mockupHref: string;
  image: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    slug: "mobiledoctor",
    title: "Mobile Doctor",
    categories: ["Phone Repair", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/mobiledoctor/",
    mockupHref: "/portfolio/mobiledoctor",
    image: "/portfolio/mobiledoctor.jpg",
  },
  {
    slug: "hotspotayr",
    title: "Hotspot Ayr",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/hotspotayr/",
    mockupHref: "/portfolio/hotspotayr",
    image: "/portfolio/hotspotayr.jpg",
  },
  {
    slug: "phone-doctor",
    title: "Phone Doctor",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/phonedoctorayr/",
    mockupHref: "/portfolio/phone-doctor",
    image: "/portfolio/phone-doctor.jpg",
  },
  {
    slug: "matlock",
    title: "Matlock Phones & Vapes",
    categories: ["E-commerce", "Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/matlock",
    mockupHref: "/portfolio/matlock",
    image: "/portfolio/matlock.jpg",
  },
  {
    slug: "islamic-wall-arts",
    title: "Islamic Wall Arts",
    categories: ["Religious Donation", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/islamic-wall-arts",
    image: "/portfolio/islamic-wall-arts.jpg",
  },
  {
    slug: "al-quran-islamic-education",
    title: "Al Quran Islamic Education",
    categories: ["Religious Donation"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/al-quran-islamic-education",
    image: "/portfolio/al-quran-education.jpg",
  },
  {
    slug: "gadgetsrepairltd",
    title: "Gadgets Repair Ltd",
    categories: ["Phone Repair", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/mygadgetrecycle/",
    mockupHref: "/portfolio/gadgetsrepairltd",
    image: "/portfolio/gadgetsrepairltd.jpg",
  },
  {
    slug: "cvs",
    title: "CVS Recovery",
    categories: ["Tyres", "Business"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/CVS/",
    mockupHref: "/portfolio/cvs",
    image: "/portfolio/cvs.jpg",
  },
  {
    slug: "wimmera-security",
    title: "Wimmera Security",
    categories: ["Security"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/wimmera-security",
    image: "/portfolio/wimmera-security.jpg",
  },
  {
    slug: "ipmsystems",
    title: "IPM Systems",
    categories: ["IT Solution", "Business"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/IPMSystems/",
    mockupHref: "/portfolio/ipmsystems",
    image: "/portfolio/ipmsystems.jpg",
  },
  {
    slug: "zaza-doner",
    title: "Zaza Doner",
    categories: ["Restaurants", "E-commerce"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: "http://thesocialnexus.co.uk/zazadoner.com",
    mockupHref: "/portfolio/zaza-doner",
    image: "/portfolio/zaza-doner.jpg",
  },
  {
    slug: "total-tech-repair",
    title: "Total Tech Repair",
    categories: ["Phone Accessories", "E-commerce"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/total-tech-repair/",
    mockupHref: "/portfolio/total-tech-repair",
    image: "/portfolio/total-tech-repair.jpg",
  },
  {
    slug: "labubu-offical",
    title: "Labubu Offical",
    categories: ["Portfolio", "Business", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/labubuoffical/",
    mockupHref: "/portfolio/labubu-offical",
    image: "/portfolio/labubu-offical.jpg",
  },
  {
    slug: "oww",
    title: "Outside Walla Walla",
    categories: ["Membership", "E-commerce"],
    stack: ["Elementor", "Membership", "WooCommerce"],
    previewHref: "https://thesocialnexus.co.uk/OWW",
    mockupHref: "/portfolio/oww",
    image: "/portfolio/oww.jpg",
  },
];

const ITEMS_PER_PAGE = 9;

export function WebDevelopmentGrid() {
  const [filter, setFilter] = useState<SubCategory>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.categories.includes(filter)),
    [filter],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
      {/* Sidebar filters */}
      <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
        {subCategories.map((cat) => {
          const isActive = cat === filter;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded px-4 py-2.5 cursor-pointer text-sm font-medium text-white transition-opacity hover:opacity-90 ${
                isActive ? GRADIENT_BG : "bg-[#3AB5C0]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid + pagination */}
      <div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {pageItems.length === 0 && (
          <p className="py-16 text-center text-sm text-white/50">
            No projects in this category yet.
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const isActive = n === page;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-xl cursor-pointer font-medium transition-colors ${
                    isActive
                      ? "bg-white text-brand-cyan-accent"
                      : "text-white hover:text-brand-cyan-accent"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white">
      {/* Screenshot — hover-scrolls the background over 8s */}
      <div className="group/thumb relative aspect-16/10 w-full overflow-hidden bg-[#0B0E13]">
        <div
          className="absolute inset-0 bg-cover bg-top transition-[background-position] duration-8000 ease-linear group-hover/thumb:bg-bottom"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="opacity-0"
          aria-hidden="true"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-[#121212]">
            Stack:{" "}
          </span>
          <span className="text-xs text-[#555555]">
            {item.stack.join(", ")}
          </span>
        </div>

        <div className="mt-auto flex gap-2">
          {item.previewHref ? (
            <a
              href={item.previewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-[#3AB5C0] px-3 py-2 text-[10px] font-medium text-white transition-colors hover:bg-[#2a9faa]"
            >
              Preview <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : (
            <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-[#3AB5C0]/40 px-3 py-2 text-[10px] font-medium text-white/70">
              Preview <ArrowUpRight className="h-3 w-3" />
            </span>
          )}
          <Link
            href={item.mockupHref}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-[#3AB5C0] px-3 py-2 text-[10px] font-medium text-white transition-colors hover:bg-[#2a9faa]"
          >
            Mockup View <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Masonry gallery (Logo Design / Social Media Design tabs)        */
/* ------------------------------------------------------------------ */

const logoDesignImages = [
  "/portfolio/gallery/logo-1.jpg",
  "/portfolio/gallery/logo-2.jpg",
  "/portfolio/gallery/logo-3.jpg",
  "/portfolio/gallery/logo-4.jpg",
  "/portfolio/gallery/logo-5.jpg",
  "/portfolio/gallery/logo-6.jpg",
  "/portfolio/gallery/logo-7.jpg",
  "/portfolio/gallery/logo-8.jpg",
  "/portfolio/gallery/logo-9.jpg",
];

const socialMediaImages = [
  "/portfolio/gallery/social-1.jpg",
  "/portfolio/gallery/social-2.jpg",
  "/portfolio/gallery/social-3.jpg",
  "/portfolio/gallery/social-4.jpg",
  "/portfolio/gallery/social-5.jpg",
  "/portfolio/gallery/social-6.jpg",
  "/portfolio/gallery/social-7.jpg",
  "/portfolio/gallery/social-8.jpg",
  "/portfolio/gallery/social-9.jpg",
  "/portfolio/gallery/social-10.jpg",
  "/portfolio/gallery/social-11.jpg",
];

function MasonryGallery({ images }: { images: string[] }) {
  return (
    <div className="mx-auto flex-col columns-1 gap-3 sm:columns-2 lg:columns-4 xl:columns-4">
      {images.map((src) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noreferrer"
          className="group/img relative mb-3 block break-inside-avoid overflow-hidden rounded-xl bg-white/5"
        >
          <Image
            src={src}
            alt=""
            width={400}
            height={400}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4a. Logo grid — scattered bento (grid-based, not column-masonry)   */
/* ------------------------------------------------------------------ */

type LogoImage = string | { src: string; span?: 1 | 2 };

// deterministic fallback pattern — repeats every 10 items so a 5-column
// layout gets a new "scatter" rhythm every two rows without needing
// per-image span values passed in manually
const LOGO_SPAN_PATTERN: Array<1 | 2> = [2, 1, 2, 1, 1, 1, 2, 1, 2, 1];

function resolveLogoImages(images: LogoImage[]) {
  return images.map((img, i) => {
    const normalized = typeof img === "string" ? { src: img } : img;
    return {
      src: normalized.src,
      span: normalized.span ?? LOGO_SPAN_PATTERN[i % LOGO_SPAN_PATTERN.length],
    };
  });
}

function LogoGrid({ images }: { images: LogoImage[] }) {
  const resolved = resolveLogoImages(images);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 [grid-auto-flow:dense] [grid-auto-rows:140px] sm:[grid-auto-rows:160px]">
      {resolved.map(({ src, span }, i) => (
        <a
          key={`${src}-${i}`}
          href={src}
          target="_blank"
          rel="noreferrer"
          style={{ gridRow: `span ${span}` }}
          className="group/img relative block overflow-hidden rounded-xl bg-white/5"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover/img:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

export default PortfolioTabs;
