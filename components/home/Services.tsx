import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NetworkLines from "../contact/network-lines";
import { ServiceThumbnail } from "./ServiceThumbnail";

/**
 * ServicesSection
 * ------------------------------------------------------------------
 * Full-bleed dark band on the brand navy background, using ONLY the
 * tokens/utilities already defined in globals.css — no one-off hex
 * values. Accent color comes from `.gradient-accent` (brand-teal →
 * brand-gold), matching the two-tone theme (there is no green token,
 * so the earlier gold → green → teal idea is dropped).
 *
 * Intro row (label, heading, blurb, "View all services" ring button)
 * sits above a numbered service list. Each row reveals a thumbnail on
 * hover via pure CSS (`group-hover`), so this stays a Server Component
 * — no client JS / mouse-tracking needed for the effect.
 *
 * Animation note: row entrance uses `.scroll-reveal-row` (defined in
 * globals.css) — native CSS `animation-timeline: view()` — instead of
 * an IntersectionObserver hook, so each row animates in as it
 * individually scrolls into view without requiring this file to
 * become a Client Component. Everything else (hover sweep, thumbnail
 * reveal, arrow motion, ambient glow drift) is pure CSS as before.
 *
 * Thumbnails you'll need to drop in /public — placeholders below since
 * I can't pull from your WP media library:
 *   /public/services/software-development.jpg
 *   /public/services/web-development.jpg
 *   /public/services/mobile-app-development.jpg
 *   /public/services/generative-ai.jpg
 *   /public/services/digital-marketing.jpg
 *   /public/services/social-media-design.jpg
 */

type Service = {
  number: string;
  title: string[];
  description: string;
  href: string;
  image: string;
};

const services: Service[] = [
  {
    number: "01",
    title: ["Software", "Development"],
    description:
      "We are a leading software development agency delivering custom solutions.",
    href: "/service/software-development",
    image: "/services/1.jpg",
  },
  {
    number: "02",
    title: ["Web", "Development"],
    description:
      "We provide end-to-end custom web development solutions designed for growth.",
    href: "/service/web-development-design-services",
    image: "/services/2.jpg",
  },
  {
    number: "03",
    title: ["Mobile App", "Development"],
    description:
      "We are a leading mobile app development agency delivering native and cross-platform apps.",
    href: "/service/mobile-app-development",
    image: "/services/3.jpg",
  },
  {
    number: "04",
    title: ["Generative AI", "Development"],
    description:
      "A forward-thinking AI development agency delivering intelligent, production-ready systems.",
    href: "/service/ai-development",
    image: "/services/4.jpg",
  },
  {
    number: "05",
    title: ["Digital", "Marketing"],
    description:
      "Powerful digital marketing and SEO services that turn visibility into revenue.",
    href: "/service/digital-marketing-seo",
    image: "/services/5.jpg",
  },
  {
    number: "06",
    title: ["Social Media", "Design"],
    description:
      "Stunning social media visuals, branded templates, and scroll-stopping content.",
    href: "/service/social-media-design",
    image: "/services/6.jpg",
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 sm:py-28">
      {/* ambient network glow — nods to "Nexus" without being a literal icon.
          Slow drift added via animate-float (pure CSS, no JS) so the glow
          feels alive even before anything scrolls. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:pl-17">
        {/* Intro row */}
        <div className="scroll-reveal-row flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-lg">
            <p className="text-sm font-semibold text-brand-gold">Services</p>
            <h2 className="mt-3 text-4xl max-w-md font-extrabold uppercase leading-[1.1] tracking-tight text-white sm:text-3xl">
              Digital services that{" "}
              <span className="gradient-text-animated">define tomorrow</span>.
            </h2>
          </div>

          <p className="max-w-sm text-lg leading-relaxed text-white/80 lg:mt-1">
            Comprehensive solutions crafted with precision and powered by
            innovation.
          </p>

          <Link
            href="/services"
            className="press-scale group relative inline-flex h-32 w-32 shrink-0 flex-col items-center justify-center overflow-hidden rounded-full border border-white/30 text-center text-sm font-semibold leading-tight text-white transition-colors hover:border-brand-teal"
          >
            {/* fill sweeps up from the bottom on hover, pure CSS */}
            <span className="absolute inset-0 -translate-y-full bg-brand-teal/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">
              View
              <br />
              All Services
            </span>
          </Link>
        </div>

        {/* Service list */}
        <div className="mt-16 border-t border-white/10">
          {services.map((service) => (
            <div
              key={service.number}
              className="scroll-reveal-row group relative border-b border-white/10"
            >
              <Link
                href={service.href}
                className="relative pl-6 grid grid-cols-1 items-center gap-3 overflow-hidden py-8 transition-colors sm:grid-cols-[3rem_1fr_1fr_2.5rem] sm:gap-8 sm:py-10"
              >
                {/* highlight sweep behind the row content, left-to-right on hover */}
                <span className="absolute inset-y-0 left-0 -z-10 w-0 bg-linear-to-r from-brand-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full" />

                <span className="text-xl font-semibold text-brand-teal-light/80 transition-colors duration-300 group-hover:text-brand-gold">
                  {service.number}
                </span>

                <h3 className="text-3xl font-bold leading-tight text-white transition-colors duration-300 sm:text-3xl group-hover:text-brand-teal-light">
                  {service.title[0]} {service.title[1]}
                </h3>

                <p className="max-w-md text-white/70">{service.description}</p>

                <ArrowUpRight className="hidden h-8 w-8 shrink-0 -translate-x-2 -rotate-12 text-brand-gold opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 sm:block" />
              </Link>

              {/* Hover-reveal thumbnail */}
              <div className="pointer-events-none absolute right-24 top-1/2 z-10 hidden h-40 w-56 -translate-y-1/2 translate-x-6 overflow-hidden rounded-2xl border border-white/10 opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                <ServiceThumbnail
                  src={service.image}
                  alt={`${service.title.join(" ")} thumbnail`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;