"use client";

import {
  forwardRef,
  useLayoutEffect,
  useRef,
  type ForwardedRef,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Users, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/home/MagneticButton";
import { YouTubeFacade } from "@/components/home/YouTubeFacade";

/**
 * WhyChooseUsHorizontal
 * ------------------------------------------------------------------
 * Desktop (lg+): horizontal scroll-jack — section pins, vertical
 * scroll drives horizontal translateX on the track, pin releases once
 * the track is exhausted. Each panel also fades/scales in as it
 * crosses into view, driven off the SAME horizontal tween via GSAP's
 * `containerAnimation` — this is what lets a normal-looking
 * ScrollTrigger ("start: left 88%") react correctly to horizontal
 * motion instead of vertical scroll position.
 *
 * Mobile / tablet (< lg): the pin + horizontal-drag mechanic is
 * disabled entirely (gsap.matchMedia scopes it to lg+) and panels
 * render as a normal stacked vertical flow instead, each fading up
 * on a plain vertical ScrollTrigger. This avoids fighting native
 * touch scroll and the iOS Safari viewport-resize jank that
 * horizontal pinning causes on small screens.
 *
 * Every panel is centered both horizontally and vertically as a box
 * (via the track's `items-center` + Panel's own `justify-center`),
 * independent of whatever internal text-alignment (left/justify/
 * center) each panel's content uses.
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
  { value: 10, suffix: "+", label: "Years experiences" },
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
          duration: 3,
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

      // `ease: "none"` is deliberate — scrub already smooths the tween
      // toward the scroll position over time, so pairing it with a
      // non-linear ease double-smooths the motion and makes the track
      // visibly lag/rubber-band behind the actual scroll input.
      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      // Read once per layout pass (mount + refresh), not on every scrub
      // tick — offsetLeft is a forced-layout read, and onUpdate can fire
      // dozens of times per second while scrolling.
      let statsPanelLeft = statsPanelRef.current?.offsetLeft ?? 0;
      const cacheStatsPanelLeft = () => {
        statsPanelLeft = statsPanelRef.current?.offsetLeft ?? 0;
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.3,
        animation: tween,
        invalidateOnRefresh: true,
        onRefresh: cacheStatsPanelLeft,
        onUpdate: (self) => {
          if (statsAnimated.current) return;
          const currentX = -self.progress * getScrollDistance();
          const viewportCenter = window.innerWidth * 0.6;
          if (statsPanelLeft + currentX < viewportCenter) {
            animateStats();
          }
        },
      });

      // Panel entrance — fade + slide-up + slight scale, scrubbed against
      // the SAME horizontal tween (containerAnimation) so each panel
      // animates in as it's horizontally scrolled into view, not based
      // on vertical page position (which never really changes while pinned).
      const panels = gsap.utils.toArray<HTMLElement>(".why-panel", track);
      const panelTweens = panels.map((panel) =>
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 50, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 88%",
              end: "left 45%",
              scrub: true,
            },
          },
        ),
      );

      // The pin's scroll distance is measured from `track.scrollWidth` at
      // creation time, before web fonts have necessarily swapped in — a
      // late font swap (or anything else that nudges panel widths after
      // this runs) leaves the pin-spacer's height stale, which shows up
      // as a large layout shift for everything below this section once
      // the real width is known. Re-measuring after fonts settle (and
      // once more after full load, for images/late content) keeps the
      // spacer honest without waiting on a user-triggered resize.
      document.fonts?.ready?.then(() => ScrollTrigger.refresh()).catch(() => {});
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      }

      return () => {
        trigger.kill();
        panelTweens.forEach((tw) => tw.scrollTrigger?.kill());
      };
    });

    // Mobile / tablet: no pin, no horizontal drag — panels fade up as
    // they enter the normal vertical scroll, and the counter fires once
    // the stats panel scrolls into view.
    mm.add("(max-width: 1023px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: statsPanelRef.current ?? section,
        start: "top 75%",
        onEnter: animateStats,
      });

      const panels = gsap.utils.toArray<HTMLElement>(".why-panel", section);
      const panelTweens = panels.map((panel) =>
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        ),
      );

      return () => {
        trigger.kill();
        panelTweens.forEach((tw) => tw.scrollTrigger?.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      <div
        ref={trackRef}
        className="flex flex-col items-center gap-16 px-4 py-16 will-change-transform sm:gap-20 sm:px-10 sm:py-20 2xl:h-screen lg:w-max lg:flex-row lg:items-center lg:gap-24 lg:px-0 lg:py-20 lg:pl-[8vw] lg:pr-[12vw]"
      >
        {/* Panel 1 — section title */}
        <Panel widthClass="w-full lg:w-[min(1100px,88vw)]" align="center">
          <h2 className="text-4xl font-extrabold leading-[0.95] tracking-tight text-brand-navy sm:text-6xl lg:text-7xl xl:text-[160px]">
            Why <br className="hidden sm:block" />
            <span className="gradient-text-animated">Choose</span> us
          </h2>
        </Panel>

        {/* Panel 2 — About us */}
        <Panel widthClass="w-full max-w-xl lg:w-[min(620px,88vw)] lg:max-w-none">
          <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="gradient-text">About</span>{" "}
            <span className="text-brand-navy">us</span>
          </h3>
          <div className="max-w-127">
            <p className="mt-6 text-base text-justify leading-relaxed text-[#121212] sm:mt-8 sm:text-lg">
              With over 8 years experience in local business intelligence, we know
              your time is precious, that&rsquo;s why we provide the fastest
              turnaround. Providing local SEO services to take your business to
              the top, boosting your online presence and driving sales, with
              innovation and cost effective techniques.
            </p>
            <p className="mt-5 text-base text-justify leading-relaxed text-[#121212] sm:mt-6 sm:text-lg">
              Every pixel we place, every line of code we write, is a step towards
              perfection. We don&rsquo;t just build websites—we architect digital
              universes.
            </p>
          </div>
        </Panel>

        {/* Panel 3 — Consulting + Managed Services (stacked) */}
        <Panel widthClass="w-full max-w-xl lg:w-[min(620px,88vw)] lg:max-w-none">
          <div className="group flex gap-5 sm:gap-6">
            <Users
              className="h-10 w-10 shrink-0 text-[#3AB5C0] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12"
              strokeWidth={1.5}
            />
            <div className="max-w-90">
              <h4 className="text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl">
                Consulting
              </h4>
              <p className="mt-3 max-w-md text-justify text-sm leading-relaxed text-[#121212] sm:text-base">
                We empower you to develop a clear digital strategy that drives
                technology-led business success and optimizes your growth.
              </p>
            </div>
          </div>

          <div className="group mt-10 flex gap-5 sm:mt-14 sm:gap-6">
            <Wrench
              className="h-10 w-10 shrink-0 text-[#3AB5C0] transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110 sm:h-12 sm:w-12"
              strokeWidth={1.5}
            />
            <div className="max-w-90">
              <h4 className="text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl">
                Managed Services
              </h4>
              <p className="mt-3 max-w-md text-justify text-sm leading-relaxed text-[#121212] sm:text-base">
                Our global Managed Services teams safeguard your digital
                investment with 24/7 monitoring, maintenance, and comprehensive
                support.
              </p>
            </div>
          </div>
        </Panel>

        {/* Panel 4 — Stats */}
        <Panel
          ref={statsPanelRef}
          widthClass="w-full max-w-xl lg:w-[min(680px,88vw)] lg:max-w-none"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-16 sm:gap-y-12">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-baseline text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl gradient-text">
                  <span
                    ref={(el) => {
                      statRefs.current[i] = el;
                    }}
                  >
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="mt-2 text-sm text-brand-navy sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        {/* Panel 5 — Video */}
        <Panel widthClass="w-full max-w-xl lg:w-[min(720px,88vw)] lg:max-w-none">
          <div className="relative aspect-video w-full max-w-[92vw] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 sm:max-w-xl lg:max-w-none">
            <YouTubeFacade
              videoId="27Hgqi7S6uc"
              title="The Social Nexus — Think. Build. Launch."
              className="h-full w-full"
              autoplayOnView
            />
          </div>
        </Panel>

        {/* Panel 6 — Closing CTA (now visible on every breakpoint, not just sm+) */}
        <Panel widthClass="w-full lg:w-[min(1260px,180vw)]" align="center">
          <p className="text-base text-[#555555] sm:text-xl lg:text-5xl">
            Have you project in mind?
          </p>
          <h2 className="mt-5 text-3xl uppercase font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:mt-8 sm:text-5xl lg:text-6xl xl:text-7xl">
            Let&rsquo;s make <span className="gradient-text">something</span>
            <br />
            great together!
          </h2>

          <MagneticButton
            href="/contact-us"
            fillClassName="bg-brand-gold"
            className="mt-8 h-24 w-24 flex-col rounded-full bg-brand-teal text-center text-sm font-semibold leading-tight text-white sm:mt-12 sm:h-40 sm:w-40 sm:text-lg"
          >
            Connect
            <br />
            With Us
          </MagneticButton>
        </Panel>
      </div>
    </section>
  );
}

/** Shared panel shell so every slide gets consistent spacing/alignment.
 *  `why-panel` is the hook GSAP queries to attach entrance animations —
 *  keep it on every instance, desktop and mobile both rely on it.
 *
 *  The panel BOX itself is always centered horizontally (`mx-auto`,
 *  inherited `items-center` from the track) and vertically
 *  (`justify-center` + `lg:h-full`) regardless of breakpoint.
 *  `align` only controls the internal TEXT alignment, so left/justified
 *  copy still sits inside a centered box instead of being pinned to
 *  one edge of the viewport. */
type PanelProps = {
  children: ReactNode;
  widthClass: string;
  /** Text alignment inside the box — box centering is independent of this. */
  align?: "left" | "center";
};

const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { children, widthClass, align = "left" },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`why-panel mx-auto flex h-auto w-full shrink-0 flex-col justify-center lg:h-full ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${widthClass}`}
    >
      {children}
    </div>
  );
});

export default WhyChooseUsHorizontal;