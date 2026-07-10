"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type Logo = {
  name: string;
  src: string;
};

const logos: Logo[] = [
  { name: "React", src: "/logos/react.svg" },
  { name: "Wix", src: "/logos/wix.svg" },
  { name: "Shopify", src: "/logos/shopify.svg" },
  { name: "Adobe Acrobat", src: "/logos/adobe-pdf.svg" },
  { name: "Adobe XD", src: "/logos/adobe-xd.svg" },
  { name: "Adobe Photoshop", src: "/logos/adobe-ps.svg" },
];

// duplicate the set so the track has enough width to loop seamlessly
// without a visible gap or snap, regardless of viewport width
const marqueeLogos = [...logos, ...logos];

export default function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 2,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      }),
    ]
  );

  return (
    <section className="relative overflow-hidden bg-white/10 py-6 backdrop-blur-md sm:py-8">
      {/* edge fade masks so logos scroll under a soft gradient, not a hard cut */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-brand-navy to-transparent sm:w-16 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-brand-navy to-transparent sm:w-16 md:w-24" />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {marqueeLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 basis-1/3 items-center justify-center px-5 sm:basis-1/4 sm:px-8 md:px-10 lg:basis-1/6"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={56}
                height={56}
                className="h-8 w-8 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 sm:w-10 md:h-12 md:w-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}