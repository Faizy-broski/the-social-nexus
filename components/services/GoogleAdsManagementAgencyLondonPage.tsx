"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Eye,
  ExternalLink,
  Gauge,
  ListChecks,
  Mic,
  Minus,
  MousePointerClick,
  PiggyBank,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";

const heroStats = [
  { value: "20+", label: "Years Experience" },
  { value: "1,000+", label: "Campaigns Managed" },
  { value: "800+", label: "Clients Served" },
];

const channels = [
  {
    icon: Search,
    title: "Google Search Ads",
    description:
      "High-intent Search campaigns that put your business in front of people actively searching for what you offer.",
  },
  {
    icon: ShoppingCart,
    title: "Google Shopping Ads",
    description:
      "Product listing campaigns that get your catalogue in front of ready-to-buy shoppers on Google Shopping.",
  },
  {
    icon: Users,
    title: "Remarketing Campaigns",
    description:
      "Campaigns that keep your brand in front of past visitors and bring them back to finish what they started.",
  },
  {
    icon: Target,
    title: "Display Advertising",
    description:
      "Visual ads placed across Google's Display Network to build awareness and stay top of mind.",
  },
  {
    icon: Sparkles,
    title: "YouTube Ads",
    description:
      "Video campaigns that reach your audience where they're already spending their attention.",
  },
  {
    icon: Eye,
    title: "Competitor Monitoring",
    description:
      "Ongoing tracking of competitor bidding and ad activity, so we can find the gaps they're leaving open.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Market Research",
    description:
      "We study what your customers are searching for, what your competition is doing, and where the biggest opportunities are waiting. Advertising spend is never wasted from the start when the research is done properly.",
  },
  {
    number: "02",
    title: "Campaign Structure",
    description:
      "We build campaign structures that are easy to track and optimise — correctly grouped keywords, focused ad groups that match buyer intent, and strong conversion tracking to measure every result accurately.",
  },
  {
    number: "03",
    title: "Ongoing Management",
    description:
      "Performance is tracked and analysed daily, new ad copy is tested, bids are optimised, and underperforming campaigns are paused. This continuous management is the single biggest factor in whether a paid campaign succeeds.",
  },
  {
    number: "04",
    title: "Transparent Reporting",
    description:
      "We present results in a way you can actually understand — cost per lead, return on ad spend, and real customers from your campaigns, not muddled tools and spreadsheets.",
  },
];

const pickChecklist = [
  "Check their history — request case studies or concrete examples from companies in your line of business.",
  "Review their communication approach — you want a team that speaks plainly, not in jargon.",
  "Ask about their approach to Google's AI tools, like Performance Max and automated bidding.",
  "Get clarity on pricing — including how much goes to Google versus management fees.",
];

const mistakes = [
  "Selecting keywords that are too broad, which means paying extra for clicks that don't convert.",
  "Forgetting to add negative keywords, so ads end up showing for irrelevant searches.",
  "Sending traffic to poor landing pages that are slow, confusing, or broken on mobile.",
  "Quitting too soon, before campaigns have had time to collect enough data to optimise.",
  "Not tracking conversions correctly, making it impossible to know what's actually generating sales.",
  "Running overlapping campaigns that bid against each other and drive up costs for no extra value.",
];

const consultantBenefits = [
  {
    icon: Target,
    title: "A Dedicated Focus",
    description:
      "You no longer manage your ad account alongside running your business — a dedicated expert focuses solely on your results.",
  },
  {
    icon: Eye,
    title: "An Outside Perspective",
    description:
      "Business owners often have a blind spot toward their own brand. A fresh pair of eyes sees further than looking over their own shoulder.",
  },
  {
    icon: PiggyBank,
    title: "Real Cost-Efficiency",
    description:
      "The cost of inefficient ad spend usually far outweighs the cost of an expert — most businesses see a real boost in ROI within the first few months.",
  },
];

const trends2026 = [
  {
    icon: Gauge,
    title: "Relevance & Speed Win",
    description:
      "Ads that match useful, well-organised landing pages earn a better Quality Score in 2026, which lowers cost per click.",
  },
  {
    icon: Sparkles,
    title: "Smart Automation",
    description:
      "AI is playing a bigger role in bidding and targeting, but the businesses winning are the ones combining human strategy with automation — not relying on AI alone.",
  },
  {
    icon: Mic,
    title: "Voice & Conversational Search",
    description:
      "Voice search and conversational queries are shaping keyword strategy. Ads and landing pages that answer common questions directly tend to perform better across both search and AI-powered experiences.",
  },
];

