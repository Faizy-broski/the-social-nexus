"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Lightbulb,
  ListChecks,
  Mail,
  Megaphone,
  Minus,
  PenTool,
  Plus,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";

const heroStats = [
  { value: "20+", label: "Years Experience" },
  { value: "1,000+", label: "Projects Delivered" },
  { value: "390+", label: "Content Resources" },
];

const whyReasons = [
  "Creating content around the subjects that your customers are interested in.",
  "Creating useful material that provides a clear answer to their questions.",
  "Publishing regularly rather than occasionally.",
  "Having the right channels to promote content through.",
  "Monitoring to understand the outcomes of what is happening.",
];

const standoutTraits = [
  "A defined content strategy based on your objective(s).",
  "Writers who know your industry and your target audience.",
  "Content that caters to both humans and search engines.",
  "Clear communication and visible, real progress.",
  "A team that adapts the plan based on the data.",
];

const writingDeliverables = [
  "Articles which answer common customer inquiries.",
  "Web copy that is clear and conveys information about your services.",
  "Email copy that engages your subscribers.",
  "Product descriptions with an emphasis on real benefits.",
  "Case studies with real results that earn the trust of consumers.",
];

const seoPoints = [
  "The proper use of keywords, rather than forcing them into the page.",
  "Headings and short paragraphs to structure ideas.",
  "Directly answering questions so content can be featured in AI search results.",
  "Internal links that structure an article and direct readers toward related content.",
  "Meta titles and descriptions written to boost click-through rates in search results.",
];

const blogFocus = [
  "Producing new articles on time and regularly.",
  "Covering what your audience actually wants to know.",
  "Speaking in a tone that reflects your brand personality.",
  "Placing clear calls to action on every post.",
  "Keeping older posts updated and accurate.",
];

const copyPrinciples = [
  "Compelling headlines that make the point obvious at first glance.",
  "Simple language, with no confusing jargon.",
  "Benefits that speak directly to the reader's need.",
  "Natural, non-pushy calls to action.",
  "Testing different versions to see what works best.",
];

const strategyPillars = [
  "A content calendar built around your company objectives.",
  "Topic research using people's actual search terms.",
  "A mix of content styles — blog posts, videos, and guides.",
  "Regular assessments to gauge success and adapt as necessary.",
];

const pickQuestions = [
  "Are they showing authentic business outcomes that are like mine?",
  "Do they provide a comprehensive approach, or only isolated pieces of content?",
  "How do they determine success beyond just word count?",
  "Who will be my dedicated point of contact for the work?",
];

const faqs = [
  {
    question: "Content marketing firms charge the amount of money?",
    answer:
      "The pricing is according to the scope of work, but most agencies offer monthly packages ranging from a few hundred to several thousand dollars, based on your content requirements.",
  },
  {
    question: "How many months or years does it take for content marketing to take effect?",
    answer:
      "In 3-6 months, most businesses start seeing a meaningful improvement in traffic, particularly with an increased regularity of publishing over time.",
  },
  {
    question: "What is the difference between a content writer and a copywriter?",
    answer:
      "Content writing builds awareness and trust, while copywriting is focused on persuading readers to take a specific action.",
  },
  {
    question: "Can content marketing help with AI search results?",
    answer:
      "Yes. Well-structured content that directly addresses queries is far more likely to be surfaced in AI-generated search results and voice search answers.",
  },
  {
    question: "How often should we be publishing?",
    answer:
      "Frequency isn't as important as consistency — most companies find 1-4 pieces of content a month is enough to produce great results.",
  },
  {
    question: "How can I determine which content marketing agency to sign up for?",
    answer:
      "Search for clarity, practical examples of past work, and a plan designed around your company's actual requirements rather than a cookie-cutter package.",
  },
];

const internalLinks = [
  { label: "Our Content Marketing Services", href: "/services/digital-marketing" },
  { label: "SEO & Copywriting Solutions", href: "/seo-agency-london" },
  { label: "Schedule a Content Strategy Session", href: "/contact-us" },
];

const externalLinks = [
  {
    label: "Content Marketing Institute",
    href: "https://contentmarketinginstitute.com/",
  },
  {
    label: "HubSpot Content Marketing Guide",
    href: "https://blog.hubspot.com/marketing/content-marketing",
  },
];

