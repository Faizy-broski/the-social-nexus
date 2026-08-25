"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  Link2,
  ListChecks,
  MapPin,
  Minus,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  Star,
  XCircle,
} from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";

const heroStats = [
  { value: "20+", label: "Years Experience" },
  { value: "1,000+", label: "Projects Delivered" },
  { value: "800+", label: "Clients Served" },
];

const services = [
  {
    icon: Search,
    title: "Keyword Research",
    description:
      "They discover what your customers are searching for on Google, and your website communicates in their language.",
  },
  {
    icon: FileText,
    title: "On-Page Optimization",
    description:
      "They optimize your title, headings, and content to make search engines “read” what each page is about.",
  },
  {
    icon: ShieldCheck,
    title: "Technical SEO Services",
    description:
      "They resolve slow loading speed, broken links and mobile problems that cause your rankings to suffer unnoticeably.",
  },
  {
    icon: ClipboardList,
    title: "Content Creation",
    description:
      "They create pages that are informative and easy to read, addressing actual customer inquiries.",
  },
  {
    icon: Link2,
    title: "Link Building",
    description:
      "They get links from reputable websites, and Google knows that your business is trustworthy.",
  },
  {
    icon: MapPin,
    title: "Local Listings",
    description:
      "They ensure your business name, address and phone number are accurate on the web.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    description: "Not empty promises, but actual numbers every month.",
  },
];

const localSeoReasons = [
  "People in the neighbourhood are able to find your specific service on their mobile devices.",
  "You show up on Google Maps, not just the Google search results page.",
  "Local links to your site and testimonials from real customers help establish your trust.",
  "You play fair with larger brands with a larger marketing budget.",
  "You stop the guessing and start growing with a plan when you hire a company that knows London.",
];

const pickQuestions = [
  {
    title: "Do they adhere to the guidelines of Google?",
    description:
      "There are still some agencies that resort to outdated and risky techniques that can lead to your website getting penalised. Always ensure that they are using white-hat, Google-approved techniques.",
  },
  {
    title: "Are they familiar with contemporary search?",
    description:
      "Answer Engine Optimisation is as important as traditional SEO in 2026. To make it understandable by AI tools and voice search, your content must be structured.",
  },
];

const topSigns = [
  "They provide you with a clear, honest monthly report that you know what you are reading and understand.",
  "They inquire about business goals, rather than target keywords.",
  "They don't try to take on shortcuts that may be risky in the long run.",
  "They are always attuned to the newest algorithm updates and trends on Google rankings.",
];

const mistakes = [
  "They don't consider mobile users — most searches now happen on mobile, and a slow or broken mobile site sends customers straight to a competitor.",
  "Copying material from other websites — Google can easily see duplicate content and over time it will negatively affect your ranking.",
  "Not updating the Google Business Profile — customers and search engines will not understand why your listing looks abandoned.",
  "Expecting instant gratification — SEO is an ongoing process, not a quick get-rich scheme, so patience is key to getting real results.",
];

const faqs = [
  {
    question: "What is the cost of an SEO Agency London monthly?",
    answer:
      "The cost of a local SEO package depends on your objectives and competition; however most local SEO packages begin at a regular monthly retainer fee that includes strategy, content and reporting.",
  },
  {
    question: "Is it possible for me to perform my own SEO as opposed to getting it carried out by an agency?",
    answer:
      "While you can take care of certain things yourself, there are things you just can't do without a Local SEO Company and things that you just don't have the time for.",
  },
  {
    question: "Why is technical SEO important?",
    answer:
      "Technical SEO Services address the back-end problems that can hinder your rankings, regardless of the quality of your content, such as site speed and mobile optimisation.",
  },
  {
    question: "Can SEO companies make sure you get page rankings?",
    answer:
      "They cannot promise you will be on a specific page because Google is always changing the way it ranks websites. A good SEO company will do the work and keep making progress.",
  },
  {
    question: "How do you find an SEO Consultant?",
    answer:
      "You should look for someone who talks to you in a way that makes sense, has experience with this kind of work, and comes up with a plan that's built just for your business — not something they reuse for every company.",
  },
];

const internalLinks = [
  { label: "Our SEO Services", href: "/services/digital-marketing" },
  { label: "About Our Team", href: "/about-us" },
  { label: "Client Success Stories", href: "/portfolio" },
  { label: "Get a Free SEO Audit", href: "/contact-us" },
];