const faqs = [
  {
    question: "What is the cost of a Google Ads management agency London?",
    answer:
      "Most agencies work on either a monthly fee or a commission based on ad spend — typically a few hundred to a few thousand pounds, depending on the size and complexity of the campaign.",
  },
  {
    question: "How long does it take to see Google Ads results?",
    answer:
      "Most businesses start noticing useful data within 2-4 weeks, with noticeable improvements from optimisation showing up over the following 2-3 months.",
  },
  {
    question: "Do I need a large budget for successful Google Ads campaigns?",
    answer:
      "Not necessarily. Strategic, targeted use of a small budget beats misguided spending on a large one — it's about strategy and targeting, not just how much you spend.",
  },
  {
    question: "What's the difference between PPC management services and doing it myself?",
    answer:
      "Professional services include expert research, frequent testing, and ongoing data tracking that most business owners simply don't have the time to do themselves.",
  },
  {
    question: "Can a Google Ads consultant also manage Google Shopping Ads?",
    answer:
      "Yes — most consultants and agencies handle Shopping campaigns alongside other channels like YouTube ads and Display advertising.",
  },
  {
    question: "Is Google Ads still effective in 2026 with AI-powered search on the rise?",
    answer:
      "Yes, Google Ads remains very effective, particularly when you use Google's AI features to inform your strategy rather than replace it entirely.",
  },
  {
    question: "How can I tell if I'm working with a good PPC agency?",
    answer:
      "Watch for transparency, a consistent cost-per-lead, and clear communication. If a long stretch passes with no progress, it may be time for a change.",
  },
];

const internalLinks = [
  { label: "SEO Services in London", href: "/seo-agency-london" },
  {
    label: "Social Media Marketing for Small Businesses Breakdown",
    href: "/services/digital-marketing",
  },
  {
    label: "Website Conversion Rate Optimization Guide",
    href: "/website-developers-for-small-business",
  },
];

const externalLinks = [
  {
    label: "Google Ads Help Center",
    href: "https://support.google.com/google-ads/",
  },
  {
    label: "WordStream's PPC Industry Benchmarks",
    href: "https://www.wordstream.com/blog/ws/2023/09/12/google-ads-benchmarks",
  },
  { label: "Search Engine Land", href: "https://searchengineland.com/" },
];

export function GoogleAdsManagementAgencyLondonPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative overflow-hidden bg-brand-navy text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:px-12 lg:pl-20 lg:pr-10 lg:pt-40 xl:pl-25 xl:pr-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
          <div
            className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
            style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
          />
          <NetworkLines />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Reveal variant="up" richer>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
              <Link href="/" className="text-white/50 hover:text-white">
                Home
              </Link>
              <span className="text-white/30">/</span>
              Google Ads Management Agency London
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Google Ads Management Agency London: Your{" "}
              <span className="gradient-text-animated">
                Quick Route to Higher Leads
              </span>
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl space-y-4">
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              Being in business in London is exciting, but it&rsquo;s noisy
              too. Everyone is out there trying to get attention, and your
              customers are skimming past hundreds of ads every day. You
              can&rsquo;t rely on good fortune if you want your business to
              succeed — you need a real plan. That&rsquo;s where a Google
              Ads management agency London business owners can trust comes
              in.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              Within the city of London you&rsquo;ll find startups, retail
              shops, law firms, restaurants, and thousands of service
              businesses all targeting the same customers. That means a
              high risk of failure or costly mistakes — one poorly run
              campaign can burn through your entire monthly budget in days
              without bringing in a single customer. A well-run campaign,
              on the other hand, makes every pound count for consistent,
              predictable growth.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              For this reason, more business owners are turning to
              professionals instead of going at it alone. It&rsquo;s not
              about surrendering control — it&rsquo;s about entrusting your
              budget to people who know how to make it work.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.2}
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
        </div>
      </section>

      {/* ================= WHAT IS A GOOGLE ADS AGENCY ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              The Basics
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              What Is a{" "}
              <span className="gradient-text-animated">
                Google Ads Management Agency
              </span>
              ?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              A Google Ads management agency takes care of all of your paid
              search advertising — keyword research, ad writing, budget
              strategy, bid strategy, landing page audits, and performance
              monitoring. Instead of guessing what might work, an agency
              controls your ads week to week based on real data.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              It&rsquo;s a bit like bringing on a taxi driver who knows every
              shortcut in the city. You could buy maps, study the streets,
              and learn the routes yourself — but you&rsquo;ll take a lot of
              wrong turns along the way, and it costs you time and money. A
              proficient team already knows where you&rsquo;ll save cash and
              where you&rsquo;ll save time.
            </p>
          </Reveal>

          <div className="stagger-children mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <article
                key={channel.title}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-brand-teal/40"
              >
                <div className="flex items-start justify-between">
                  <channel.icon
                    className="h-9 w-9 text-brand-teal-light"
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-gold" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.02em] text-brand-teal-light">
                  {channel.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {channel.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/60">
            Most people don&rsquo;t realise what a difference account
            structure makes. A messy account that mixes up keywords and
            clashing goals burns through budget fast. Agencies start clean
            and organised, so it&rsquo;s always clear what&rsquo;s working
            and what needs to change.
          </p>
        </div>
      </section>

      {/* ================= WHY LONDON BUSINESSES NEED PPC ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/5.jpg"
                  alt="Google Ads management agency London team reviewing PPC campaign performance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Local Advantage
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Why London Businesses Need{" "}
                <span className="gradient-text-animated">
                  Strong PPC Management
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                London&rsquo;s digital marketplace is one of the fiercest in
                the world. Thousands of businesses are chasing the same
                customers, particularly in tech, finance, retail, and local
                services. Without a steady hand on your PPC, your ads can
                easily get lost against competitors with bigger budgets and
                sharper targeting.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A local agency knows London the way you do. They understand
                which boroughs convert best for different services, what
                time of day locals are most active online, and how spending
                shifts across the city seasonally. That local knowledge
                helps your ad budget go further instead of being wasted on
                the wrong clicks.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Google Ads is also evolving quickly. As automation, AI
                bidding, and privacy regulations change through 2026,
                it&rsquo;s crucial to have an expert who keeps pace with
                those shifts — an agency that lives in PPC every day stays
                ahead of it, so you don&rsquo;t fall behind.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Google Ads Experts{" "}
              <span className="gradient-text-animated">
                Build Campaigns That Win
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Google Ads experts don&rsquo;t work off guesswork — they
              follow an elaborate process built to turn clicks into
              customers.
            </p>
          </Reveal>

          <div className="stagger-children mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
              >
                <span className="text-3xl font-semibold text-brand-gold">
                  {step.number}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-brand-teal-light">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHOOSING A PPC AGENCY ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Before You Sign
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Choosing a{" "}
              <span className="gradient-text-animated">
                PPC Agency London
              </span>{" "}
              Trusts
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Not all agencies are created equal, and the choice matters.
              Here are a few key points to review before you sign a
              contract:
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {pickChecklist.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                  {point}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= MISTAKES ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                What to Watch For
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Common Mistakes{" "}
                <span className="gradient-text-animated">
                  Without Expert Help
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A lot of companies try to run their own Google Ads before
                getting in touch with a professional. That&rsquo;s a
                natural process, but it often ends up inflating costs.
              </p>
              <ul className="mt-5 space-y-3">
                {mistakes.map((mistake) => (
                  <li key={mistake} className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400/80" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {mistake}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/laptop.webp"
                  alt="Google Ads campaign dashboard showing cost-per-click optimisation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CONSULTANT BENEFITS ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              The Payoff
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Benefits of a{" "}
              <span className="gradient-text-animated">
                Google Ads Consultant
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              A Google Ads consultant brings structure to what can be an
              overwhelming process — here&rsquo;s what that actually gets
              you:
            </p>
          </Reveal>

          <div className="stagger-children mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {consultantBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <benefit.icon
                  className="h-9 w-9 text-brand-teal-light"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.02em] text-brand-teal-light">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 2026 TRENDS ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Looking Ahead
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              How{" "}
              <span className="gradient-text-animated">2026 Trends</span>{" "}
              Are Reshaping PPC
            </h2>
          </Reveal>

          <div className="stagger-children mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {trends2026.map((trend) => (
              <div
                key={trend.title}
                className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
              >
                <trend.icon className="h-9 w-9 text-brand-gold" strokeWidth={1.5} />
                <h3 className="mt-5 text-xl font-semibold text-brand-teal-light">
                  {trend.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  {trend.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WRAP UP / CTA ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <Reveal
          variant="scale"
          className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-brand-teal-dark to-brand-navy-light p-8 text-center sm:p-12"
        >
          <BarChart3 className="mx-auto h-10 w-10 text-brand-gold" />
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
            Your Quick Route to Higher Leads
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Finding a Google Ads management agency London businesses can
            rely on isn&rsquo;t just about saving time — it&rsquo;s about
            delivering tangible growth from your ad spend. With a team that
            tests and optimises your strategy, your business can compete
            with confidence, even in one of the busiest places in the world
            to advertise online. Contact us today for a complimentary
            review of your account and find out how your ad budget can be
            doing more for your business.
          </p>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-white/15"
            className="press-scale mx-auto mt-8 flex h-14 w-fit items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Book Your Free Ads Audit
          </MagneticButton>
        </Reveal>
      </section>

      {/* ================= FAQS ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-4xl">
          <Reveal variant="up" className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              FAQs
            </h2>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="stagger-children mt-10 border-t border-white/15">
            {faqs.map((faq, index) => {
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
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2 sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Explore More
            </p>
            <ul className="mt-4 space-y-3">
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
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Further Reading
            </p>
            <ul className="mt-4 space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-brand-teal-light sm:text-base"
                  >
                    <ExternalLink className="h-4 w-4 text-brand-teal-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GoogleAdsManagementAgencyLondonPage;
