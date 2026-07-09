"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Users, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * WhyChooseUsHorizontal
 * ------------------------------------------------------------------
 * Rebuilt against your actual screenshots (not the dark-theme guess
 * from before) — this section is a WHITE background with near-black
 * text and a signature teal → green → olive-gold gradient used on
 * keyword accents and every stat number.
 *
 * Design tokens sampled directly from your screenshots:
 *   ink        #121212   headings / body copy
 *   muted      #555555   secondary copy ("Have you project in mind?")
 *   teal solid #3AB5C0   icons, the "Connect With Us" button fill
 *   gradient   #0B91A4 → #4F9F75 → #B3B430   (left → right)
 *              used via bg-gradient-to-r + bg-clip-text on accent words
 *              and on every stat number.
 *
 * Panel order confirmed from your screenshots (About Us sits BEFORE
 * Consulting/Managed Services when scrolling, not after):
 *   1. "Why Choose us" title
 *   2. About us
 *   3. Consulting + Managed Services (stacked)
 *   4. Stats grid
 *   5. Video
 *   6. Closing CTA
 *
 * Same horizontal scroll-jack mechanic as before: the section pins,
 * vertical scroll drives horizontal translateX on the track, and once
 * the track is exhausted the pin releases and normal Y-axis scrolling
 * continues into the next section automatically.
 *
 * Note: your site's left icon rail (logo / dots menu / "Contact us"
 * vertical text) and the floating "Let's talk business" + WhatsApp
 * buttons visible in the screenshots are global, fixed layout chrome
 * — they're not part of this section and should keep living in your
 * root layout / persistent nav component, not here.
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

    const ctx = gsap.context(() => {
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
          }
        },
      });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      <div
        ref={trackRef}
        className="flex h-screen w-max items-center gap-16 py-20 pl-[8vw] pr-[12vw] will-change-transform sm:gap-24"
      >
        {/* Panel 1 — section title */}
        <Panel widthClass="w-[100vw] lg:w-[1100px]" center>
          <h2 className="text-6xl font-extrabold leading-[0.95] tracking-tight text-[#121212] sm:text-7xl lg:text-8xl">
            Why <br className="hidden sm:block" />
            <span className={GRADIENT_TEXT}>Choose</span> us
          </h2>
        </Panel>

        {/* Panel 2 — About us */}
        <Panel widthClass="w-[85vw] sm:w-[50vw] lg:w-[560px]">
          <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className={GRADIENT_TEXT}>About</span>{" "}
            <span className="text-[#121212]">us</span>
          </h3>
          <p className="mt-8 text-lg leading-relaxed text-[#121212]">
            With over 8 years experience in local business intelligence, we
            know your time is precious, that&rsquo;s why we provide the
            fastest turnaround. Providing local SEO services to take your
            business to the top, boosting your online presence and driving
            sales, with innovation and cost effective techniques.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#121212]">
            Every pixel we place, every line of code we write, is a step
            towards perfection. We don&rsquo;t just build websites—we
            architect digital universes.
          </p>
        </Panel>

        {/* Panel 3 — Consulting + Managed Services (stacked) */}
        <Panel widthClass="w-[85vw] sm:w-[50vw] lg:w-[620px]">
          <div className="flex gap-6">
            <Users className="h-12 w-12 shrink-0 text-[#3AB5C0]" strokeWidth={1.5} />
            <div>
              <h4 className="text-2xl font-extrabold tracking-tight text-[#121212]">
                Consulting
              </h4>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[#121212]">
                We empower you to develop a clear digital strategy that
                drives technology-led business success and optimizes your
                growth.
              </p>
            </div>
          </div>

          <div className="mt-14 flex gap-6">
            <Wrench className="h-12 w-12 shrink-0 text-[#3AB5C0]" strokeWidth={1.5} />
            <div>
              <h4 className="text-2xl font-extrabold tracking-tight text-[#121212]">
                Managed Services
              </h4>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[#121212]">
                Our global Managed Services teams safeguard your digital
                investment with 24/7 monitoring, maintenance, and
                comprehensive support.
              </p>
            </div>
          </div>
        </Panel>

        {/* Panel 4 — Stats */}
        <Panel ref={statsPanelRef} widthClass="w-[85vw] sm:w-[55vw] lg:w-[620px]">
          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div
                  className={`flex items-baseline text-5xl font-extrabold tracking-tight sm:text-6xl ${GRADIENT_TEXT}`}
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
                <p className="mt-2 text-base text-[#121212]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* Panel 5 — Video */}
        <Panel widthClass="w-[85vw] sm:w-[55vw] lg:w-[720px]">
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
        <Panel widthClass="w-[90vw] lg:w-[1200px]" center>
          <p className="text-xl text-[#555555] sm:text-2xl">
            Have you project in mind?
          </p>
          <h2 className="mt-3 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#121212] sm:text-6xl lg:text-7xl">
            Let&rsquo;s make <span className={GRADIENT_TEXT}>something</span>
            <br />
            great together!
          </h2>

          <Link
            href="/contact-us"
            className="mt-12 inline-flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#3AB5C0] text-center text-lg font-semibold leading-tight text-white transition-transform hover:scale-105"
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
const Panel = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; widthClass: string; center?: boolean }
>(function Panel({ children, widthClass, center }, ref) {
  return (
    <div
      ref={ref}
      className={`flex h-full shrink-0 flex-col justify-center ${
        center ? "items-center text-center" : ""
      } ${widthClass}`}
    >
      {children}
    </div>
  );
});

export default WhyChooseUsHorizontal;