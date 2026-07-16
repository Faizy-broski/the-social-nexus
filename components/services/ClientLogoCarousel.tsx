"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

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

const rowOne = [...rowOneLogos, ...rowOneLogos];
const rowTwo = [...rowTwoLogos.slice().reverse(), ...rowTwoLogos.slice().reverse()];

function LogoRow({
  logos,
  direction,
}: {
  logos: ClientLogo[];
  direction: "forward" | "backward";
}) {
  // PERF NOTE — initial-load lag fix:
  // Previously this plugin was instantiated inline inside the
  // useEmblaCarousel call (a fresh AutoScroll(...) object on every
  // render) with playOnInit defaulting to true and stopOnInteraction/
  // MouseEnter/FocusIn all disabled. That meant a continuous rAF loop
  // started the instant the component mounted — with two rows, two
  // such loops — competing for main-thread time with hydration, the
  // header animation, and any GSAP ScrollTrigger init happening in the
  // same window right after load. That contention is what reads as lag
  // on first render.
  //
  // Fixed two ways:
  //  1. The plugin instance is created once via useRef, not recreated
  //     on every render, so there's no risk of embla destroying and
  //     reinitializing the carousel on a reinit-triggering re-render.
  //  2. playOnInit is now false, and play()/stop() are driven by an
  //     IntersectionObserver — the row only starts animating once it's
  //     actually visible, and stops burning rAF cycles once it isn't.
  //     This defers the first tick until after the page has already
  //     painted, instead of racing it against initial hydration.
  const autoScrollRef = useRef(
    AutoScroll({
      direction,
      speed: 2,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      playOnInit: false,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", containScroll: false },
    [autoScrollRef.current],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi.plugins().autoScroll as
      | { play: () => void; stop: () => void }
      | undefined;
    if (!autoScroll) return;

    const root = emblaApi.rootNode();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          autoScroll.play();
        } else {
          autoScroll.stop();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      {/* Spacing is margin/padding-based (not the `gap` utility) because
          Embla's loop mode repositions slides via transform using each
          slide's own box size — a container `gap` isn't included in that
          math, so the wrap-around slide would butt up against the next
          one with no space. */}
      <div className="flex -ml-4">
        {logos.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="shrink-0 pl-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientLogoCarousel() {
  return (
    <div className="stagger-children space-y-4 sm:space-y-5">
      <LogoRow logos={rowOne} direction="forward" />
      <LogoRow logos={rowTwo} direction="backward" />
    </div>
  );
}

export default ClientLogoCarousel;