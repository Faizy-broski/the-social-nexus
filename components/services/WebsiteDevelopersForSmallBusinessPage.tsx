"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  ExternalLink,
  Gauge,
  Layers,
  ListChecks,
  Minus,
  Palette,
  Plus,
  Puzzle,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";

const heroStats = [
  { value: "20+", label: "Years Experience" },
  { value: "1,000+", label: "Sites Delivered" },
  { value: "800+", label: "Happy Clients" },
];

const whatYouGet = [
  "A user-friendly website custom made to your business objectives.",
  "A clean, trustworthy design to reach new users.",
  "Quick loading time, on mobile and desktop.",
  "A site structure that search engines can read and easily understand.",
  "Continuous support for any updates or changes as needed.",
];

const goalRecommendations = [
  "Getting to know your target audience from the start.",
  "Designing navigation throughout the site that's easy to follow.",
  "Creating content that genuinely engages your customers.",
  "Testing the site on various devices and browsers.",
  "Incorporating tracking tools to measure real results.",
];

const affordablePoints = [
  "Up-front, transparent pricing with no hidden charges.",
  "An emphasis on what your business truly needs.",
  "Packages that grow and change as your company grows.",
  "Clear timelines and expectations from day one.",
  "A team who are willing to share their process with clarity.",
];

const customPoints = [
  "Design elements that make your brand stand out.",
  "Features tailored for your specific niche and needs.",
  "Improved functionality, as the code is built around your needs.",
  "Room for future growth and additional features.",
  "A site that is authentic rather than generic.",
];

const developerQuestions = [
  "Do they share clear communication of process steps from beginning to end?",
  "What continuous support do they offer after the site launches?",
  "What action do they take when updates, changes, or issues arise unexpectedly?",
  "Will the site be optimised for search engines from day one, or only once it gets traffic?",
];

const siteComponents = [
  "A fast load speed on all devices.",
  "Easy navigation on mobile, since that's where most visitors find you.",
  "Easily accessible contact details.",
  "Simple, direct calls to action on every page.",
  "Straightforward SEO setup, with proper headings and meta descriptions.",
  "Secure hosting with HTTPS protection.",
];

const rankingImpacts = [
  "The speed at which visitors can view your page.",
  "Whether the site is getting indexed well by search engines.",
  "The length of time visitors spend on your website.",
  "Whether your site is genuinely usable on mobile.",
  "The credibility of your site in front of visitors and search engines.",
];

const mistakes = [
  "Opting for design over function, leaving visitors unsure what to do next.",
  "Ignoring mobile users, even though they make up the majority of traffic.",
  "Skipping SEO fundamentals such as keywords in pages, titles, and headings.",
  "Leaving outdated content live after services or prices have changed.",
  "Not having clear contact details on each page.",
];

const maintenanceTasks = [
  "Installing software and security updates and patches.",
  "Monitoring page speed and identifying issues that are slowing the site down.",
  "Analysing statistics to get insight into visitor behaviour.",
  "Making minor design and content changes as your business grows.",
];

const faqs = [
  {
    question: "How much do website developers for small businesses charge?",
    answer:
      "Costs differ depending on the features and complexity of the website, but most small business websites typically range from several hundred to a few thousand dollars, depending on what you need.",
  },
  {
    question: "What is the time frame for making a small business site?",
    answer:
      "Small business websites usually take between two and six weeks to complete, depending on the size of the project and how quickly content is provided.",
  },
  {
    question: "Should I build my own website or use a template?",
    answer:
      "Templates can be adequate for a simple website, but custom development provides greater flexibility and performance as your business grows.",
  },
  {
    question: "Do website designers do SEO as well?",
    answer:
      "Many developers include basic SEO — proper headings, meta descriptions, and so on — but an ongoing SEO strategy is usually a separate service, depending on the developer.",
  },
  {
    question: "What happens once my website goes live?",
    answer:
      "Most site-building teams offer continual support for updates, fixes, and enhancements after your website has launched.",
  },
  {
    question: "How can I tell if a website development company is reliable?",
    answer:
      "Check for clear pricing, real examples of clients they've helped, and a development process that's explained clearly before work even begins.",
  },
];

const internalLinks = [
  { label: "Explore Our Website Projects", href: "/portfolio" },
  { label: "View Development Packages", href: "/services/web-development" },
];

const externalLinks = [
  { label: "Google Web.dev Guidelines", href: "https://web.dev/" },
  { label: "W3C Web Standards", href: "https://www.w3.org/standards/" },
];

