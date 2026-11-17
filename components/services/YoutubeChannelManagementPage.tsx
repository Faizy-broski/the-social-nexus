"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clapperboard,
  FlaskConical,
  ImageIcon,
  Lightbulb,
  Minus,
  Plus,
  Smartphone,
  Video,
  XCircle,
} from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";
import { YoutubeAuditForm } from "@/components/youtube/YoutubeAuditForm";
import {
  youtubeFaqs,
  youtubeShowcase,
  youtubeShowcasePlaceholder,
} from "@/lib/youtube-management-content";
import {
  HeroScroll,
  HorizontalShowcase,
  PinnedList,
  ProcessTimeline,
  ScrollCompare,
  ScrollWords,
} from "@/components/youtube/ScrollScenes";

const SECTION =
  "relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12";

const heroStats = [
  { value: "12+", label: "Years Experience" },
  { value: "1500+", label: "Projects Delivered" },
  { value: "3", label: "Countries Served" },
];

const deliverables = [
  {
    icon: Lightbulb,
    title: "Strategy & Topic Research",
    description:
      "We research what your audience already searches for and watches, then build a content plan around real demand instead of guesswork.",
  },
  {
    icon: ImageIcon,
    title: "Titles & Thumbnails",
    description:
      "Packaging decides whether a video gets clicked. We design thumbnails and write titles built to earn the click without misleading viewers.",
  },
  {
    icon: Clapperboard,
    title: "Editing & Motion Graphics",
    description:
      "Tight pacing, clear visuals, B-roll and animation that keep viewers watching and make complex ideas easier to follow.",
  },
  {
    icon: Video,
    title: "Recording Guidance",
    description:
      "Scripting support and live recording sessions so your delivery is sharp and every take gives the editor strong material.",
  },
  {
    icon: CalendarClock,
    title: "Publishing & Scheduling",
    description:
      "Uploads, descriptions, tags, end screens and a consistent schedule, handled for you so the channel never goes quiet.",
  },
  {
    icon: FlaskConical,
    title: "A/B Packaging Tests",
    description:
      "We test titles and thumbnails against each other and keep a log of what works for your audience, so every upload learns from the last.",
  },
  {
    icon: Smartphone,
    title: "Shorts Distribution",
    description:
      "We cut your long-form videos into Shorts and publish them, so each video reaches viewers who don't watch long-form yet.",
  },
  {
    icon: BarChart3,
    title: "Performance Reporting",
    description:
      "Plain-English reports on retention, click-through and watch time, with clear next steps, not a wall of charts.",
  },
];

const challengeStatement =
  "Growing a channel takes research, testing and constant iteration, on top of recording and editing. Most creators don't have the hours to do all of it well. Uploads slip, packaging becomes guesswork, and the channel plateaus. Treat it as a system, run by a team, and stay focused on what only you can do.";

const diyPoints = [
  "You research, script, record, edit and publish alone",
  "Thumbnails and titles are decided by instinct",
  "Uploads slip when life gets busy",
  "Little time to analyse what the data is saying",
  "Growth depends entirely on your free hours",
];

const managedPoints = [
  "A team owns strategy, production and publishing",
  "Packaging is tested and the results are logged",
  "A consistent schedule your audience can rely on",
  "Every upload is reviewed and the plan adjusted",
  "You record; we handle everything else",
];

const processSteps = [
  {
    number: "01",
    title: "The Strategy Call",
    description:
      "A short call to understand your channel, audience and goals, and to see where it is held back.",
  },
  {
    number: "02",
    title: "The Audit & The Plan",
    description:
      "We audit your channel and send a clear plan. You approve it before any work starts.",
  },
  {
    number: "03",
    title: "We Run It, Every Video",
    description:
      "Research, packaging, editing and publishing are handled for every upload while you focus on recording.",
  },
  {
    number: "04",
    title: "We Test & Compound",
    description:
      "We review performance, test new packaging and feed what we learn into the next video.",
  },
];

const fitPoints = [
  "You already publish (or are ready to publish) on a regular basis",
  "Your growth has stalled, or you want to grow faster",
  "You want to hand over production and packaging",
  "You're open to testing and data-led decisions",
];

const internalLinks = [
  { label: "Digital Marketing Services", href: "/services/digital-marketing" },
  {
    label: "Google Ads Management Agency London",
    href: "/google-ads-management-agency-london",
  },
  { label: "Content Marketing Companies", href: "/content-marketing-companies" },
  { label: "Pricing & Packages", href: "/pricing" },
  { label: "Contact Us", href: "/contact-us" },
];

