"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoveVertical } from "lucide-react";
import NetworkLines from "../contact/network-lines";

type PortfolioItem = {
  slug: string;
  title: string;
  href: string;
  image: string;
};

const items: PortfolioItem[] = [
  { slug: "matlock", title: "Matlock Phones & Vapes", href: "/portfolio/matlock", image: "/portfolio/matlock.jpg" },
  { slug: "oww", title: "Outside Walla Walla", href: "/portfolio/oww", image: "/portfolio/oww.jpg" },
  { slug: "islamic-wall-arts", title: "Islamic Wall Arts", href: "/portfolio/islamic-wall-arts", image: "/portfolio/islamic-wall-arts.jpg" },
  { slug: "al-quran-islamic-education", title: "Al Quran Islamic Education", href: "/portfolio/al-quran-islamic-education", image: "/portfolio/al-quran-education.jpg" },
  { slug: "zummunta", title: "Zummunta", href: "/portfolio/zummunta", image: "/portfolio/zummunta.jpg" },
  { slug: "mobifix", title: "MobiFix", href: "/portfolio/mobifix", image: "/portfolio/mobifix.jpg" },
  { slug: "gadgetsrepairltd", title: "Gadgets Repair Ltd", href: "/portfolio/gadgetsrepairltd", image: "/portfolio/gadgetsrepairltd.jpg" },
  { slug: "four-minds", title: "Four Minds", href: "/portfolio/four-minds", image: "/portfolio/four-minds.jpg" },
  { slug: "mobiledoctor", title: "Mobile Doctor", href: "/portfolio/mobiledoctor", image: "/portfolio/mobiledoctor.jpg" },
  { slug: "hotspotayr", title: "Hotspot Ayr", href: "/portfolio/hotspotayr", image: "/portfolio/hotspotayr.jpg" },
  { slug: "phone-doctor", title: "Phone Doctor", href: "/portfolio/phone-doctor", image: "/portfolio/phone-doctor.jpg" },
  { slug: "mobi-fix", title: "Mobi-Fix", href: "/portfolio/mobi-fix", image: "/portfolio/mobi-fix.jpg" },
];

const rowA = items.slice(0, 6);
const rowB = items.slice(6, 12);

export function PortfolioSection() {
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  // Measure the actual rendered card width (+ gap) at click time, since
  // card size now varies per breakpoint (w-64 → sm:w-72 → md:w-80 →
  // lg:w-85). A hardcoded CARD_WIDTH would desync the scroll amount
  // from the real card size on mobile/tablet.
  const getStep = (row: HTMLDivElement | null) => {
    if (!row) return 0;
    const firstCard = row.firstElementChild as HTMLElement | null;
    if (!firstCard) return 0;
    const styles = getComputedStyle(row);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return firstCard.getBoundingClientRect().width + gap;
  };

  const scrollBoth = (direction: 1 | -1) => {
    const stepA = getStep(rowARef.current);
    const stepB = getStep(rowBRef.current);
    rowARef.current?.scrollBy({ left: direction * stepA, behavior: "smooth" });
    // Row B moves opposite to Row A, same as your RTL/LTR sync script.
    rowBRef.current?.scrollBy({ left: -direction * stepB, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-brand-navy py-14 sm:py-20 lg:py-24">
      {/* ambient network glow — nods to "Nexus" without being a literal icon */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]" />
        <NetworkLines />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 sm:items-start">
          <div>
            <p className="text-xs font-semibold text-brand-gold sm:text-sm">Portfolio</p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our <span className="gradient-text">Work</span>
            </h2>
          </div>

          <Link
            href="/portfolio-page"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/30 text-center text-xs font-semibold text-white transition-colors hover:border-brand-teal hover:bg-brand-teal/10 sm:h-24 sm:w-24 sm:text-sm"
          >
            View All
          </Link>
        </div>

        {/* Row A */}
        <div
          ref={rowARef}
          className="tsn-row-scroll mt-8 flex gap-3 overflow-x-auto scroll-smooth sm:mt-14 sm:gap-4"
        >
          {rowA.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Row B */}
        <div
          ref={rowBRef}
          className="tsn-row-scroll mt-3 flex gap-3 overflow-x-auto scroll-smooth sm:mt-4 sm:gap-4"
        >
          {rowB.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Chevron controls — move both rows at once, opposite directions */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-12">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollBoth(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-teal hover:bg-brand-teal/10 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollBoth(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-teal hover:bg-brand-teal/10 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <style>{`
        .tsn-row-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tsn-row-scroll::-webkit-scrollbar {
          display: none;
        }
        @keyframes tsn-float {
          from { transform: translateY(-4px); }
          50%  { transform: translateY(4px); }
          to   { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tsn-float { animation: none; }
        }
      `}</style>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href={item.href}
      className="group relative block w-64 shrink-0 overflow-hidden rounded-xl bg-white shadow-md sm:w-72 md:w-80 lg:w-85"
    >
      <div
        className="relative aspect-4/3 w-full overflow-hidden bg-cover bg-top transition-[background-position] duration-8000 ease-linear group-hover:bg-bottom"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {/* Faded fallback <img> so alt text / SEO / loading still works
            even though the visible surface is the CSS background above. */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="opacity-0"
          aria-hidden="true"
        />

        {/* Floating scroll-hint icon, fades out on hover */}
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy opacity-100 shadow transition-opacity duration-300 ease-out group-hover:opacity-0 sm:h-11 sm:w-11">
          <MoveVertical className="tsn-float h-4 w-4 animate-[tsn-float_2s_ease-in-out_infinite] sm:h-5 sm:w-5" />
        </div>
      </div>
    </Link>
  );
}

export default PortfolioSection;