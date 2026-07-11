"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useReveal } from "@/hooks/use-reveal";
import MagneticButton from "@/components/home/MagneticButton";
import NetworkLines from "@/components/contact/network-lines";

const stats = [
  { value: "1,500+", label: "Project completed" },
  { value: "100%", label: "Client Retention" },
  { value: "8+", label: "Years experiences" },
  { value: "1,000+", label: "Satisfied Clients" },
];

const values = [
  {
    eyebrow: "How we think",
    title: "Custom, never templated",
    description:
      "Every build is designed around your workflow and brand not a recycled theme with your logo swapped in.",
  },
  {
    eyebrow: "How we work",
    title: "One team, full accountability",
    description:
      "Engineering, design, SEO and support sit under one roof, so nothing falls through the cracks between vendors.",
  },
  {
    eyebrow: "How we stay",
    title: "Support that doesn't end at launch",
    description:
      "24/7 monitoring and a real team you can call — before and long after your project goes live.",
  },
];

const services = [
  {
    title: "Cloud Migration & Cloud Operations",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/cloud-computing-data-center-concept-digital-cloud-solutions-pcb-futuristic-background_817025-3856.jpg",
    href: "/services/cloud-migration",
  },
  {
    title: "Salesforce Development & Consulting",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/analyst-team-utilizing-bi-fintech-analyze-financial-data-table-meeting-room-businesspeople-analyzing-bi-dashboard-power-business-insight-strategic-marketing-planning-prudent_31965-265907.jpg",
    href: "/services/salesforce-development",
  },
  {
    title: "Maintenance and Support",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/digital-support-maintenance-solutions-business_1101054-90862.avif",
    href: "/services/maintenance-support",
  },
  {
    title: "SaaS Development",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/representation-user-experience-interface-design_23-2150169860.jpg",
    href: "/services/saas-development",
  },
  {
    title: "Software Development",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/professional-programmer-working-late-dark-office_1098-18705.avif",
    href: "/services/software-development",
  },
  {
    title: "Smart Business Automation Services",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/robotic-arm-scanning-package-smart-warehouse_23-2151983327.jpg",
    href: "/services/business-automation",
  },
  {
    title: "Advanced Voicebot Development Services",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/chatbot-messenger-isometric-concept_1284-69074.jpg",
    href: "/services/voicebot-development",
  },
  {
    title: "Intelligent Chatbot Development Services",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/6534541-1.jpg",
    href: "/services/chatbot-development",
  },
  {
    title: "Generative AI Development",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/businessman-using-computer-generate-ai-chat-ai-data-analysis-data-online-network-artificial-intelligence_36325-5218.avif",
    href: "/services/generative-ai",
  },
  {
    title: "Brand Identity & Logo Design",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/close-up-image-programer-working-his-desk-office-scaled-1.jpg",
    href: "/services/brand-identity",
  },
  {
    title: "Digital Marketing & SEO",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/employee-working-marketing-setting-scaled-1.jpg",
    href: "/services/digital-marketing",
  },
  {
    title: "ERP & CRM Implementation",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/new-crm-customer-relationship-management-concept-2021_161452-12076.jpg",
    href: "/services/erp-crm",
  },
  {
    title: "Mobile App Development",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/1720-1-scaled-1.jpg",
    href: "/services/mobile-app-development",
  },
  {
    title: "Social Media Design",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/05/1812fa01-4041-4f41-bb36-f2f4833ed021.jpg",
    href: "/services/social-media-design",
  },
  {
    title: "Web Development & Design Services",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/sleek-digital-scene-showing-laptop_1272475-15130.avif",
    href: "/services/web-development",
  },
];

const locations = [
  {
    name: "Pakistan",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/67514151055d4a4c8e110044_Lahore-Head-Office-p-1600.webp",
    imagePosition: "object-contain",
    articleClass: "lg:pt-0",
    imageClass: "lg:h-[550px]",
  },
  {
    name: "United States of America",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/68d2d5b3d32bca9726de643d_compressed_UnitedStates.webp",
    imagePosition: "object-contain",
    articleClass: "lg:pt-[70px]",
    imageClass: "lg:h-[450px]",
  },
  {
    name: "United Kingdom",
    image:
      "https://thesocialnexus.co.uk/wp-content/uploads/2026/06/68d2d5e81c65e6e3f839fbdb_compressed_UK.webp",
    imagePosition: "object-contain",
    articleClass: "lg:pt-0",
    imageClass: "lg:h-[500px]",
  },
];

/**
 * AnimatedStat
 * ------------------------------------------------------------------
 * Count-up animation for the stats band — same gsap-proxy-tween
 * pattern already used for the counters in WhyChooseUsHorizontal.
 * Parses a raw display string like "1,500+" or "100%" into a numeric
 * target plus whatever non-numeric suffix follows it (+, %, etc.),
 * animates the number from 0 to that target once the element scrolls
 * into view, and re-appends the original suffix/comma formatting on
 * every frame so "1,500+" counts up as "0 → 1,200 → 1,500+" rather
 * than losing its punctuation mid-animation.
 */
