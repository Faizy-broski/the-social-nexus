"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, Mouse } from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { TiltCard } from "@/components/motion/TiltCard";
import { Lightbox } from "@/components/home/Lightbox";

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
 * "Mockup View", the logo grid, and the social media gallery all open
 * their full-size image in a new browser tab on click.
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
    previewHref: "https://mobiledoctoruk.com/",
    mockupHref: "/portfolio/mobiledoctor",
    image: "/portfolio/mobiledoctor.jpg",
  },
  {
    slug: "hotspotayr",
    title: "Hotspot Ayr",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://hotspotayr.com/",
    mockupHref: "/portfolio/hotspotayr",
    image: "/portfolio/hotspot.jpg",
  },
  {
    slug: "phone-doctor",
    title: "Phone Doctor",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://phonedoctorayr.co.uk/",
    mockupHref: "/portfolio/phone-doctor",
    image: "/portfolio/Phone doctor.jpg",
  },
  {
    slug: "matlock",
    title: "Matlock Phones & Vapes",
    categories: ["E-commerce", "Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/matlock",
    image: "/portfolio/matlock.jpg",
  },
  {
    slug: "islamic-wall-arts",
    title: "Islamic Wall Arts",
    categories: ["Religious Donation", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://islamicwallarts.co.uk/",
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
    image: "/portfolio/alquran-islamic-education.jpg",
  },
  {
    slug: "gadgetsrepairltd",
    title: "Gadgets Repair Ltd",
    categories: ["Phone Repair", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/gadgetsrepairltd",
    image: "/portfolio/gadget-repaier.jpg",
  },
  {
    slug: "cvs",
    title: "CVS Recovery",
    categories: ["Tyres", "Business"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/cvs",
    image: "/portfolio/cvs.jpg",
  },
  {
    slug: "labubu-offical",
    title: "Labubu Offical",
    categories: ["Portfolio", "Business", "E-commerce"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/labubu-offical",
    image: "/portfolio/labubu-offical.jpg",
  },
  {
    slug: "oww",
    title: "Outside Walla Walla",
    categories: ["Membership", "E-commerce"],
    stack: ["Elementor", "Membership", "WooCommerce"],
    previewHref: null,
    mockupHref: "/portfolio/oww",
    image: "/portfolio/oww.jpg",
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
    previewHref: null,
    mockupHref: "/portfolio/ipmsystems",
    image: "/portfolio/IPMS systems.jpg",
  },
  {
    slug: "zaza-doner",
    title: "Zaza Doner",
    categories: ["Restaurants", "E-commerce"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/zaza-doner",
    image: "/portfolio/zaza-donner.jpg",
  },
  {
    slug: "total-tech-repair",
    title: "Total Tech Repair",
    categories: ["Phone Accessories", "E-commerce"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/total-tech-repair",
    image: "/portfolio/total-tech-repair.jpg",
  },
  {
    slug: "fix-to-go",
    title: "Fix To Go",
    categories: ["E-commerce", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/fix-to-go",
    image: "/portfolio/fixtogo.jpg",
  },
  {
    slug: "heywood",
    title: "Heywood Mobiles & Vapes",
    categories: ["Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/heywood",
    image: "/portfolio/heywood.jpg",
  },
  {
    slug: "techfixman",
    title: "Techfixman",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/techfixman",
    image: "/portfolio/techfixman.jpg",
  },
  {
    slug: "pci-computers",
    title: "PCI Computers",
    categories: ["IT Solution"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://pcicomputers.co.uk/",
    mockupHref: "/portfolio/pci-computers",
    image: "/portfolio/pci-computers.jpg",
  },
  {
    slug: "worix-it",
    title: "Worix IT",
    categories: ["Business", "IT Solution"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/worix-it",
    image: "/portfolio/worix-IT.jpg",
  },
  {
    slug: "icmobiletyre",
    title: "IC Mobile Tyre Fitting",
    categories: ["Tyres", "Business"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/icmobiletyre",
    image: "/portfolio/ic-mobile-tyres.jpg",
  },
  {
    slug: "pcxpress",
    title: "PC Xpress",
    categories: ["Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/pcxpress",
    image: "/portfolio/pcxpress.jpg",
  },
  {
    slug: "ifix",
    title: "iFix",
    categories: ["Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://ifixgadgetsltd.com/",
    mockupHref: "/portfolio/ifix",
    image: "/portfolio/ifix-old.jpg",
  },
  {
    slug: "mobitech-repair",
    title: "Mobitech Repair",
    categories: ["E-commerce", "Phone Repair", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/mobitech-repair",
    image: "/portfolio/mobitech-repair.jpg",
  },
  {
    slug: "zummunta",
    title: "Zummunta",
    categories: ["Religious Donation"],
    stack: ["Donation", "Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/zummunta",
    image: "/portfolio/Zummunta.jpg",
  },
  {
    slug: "mobi-fix",
    title: "Mobi Fix",
    categories: ["E-commerce", "Phone Repair"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: "https://mobifix.uk/",
    mockupHref: "/portfolio/mobi-fix",
    image: "/portfolio/mobifix.jpg",
  },
  {
    slug: "four-minds-security",
    title: "Four Minds Security",
    categories: ["Security"],
    stack: ["Elementor", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/four-minds-security",
    image: "/portfolio/four mind secuirty.jpg",
  },
  {
    slug: "wendy-bailye",
    title: "Wendy Bailye",
    categories: ["Business", "E-commerce", "Portfolio"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/wendy-bailye",
    image: "/portfolio/wendy.jpg",
  },
  {
    slug: "skora-care",
    title: "Skora Care",
    categories: ["E-commerce"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/skora-care",
    image: "/portfolio/skora-care.jpg",
  },
  {
    slug: "risetech",
    title: "Riseteck Ltd",
    categories: ["E-commerce", "Phone Accessories"],
    stack: ["Elementor", "WooCommerce", "WordPress"],
    previewHref: null,
    mockupHref: "/portfolio/risetech",
    image: "/portfolio/risetech.jpg",
  },
  {
    slug: "almustafa-online-academy",
    title: "Al Mustafa Online Academy",
    categories: ["Religious Donation", "Membership"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://almustafaonlineacademy.com/",
    mockupHref: "/portfolio/almustafa-online-academy",
    image: "/portfolio/almustafaonlineacademy.jpg",
  },
  {
    slug: "mw-institute",
    title: "MW Institute",
    categories: ["Business"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://mwinstitute.org.uk/",
    mockupHref: "/portfolio/mw-institute",
    image: "/portfolio/mwinstitute.jpg",
  },
  {
    slug: "phone-repair-melksham",
    title: "Phone Repair Melksham",
    categories: ["Phone Repair"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://phonerepairmelksham.co.uk/",
    mockupHref: "/portfolio/phone-repair-melksham",
    image: "/portfolio/phonerepairmelksham.jpg",
  },
  {
    slug: "ruqyah",
    title: "Ruqyah",
    categories: ["Religious Donation"],
    stack: ["Elementor", "WordPress"],
    previewHref: "https://ruqyah.org/",
    mockupHref: "/portfolio/ruqyah",
    image: "/portfolio/ruqyah.jpg",
  },
];

const ITEMS_PER_PAGE = 9;

export function WebDevelopmentGrid() {
  const [filter, setFilter] = useState<SubCategory>("All");
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
          {pageItems.map((item, i) => (
            <PortfolioCard
              key={item.slug}
              item={item}
              onOpenMockup={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            images={pageItems.map((item) => item.image)}
            titles={pageItems.map((item) => item.title)}
            index={lightboxIndex}
            onNavigate={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}

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
    </div>
  );
}

function PortfolioCard({
  item,
  onOpenMockup,
}: {
  item: PortfolioItem;
  onOpenMockup: () => void;
}) {
  return (
    <TiltCard className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">
      {/* Screenshot — hover-pans via object-position over 8s. Next/Image is
          the visible layer (not a raw CSS background-image), so it gets
          responsive srcset + lazy loading instead of downloading the
          full-resolution source twice. */}
      <div className="group/thumb relative aspect-16/10 w-full overflow-hidden bg-brand-navy">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-[object-position] duration-8000 ease-linear group-hover/thumb:object-bottom"
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
            onClick={onOpenMockup}
            className="press-scale inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded bg-brand-teal px-3 py-2 text-[10px] font-medium text-white transition-colors hover:bg-brand-teal-dark"
          >
            Mockup View <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Masonry gallery (Logo Design / Social Media Design tabs)        */
/* ------------------------------------------------------------------ */

const logoDesignImages = [
  "/logo-designs/1.webp",
  "/logo-designs/2.webp",
  "/logo-designs/3.webp",
  "/logo-designs/4.webp",
  "/logo-designs/5.webp",
  "/logo-designs/6.webp",
  "/logo-designs/7.webp",
  "/logo-designs/8.webp",
  "/logo-designs/9.webp",
  "/logo-designs/10.webp",
  "/logo-designs/11.webp",
  "/logo-designs/12.webp",
  "/logo-designs/13.webp",
  "/logo-designs/14.webp",
];

const socialMediaImages = [
  "/posts/1.webp",
  "/posts/2.webp",
  "/posts/3.webp",
  "/posts/4.webp",
  "/posts/5.webp",
  "/posts/6.webp",
  "/posts/7.webp",
  "/posts/8.webp",
  "/posts/9.webp",
  "/posts/10.webp",
  "/posts/11.webp",
  "/posts/12.webp",
  "/posts/13.webp",
  "/posts/14.webp",
  "/posts/15.webp",
  "/posts/16.webp",
  "/posts/17.webp",
  "/posts/18.webp",
  "/posts/19.webp",
  "/posts/20.webp",
  "/posts/21.webp",
  "/posts/22.webp",
  "/posts/23.webp",
  "/posts/24.webp",
  "/posts/25.webp",
  "/posts/26.webp",
  "/posts/27.webp",
  "/posts/28.webp",
  "/posts/29.webp",
  "/posts/30.webp",
  "/posts/31.webp",
];

function MasonryGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex-col columns-1 gap-3 sm:columns-2 lg:columns-4 xl:columns-4">
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => setLightboxIndex(i)}
          className="scroll-reveal-row group/img relative mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl bg-white/5"
        >
          <Image
            src={src}
            alt=""
            width={400}
            height={400}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
          />
        </button>
      ))}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    // was `grid-flow-defence` — not a real Tailwind class, so the bento
    // span-packing (items with span:2 filling gaps left by earlier rows)
    // was silently not happening. `grid-flow-dense` is the actual utility
    // that enables dense packing.
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 grid-flow-dense auto-rows-35 sm:auto-rows-40">
      {resolved.map(({ src, span }, i) => (
        <button
          key={`${src}-${i}`}
          type="button"
          onClick={() => setLightboxIndex(i)}
          style={{ gridRow: `span ${span}` }}
          className="scroll-reveal-row group/img relative block cursor-pointer overflow-hidden rounded-xl bg-white/5"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover/img:scale-105"
          />
        </button>
      ))}

      {lightboxIndex !== null && (
        <Lightbox
          images={resolved.map((r) => r.src)}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default PortfolioTabs;