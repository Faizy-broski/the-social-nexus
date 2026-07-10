import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NetworkLines from "../contact/network-lines";

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
    image: "/services/software-development.jpg",
  },
  {
    number: "02",
    title: ["Web", "Development"],
    description:
      "We provide end-to-end custom web development solutions designed for growth.",
    href: "/service/web-development-design-services",
    image: "/services/web-development.jpg",
  },
  {
    number: "03",
    title: ["Mobile App", "Development"],
    description:
      "We are a leading mobile app development agency delivering native and cross-platform apps.",
    href: "/service/mobile-app-development",
    image: "/services/mobile-app-development.jpg",
  },
  {
    number: "04",
    title: ["Generative AI", "Development"],
    description:
      "A forward-thinking AI development agency delivering intelligent, production-ready systems.",
    href: "/service/ai-development",
    image: "/services/generative-ai.jpg",
  },
  {
    number: "05",
    title: ["Digital", "Marketing"],
    description:
      "Powerful digital marketing and SEO services that turn visibility into revenue.",
    href: "/service/digital-marketing-seo",
    image: "/services/digital-marketing.jpg",
  },
  {
    number: "06",
    title: ["Social Media", "Design"],
    description:
      "Stunning social media visuals, branded templates, and scroll-stopping content.",
    href: "/service/social-media-design",
    image: "/services/social-media-design.jpg",
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 sm:py-28">
      {/* ambient network glow — nods to "Nexus" without being a literal icon */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
              <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]" />
              <NetworkLines />
            </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Intro row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-lg">
            <p className="text-sm font-semibold text-brand-gold">Services</p>
            <h2 className="mt-3 text-4xl max-w-md font-extrabold uppercase leading-[1.1] tracking-tight text-white sm:text-3xl">
              Digital services that{" "}
              <span className="gradient-text">define tomorrow</span>.
            </h2>
          </div>

          <p className="max-w-sm text-lg leading-relaxed text-white/80 lg:mt-1">
            Comprehensive solutions crafted with precision and powered by
            innovation.
          </p>

          <Link
            href="/services"
            className="group inline-flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full border border-white/30 text-center text-sm font-semibold leading-tight text-white transition-colors hover:border-brand-teal hover:bg-brand-teal/10"
          >
            View
            <br />
            All Services
          </Link>
        </div>

        {/* Service list */}
        <div className="mt-16 border-t border-white/10">
          {services.map((service) => (
            <div
              key={service.number}
              className="group relative border-b border-white/10"
            >
              <Link
                href={service.href}
                className="grid grid-cols-1 items-center gap-3 py-8 transition-colors sm:grid-cols-[3rem_1fr_1fr_2.5rem] sm:gap-8 sm:py-10"
              >
                <span className="text-xl font-semibold text-brand-teal-light/80 transition-colors group-hover:text-brand-gold">
                  {service.number}
                </span>

                <h3 className="text-3xl font-bold leading-tight text-white transition-colors sm:text-3xl group-hover:text-brand-teal-light">
                  {service.title[0]} {service.title[1]}
                </h3>

                <p className="max-w-md text-white/70">{service.description}</p>

                <ArrowUpRight className="hidden h-8 w-8 shrink-0 -translate-x-2 text-brand-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
              </Link>

              {/* Hover-reveal thumbnail */}
              <div className="pointer-events-none absolute right-24 top-1/2 z-10 hidden h-40 w-56 -translate-y-1/2 translate-x-6 overflow-hidden rounded-2xl border border-white/10 opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                <Image
                  src={service.image}
                  alt={`${service.title.join(" ")} thumbnail`}
                  fill
                  className="object-cover"
                />
                {/* thin brand-accent border wash on top of the thumbnail */}
                <div className="absolute inset-0 gradient-accent opacity-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;