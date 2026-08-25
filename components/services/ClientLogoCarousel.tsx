"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";

type ClientLogo = {
  name: string;
  src: string;
};

const clientLogos: ClientLogo[] = [
  { name: "Mouton Noir", src: "/services/logos/1.webp" },
  { name: "MobiTech", src: "/services/logos/2.webp" },
  { name: "Worix IT Solutions", src: "/services/logos/3.webp" },
  { name: "Gadgets & Vapes", src: "/services/logos/4.webp" },
  { name: "iRepair Zone", src: "/services/logos/5.webp" },
  { name: "Muslim Welfare Institute", src: "/services/logos/6.webp" },
  { name: "Client partner", src: "/services/logos/7.webp" },
  { name: "Client partner", src: "/services/logos/8.webp" },
  { name: "International Bodyguard Association UK", src: "/services/logos/9.webp" },
  { name: "FPT Forklift Pioneer Training", src: "/services/logos/10.webp" },
  { name: "Matlock", src: "/services/logos/11.webp" },
  { name: "Snap-on", src: "/services/logos/12.webp" },
  { name: "FocalTronics", src: "/services/logos/13.webp" },
  { name: "Wimmera Security Service", src: "/services/logos/14.webp" },
];

const rowOneLogos = clientLogos.slice(0, 7);
const rowTwoLogos = clientLogos.slice(7, 14);

// Duplicated once so `loop` has enough slides to bridge seamlessly at
// this slidesPerView. If you add/remove logos, keep at least 2x the
// visible count per row or Swiper's loop mode will visibly jump.
const rowOne = [...rowOneLogos, ...rowOneLogos];
const rowTwo = [...rowTwoLogos.slice().reverse(), ...rowTwoLogos.slice().reverse()];

function LogoRow({
  logos,
  reverse,
}: {
  logos: ClientLogo[];
  reverse: boolean;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Same fix as the Embla version: don't let autoplay start the instant
  // the component mounts. `autoplay: false` on init + an
  // IntersectionObserver driving start()/stop() means the row only
  // spends main-thread time once it's actually on screen, and doesn't
  // compete with hydration / header animation / GSAP init right after
  // load.
  useEffect(() => {
    const el = containerRef.current;
    const swiper = swiperRef.current;
    if (!el || !swiper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        loop
        freeMode={{ enabled: true, momentum: false }}
        slidesPerView="auto"
        spaceBetween={16}
        speed={4000}
        allowTouchMove={false}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: reverse,
        }}
        className="!overflow-visible"
      >
        {logos.map((logo, i) => (
          <SwiperSlide key={`${logo.name}-${i}`} className="!w-44 sm:!w-56">
            <div className="flex h-20 w-44 items-center justify-center rounded-full bg-white px-6 shadow-sm sm:h-24 sm:w-56">
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={80}
                sizes="160px"
                className="h-full max-h-12 w-auto object-contain sm:max-h-14"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function ClientLogoCarousel() {
  return (
    <div className="stagger-children space-y-4 sm:space-y-5">
      <LogoRow logos={rowOne} reverse={false} />
      <LogoRow logos={rowTwo} reverse={true} />
    </div>
  );
}

export default ClientLogoCarousel;