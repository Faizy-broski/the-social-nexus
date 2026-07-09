"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoveVertical } from "lucide-react";

/**
 * PortfolioSection ("Our Work")
 * ------------------------------------------------------------------
 * Two horizontally-scrolling rows of project cards. The chevron
 * buttons at the bottom move BOTH rows at once, in opposite
 * directions — mirroring your Elementor sync script (ltrSwiper
 * .slideNext() + rtlSwiper.slidePrev() on the same click). Built
 * here with native scroll containers + scrollBy instead of Swiper,
 * so no extra dependency.
 *
 * Each card also reproduces your "scrolling screenshot" hover effect:
 * the image is a background-position tween from top → bottom over 8s
 * on hover (same timing as your ucaddon_scrolling_screenshot widget
 * CSS), with a floating scroll-hint icon that fades out on hover.
 *
 * Gradient sampled from your screenshot: #C7CE72 (yellow-green, left)
 * → #71C0A2 (teal-green, right).
 *
 * Screenshots you'll need in /public/portfolio/ — placeholders below,
 * paths mirror the project slugs from your HTML.
 */

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

const CARD_WIDTH = 340; // px, keep in sync with the card's w-[340px] below

export function PortfolioSection() {
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  const scrollBoth = (direction: 1 | -1) => {
    rowARef.current?.scrollBy({ left: direction * CARD_WIDTH, behavior: "smooth" });
    // Row B moves opposite to Row A, same as your RTL/LTR sync script.
    rowBRef.current?.scrollBy({ left: -direction * CARD_WIDTH, behavior: "smooth" });
  };

  return (
    <section className="bg-linear-to-r from-[#C7CE72] to-[#71C0A2] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Portfolio</p>
            <h2 className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
              Our Work
            </h2>
          </div>

          <Link
            href="/portfolio-page"
            className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/70 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:flex"
          >
            View All
          </Link>
        </div>

        {/* Row A */}
        <div
          ref={rowARef}
          className="tsn-row-scroll mt-14 flex gap-4 overflow-x-auto scroll-smooth"
        >
          {rowA.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Row B */}
        <div
          ref={rowBRef}
          className="tsn-row-scroll mt-4 flex gap-4 overflow-x-auto scroll-smooth"
        >
          {rowB.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Chevron controls — move both rows at once, opposite directions */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollBoth(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollBoth(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/10"
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
      className="group relative block w-85 shrink-0 overflow-hidden rounded-xl bg-white shadow-md"
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
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#121212] opacity-100 shadow transition-opacity duration-300 ease-out group-hover:opacity-0">
          <MoveVertical className="tsn-float h-5 w-5 animate-[tsn-float_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </Link>
  );
}

export default PortfolioSection;