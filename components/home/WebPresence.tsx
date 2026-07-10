"use client";

import Image from "next/image";

/**
 * Theming: no raw hex in this file — colors come from classes defined
 * in global.css. Reuses the same `.gradient-text` class already used
 * elsewhere on the site (see WhyChooseUsHorizontal) instead of a
 * one-off local gradient, so the accent gradient stays consistent
 * across sections.
 *
 * If these don't already exist in global.css, add:
 *
 *   .text-brand-body        { color: #121212; }
 *   .text-brand-body-muted  { color: rgb(18 18 18 / 0.8); }
 *   .gradient-text          {
 *     background-image: linear-gradient(to right, #0B91A4, #4F9F75, #B3B430);
 *     background-clip: text;
 *     -webkit-background-clip: text;
 *     color: transparent;
 *   }
 */

export function WebPresenceSection() {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:pl-26 lg:pr-16">
        <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left — heading + copy + tagline */}
          <div className="flex flex-col justify-between gap-8 sm:gap-10">
            <div>
              <h2 className="text-2xl font-extrabold uppercase leading-[1.2] tracking-tight text-brand-body sm:text-4xl sm:leading-[1.15] lg:text-[44px] lg:leading-[1.1]">
                Big business web <span className="gradient-text">presence</span> at small business prices.
              </h2>
              <p className="mt-5 max-w-xl text-justify text-sm leading-relaxed text-brand-body-muted sm:mt-8 sm:text-lg">
                With over 8 years experience in local business intelligence,
                we know your time is precious, that&rsquo;s why we provide
                the fastest turnaround. Providing local SEO services to take
                your business to the top, boosting your online presence and
                driving sales, with innovation and cost effective techniques.
              </p>
            </div>

            <p className="text-lg font-bold sm:text-2xl">
              <span className="gradient-text">Dedicated to</span>{" "}
              <span className="text-brand-body">helping</span>
            </p>
          </div>

          {/* Right — laptop mockup + tagline */}
          <div className="flex flex-col justify-between gap-6 sm:gap-8">
            <LaptopMockup />

            <p className="text-lg font-bold sm:text-2xl">
              <span className="text-brand-body">Giving you</span>{" "}
              <span className="gradient-text">more time</span>{" "}
              <span className="text-brand-body">to concentrate on</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaptopMockup() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-white">
      <Image
        src="/laptop.gif"
        alt="Google Business Profile listing comparison"
        fill
        unoptimized
        className="object-contain object-top"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}

export default WebPresenceSection;