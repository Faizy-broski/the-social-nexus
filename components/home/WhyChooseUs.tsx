"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Compass, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * WhyChooseUsHorizontal
 * ------------------------------------------------------------------
 * Recreates the Elementor "horizontal scroll" container: the section
 * pins itself in the viewport and translates a wide flex track from
 * right to left as the visitor scrolls down (vertical input, horizontal
 * motion) — same trick your live site uses. Once the track has fully
 * scrolled, the pin releases and the page continues scrolling normally
 * on the Y axis into whatever section comes after this one.
 *
 * IMPORTANT — ScrollSmoother note (same issue you hit on the sticky
 * header): if this page also runs GSAP ScrollSmoother, make sure
 * ScrollSmoother.create() runs BEFORE this component's ScrollTrigger
 * is created (i.e. mount your <ScrollSmootherProvider> above this
 * component, or register the smoother in a root layout effect that
 * fires first). ScrollSmoother patches ScrollTrigger's scroller
 * automatically once initialized, so you don't need a custom
 * scrollerProxy here — just watch the mount order.
 *
 * Install once: `npm install gsap`
 */

gsap.registerPlugin(ScrollTrigger);

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  { value: 1500, suffix: "+", label: "Project completed" },
  { value: 100, suffix: "%", label: "Client Retention" },
  { value: 8, suffix: "+", label: "Years experience" },
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

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
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
          // Fire the counters once the stats panel has scrolled into view.
          if (statsAnimated.current || !statsPanelRef.current) return;
          const currentX = -self.progress * getScrollDistance();
          const panelLeft = statsPanelRef.current.offsetLeft;
          const viewportCenter = window.innerWidth * 0.6;
          if (panelLeft + currentX < viewportCenter) {
            statsAnimated.current = true;
            statRefs.current.forEach((el, i) => {
              if (!el) return;
              const target = stats[i].value;
              const proxy = { val: 0 };
              gsap.to(proxy, {
                val: target,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = Math.round(proxy.val).toLocaleString();
                },
              });
            });
          }
        },
      });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0B0E13] text-white"
    >
      <div
        ref={trackRef}
        className="flex h-screen w-max items-center gap-10 py-20 pl-10 pr-[10vw] will-change-transform sm:gap-14 sm:pl-20"
      >
        {/* Panel 1 — section title */}
        <Panel widthClass="w-[70vw] sm:w-[40vw] lg:w-[420px]">
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Why <span className="text-[#2FD4C9]">Choose</span> us
          </h2>
        </Panel>

        {/* Panel 2 — Consulting */}
        <Panel widthClass="w-[80vw] sm:w-[46vw] lg:w-[420px]">
          <Compass className="h-12 w-12 text-[#2FD4C9]" strokeWidth={1.5} />
          <h3 className="mt-6 text-2xl font-semibold">Consulting</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            We empower you to develop a clear digital strategy that drives
            technology-led business success and optimizes your growth.
          </p>
        </Panel>

        {/* Panel 3 — Managed Services */}
        <Panel widthClass="w-[80vw] sm:w-[46vw] lg:w-[420px]">
          <ShieldCheck className="h-12 w-12 text-[#2FD4C9]" strokeWidth={1.5} />
          <h3 className="mt-6 text-2xl font-semibold">Managed Services</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Our global Managed Services teams safeguard your digital
            investment with 24/7 monitoring, maintenance, and comprehensive
            support.
          </p>
        </Panel>

        {/* Panel 4 — About us */}
        <Panel widthClass="w-[85vw] sm:w-[55vw] lg:w-[560px]">
          <h3 className="text-2xl font-semibold">
            <span className="text-[#2FD4C9]">about</span> us
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            With over 8 years experience in local business intelligence, we
            know your time is precious, that&rsquo;s why we provide the
            fastest turnaround. Providing local SEO services to take your
            business to the top, boosting your online presence and driving
            sales, with innovation and cost effective techniques.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Every pixel we place, every line of code we write, is a step
            towards perfection. We don&rsquo;t just build websites—we
            architect digital universes.
          </p>
        </Panel>

        {/* Panel 5 — Stats + video */}
        <Panel
          ref={statsPanelRef}
          widthClass="w-[90vw] sm:w-[65vw] lg:w-[720px]"
        >
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-baseline text-3xl font-semibold sm:text-4xl">
                  <span
                    ref={(el) => {
                      statRefs.current[i] = el;
                    }}
                  >
                    0
                  </span>
                  <span className="text-[#2FD4C9]">{stat.suffix}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
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
        <Panel widthClass="w-[85vw] sm:w-[55vw] lg:w-[520px]">
          <h3 className="text-2xl font-semibold text-white/80">
            Have your project in mind?
          </h3>
          <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
            Let&rsquo;s make <span className="text-[#2FD4C9]">something</span>{" "}
            great together!
          </h2>

          <Link
            href="/contact-us"
            className="mt-8 inline-flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#2FD4C9] text-center text-sm font-medium leading-tight text-[#0B0E13] transition-transform hover:scale-105"
          >
            Connect
            <br />
            With us
          </Link>
        </Panel>
      </div>
    </section>
  );
}

/** Shared panel shell so every slide gets consistent spacing/alignment. */
const Panel = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; widthClass: string }
>(function Panel({ children, widthClass }, ref) {
  return (
    <div
      ref={ref}
      className={`flex h-full shrink-0 flex-col justify-center ${widthClass}`}
    >
      {children}
    </div>
  );
});

export default WhyChooseUsHorizontal;