function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d,]+)(.*)$/);
    const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
    const suffix = match ? match[2] : "";

    if (
      !match ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.textContent = value;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.6,
          ease: "power4.out",
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toLocaleString() + suffix;
          },
        });
        observer.unobserve(el);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <h2
      ref={ref}
      className="gradient-text-animated text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-7xl"
    >
      0
    </h2>
  );
}

export default function AboutUsPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const storyHeadingRef = useReveal<HTMLDivElement>();
  const storyBodyRef = useReveal<HTMLDivElement>();

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen w-full overflow-hidden bg-brand-navy text-white">
        {/* ambient network glow — nods to "Nexus" without being a literal icon */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
          <div
            className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
            style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
          />
          <NetworkLines />
        </div>

        <div className="relative mx-auto flex min-h-screen flex-col justify-center px-5 pt-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
          {/* Heading */}
          <div ref={heroRef} className="reveal-right max-w-6xl">
            <h1 className="text-[38px] font-medium uppercase leading-[0.95] tracking-[-0.05em] sm:text-[56px] md:text-[80px] lg:text-[110px] xl:text-[90px]">
              We turn ideas{" "}
              <span className="inline-block align-middle text-[19px] leading-[0.95] tracking-[-0.05em] sm:text-[26px] md:text-[34px] lg:text-[42px] xl:text-[40px]">
                Into Digital <br /> Infrastructure
              </span>
              <br />
              <span className="gradient-text-animated">That businesses</span> run on.
            </h1>
          </div>

          {/* Bottom row */}
          <div className="mt-14 grid items-center gap-8 sm:mt-16 sm:gap-10 lg:mt-20 lg:grid-cols-[300px_1fr_100px_250px] lg:gap-10">
            {/* Contact Circle */}
            <MagneticButton
              href="/contact-us"
              fillClassName="bg-brand-teal-dark"
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 text-lg font-semibold transition-colors hover:border-brand-teal sm:h-24 sm:w-24 md:ml-2 md:h-28 md:w-28 lg:h-40 lg:w-40 lg:text-xl"
            >
              Contact Us
            </MagneticButton>

            {/* Description */}
            <p className="max-w-xl text-base font-medium leading-[1.55] tracking-[-0.03em] text-white/50 sm:text-lg md:text-xl">
              Social Nexus is a full-service software, design and growth partner
              working with brands across Pakistan, the UK and the USA combining
              engineering, AI, design and performance marketing under one roof.
            </p>

            {/* Line */}
            <div className="hidden h-px bg-white/15 lg:block md:-mr-16" />

            {/* Logo */}
            <div className="animate-float flex justify-start lg:justify-end">
              <Image
                src="https://thesocialnexus.co.uk/wp-content/uploads/2026/05/TSN-LOGO-2-1536x457.png"
                alt="The Social Nexus"
                width={220}
                height={60}
                className="h-auto w-40 object-contain sm:w-48 md:w-56 lg:w-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="scroll-reveal-row bg-brand-navy-light py-14 px-5 sm:px-8 sm:py-16 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="stagger-children mx-auto grid max-w-[1700px] grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <AnimatedStat value={item.value} />

              <p className="mt-5 text-base font-medium text-white sm:mt-6 sm:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VIDEO ================= */}
      <section className="relative flex h-[60vh] justify-end overflow-hidden
    rounded-2xl bg-brand-navy sm:h-[75vh] lg:h-screen lg:rounded-none"
      >
        <div className="relative aspect-video w-full max-w-5xl">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src="https://www.youtube-nocookie.com/embed/27Hgqi7S6uc?autoplay=1&mute=1&loop=1&playlist=27Hgqi7S6uc&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
            title="The Social Nexus"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="relative border-t border-white/10 bg-brand-navy px-5 text-white sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="relative mx-auto min-h-[470px] max-w-[1920px] lg:grid lg:grid-cols-[41%_59%]">
          <div
            ref={storyHeadingRef}
            className="reveal-right px-0 pb-10 pt-20 sm:pt-24 lg:px-5 lg:pt-[220px]"
          >
            <h2 className="text-[clamp(2.25rem,3.4vw,3.75rem)] font-medium uppercase leading-none tracking-[-0.045em]">
              Our <span className="gradient-text-animated">Story</span>
            </h2>
          </div>

          <div
            ref={storyBodyRef}
            className="reveal-left relative pb-16 pt-16 sm:pt-20 lg:flex lg:items-center lg:px-0 lg:pb-5 lg:pt-28"
          >
            <div className="bg-brand-teal px-8 py-6 sm:px-11 sm:py-7 lg:absolute lg:right-0 lg:top-0">
              <p className="text-xl font-semibold leading-none sm:text-2xl">from</p>
              <p className="mt-4 text-3xl font-bold leading-none sm:text-4xl">2019</p>
            </div>

            <div className="mt-8 max-w-[1000px] lg:mt-0 lg:pr-6">
              <div className="space-y-3 font-medium leading-snug text-white/60">
                <p>
                  Social Nexus started with a simple frustration: most agencies
                  sell a website and disappear. We wanted to build the opposite
                  a team that stays close to a business long after launch,
                  fixing what breaks, improving what works, and treating every
                  client&rsquo;s growth as our own scoreboard.
                </p>

                <p>
                  Today that means software engineers, product designers, AI
                  specialists and digital marketers working side by side on the
                  same projects not handed off between departments, but pulling
                  in one direction from brief to launch and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-brand-navy px-5 pb-16 text-white sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="stagger-children mx-auto grid max-w-[1760px] grid-cols-1 gap-5 lg:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.eyebrow}
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-8 backdrop-blur-sm transition-colors duration-300 hover:border-brand-teal/40 sm:px-8 lg:p-6"
            >
              <p className="text-base font-semibold uppercase leading-none text-brand-teal-light sm:text-lg">
                {item.eyebrow}
              </p>

              <h3 className="my-4 max-w-[520px] text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-[28px] lg:text-2xl">
                {item.title}
              </h3>

              <p className="max-w-[500px] pb-2 text-base font-medium leading-[1.48] tracking-[-0.015em] text-white/60 sm:text-lg lg:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative overflow-hidden bg-brand-navy px-5 py-14 text-white sm:px-8 sm:py-16 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        {/* ambient network glow — same "Nexus" treatment as the hero */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
          <div
            className="animate-float absolute left-0 bottom-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
            style={{ animationDelay: "0.8s", animationDuration: "6s" }}
          />
          <NetworkLines />
        </div>

        <div className="relative mx-auto max-w-[1760px]">
          {/* Header */}
          <div className="scroll-reveal-row grid gap-10 lg:grid-cols-[1fr_1.5fr_auto] lg:items-start">
            <div>
              <p className="text-base font-semibold leading-none text-brand-teal sm:text-lg">
                Services
              </p>

              <h2 className="mt-8 max-w-[430px] text-[32px] font-medium uppercase leading-[1.05] tracking-[-0.04em] sm:mt-10 sm:text-[42px] lg:text-[46px] xl:text-3xl">
                Digital services
                <br />
                that define{" "}
                <span className="gradient-text-animated">tomorrow.</span>
              </h2>
            </div>

            <p className="max-w-[760px] pt-1 text-lg font-semibold leading-[1.45] text-white/60 sm:text-xl lg:pt-12 lg:text-lg">
              Comprehensive solutions crafted with precision and powered by
              innovation.
            </p>

            <MagneticButton
              href="/services"
              fillClassName="bg-brand-teal-dark"
              className="h-20 w-20 justify-self-start rounded-full border border-white/30 transition-colors hover:border-brand-teal sm:h-32 sm:w-32 lg:h-40 lg:w-40 lg:justify-self-end"
            >
              <span className="flex items-center gap-2 text-center text-sm font-semibold leading-[1.4] sm:text-base lg:text-[19px]">
                View
                <br />
                All Services
              </span>
            </MagneticButton>
          </div>

          {/* Cards */}
          <div className="stagger-children mt-12 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= GLOBAL PRESENCE ================= */}
      <section className="bg-brand-navy px-5 py-14 text-white sm:px-8 sm:py-16 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-[1500px]">
          {/* Heading */}
          <div className="scroll-reveal-row text-center">
            <h2 className="text-[28px] font-medium uppercase leading-none tracking-[-0.035em] sm:text-[36px] lg:text-4xl">
              Our <span className="gradient-text-animated">Global Presence</span>
            </h2>

            <p className="mx-auto mt-6 max-w-[1000px] text-sm font-medium leading-[1.4] text-white/60 sm:mt-8 sm:text-lg lg:text-lg">
              We support clients globally and drive continued growth through
              innovation and transformation.
            </p>
          </div>

          {/* Locations */}
          <div className="stagger-children mt-14 grid grid-cols-1 gap-10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {locations.map((location) => (
              <article
                key={location.name}
                className={`group flex flex-col ${location.articleClass}`}
              >
                <div
                  className={`relative h-[340px] overflow-hidden rounded-2xl bg-brand-navy-light transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:h-[420px] ${location.imageClass}`}
                >
                  <Image
                    src={location.image}
                    alt={`${location.name} office location`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${location.imagePosition}`}
                  />
                </div>

                <h3 className="mt-6 text-center text-lg font-semibold leading-[1.1] tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-brand-teal-light sm:mt-7 sm:text-xl lg:text-[26px]">
                  {location.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type ServiceCardProps = {
  service: (typeof services)[number];
  priority?: boolean;
};

function ServiceCard({ service, priority = false }: ServiceCardProps) {
  return (
    <Link
      href={service.href}
      className="group relative block h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-light shadow-lg transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-teal/40 hover:shadow-xl sm:h-[360px] lg:h-70"
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-brand-navy/5" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-7">
        <h3 className="max-w-[90%] text-xl font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-2xl lg:text-[28px]">
          {service.title}
        </h3>
      </div>
    </Link>
  );
}