"use client";

import { forwardRef, useLayoutEffect, useRef, type ForwardedRef, type ReactNode } from "react";
import Link from "next/link";
import { Users, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * WhyChooseUsHorizontal
 * ------------------------------------------------------------------
 * Desktop (lg+): horizontal scroll-jack — section pins, vertical
 * scroll drives horizontal translateX on the track, pin releases once
 * the track is exhausted.
 *
 * Mobile / tablet (< lg): the pin + horizontal-drag mechanic is
 * disabled entirely (gsap.matchMedia scopes it to lg+) and panels
 * render as a normal stacked vertical flow instead. This avoids
 * fighting native touch scroll and the iOS Safari viewport-resize
 * jank that horizontal pinning causes on small screens.
 *
 * Install once: `npm install gsap`
 */

gsap.registerPlugin(ScrollTrigger);

const GRADIENT_TEXT =
  "bg-gradient-to-r from-[#0B91A4] via-[#4F9F75] to-[#B3B430] bg-clip-text text-transparent";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  { value: 1500, suffix: "+", label: "Project completed" },
  { value: 100, suffix: "%", label: "Client Retention" },
  { value: 8, suffix: "+", label: "Years experiences" },
  { value: 1000, suffix: "+", label: "Satisfied Clients" },
];

export function WhyChooseUsHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const statsAnimated = useRef(false);
  const statsPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const animateStats = () => {
      if (statsAnimated.current) return;
      statsAnimated.current = true;
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.4,
          ease: "power4.inOut",
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toLocaleString();
          },
        });
      });
    };

    const mm = gsap.matchMedia();

    // Desktop / large screens: horizontal scroll-jack pin
    mm.add("(min-width: 1024px)", () => {
      const getScrollDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "power1.inOut",
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (statsAnimated.current || !statsPanelRef.current) return;
          const currentX = -self.progress * getScrollDistance();
          const panelLeft = statsPanelRef.current.offsetLeft;
          const viewportCenter = window.innerWidth * 0.6;
          if (panelLeft + currentX < viewportCenter) {
            animateStats();
          }
        },
      });

      return () => trigger.kill();
    });

    // Mobile / tablet: no pin, no horizontal drag — just fire the
    // counter once the stats panel scrolls into view normally.
    mm.add("(max-width: 1023px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: statsPanelRef.current ?? section,
        start: "top 75%",
        onEnter: animateStats,
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      <div
        ref={trackRef}
        className="flex flex-col gap-20 px-6 py-16 will-change-transform sm:px-10 sm:py-20 lg:h-screen lg:w-max lg:flex-row lg:items-center lg:gap-24 lg:px-0 lg:py-20 lg:pl-[8vw] lg:pr-[12vw]"
      >
        {/* Panel 1 — section title */}
        <Panel widthClass="w-full lg:w-[1100px]" center>
          <h2 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-[#121212] sm:text-6xl lg:text-7xl xl:text-8xl">
            Why <br className="hidden sm:block" />
            <span className={GRADIENT_TEXT}>Choose</span> us
          </h2>
        </Panel>

        {/* Panel 2 — About us */}
        <Panel widthClass="w-full sm:max-w-xl lg:w-[560px] lg:max-w-none">
          <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className={GRADIENT_TEXT}>About</span>{" "}
            <span className="text-[#121212]">us</span>
          </h3>
          <p className="mt-6 text-base leading-relaxed text-[#121212] sm:mt-8 sm:text-lg">
            With over 8 years experience in local business intelligence, we
            know your time is precious, that&rsquo;s why we provide the
            fastest turnaround. Providing local SEO services to take your
            business to the top, boosting your online presence and driving
            sales, with innovation and cost effective techniques.
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#121212] sm:mt-6 sm:text-lg">
            Every pixel we place, every line of code we write, is a step
            towards perfection. We don&rsquo;t just build websites—we
            architect digital universes.
          </p>
        </Panel>

        {/* Panel 3 — Consulting + Managed Services (stacked) */}
        <Panel widthClass="w-full sm:max-w-xl lg:w-[620px] lg:max-w-none">
          <div className="flex gap-5 sm:gap-6">
            <Users className="h-10 w-10 shrink-0 text-[#3AB5C0] sm:h-12 sm:w-12" strokeWidth={1.5} />
            <div>
              <h4 className="text-xl font-extrabold tracking-tight text-[#121212] sm:text-2xl">
                Consulting
              </h4>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#121212] sm:text-base">
                We empower you to develop a clear digital strategy that
                drives technology-led business success and optimizes your
                growth.
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-5 sm:mt-14 sm:gap-6">
            <Wrench className="h-10 w-10 shrink-0 text-[#3AB5C0] sm:h-12 sm:w-12" strokeWidth={1.5} />
            <div>
              <h4 className="text-xl font-extrabold tracking-tight text-[#121212] sm:text-2xl">
                Managed Services
              </h4>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#121212] sm:text-base">
                Our global Managed Services teams safeguard your digital
                investment with 24/7 monitoring, maintenance, and
                comprehensive support.
              </p>
            </div>
          </div>
        </Panel>

        {/* Panel 4 — Stats */}
        <Panel ref={statsPanelRef} widthClass="w-full sm:max-w-xl lg:w-[620px] lg:max-w-none">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-16 sm:gap-y-12">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div
                  className={`flex items-baseline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${GRADIENT_TEXT}`}
                >
                  <span
                    ref={(el) => {
                      statRefs.current[i] = el;
                    }}
                  >
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="mt-2 text-sm text-[#121212] sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* Panel 5 — Video */}
        <Panel widthClass="w-full sm:max-w-xl lg:w-[720px] lg:max-w-none">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/27Hgqi7S6uc?controls=1&rel=0&playsinline=1&cc_load_policy=0&mute=1"
              title="The Social Nexus — Think. Build. Launch."
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Panel>

        {/* Panel 6 — Closing CTA */}
        <Panel widthClass="w-full lg:w-[1200px] hidden sm:block" center>
          <p className="text-lg text-[#555555] sm:text-xl lg:text-2xl">
            Have you project in mind?
          </p>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#121212] sm:text-5xl lg:text-6xl xl:text-7xl">
            Let&rsquo;s make <span className={GRADIENT_TEXT}>something</span>
            <br />
            great together!
          </h2>

          <Link
            href="/contact-us"
            className="mt-10 inline-flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#3AB5C0] text-center text-base font-semibold leading-tight text-white transition-transform hover:scale-105 sm:mt-12 sm:h-40 sm:w-40 sm:text-lg"
          >
            Connect
            <br />
            With Us
          </Link>
        </Panel>
      </div>
    </section>
  );
}

/** Shared panel shell so every slide gets consistent spacing/alignment. */
type PanelProps = {
  children: ReactNode;
  widthClass: string;
  center?: boolean;
};

const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { children, widthClass, center },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`flex h-auto shrink-0 flex-col justify-center lg:h-full mx-auto ${
        center ? "items-center text-center" : ""
      } ${widthClass}`}
    >
      {children}
    </div>
  );
});

export default WhyChooseUsHorizontal;