const externalLinks = [
  {
    label: "Google Search Essentials",
    href: "https://developers.google.com/search/docs/essentials",
  },
  {
    label: "Moz Beginner's Guide to SEO",
    href: "https://moz.com/beginners-guide-to-seo",
  },
  { label: "Search Engine Land", href: "https://searchengineland.com/" },
];

export function SeoAgencyLondonPage() {
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
              SEO Agency London
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              SEO Agency London:{" "}
              <span className="gradient-text-animated">
                Selecting the Perfect Team
              </span>{" "}
              for Growth in 2026
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl space-y-4">
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              It&rsquo;s not always straightforward to find the best SEO
              Agency London businesses can trust. There are hundreds of
              agencies, and most of them offer the same guarantees: greater
              traffic, better ranks, and better leads. Not all agencies can
              pull this off, however.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              You are aware of just how competitive the London market is if
              you&rsquo;re an entrepreneur running a business in London. Your
              customers are searching Google daily and if they can&rsquo;t
              find you, someone else can. This is where it becomes
              significant to collaborate with the proper SEO Agency London
              team this year.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              We will go through what a good SEO agency is and how to know a
              good one from the average one, what things not to do, and what
              questions to ask before you sign any contract. At the end, you
              will know what kind of a partner you want to have as a growth
              partner.
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

      {/* ================= SERVICES EXPLAINED ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="scroll-reveal-row max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              SEO Agency London{" "}
              <span className="gradient-text-animated">
                Services Explained
              </span>{" "}
              in Full
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              When it comes to hiring, it&rsquo;s good to know what you are
              purchasing. A genuine SEO Agency London business owners can
              rely on will do a lot more than stuff a few keywords into a web
              page. Professional SEO Services cover every part of your online
              presence &mdash; the text on your pages and the code that
              powers them.
            </p>
          </div>

          <div className="mt-6 aspect-16/7 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/laptop.webp"
              alt="Website ranking review by SEO Agency London team, using laptop."
              width={1200}
              height={525}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="stagger-children mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-brand-teal/40"
              >
                <div className="flex items-start justify-between">
                  <service.icon
                    className="h-9 w-9 text-brand-teal-light"
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-gold" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.02em] text-brand-teal-light">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/60">
            This is the difference between a serious London SEO Company and
            one who just &ldquo;knows a bit about Google&rdquo;.
          </p>
        </div>
      </section>

      {/* ================= WHY LOCAL SEO MATTERS ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative mb-6 aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/5.jpg"
                  alt="London Local SEO Agency's SEO plan involves keyword planning."
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <h2 className="text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Why{" "}
                <span className="gradient-text-animated">Local SEO</span>{" "}
                Matters for London Businesses
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A Local SEO Agency is more aware of this competition than a
                generic marketing agency. They understand how London people
                search, which areas are bringing the most footfall, and how
                Google treats local businesses differently to national ones.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Local SEO support for small and medium businesses is crucial
                for a variety of reasons:
              </p>
              <ul className="mt-5 space-y-3">
                {localSeoReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="up" className="mx-auto mt-10 max-w-4xl space-y-4">
            <p className="text-base leading-relaxed text-white/60">
              Consider the actual search behaviour of customers today. People
              seldom scroll beyond the first few results when looking for a
              service, and most people will not even go to page two. Even if
              your business is providing a better product, your competitor
              shows up first, then they get called, booked, or sold. Local
              search visibility is no longer considered &ldquo;nice to
              have.&rdquo; It is the first impression that makes it into your
              business, and it must be open and accessible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= WHAT AGENCIES DO ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              What Professional{" "}
              <span className="gradient-text-animated">SEO Agencies</span> Do
              for You
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              It should be easy for any good SEO firm in London to
              articulate the process they use. When an agency is unable to
              explain its own approach, it&rsquo;s probably another
              indication that it&rsquo;s not the right choice.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              You will begin the process with a website audit by a
              professional team. This indicates what is successful, what is
              in trouble, and where the largest opportunities are lurking.
              They then create a roadmap according to your goals, your
              budget, and your industry.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              A good agency will also keep in touch with you. It should
              never be a mystery as to what is going on with your own
              website. Regular updates, honest dialogue, and a clear set of
              steps are exactly why an SEO Company London is worth the money
              that you spend on them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= LOCAL VS TECHNICAL ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="text-center">
            <h2 className="mx-auto max-w-3xl text-2xl font-semibold leading-[1.2] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
              Local SEO vs{" "}
              <span className="gradient-text-animated">Technical SEO</span>{" "}
              Explained
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Many business owners make the mistake of confusing local SEO
              and technical SEO. Both are significant, but both address two
              distinct issues.
            </p>
          </Reveal>

          <div className="stagger-children mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <MapPin className="h-9 w-9 text-brand-teal-light" strokeWidth={1.5} />
              <h3 className="mt-5 text-xl font-semibold text-brand-teal-light">
                Local SEO
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                Focused on getting your business found by people searching in
                your area &mdash; think Google Maps rankings, local
                listings, reviews, and location-specific keywords.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <ShieldCheck className="h-9 w-9 text-brand-teal-light" strokeWidth={1.5} />
              <h3 className="mt-5 text-xl font-semibold text-brand-teal-light">
                Technical SEO
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                Technical SEO Services are about optimising your website
                itself &mdash; page speed, mobile-friendliness, secure
                connections, and clean website code. Without a solid
                technical foundation, even the greatest content can fall
                short of ranking well.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-white/60">
            A good SEO Agency London will deal with both sides concurrently.
          </p>
        </div>
      </section>

      {/* ================= HOW TO PICK ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/6.jpg"
                  alt="The dashboard of an SEO Company London displays traffic growth."
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Before You Sign
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                How to Pick the{" "}
                <span className="gradient-text-animated">
                  Best SEO Company
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Here are some questions you should ask before you make a
                commitment:
              </p>

              <div className="mt-6 space-y-5">
                {pickQuestions.map((question) => (
                  <div key={question.title} className="flex gap-3">
                    <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                    <div>
                      <p className="font-semibold text-white">
                        {question.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/60 sm:text-base">
                        {question.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SIGNS OF A TOP COMPANY / MISTAKES ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Reveal
            variant="up"
            className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <Star className="h-7 w-7 text-brand-gold" />
              <h2 className="text-xl font-semibold sm:text-2xl">
                Signs of a Top SEO Company
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              There are some common features among the best search engine
              optimisation agencies. If your agency does these things
              already, you are in good hands:
            </p>
            <ul className="mt-5 space-y-3">
              {topSigns.map((sign) => (
                <li key={sign} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                  <span className="text-sm leading-relaxed text-white/70">
                    {sign}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              If your agency doesn&rsquo;t have most of these signs, you
              should begin to look for another to support you.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-7 w-7 text-brand-gold" />
              <h2 className="text-xl font-semibold sm:text-2xl">
                SEO Mistakes to Skip
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Many companies lose rank due to simple, avoidable errors. Be
              aware of these typical issues:
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
              If you&rsquo;ve avoided these pitfalls, you&rsquo;re already
              ahead of most of your competition in the area, even before
              your new strategy is fully implemented.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= HIRE A CONSULTANT ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Flexible Options
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Prefer to{" "}
                <span className="gradient-text-animated">
                  Hire a Consultant
                </span>{" "}
                First?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Not all businesses require all the agency staff right away.
                For smaller budgets, sometimes a dedicated SEO Consultant
                London can provide a more flexible starting point.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A consultant will be able to audit your site, highlight some
                simple improvements you can make, and create a simple action
                plan that you can carry out one step at a time. It is great
                for small businesses who can afford to hire experts but are
                not ready to spend a significant amount of money to begin
                with. When your company expands, you can move up to full
                service Professional SEO Services involving a greater group
                behind you.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Regardless, the same purpose remains: you want to see more
                people, more traffic, and more paying customers coming
                right from Google search results.
              </p>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/7.jpg"
                  alt="The SEO Consultant London goes to meet a small business owner."
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Some even begin the partnership with a consultant and
                transition to a full agency as their business grows. There
                are others who want to dive right into a full-fledged
                package. There&rsquo;s no single right answer here as it
                relies on your current website, your industry, and how
                quickly you want your website to grow. The important thing
                is to start somewhere, rather than wait for the right moment
                that never comes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= FINAL THOUGHTS / CTA ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <Reveal
          variant="scale"
          className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-brand-teal-dark to-brand-navy-light p-8 text-center sm:p-12"
        >
          <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
            Ready to Grow Your Business Online?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Making the right decision about the SEO Agency London businesses
            trust can make a huge impact on your online growth. Google
            rewards websites that are fast, mobile-friendly, helpful, and
            designed for search and AI answers. Contact our team now and
            begin the journey to lasting online success.
          </p>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-white/15"
            className="press-scale mx-auto mt-8 flex h-14 w-fit items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Get a Free SEO Audit
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

export default SeoAgencyLondonPage;
