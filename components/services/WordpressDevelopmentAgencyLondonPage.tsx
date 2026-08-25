"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Gauge,
  ListChecks,
  Minus,
  MousePointerClick,
  Plus,
  Puzzle,
  ShoppingCart,
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

const partnerBenefits = [
  "A website designed for your particular business objectives.",
  "Correct security configuration to protect your site and your customers' information.",
  "Fast loading speed on mobile as well as desktop devices.",
  "Easy-to-crawl, search-engine-friendly code.",
  "Continuous support whenever changes and updates are required.",
];

const developerTraits = [
  "Quick resolution of problems without compromising other elements of the website.",
  "Clear communication kept up throughout the whole project.",
];

const designElements = [
  "Clear calls to action that lead visitors towards the next step.",
  "A responsive layout, since most visitors are on their phones.",
  "A fast site that won't lose users to the competition.",
];

const customPoints = [
  "Improved site performance, as the code is created with intent.",
  "A greater degree of flexibility to scale up as your business grows.",
  "A website that reflects your brand rather than a typical template site.",
];

const woocommercePoints = [
  "Establishing a safe and trustworthy payments system.",
  "Easy-to-browse organisation of products.",
  "Optimising product pages to promote sales.",
  "Effective inventory and order tracking.",
  "Making the store run smoothly on mobile devices.",
];

const agencyQuestions = [
  "Are they able to provide actual WordPress experience?",
  "Do they articulate the process clearly throughout the work?",
  "What continuous support do they provide after the website launches?",
  "How do they keep your site secure and up to date?",
  "Will the site be speed-optimised and optimised for search engines?",
];

const mistakes = [
  "Getting a low-cost, low-reliability host, which slows down the entire website.",
  "Having too many plugins, which can cause conflicts and security problems.",
  "Failing to regularly update the site, leaving it vulnerable to attacks.",
  "Not testing on mobile devices before the site launches.",
  "Not making regular backups in case of problems.",
];

const rankingImpacts = [
  "Your site's mobile performance is a key factor.",
  "Your website's overall security and trustworthiness are also considered.",
  "The amount of time visitors spend engaging once they arrive.",
];

const faqs = [
  {
    question: "Is my WordPress site safe and secure against hackers?",
    answer:
      "If the site is set up properly — with a firewall, regular updates, and secure login protection — the likelihood of it being attacked is significantly reduced.",
  },
  {
    question: "Will I be able to make content changes to the website after it's launched?",
    answer:
      "Yes. WordPress is easy to edit for business owners, and even without any coding knowledge you can edit text, images, and pages.",
  },
  {
    question: "If a web agency creates my website for me, do I own it?",
    answer:
      "Yes — with a good agency, you'll receive 100% ownership of your site files, hosting, and domain name at the end of the job.",
  },
  {
    question: "Is there a set number of plugins needed for a WordPress website?",
    answer:
      "Only the plugins that serve a genuinely useful function. Unnecessary plugins can hurt your site's performance and introduce security risks.",
  },
  {
    question: "Can a WordPress site support my business as it gets more popular?",
    answer:
      "Absolutely — a WordPress site can handle large increases in traffic without issues, provided it's properly hosted, uses caching, and was developed correctly from the start.",
  },
];

const internalLinks = [
  { label: "Browse Our Recent Projects", href: "/portfolio" },
  { label: "See Our WordPress Pricing", href: "/contact-us" },
  { label: "Our WordPress Development Process", href: "/services/web-development" },
  { label: "Read Client Success Stories", href: "/portfolio" },
  { label: "Explore Our SEO Services", href: "/seo-agency-london" },
  { label: "Learn About WordPress Support Plans", href: "/contact-us" },
  { label: "Get a Free Website Consultation", href: "/contact-us" },
];

const externalLinks = [
  { label: "WordPress.org Official Site", href: "https://wordpress.org/" },
  {
    label: "Google Core Web Vitals Guide",
    href: "https://developers.google.com/search/docs/appearance/core-web-vitals",
  },
  {
    label: "WooCommerce Official Documentation",
    href: "https://woocommerce.com/documentation/",
  },
  {
    label: "Google Search Central: Mobile-Friendly Sites",
    href: "https://developers.google.com/search/docs/appearance/mobile-friendly",
  },
];