export function WebsiteDevelopersForSmallBusinessPage() {
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
              Website Developers For Small Business
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Website Developers for{" "}
              <span className="gradient-text-animated">Small Business</span>:
              Build a Site That Sells
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl space-y-4">
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              When a customer visits your website and sees that it takes a
              long time to load, looks outdated, or is hard to use on a
              phone, that customer will leave. They won&rsquo;t even look at
              what your business has to offer. Your website is the
              impression of your business that the customer gets — a
              sluggish or difficult-to-understand site isn&rsquo;t just
              annoying for visitors, it repels them. It stunts the growth of
              your business, even if you offer great products and services.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              In this guide, we&rsquo;ll cover what to expect from website
              developers for small business projects, what a good website
              is made of, and how your business can grow securely, rather
              than lose potential customers to rivals with better websites.
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

      {/* ================= WHY IT'S CRITICAL ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/2.jpg"
                  alt="Website developers for small business team designing a layout"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Why It Matters
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Why It&rsquo;s Critical to Have the{" "}
                <span className="gradient-text-animated">
                  Proper Website Developers
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Hopeful small business owners may attempt to build their own
                website with free tools to save cash. That&rsquo;s fine for
                a simple start, but it usually creates problems later — a
                clunky site, a disorganised mobile version, and slow load
                times all quietly push potential customers toward the
                &ldquo;other website.&rdquo; Unless you&rsquo;re paying close
                attention, you&rsquo;re losing customers all day.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                That&rsquo;s why teams who specialise in small business
                websites bring real value — a professional team knows how to
                build a site that impresses the visitor, loads quickly, and
                leads them to take action, from calling your business to
                booking a service or making a purchase.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                When you bring in a developer, you get:
              </p>
              <ul className="mt-5 space-y-3">
                {whatYouGet.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="up" className="mx-auto mt-10 max-w-4xl">
            <p className="text-base leading-relaxed text-white/60">
              With the right team handling it, a small business website can
              deliver far better outcomes — it operates like an actual sales
              tool, not just a digital business card.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= GOAL OF DEVELOPMENT ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Function Over Looks
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              The Goal of{" "}
              <span className="gradient-text-animated">
                Small Business Website Development
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Good small business website development isn&rsquo;t just
              about a pretty appearance. It emphasises functionality over
              design, so your site contributes to your business&rsquo;s
              growth rather than sitting idle looking nice.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {goalRecommendations.map((point) => (
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

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60">
            When a website is built within this framework, the result is a
            site that serves your business objectives, rather than one
            constructed around guesswork or fast-passing trends.
          </p>
        </div>
      </section>

      {/* ================= TRUST + AFFORDABLE ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal
              variant="up"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Palette className="h-7 w-7 text-brand-gold" />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Business Website Design That Creates Trust
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                In a lot of ways, the first impression matters more online
                than anywhere else. A visitor decides within seconds how
                much they trust your business enough to stick around. That&rsquo;s
                why business website design is so important to get right.
              </p>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                  <span className="text-sm leading-relaxed text-white/70">
                    Imagery that accurately represents your business.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                  <span className="text-sm leading-relaxed text-white/70">
                    Clear, easy-to-use navigation to reach the information
                    visitors are looking for quickly.
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Good web design goes beyond looking good — it establishes
                trust, greatly increasing the chances a visitor calls you or
                buys from you, instead of moving on to a competitor.
              </p>
            </Reveal>

            <Reveal
              variant="up"
              delay={0.1}
              className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-7 w-7 text-brand-gold" />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Affordable Website Development
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Many small business owners assume that any investment in
                website development has to be costly. That isn&rsquo;t
                necessarily true. Affordable website development simply
                means finding a team that delivers useful work without
                extras you don&rsquo;t need.
              </p>
              <ul className="mt-5 space-y-3">
                {affordablePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Budget-friendly doesn&rsquo;t need to mean poor quality — it
                means working with a developer who knows how to focus on
                what truly matters, especially in the early phases of growth.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CUSTOM DEVELOPMENT ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Built Around You
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Custom Website Development{" "}
                <span className="gradient-text-animated">
                  Tailored to Your Needs
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                While template websites can be a helpful place to start,
                they won&rsquo;t take your business as far as it needs to go
                online. With custom website development, your site is built
                around your objectives, your customers, and your business.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Custom development can include:
              </p>
              <ul className="mt-5 space-y-3">
                {customPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Puzzle className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Custom development can take a little more effort upfront but
                delivers better results in the long run, since no template
                is being forced to fit a purpose it wasn&rsquo;t built for.
              </p>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/laptop.webp"
                  alt="Custom website development mockup on a laptop screen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SELECTING A COMPANY ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Before You Sign
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Selecting the{" "}
              <span className="gradient-text-animated">
                Correct Website Development Company
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              There are plenty of options when it comes to choosing the
              right website development company, and it can feel
              overwhelming. Communication, experience, and a genuine
              understanding of your business needs are the key ingredients
              in making the right choice. Consider asking:
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {developerQuestions.map((question) => (
              <div
                key={question}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                  {question}
                </span>
              </div>
            ))}
          </Reveal>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60">
            A reliable website development firm should be able to give
            definite answers to these questions, backed by specific
            examples, before you make your final decision.
          </p>
        </div>
      </section>

      {/* ================= COMPONENTS OF A GOOD SITE ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              The Checklist
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              The Real Components of a{" "}
              <span className="gradient-text-animated">
                Good Small Business Website
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Beyond design and development, there are a handful of
              features that are non-negotiable for any small business site
              in 2026. Their absence can go unnoticed at first glance, but
              it still affects both user experience and rankings.
            </p>
          </Reveal>

          <div className="stagger-children mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, text: siteComponents[0] },
              { icon: Smartphone, text: siteComponents[1] },
              { icon: ArrowUpRight, text: siteComponents[2] },
              { icon: ListChecks, text: siteComponents[3] },
              { icon: Search, text: siteComponents[4] },
              { icon: ShieldCheck, text: siteComponents[5] },
            ].map((item) => (
              <article
                key={item.text}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-brand-teal/40"
              >
                <item.icon
                  className="h-9 w-9 text-brand-teal-light"
                  strokeWidth={1.5}
                />
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60">
            Get these right from the start, and your website becomes a real
            force for attracting new visitors and turning them into loyal
            customers.
          </p>
        </div>
      </section>

      {/* ================= SEARCH RANKINGS ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/5.jpg"
                  alt="Affordable website development project timeline chart"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Beyond the Look
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                How Website Development{" "}
                <span className="gradient-text-animated">
                  Impacts Search Rankings
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A lot of small business owners don&rsquo;t realise how
                closely website development ties into search rankings.
                Google is very sensitive to your site&rsquo;s speed, how
                easy it is to navigate, and whether it&rsquo;s
                mobile-friendly when deciding how to rank a page.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Working with a professional team isn&rsquo;t just about
                looks — it directly impacts:
              </p>
              <ul className="mt-5 space-y-3">
                {rankingImpacts.map((impact) => (
                  <li key={impact} className="flex items-start gap-3">
                    <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {impact}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                A well-built website supports the success of all your other
                digital marketing efforts, from ranking to promotion.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= PITFALLS + MAINTENANCE ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Reveal
            variant="up"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <XCircle className="h-7 w-7 text-brand-gold" />
              <h2 className="text-xl font-semibold sm:text-2xl">
                Common Pitfalls to Avoid
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Even well-intentioned businesses make common errors when
              building or improving their online presence. Fixing these
              early prevents costly, time-consuming problems later.
            </p>
            <ul className="mt-5 space-y-3">
              {mistakes.map((mistake) => (
                <li key={mistake} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400/80" />
                  <span className="text-sm leading-relaxed text-white/70">
                    {mistake}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Working with experienced developers on your small business
              project helps you steer clear of these dangers early on.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <RefreshCw className="h-7 w-7 text-brand-gold" />
              <h2 className="text-xl font-semibold sm:text-2xl">
                Website Maintenance After Launch
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Building a website isn&rsquo;t a one-and-done task. Once it&rsquo;s
              live, it needs to stay secure, fast, and efficient — a step
              small businesses often overlook until months later.
            </p>
            <ul className="mt-5 space-y-3">
              {maintenanceTasks.map((task) => (
                <li key={task} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                  <span className="text-sm leading-relaxed text-white/70">
                    {task}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              A well-maintained website keeps performing long after launch —
              which is why many leading small business developers bundle
              maintenance packages with their development work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY CHOOSE US / CTA ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <Reveal
          variant="scale"
          className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-brand-teal-dark to-brand-navy-light p-8 text-center sm:p-12"
        >
          <Award className="mx-auto h-10 w-10 text-brand-gold" />
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
            Start Building Your Small Business Website Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We believe every small business deserves a website that&rsquo;s
            functional, not just good-looking. We build fast, clean, and
            effective sites based around real business objectives, not the
            latest trend — with clear communication, realistic timelines,
            and no confusing pricing. It doesn&rsquo;t need to be
            complicated to find the right website developers for small
            business growth.
          </p>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-white/15"
            className="press-scale mx-auto mt-8 flex h-14 w-fit items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Get a Free Website Quote
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

export default WebsiteDevelopersForSmallBusinessPage;
