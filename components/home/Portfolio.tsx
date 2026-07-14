"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Mouse } from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { useReveal } from "@/hooks/use-reveal";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

type PortfolioItem = {
  slug: string;
  title: string;
  href: string;
  image: string;
};

const items: PortfolioItem[] = [
  {
    slug: "matlock",
    title: "Matlock Phones & Vapes",
    href: "/portfolio/matlock",
    image: "/portfolio/1.webp",
  },
  {
    slug: "oww",
    title: "Outside Walla Walla",
    href: "/portfolio/oww",
    image: "/portfolio/2.webp",
  },
  {
    slug: "islamic-wall-arts",
    title: "Islamic Wall Arts",
    href: "/portfolio/islamic-wall-arts",
    image: "/portfolio/3.webp",
  },
  {
    slug: "al-quran-islamic-education",
    title: "Al Quran Islamic Education",
    href: "/portfolio/al-quran-islamic-education",
    image: "/portfolio/4.webp",
  },
  {
    slug: "zummunta",
    title: "Zummunta",
    href: "/portfolio/zummunta",
    image: "/portfolio/5.webp",
  },
  {
    slug: "mobifix",
    title: "MobiFix",
    href: "/portfolio/mobifix",
    image: "/portfolio/6.webp",
  },
  {
    slug: "gadgetsrepairltd",
    title: "Gadgets Repair Ltd",
    href: "/portfolio/gadgetsrepairltd",
    image: "/portfolio/7.webp",
  },
  {
    slug: "four-minds",
    title: "Four Minds",
    href: "/portfolio/four-minds",
    image: "/portfolio/8.webp",
  },
  {
    slug: "mobiledoctor",
    title: "Mobile Doctor",
    href: "/portfolio/mobiledoctor",
    image: "/portfolio/9.webp",
  },
  {
    slug: "hotspotayr",
    title: "Hotspot Ayr",
    href: "/portfolio/hotspotayr",
    image: "/portfolio/10.webp",
  },
  {
    slug: "phone-doctor",
    title: "Phone Doctor",
    href: "/portfolio/phone-doctor",
    image: "/portfolio/11.webp",
  },
  {
    slug: "mobi-fix",
    title: "Mobi-Fix",
    href: "/portfolio/mobi-fix",
    image: "/portfolio/12.webp",
  },
];

const rowA = items.slice(0, 6);
const rowB = items.slice(6, 12);

export function PortfolioSection() {
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  const revealRowA = useReveal<HTMLDivElement>();
  const revealRowB = useReveal<HTMLDivElement>();

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

  // Merge the reveal ref with the scroll ref on each row — both need the
  // same DOM node (one to fade/slide the row in, one to measure/scroll it).
  const setRowARefs = (node: HTMLDivElement | null) => {
    rowARef.current = node;
    revealRowA.current = node;
  };
  const setRowBRefs = (node: HTMLDivElement | null) => {
    rowBRef.current = node;
    revealRowB.current = node;
  };

  return (
    <section className="relative overflow-hidden bg-brand-navy py-14 sm:py-20 lg:py-24">
      {/* ambient network glow — nods to "Nexus" without being a literal icon */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:pl-17">
        {/* Header row */}
        <Reveal
          variant="up"
          richer
          className="flex items-center justify-between gap-4 sm:items-start"
        >
          <div>
            <p className="text-xs font-semibold text-brand-gold sm:text-sm">
              Portfolio
            </p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our <span className="gradient-text-animated">Work</span>
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="press-scale group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 text-center text-xs font-semibold text-white transition-colors hover:border-brand-teal sm:h-24 sm:w-24 sm:text-sm"
          >
            <span className="absolute inset-0 -translate-y-full bg-brand-teal/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">View All</span>
          </Link>
        </Reveal>

        {/* Row A */}
        <div
          ref={setRowARefs}
          className="scrollbar-none reveal-left stagger-children mt-8 flex gap-3 overflow-x-auto scroll-smooth sm:mt-14 sm:gap-4"
        >
          {rowA.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Row B */}
        <div
          ref={setRowBRefs}
          className="scrollbar-none reveal-right stagger-children mt-3 flex gap-3 overflow-x-auto scroll-smooth sm:mt-4 sm:gap-4"
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
            className="press-scale flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-teal hover:bg-brand-teal/10 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollBoth(1)}
            className="press-scale flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-teal hover:bg-brand-teal/10 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <TiltCard className="w-64 shrink-0 sm:w-72 md:w-80 lg:w-85">
      <Link
        href={item.href}
        className="group relative block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden">
          {/* Next/Image is the visible layer now (was previously duplicated
              behind an unoptimized raw CSS background-image, downloading
              the full-resolution PNG twice). The hover-pan effect is
              recreated with object-position, which transitions the same
              way background-position did. */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 288px, 256px"
            className="object-cover object-top transition-[object-position] duration-8000 ease-linear group-hover:object-bottom"
          />

          {/* Floating scroll-hint icon, fades out on hover — same glass +
              bounce treatment as ProductCard's pointer hint, so the "hover
              to pan" cue reads the same across both sections. */}
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-brand-teal opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0 sm:h-11 sm:w-11">
            <Mouse className="animate-float h-4 w-4 sm:h-7 sm:w-7" />
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

export default PortfolioSection;
