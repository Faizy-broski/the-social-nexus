"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useInView } from "@/hooks/use-in-view";

const AUTOPLAY_DELAY_MS = 4000;

const industries = [
  {
    image: "/services/carousel/finance.avif",
    title: "Finance & FinTech",
    description:
      "We deliver secure dashboards, customer portals, and data-driven platforms that prioritize performance, encryption, and regulatory compliance.",
  },
  {
    image: "/services/carousel/health.avif",
    title: "Healthcare & Wellness",
    description:
      "We develop secure, compliant platforms for appointment booking, patient portals, service listings, and healthcare management systems with data protection at the core.",
  },
  {
    image: "/services/carousel/logistics.avif",
    title: "Logistics & Transportation",
    description:
      "We build systems for tracking, scheduling, fleet management, and operational dashboards that improve efficiency and visibility.",
  },
  {
    image: "/services/carousel/ecommerce.avif",
    title: "E-commerce & Retail",
    description:
      "We create high-performance storefronts, product catalogs, checkout flows, and customer dashboards designed to increase conversion rates and customer retention.",
  },
  {
    image: "/services/carousel/real-estate.avif",
    title: "Real Estate & Property",
    description:
      "Web platforms for property listings, virtual tours, and client interaction that improve visibility and lead generation.",
  },
  {
    image: "/services/carousel/manufacturing.avif",
    title: "Manufacturing",
    description:
      "Web applications for production monitoring, supply chain management, and workflow optimization that increase efficiency.",
  },
  {
    image: "/services/carousel/restaurant.avif",
    title: "Restaurant",
    description:
      "Custom restaurant websites for online ordering, reservations, and menu management that increase customer engagement.",
  },
  {
    image: "/services/carousel/automotive.avif",
    title: "Automotive",
    description:
      "Web solutions for fleet management, dealership portals, and customer engagement that improve business operations.",
  },
  {
    image: "/services/carousel/banking.avif",
    title: "Banking",
    description:
      "Online banking platforms with robust security, account management, and customer support to enhance client satisfaction.",
  },
];

export function IndustriesCarousel() {
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ threshold: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (!emblaApi || !inView || isPaused) return;
    const interval = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, [emblaApi, inView, isPaused]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      className="mt-12 text-left"
      ref={inViewRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {industries.map((industry) => (
            <article
              key={industry.title}
              className="basis-[85%] shrink-0 pl-6 sm:basis-[45%] lg:basis-1/3"
            >
              <div className="relative aspect-2/1 w-full overflow-hidden rounded-2xl">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 85vw"
                />
              </div>
              <h3 className="mt-5 min-h-14 text-lg font-semibold tracking-[-0.02em] text-brand-teal-light">
                {industry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {industry.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous industries"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-teal hover:text-brand-teal-light"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next industries"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-teal hover:text-brand-teal-light"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default IndustriesCarousel;
