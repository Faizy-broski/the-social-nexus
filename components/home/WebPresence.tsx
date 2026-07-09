"use client";

import Image from "next/image";

const GRADIENT_TEXT =
  "bg-linear-to-r from-brand-teal via-[#5FAE6E] to-[#C2B93A] bg-clip-text text-transparent";

export function WebPresenceSection() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:pl-26 lg:pr-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left — heading + copy + tagline */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h2 className="text-3xl font-extrabold uppercase leading-[1.15] tracking-tight text-[#121212] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                Big business web presence at small business prices.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#121212]/80 sm:mt-8 sm:text-lg">
                With over 8 years experience in local business intelligence,
                we know your time is precious, that&rsquo;s why we provide
                the fastest turnaround. Providing local SEO services to take
                your business to the top, boosting your online presence and
                driving sales, with innovation and cost effective techniques.
              </p>
            </div>

            <p className="text-2xl font-bold sm:text-2xl">
              <span className={GRADIENT_TEXT}>Dedicated to</span>{" "}
              <span className="text-[#121212]">helping</span>
            </p>
          </div>

          {/* Right — laptop mockup + tagline */}
          <div className="flex flex-col justify-between gap-8">
            <LaptopMockup />

            <p className="text-2xl font-bold sm:text-2xl">
              <span className="text-[#121212]">Giving you</span>{" "}
              <span className={GRADIENT_TEXT}>more time</span>{" "}
              <span className="text-[#121212]">to concentrate on</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaptopMockup() {
  return (
    <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm bg-white sm:aspect-video">
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