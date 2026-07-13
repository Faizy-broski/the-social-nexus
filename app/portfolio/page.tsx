"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, X, Mouse } from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * Animated navy background — same technique as the Header's mobile bar:
 * a linear gradient panned via `.gradient-bg-pan` (globals.css) instead
 * of a flat `bg-brand-navy`, so the dark sections on this page have some
 * ambient motion at rest, not just on hover/interaction.
 */
const navyPanBg =
  "linear-gradient(120deg, var(--brand-navy) 0%, var(--brand-navy-light) 50%, var(--brand-navy) 100%)";

/**
 * PortfolioPage sections — dark theme
 * ------------------------------------------------------------------
 * Now built entirely on the site's actual design tokens instead of
 * the local #0B0B0B / #3AB5C0 / gradient-hex trio this file used
 * before:
 *   bg-brand-navy      section background      (was #0B0B0B)
 *   text-foreground    card title text         (was #121212)
 *   text-muted-foreground  card secondary text  (was #555555)
 *   bg-brand-teal       pills, buttons          (was #3AB5C0)
 *   .gradient-accent    "All" pill, heading accents (was the 3-stop hex gradient —
 *                        there's no green token in globals.css, same
 *                        reasoning ServicesSection already used)
 *
 * "Mockup View" now opens an in-page modal (MockupModal) instead of
 * navigating to /portfolio/[slug] — same page, no route change.
 *
 * NOTE ON DATA: same as before — representative ~14-item sample
 * covering every category, not the full 40+ item catalog. Extending
 * `portfolioItems` is pure data entry, no logic changes.
 */

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
    <section
      className="gradient-bg-pan relative overflow-hidden pt-20 pb-10 sm:pt-24"
      style={{ backgroundImage: navyPanBg }}
    >
     {/* ambient network glow — nods to "Nexus" without being a literal icon */}
           <div className="pointer-events-none absolute inset-0">
             <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
             <div
               className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
               style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
             />
             <NetworkLines />
           </div>

      <div className="relative scroll-reveal-row mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          Over 12+ Years Of <span className="gradient-text-animated">Consistently</span>
          <br />
          <span className="gradient-text-animated">Delivering</span> Excellence
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
          <ArrowDown className="animate-bounce mx-4 h-5 w-5 shrink-0 text-white" />
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
      <section
        className="gradient-bg-pan relative overflow-hidden py-14"
        style={{ backgroundImage: navyPanBg }}
      >
        {/* ambient network glow — same "Nexus" treatment as Services/Portfolio/FAQ */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
          <div
            className="animate-float absolute left-0 bottom-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
            style={{ animationDelay: "0.8s", animationDuration: "6s" }}
          />
          <NetworkLines />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          {/* Three standalone pill buttons */}
          <div
            role="tablist"
            className="scroll-reveal-row flex flex-wrap items-center justify-center gap-3"
          >
            {topTabs.map((tab) => {
              const isActive = tab === active;
              return (
                <a
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab)}
                  className={`press-scale rounded px-5 py-2.5 text-xl cursor-pointer font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-brand-teal text-white"
                      : "border border-white/25 text-white hover:border-brand-teal hover:text-brand-teal"
                  }`}
                >
                  {tab}
                </a>
              );
            })}
          </div>

          {/* key={active} replays the fade/slide-up entrance whenever the
              tab changes, same remount-to-replay trick used in
              TechnologiesSection's icon grid */}
          <div key={active} className="animate-fade-in-up mt-14">
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
    image: "/portfolio/10.webp",
  },
  {
    slug: "hotspotayr",
    title: "Hotspot Ayr",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/hotspotayr/",
    mockupHref: "/portfolio/hotspotayr",
    image: "/portfolio/12.webp",
  },
  {
    slug: "phone-doctor",
    title: "Phone Doctor",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/phonedoctorayr/",
    mockupHref: "/portfolio/phone-doctor",
    image: "/portfolio/6.webp",
  },
  {
    slug: "matlock",
    title: "Matlock Phones & Vapes",
    categories: ["E-commerce", "Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/matlock",
    mockupHref: "/portfolio/matlock",
    image: "/portfolio/3.webp",
  },
  {
    slug: "islamic-wall-arts",
    title: "Islamic Wall Arts",
    categories: ["Religious Donation", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/islamic-wall-arts",
    image: "/portfolio/4.webp",
  },
  {
    slug: "al-quran-islamic-education",
    title: "Al Quran Islamic Education",
    categories: ["Religious Donation"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/al-quran-islamic-education",
    image: "/portfolio/7.webp",
  },
  {
    slug: "gadgetsrepairltd",
    title: "Gadgets Repair Ltd",
    categories: ["Phone Repair", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/mygadgetrecycle/",
    mockupHref: "/portfolio/gadgetsrepairltd",
    image: "/portfolio/9.webp",
  },
  {
    slug: "cvs",
    title: "CVS Recovery",
    categories: ["Tyres", "Business"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/CVS/",
    mockupHref: "/portfolio/cvs",
    image: "/portfolio/27.png",
  },
    {
    slug: "labubu-offical",
    title: "Labubu Offical",
    categories: ["Portfolio", "Business", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://thesocialnexus.co.uk/labubuoffical/",
    mockupHref: "/portfolio/labubu-offical",
    image: "/portfolio/24.png",
  },
  {
    slug: "oww",
    title: "Outside Walla Walla",
    categories: ["Membership", "E-commerce"],
    stack: ["Elementor", "Membership", "WooCommerce"],
    previewHref: "https://thesocialnexus.co.uk/OWW",
    mockupHref: "/portfolio/oww",
    image: "/portfolio/5.webp",
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
];

const ITEMS_PER_PAGE = 9;

export function WebDevelopmentGrid() {
  const [filter, setFilter] = useState<SubCategory>("All");
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const openMockup = (item: PortfolioItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };
  const closeMockup = () => setModalOpen(false);

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
              className={`press-scale rounded px-4 py-2.5 cursor-pointer text-sm font-medium text-white transition-all duration-300 hover:opacity-90 ${
                isActive ? "gradient-accent" : "bg-brand-teal"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid + pagination */}
      <div>
        {/* key={filter + page} replays the stagger-in whenever the filter
            or page changes, same remount trick used elsewhere on the site */}
        <div
          key={`${filter}-${page}`}
          className="stagger-children grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {pageItems.map((item) => (
            <PortfolioCard key={item.slug} item={item} onMockupClick={openMockup} />
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
                  className={`press-scale flex h-12 w-12 items-center justify-center rounded-full text-xl cursor-pointer font-medium transition-all duration-300 ${
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

      <MockupModal item={activeItem} isOpen={modalOpen} onClose={closeMockup} />
    </div>
  );
}

function PortfolioCard({
  item,
  onMockupClick,
}: {
  item: PortfolioItem;
  onMockupClick: (item: PortfolioItem) => void;
}) {
  return (
    <TiltCard className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">
      {/* Screenshot — hover-scrolls the background over 8s */}
      <div className="group/thumb relative aspect-16/10 w-full overflow-hidden bg-brand-navy">
        <div
          className="absolute inset-0 bg-cover bg-top transition-[background-position] duration-8000 ease-linear group-hover/thumb:bg-bottom"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="opacity-0"
          aria-hidden="true"
        />
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-brand-teal opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0 sm:h-11 sm:w-11">
          <Mouse className="animate-float h-4 w-4 sm:h-7 sm:w-7" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 bg-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-foreground">
            Stack:{" "}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.stack.join(", ")}
          </span>
        </div>

        <div className="mt-auto flex gap-2">
          {item.previewHref ? (
            <a
              href={item.previewHref}
              target="_blank"
              rel="noreferrer"
              className="press-scale inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-brand-teal px-3 py-2 text-[10px] font-medium text-white transition-colors hover:bg-brand-teal-dark"
            >
              Preview <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : (
            <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-brand-teal/40 px-3 py-2 text-[10px] font-medium text-white/70">
              Preview <ArrowUpRight className="h-3 w-3" />
            </span>
          )}
          <button
            type="button"
            onClick={() => onMockupClick(item)}
            className="press-scale inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-brand-teal px-3 py-2 text-[10px] font-medium text-white transition-colors hover:bg-brand-teal-dark"
          >
            Mockup View <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ */
/* 3a. Mockup View modal — opens in-page instead of navigating         */
/* ------------------------------------------------------------------ */

function MockupModal({
  item,
  isOpen,
  onClose,
}: {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  // Escape-to-close + scroll lock while open. `item` is kept in state even
  // after closing (see WebDevelopmentGrid) so the panel content doesn't
  // flash empty mid-close-transition — only `isOpen` drives visibility.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center p-4 transition-opacity duration-300 sm:p-8 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} mockup preview`}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close mockup preview"
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/85 backdrop-blur-sm"
      />

      {/* panel */}
      <div
        className={`relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="press-scale absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/80 text-white transition-colors hover:bg-brand-navy"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="group/mockup relative aspect-video w-full shrink-0 overflow-hidden bg-brand-navy">
          <div
            className="absolute inset-0 bg-cover bg-top transition-[background-position] duration-6000 ease-linear group-hover/mockup:bg-bottom"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6 sm:p-8">
          <div>
            <h3 className="text-xl font-extrabold text-foreground sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.stack.join(" · ")}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            {item.previewHref && (
              <a
                href={item.previewHref}
                target="_blank"
                rel="noreferrer"
                className="brand-cta press-scale inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Visit Live Site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="press-scale inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Masonry gallery (Logo Design / Social Media Design tabs)        */
/* ------------------------------------------------------------------ */

const logoDesignImages = [
  "/logo-designs/1.png",
  "/logo-designs/2.png",
  "/logo-designs/3.png",
  "/logo-designs/4.png",
  "/logo-designs/5.png",
  "/logo-designs/6.png",
  "/logo-designs/7.png",
  "/logo-designs/8.png",
  "/logo-designs/9.png",
  "/logo-designs/10.png",
  "/logo-designs/11.png",
  "/logo-designs/12.png",
  "/logo-designs/13.png",
  "/logo-designs/14.png",
];

const socialMediaImages = [
  "/posts/1.png",
  "/posts/2.png",
  "/posts/3.png",
  "/posts/4.png",
  "/posts/5.png",
  "/posts/6.png",
  "/posts/7.png",
  "/posts/8.png",
  "/posts/9.png",
  "/posts/10.png",
  "/posts/11.png",
  "/posts/12.png",
  "/posts/13.png",
  "/posts/14.png",
  "/posts/15.png",
  "/posts/16.png",
  "/posts/17.png",
  "/posts/18.png",
  "/posts/19.png",
  "/posts/20.png",
  "/posts/21.png",
  "/posts/22.png",
  "/posts/23.png",
  "/posts/24.png",
  "/posts/25.png",
  "/posts/26.png",
  "/posts/27.png",
  "/posts/28.png",
  "/posts/29.png",
  "/posts/30.png",
  "/posts/31.png",
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
          className="scroll-reveal-row group/img relative mb-3 block break-inside-avoid overflow-hidden rounded-xl bg-white/5"
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
    // was `grid-flow-defence` — not a real Tailwind class, so the bento
    // span-packing (items with span:2 filling gaps left by earlier rows)
    // was silently not happening. `grid-flow-dense` is the actual utility
    // that enables dense packing.
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 grid-flow-dense auto-rows-35 sm:auto-rows-40">
      {resolved.map(({ src, span }, i) => (
        <a
          key={`${src}-${i}`}
          href={src}
          target="_blank"
          rel="noreferrer"
          style={{ gridRow: `span ${span}` }}
          className="scroll-reveal-row group/img relative block overflow-hidden rounded-xl bg-white/5"
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