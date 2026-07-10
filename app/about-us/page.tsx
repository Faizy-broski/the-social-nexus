"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#111111] w-full text-white">
        {/* Main content */}
        <div className="mx-auto flex min-h-screen flex-col justify-center pl-20 pr-6 pt-8 sm:pl-25">
          {/* Heading */}
          <div className="max-w-6xl">
            <h1 className="text-[52px] font-medium uppercase leading-[0.95] tracking-[-0.05em] sm:text-[80px] md:text-[110px] lg:text-[130px] xl:text-[90px]">
              We turn ideas{" "}
              <span className="inline-block align-middle text-[26px] leading-[0.95] tracking-[-0.05em] sm:text-[34px] md:text-[42px] lg:text-[40px]">
                Into Digital <br /> Infrastructure
              </span>
              <br />
              That businesses run on.
            </h1>
          </div>

          {/* Bottom row */}
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-[300px_1fr_100px_250px] lg:gap-10">
            {/* Contact Circle */}
            <button className="flex h-20 w-20 md:ml-16 items-center justify-center rounded-full border border-white/80 text-xl font-semibold transition hover:bg-white hover:text-black md:h-40 md:w-40">
              Contact Us
            </button>

            {/* Description */}
            <p className="max-w-xl text-[20px] font-medium leading-[1.55] tracking-[-0.03em] text-white/50 md:text-lg">
              Social Nexus is a full-service software, design and growth partner
              working with brands across Pakistan, the UK and the USA combining
              engineering, AI, design and performance marketing under one roof.
            </p>

            {/* Line */}
            <div className="hidden h-px bg-white/15 lg:block md:-mr-16" />

            {/* Logo */}
            <div className="flex justify-start lg:justify-end">
              <Image
                src="https://thesocialnexus.co.uk/wp-content/uploads/2026/05/TSN-LOGO-2-1536x457.png"
                alt="The Social Nexus"
                width={220}
                height={60}
                className="h-auto w-56 object-contain md:w-50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#121212] py-16 pl-20 pr-6 pt-8 sm:pl-25">
        <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <h2 className="bg-gradient-to-r from-[#0798ad] via-[#55b882] to-[#b7c93a] bg-clip-text text-7xl font-semibold tracking-tight text-transparent md:text-8xl lg:text-7xl">
                {item.value}
              </h2>

              <p className="mt-6 text-xl font-medium text-white md:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="
    relative ml-16 flex h-screen
    w-[calc(100%-4rem)]
    items-center justify-center
    overflow-hidden bg-black
    lg:ml-[72px] lg:w-[calc(100%-72px)]
  "
      >
        <div className="relative aspect-video w-full max-w-[calc(100vh*16/9)]">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src="https://www.youtube-nocookie.com/embed/27Hgqi7S6uc?autoplay=1&mute=1&loop=1&playlist=27Hgqi7S6uc&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
            title="The Social Nexus"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#111111] text-white pl-20 pr-6 sm:pl-25">
        <div className="relative mx-auto min-h-[470px] max-w-[1920px] lg:grid lg:grid-cols-[41%_59%]">
          <div className="px-5 pb-16 pt-28 sm:px-10 lg:px-5 lg:pt-[220px]">
            <h2 className="text-[clamp(2.75rem,3.4vw,3.75rem)] font-medium uppercase leading-none tracking-[-0.045em]">
              Our Story
            </h2>
          </div>

          <div className="relative px-5 pb-20 pt-24 sm:px-10 lg:flex lg:items-center lg:px-0 lg:pb-5 lg:pt-28">
            <div className="absolute right-5 top-0  bg-[#40B3C1] px-11 py-7 sm:right-10 lg:right-[10.5%]">
              <p className="text-2xl font-semibold leading-none">from</p>
              <p className="mt-4 text-4xl font-bold leading-none">2019</p>
            </div>

            <div className="max-w-[1000px] lg:pr-6">
              <div className="space-y-3 leading-snug font-medium text-[#939393]">
                <p>
                  Social Nexus started with a simple frustration: most agencies
                  sell a website and disappear. We wanted to build the opposite
                  a team that stays close to a business long after launch,
                  fixing what breaks, improving what works, and treating every
                  client’s growth as our own scoreboard.
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

      <section className="bg-[#111111] text-white pl-20 pr-6 sm:pl-25 pb-10">
        <div className="mx-auto grid max-w-[1760px] grid-cols-1 gap-5 lg:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.eyebrow}
              className=" rounded-2xl border border-white/50 bg-[#303030] px-7 py-8 sm:px-8 lg:p-5"
            >
              <p className="text-[18px] font-semibold uppercase leading-none text-[#41b4c3] sm:text-[20px] lg:text-lg">
                {item.eyebrow}
              </p>

              <h3 className="my-4 max-w-[520px] text-[28px] font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px] lg:text-2xl">
                {item.title}
              </h3>

              <p className="pb-5 max-w-[500px] text-[20px] font-medium leading-[1.48] tracking-[-0.015em] text-[#d2d2d2] sm:text-[22px] lg:text-lg">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-[#111111] pl-20 pr-6 sm:pl-25 py-10 text-white">
        <div className="mx-auto max-w-[1760px]">
          {/* Header */}
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr_auto] lg:items-start">
            <div>
              <p className="text-[20px] font-semibold leading-none text-white sm:text-lg">
                Services
              </p>

              <h2 className="mt-10 max-w-[430px] text-[42px] font-medium uppercase leading-[1.02] tracking-[-0.04em] sm:text-[52px] lg:text-[46px] xl:text-3xl">
                Digital services
                <br />
                that define
                <br />
                tomorrow.
              </h2>
            </div>

            <p className="max-w-[760px] pt-1 text-[22px] font-semibold leading-[1.45] text-[#929292] sm:text-[26px] lg:pt-12 lg:text-lg">
              Comprehensive solutions crafted with precision and powered by
              innovation.
            </p>

            <Link
              href="/services"
              className="w-20 h-20 sm:h-50 sm:w-50 group flex items-center justify-center justify-self-start rounded-full border border-white/80 transition duration-300 hover:bg-white hover:text-black lg:justify-self-end"
            >
              <span className="flex items-center gap-3 text-center text-[18px] font-semibold leading-[1.4] lg:text-[21px]">
                View
                <br />
                All Services
              </span>
            </Link>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
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

      <section className="bg-[#111111] text-white pl-20 pr-6 sm:pl-25 py-10">
        <div className="mx-auto max-w-[1500px]">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[34px] font-medium uppercase leading-none tracking-[-0.035em] sm:text-[42px] lg:text-4xl">
              Our Global Presence
            </h2>

            <p className="mx-auto mt-8 max-w-[1000px] text-[17px] font-medium leading-[1.35] text-[#929292] sm:text-[20px] lg:text-lg">
              We support clients globally and drive continued growth through
              innovation and transformation.
            </p>
          </div>

          {/* Locations */}
          <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {locations.map((location) => (
              <article
                key={location.name}
                className={`flex flex-col ${location.articleClass}`}
              >
                <div
                  className={`relative h-[500px] overflow-hidden bg-[#222222] sm:h-[580px] ${location.imageClass}`}
                >
                  <Image
                    src={location.image}
                    alt={`${location.name} office location`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover ${location.imagePosition}`}
                  />
                </div>

                <h3 className="mt-7 text-center text-[22px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[24px] lg:text-[29px]">
                  {location.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] pl-20 pr-6 sm:pl-25 py-10 text-white">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center text-center">
          <p className="text-[30px] font-normal leading-none tracking-[-0.03em] sm:text-[40px] lg:text-5xl">
            Have you project in mind?
          </p>

          <h2 className="mt-6 max-w-[1200px] text-[52px] font-bold uppercase leading-[0.9] tracking-[-0.055em] sm:text-[76px] lg:text-8xl">
            <span className="block">Let&apos;s make</span>

            <span className="mt-4 block">
              <span className="bg-gradient-to-r from-[#079CC7] via-[#58A676] to-[#C5C51A] bg-clip-text text-transparent">
                Something
              </span>{" "}
              great
            </span>

            <span className="mt-4 block">Together!</span>
          </h2>

          <Link
            href="/contact"
            className="group mt-7 sm:w-40 sm:h-40 flex size-[190px] items-center justify-center rounded-full bg-[#3FB2C0] transition duration-300 hover:scale-105 hover:bg-[#52C0CC]"
          >
            <span className="flex items-center gap-3 text-[18px] font-semibold leading-[1.45] sm:text-[20px]">
              <span>
                Connect
                <br />
                With Us
              </span>
            </span>
          </Link>
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
      className="group relative block h-[360px] overflow-hidden rounded-2xl border border-white/50 bg-[#262626] sm:h-[410px] lg:h-70"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-7 sm:p-8">
        <h3 className="max-w-[90%] text-[27px] font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-[31px] lg:text-[36px]">
          {service.title}
        </h3>
      </div>
    </Link>
  );
}