export function WordpressDevelopmentAgencyLondonPage() {
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
              WordPress Development Agency London
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              WordPress Development Agency London:{" "}
              <span className="gradient-text-animated">
                Create a Growing Site
              </span>
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl space-y-4">
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              WordPress is adaptable, easy to improve, and efficient for
              nearly any business type. There&rsquo;s a lot of skill that
              goes into building a WordPress site that actually works,
              though, so it&rsquo;s no surprise that many businesses look
              for a trusted WordPress development agency London team to
              turn to when starting a new project.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              Google heavily factors in speed, security, and mobile
              usability when ranking websites in 2026. Even if you have a
              nice-looking site, a poorly constructed WordPress build can
              bog your business down instead of helping it grow. The right
              agency can make a huge difference to your website&rsquo;s
              performance from the very beginning.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              Here&rsquo;s a guide to the value a strong WordPress
              development agency London can bring to your business, what
              you should look for in a development partner, and how the
              right team can help you build a website that drives real
              growth instead of constant headaches.
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

      {/* ================= WHY BUSINESSES OPT FOR AN AGENCY ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/2.jpg"
                  alt="WordPress development agency London team building a website"
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
                Reasons Businesses Opt for a{" "}
                <span className="gradient-text-animated">
                  WordPress Development Agency
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Competition among London businesses is at its highest, so
                your website needs to perform better than the rest. An
                afterthought template thrown together over a weekend
                won&rsquo;t hold up once real traffic and real customers
                start arriving.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                That&rsquo;s where a professional WordPress development
                agency London team stands out. A proficient agency knows how
                to build a website that&rsquo;s quick, protected, and
                properly structured from the start, rather than one that
                needs constant fixes down the line. When you partner with a
                top agency, you get:
              </p>
              <ul className="mt-5 space-y-3">
                {partnerBenefits.map((point) => (
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
              A well-developed WordPress site built from the ground up saves
              you time and money in the long run, since you avoid the
              recurring issues that businesses run into when they rush into
              a website without proper planning.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= HIRE EXPERT DEVELOPERS ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Who To Hire
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Hire the{" "}
              <span className="gradient-text-animated">
                Expert WordPress Developers
              </span>{" "}
              in London
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Any business with a robust WordPress site has a team of expert
              developers behind it who genuinely know WordPress. When
              searching for WordPress developers London you can trust,
              don&rsquo;t just be impressed by a flashy portfolio — look at
              their technical ability and communication skills too.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {developerTraits.map((trait) => (
              <div
                key={trait}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                  {trait}
                </span>
              </div>
            ))}
          </Reveal>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60">
            When developers grasp both the technical and the business side
            of a project, the final website reflects that understanding.
            That&rsquo;s what makes a good London WordPress development
            company different from freelancers operating without any
            discipline or process.
          </p>
        </div>
      </section>

      {/* ================= DESIGN THAT REFLECTS YOUR BRAND ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal
              variant="up"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <MousePointerClick className="h-7 w-7 text-brand-gold" />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  WordPress Website Design That Reflects Your Brand
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Your website should match your business from a design
                standpoint, not look like a generic site pulled from a
                template gallery. Strong WordPress website design brings
                your brand to the front and turns it into a clean,
                professional experience visitors accept instantly.
              </p>
              <p className="mt-3 text-sm font-semibold text-white/80">
                Key elements for WordPress website design include:
              </p>
              <ul className="mt-4 space-y-3">
                {designElements.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Design and function go hand in hand — when they work
                together, your website becomes more than an online
                presence. It becomes a tool that helps your business
                objectives every single day.
              </p>
            </Reveal>

            <Reveal
              variant="up"
              delay={0.1}
              className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Puzzle className="h-7 w-7 text-brand-gold" />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Custom WordPress Development
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Pre-built themes can be useful for very simple websites, but
                most growing businesses eventually need something built
                specifically around the way they operate. Custom WordPress
                development gives your site a direction tailored to your
                objectives, instead of forcing your business into a
                template.
              </p>
              <p className="mt-3 text-sm font-semibold text-white/80">
                Custom development can involve:
              </p>
              <ul className="mt-4 space-y-3">
                {customPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Custom development takes a little longer to get up and
                running, but it delivers a better long-term return on
                investment because everything is built to address real
                business needs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= WOOCOMMERCE ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Sell Online
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Tailored Online Stores With{" "}
                <span className="gradient-text-animated">
                  WooCommerce Development
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Any business with an online product offering needs more than
                just a good-looking website. It needs a robust system to
                manage products, payments, and customer orders. This is
                where WooCommerce development becomes essential for any
                online store running on WordPress.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Good WooCommerce development includes:
              </p>
              <ul className="mt-5 space-y-3">
                {woocommercePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <ShoppingCart className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                A good WooCommerce store makes it easy for customers to buy
                things and gives them a reason to come back and shop again.
              </p>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/laptop.webp"
                  alt="Custom WordPress development layout on a laptop screen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT SERVICES ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/6.jpg"
                  alt="WooCommerce development online store product page example"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <Wrench className="h-9 w-9 text-brand-gold" strokeWidth={1.5} />
              <h2 className="mt-4 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                WordPress Support Services That Keep Sites Running Smoothly
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                The work doesn&rsquo;t stop once your website launches.
                Keeping a WordPress website running well over time takes
                regular updates, security checks, and fixing problems as
                they come up — that&rsquo;s exactly what good WordPress
                support services are built to handle.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Without continuous maintenance, even a properly planned
                WordPress website can become outdated or vulnerable over
                time. Many businesses choose a WordPress development agency
                London team that offers support packages, so their website
                stays reliable long after launch. In that kind of ongoing
                relationship, small problems get caught before they become
                big, expensive ones that hurt your rankings or your
                reputation with customers.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CHOOSING THE RIGHT COMPANY ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Before You Sign
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Choosing the{" "}
              <span className="gradient-text-animated">
                Ideal WordPress Development Company
              </span>{" "}
              London
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              There are numerous agencies offering WordPress services, and
              picking the right one can be daunting. When searching for an
              agency to work with, you should ask:
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {agencyQuestions.map((question) => (
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
            A reputable agency will confidently address these questions with
            clear examples to back up their answers, not just pleasant
            promises without substance.
          </p>
        </div>
      </section>

      {/* ================= MISTAKES + RANKINGS ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Reveal
            variant="up"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <XCircle className="h-7 w-7 text-brand-gold" />
              <h2 className="text-xl font-semibold sm:text-2xl">
                Common WordPress Project Mistakes
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Even careful businesses run into a familiar set of problems
              on WordPress projects. Here are the ones that come up most:
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
              Hiring an experienced WordPress development agency London team
              helps you avoid these problems from the very start, since a
              knowledgeable team already knows what to focus on and what to
              skip.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <Gauge className="h-7 w-7 text-brand-gold" />
              <h2 className="text-xl font-semibold sm:text-2xl">
                How Development Affects Search Rankings
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Search engines closely monitor a website&rsquo;s performance
              as well as its content, and this affects your rankings over
              time — your development team makes the difference. Key
              impacts include:
            </p>
            <ul className="mt-5 space-y-3">
              {rankingImpacts.map((impact) => (
                <li key={impact} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                  <span className="text-sm leading-relaxed text-white/70">
                    {impact}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              A good WordPress site foundation makes SEO, advertising, and
              content marketing far more effective than trying to build any
              of that on top of a weak foundation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY CHOOSE US / CTA ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <Reveal
          variant="scale"
          className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-brand-teal-dark to-brand-navy-light p-8 text-center sm:p-12"
        >
          <Zap className="mx-auto h-10 w-10 text-brand-gold" />
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
            Why Choose Us as Your WordPress Development Partner?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We believe every business should be given a WordPress website
            that works for them, not one that&rsquo;s a hassle on the
            back end. We build on clean code principles, thoughtful design,
            and reliable support, all built around your real business
            objectives — no shortcuts, no confusing procedures. Think of a
            team that handles custom WordPress development, WooCommerce
            development, and WordPress support services within a single
            process, not as disjointed tasks.
          </p>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-white/15"
            className="press-scale mx-auto mt-8 flex h-14 w-fit items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Get a Free Website Consultation
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
              {internalLinks.map((link, index) => (
                <li key={`${link.href}-${index}`}>
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

export default WordpressDevelopmentAgencyLondonPage;