export function ContentMarketingCompaniesPage() {
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
              Content Marketing Companies
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Best{" "}
              <span className="gradient-text-animated">
                Content Marketing Companies
              </span>{" "}
              to Grow Your Brand in 2026
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl space-y-4">
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              All businesses today need content that resonates and is meant
              to share with people, rather than just filling up a page.
              That&rsquo;s why many brands are seeking the assistance of
              content marketing companies to develop their online presence
              the proper way. But a good content partner does more than just
              write blog posts. They create a complete strategy that brings
              visitors, cultivates trust, and converts readers into paying
              customers.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              Google in 2026 is rewarding websites that provide valuable,
              honest, and organised content regularly. Topics now have to be
              posted in a far more focused and deliberate way. That is why
              it is crucial to find the right content marketing companies to
              help you achieve growth over the long term, when you&rsquo;re
              in a market with a ton of competitors churning out their own
              content.
            </p>
            <p className="text-base font-medium leading-[1.6] text-white/60 sm:text-lg">
              We&rsquo;ll discuss exactly what content marketing firms do,
              how to find the best company for your business, and why a
              sturdy content strategy is among the cleverest uses of your
              budget this year.
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

      {/* ================= WHY BUSINESSES ARE TURNING ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/6.jpg"
                  alt="Content marketing companies team planning a content strategy"
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
                Why Businesses Are Turning to{" "}
                <span className="gradient-text-animated">
                  Content Marketing Companies
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Business owners understand more and more that it&rsquo;s not
                enough to simply base their growth on ads. Once you stop
                spending money on advertising, the traffic goes away.
                Content works differently — blog posts and guides keep
                earning leads for months or even years after their initial
                release, which is why many brands are turning to content
                marketing firms to build this kind of long-term pipeline.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Relying on a trusted content marketing agency, you save on
                the process of planning, creating, and posting content. This
                includes:
              </p>
              <ul className="mt-5 space-y-3">
                {whyReasons.map((reason) => (
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

          <Reveal variant="up" className="mx-auto mt-10 max-w-4xl">
            <p className="text-base leading-relaxed text-white/60">
              Collaborating with content marketing agencies that carry
              industry knowledge, you receive content that fosters trust
              rather than blindly filling your calendar. This difference is
              what separates brands that are on the rise from brands that
              are difficult to notice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= WHAT MAKES A GREAT AGENCY STAND OUT ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Set the Bar
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              In What Ways Does a{" "}
              <span className="gradient-text-animated">
                Great Content Marketing Agency
              </span>{" "}
              Stand Out?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              All agencies are not created equal. Some write &ldquo;canned&rdquo;
              articles that seem the same for every client. Your brand
              voice, your customers, and your goals are all unique &mdash;
              that&rsquo;s why a real content marketing agency first makes an
              effort to understand your brand voice, your customers, and
              your goals before they write a single word.
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {standoutTraits.map((trait) => (
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
            If you&rsquo;re skimming updates from content marketing
            companies, make sure to request examples of their previous work
            and outcomes with former clients. This is far more informative
            than any sales pitch, and it will save you from wasting money on
            content that&rsquo;s all but guaranteed to fail.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              What We Deliver
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Content Writing Services That{" "}
              <span className="gradient-text-animated">
                Really Convert
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Great writing is more than just sounding intelligent. It
              means publishing for real people — clear, helpful, and easy
              to read. That&rsquo;s the main component of quality content
              writing services, and one that a lot of companies neglect when
              they handle content by themselves.
            </p>
          </Reveal>

          <div className="mt-6 aspect-16/7 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/laptop.webp"
              alt="SEO content writing process on a laptop screen"
              width={1200}
              height={525}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="stagger-children mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileText, title: "Answer-First Articles", description: writingDeliverables[0] },
              { icon: PenTool, title: "Clear Website Copy", description: writingDeliverables[1] },
              { icon: Mail, title: "Engaging Email Copy", description: writingDeliverables[2] },
              { icon: Sparkles, title: "Benefit-Led Product Copy", description: writingDeliverables[3] },
              { icon: Target, title: "Convincing Case Studies", description: writingDeliverables[4] },
              { icon: Megaphone, title: "Consistent Brand Voice", description: "Every piece is written to sound like your brand, not a generic template reused for every client." },
            ].map((service) => (
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
            Content that revolves around what readers actually seek ranks
            better and keeps engagement higher, because it&rsquo;s easy to
            understand and meaningful to them. That&rsquo;s the goal behind
            every piece of content we create.
          </p>
        </div>
      </section>

      {/* ================= SEO CONTENT WRITING ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Built for Search
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                SEO Content Writing Built for{" "}
                <span className="gradient-text-animated">
                  2026 Search Trends
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Content marketing isn&rsquo;t about making a good-looking
                page. It&rsquo;s about making content that people actually
                want to read, and that search engines can find and show to
                the right people. A good content partner needs to
                understand both content marketing and SEO content writing to
                pull that off.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                The following points matter when it comes to good SEO
                content writing:
              </p>
              <ul className="mt-5 space-y-3">
                {seoPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Search className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <Lightbulb className="h-9 w-9 text-brand-gold" strokeWidth={1.5} />
                <p className="mt-5 text-base leading-relaxed text-white/70">
                  Content that provides clear and rapid answers to questions
                  is what wins in 2026, across both search engines and AI
                  tools. That&rsquo;s a real shift in how content needs to
                  be written for SEO — it&rsquo;s no longer only about
                  getting pages to rank on Google. It&rsquo;s also about
                  showing up in AI-generated answers, which makes working
                  with skilled content marketing firms even more valuable.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= BLOG + COPYWRITING ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal
              variant="up"
              className="rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-7 w-7 text-brand-gold" />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Blog Writing Services
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                One of the simplest ways of gaining trust with your audience
                over time is to run a blog. Blog writing services mean
                regular blogging, which draws attention to your website and
                gives people a reason to return.
              </p>
              <p className="mt-3 text-sm font-semibold text-white/80">
                The top blog writing services concentrate on:
              </p>
              <ul className="mt-4 space-y-3">
                {blogFocus.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                A well-maintained blog becomes one of the largest traffic
                streams to your entire website over time, which is why it&rsquo;s
                one of the most critical parts of most content marketing
                strategies.
              </p>
            </Reveal>

            <Reveal
              variant="up"
              delay={0.1}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <PenTool className="h-7 w-7 text-brand-gold" />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Copywriting Services
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Blog content is what gets people in, but copywriting
                services are what get them to take action — landing pages,
                ads, emails, and anything else created to move someone
                toward a decision.
              </p>
              <p className="mt-3 text-sm font-semibold text-white/80">
                A good copywriting service is all about:
              </p>
              <ul className="mt-4 space-y-3">
                {copyPrinciples.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                That&rsquo;s why the best content marketing companies
                provide both blog writing and copywriting under one roof.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CONTENT STRATEGY ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal variant="right">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/services/5.jpg"
                  alt="Blog writing services calendar showing scheduled posts"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                The Foundation
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Content Strategy: The{" "}
                <span className="gradient-text-animated">
                  Foundation Everyone Skips
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                One of the biggest mistakes businesses make is not planning
                before getting started. A solid content strategy ensures
                every piece of content has a clear purpose. A good content
                strategy comprises:
              </p>
              <ul className="mt-5 space-y-3">
                {strategyPillars.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-light" />
                    <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {pillar}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Without a strategy, content is random and forgettable. With
                one in play, every blog post, email, and web page is doing
                something to help your business grow — that&rsquo;s the
                difference between companies that actually make money with
                content marketing and those who just make content for its
                own sake.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CHOOSING THE RIGHT MATCH ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Before You Commit
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Choosing the{" "}
              <span className="gradient-text-animated">Right Match</span>{" "}
              Among Content Marketing Companies
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Choosing the right one from a long list of content marketing
              companies can be daunting, particularly as a lot of these
              businesses promise comparable results. Before committing to
              any agency, consider asking:
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {pickQuestions.map((question) => (
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
        </div>
      </section>

      {/* ================= WHY CHOOSE US / CTA ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <Reveal
          variant="scale"
          className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-brand-teal-dark to-brand-navy-light p-8 text-center sm:p-12"
        >
          <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
            Why Choose Us as Your Content Marketing Partner?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We don&rsquo;t think content is supposed to just sit there — you
            should be focused on running your business, not chasing a
            content calendar. Our team creates strategy from the facts,
            writes things people genuinely want to read, and tracks
            performance so you always know what&rsquo;s working. No
            cookie-cutter solutions, just content built for lasting growth.
          </p>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-white/15"
            className="press-scale mx-auto mt-8 flex h-14 w-fit items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Schedule a Free Content Strategy Session
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

export default ContentMarketingCompaniesPage;