export function YoutubeChannelManagementPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative overflow-x-clip bg-brand-navy text-white">
      {/* ================= HERO (scene 1: layered parallax) ================= */}
      <HeroScroll
        className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:px-12 lg:pl-20 lg:pr-10 lg:pt-40 xl:pl-25 xl:pr-12"
        background={
          <>
            <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
            <div
              className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
              style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
            />
            <NetworkLines />
          </>
        }
      >
        <Reveal variant="up" richer>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
            <Link href="/" className="text-white/50 hover:text-white">
              Home
            </Link>
            <span className="text-white/30">/</span>
            YouTube Channel Management
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            YouTube Channel Management:{" "}
            <span className="gradient-text-animated">
              You Create, We Run the Channel
            </span>
          </h1>
        </Reveal>

        <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl space-y-4">
          <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
            Great videos aren&rsquo;t enough on their own. Strategy,
            thumbnails, editing, publishing and testing all decide whether a
            channel grows, and doing every one of them yourself is what holds
            most creators back.
          </p>
          <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
            The Social Nexus runs your channel as a system. You record, and
            we take care of the rest.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.2} className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            href="#free-audit"
            fillClassName="bg-brand-teal/30"
            className="press-scale flex h-14 w-fit items-center justify-center rounded-full border border-brand-teal px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Book a Free Channel Audit
          </MagneticButton>
          <MagneticButton
            href="#how-it-works"
            fillClassName="bg-white/15"
            className="press-scale flex h-14 w-fit items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            See How It Works
          </MagneticButton>
        </Reveal>

        <Reveal
          variant="up"
          delay={0.3}
          className="stagger-children mt-12 grid grid-cols-3 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:max-w-lg sm:p-8"
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </HeroScroll>

      {/* ============ WHAT WE TAKE OVER (scene 2: pin + crossfade) ============ */}
      <PinnedList items={deliverables}>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
          What We Take Over
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
          Everything Behind the Camera,{" "}
          <span className="gradient-text-animated">Handled</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          From the first idea to the published video and the report that
          follows, here is what our team looks after.
        </p>
      </PinnedList>

      {/* ============ THE CHALLENGE (scene 3: word-by-word scrub) ============ */}
      <section className={`${SECTION} py-24 sm:py-32`}>
        <div className="mx-auto max-w-4xl">
          <Reveal variant="up">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Why Most Channels Never Break Out
            </h2>
          </Reveal>
          <ScrollWords
            text={challengeStatement}
            className="mt-8 text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.75rem]"
          />
        </div>
      </section>

      {/* ============ DIY VS MANAGED (scene 4: offset reveal) ============ */}
      <section className={SECTION}>
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              The Difference
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Why Creators{" "}
              <span className="gradient-text-animated">Hand Us Their Channel</span>
            </h2>
          </Reveal>

          <ScrollCompare
            diy={
              <>
                <h3 className="text-xl font-semibold text-white">Doing it yourself</h3>
                <ul className="mt-5 space-y-3">
                  {diyPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-white/60 sm:text-base">
                      <XCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-red-400/80"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            }
            managed={
              <>
                <h3 className="text-xl font-semibold text-brand-teal-light">
                  A team running it as a system
                </h3>
                <ul className="mt-5 space-y-3">
                  {managedPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-white/70 sm:text-base">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        </div>
      </section>

      {/* ====== SHOWCASE (scene 5, the peak: pinned horizontal pan) ====== */}
      {youtubeShowcase.length > 0 && (
        <HorizontalShowcase
          items={youtubeShowcase}
          note={
            youtubeShowcasePlaceholder
              ? "Sample portfolio: placeholder channels and figures, shown for layout only."
              : undefined
          }
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
            Selected Work
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            Channels We&rsquo;ve{" "}
            <span className="gradient-text-animated">Helped Grow</span>
          </h2>
        </HorizontalShowcase>
      )}

      {/* ============ HOW IT WORKS (scene 6: line draw) ============ */}
      <section id="how-it-works" className={`${SECTION} scroll-mt-24`}>
        <div className="mx-auto max-w-4xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              How the Partnership{" "}
              <span className="gradient-text-animated">Works</span>
            </h2>
          </Reveal>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* ================= WHO IT'S FOR + AUDIT FORM ================= */}
      <section id="free-audit" className={`${SECTION} scroll-mt-24`}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="right">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Free Channel Audit
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Book Your{" "}
              <span className="gradient-text-animated">Free Audit</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              We take on a limited number of channels at a time so every one
              gets proper attention. This is a good fit if:
            </p>
            <ul className="mt-6 space-y-3">
              {fitPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-white/70 sm:text-base">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/50">
              We review your channel and send specific fixes, with no pitch and
              no obligation.
            </p>
          </Reveal>

          <Reveal
            variant="left"
            delay={0.1}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <p className="mb-6 text-xl font-semibold">Tell us about your channel</p>
            <YoutubeAuditForm />
          </Reveal>
        </div>
      </section>

      {/* ================= FAQS ================= */}
      <section className={SECTION}>
        <div className="mx-auto max-w-4xl">
          <Reveal variant="up" className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="stagger-children mt-10 border-t border-white/15">
            {youtubeFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="group relative border-b border-white/15 pl-2"
                >
                  <span className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-0 bg-linear-to-r from-brand-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full" />
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal-light sm:text-base">
                      {faq.question}
                    </span>
                    <span className="relative h-4 w-4 shrink-0 text-white/70">
                      <Plus
                        className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${
                          isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`}
                      />
                      <Minus
                        className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${
                          isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-white/55">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ================= LINKS SUMMARY ================= */}
      <section className="relative px-5 pb-20 pt-4 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
            Explore More
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-brand-teal-light sm:text-base"
                >
                  <ArrowUpRight className="h-4 w-4 text-brand-teal-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default YoutubeChannelManagementPage;
