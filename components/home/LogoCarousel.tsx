"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useReveal } from "@/hooks/use-reveal";

type Logo = {
  name: string;
  src: string;
};

const logos: Logo[] = [
  { name: "React", src: "/logos/react-logo.png" },
  { name: "Wix", src: "/logos/wix-logo.png" },
  { name: "Shopify", src: "/logos/shopify-logo.png" },
  { name: "Adobe Acrobat", src: "/logos/acrobat-logo.png" },
  { name: "Adobe XD", src: "/logos/xd-logo.png" },
  { name: "Sql", src: "/logos/sql-logo.png" },
  { name: "Painter", src: "/logos/painter-logo.png" },
  { name: "Php", src: "/logos/php-logo.png" },
  { name: "Figma", src: "/logos/figma-logo.png" },
  { name: "Wordpress", src: "/logos/wordpress-logo.png" },
];

// duplicate the set so the track has enough width to loop seamlessly
// without a visible gap or snap, regardless of viewport width
const marqueeLogos = [...logos, ...logos];

export default function LogoCarousel() {
  const sectionRef = useReveal<HTMLElement>();

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
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-white/10 py-6 backdrop-blur-md sm:py-8"
    >
      {/* edge fade masks so logos scroll under a soft gradient, not a hard cut */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-brand-navy to-transparent sm:w-16 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-brand-navy to-transparent sm:w-16 md:w-24" />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {marqueeLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="group flex shrink-0 basis-1/3 items-center justify-center px-5 sm:basis-1/4 sm:px-8 md:px-10 lg:basis-1/6"
            >
              <div className="relative flex items-center justify-center">
                {/* soft teal glow that blooms in behind the logo on hover */}
                <span className="pointer-events-none absolute inset-0 scale-50 rounded-full transition-all duration-300 ease-out" />

                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={56}
                  height={56}
                  className="relative h-11 w-11 object-contain opacity-70 transition-all duration-300 ease-out sm:h-10 sm:w-10 md:h-14 md:w-14"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}