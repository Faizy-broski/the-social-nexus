import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import { ClientLogoCarousel } from "@/components/services/ClientLogoCarousel";
import type { ServiceDetail } from "@/lib/services-data";
import { IndustriesCarousel } from "@/components/services/IndustriesCarousel";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description:
      "The discovery phase identifies user needs and market demand. We define the project scope, research competitors, and outline the features and requirements that are critical for setting project goals and technical direction.",
  },
  {
    number: "02",
    title: "Design & Development",
    description:
      "The design phase creates user-centered interfaces and experiences. The development team then translates those designs into code, following agile methodologies to build and refine each module, with continuous testing along the way.",
  },
  {
    number: "03",
    title: "Deployment & Support",
    description:
      "Deployment involves releasing the solution to production. Post-launch, we provide ongoing support, maintenance, updates, security patches, and performance monitoring to keep everything reliable and competitive long-term.",
  },
];

const stats = [
  { value: "1,000+", label: "Projects" },
  { value: "800+", label: "Clients" },
  { value: "700+", label: "Reviews" },
  { value: "390+", label: "Resources" },
];

type ServiceDetailPageProps = {
  service: ServiceDetail;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const displayTitle = service.title.join(" ");

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

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal variant="right" richer>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-brand-teal-light sm:text-5xl lg:text-6xl">
              {service.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal variant="left" delay={0.1}>
            <p className="max-w-lg text-base font-medium leading-[1.55] text-white/60 sm:text-lg">
              {service.heroDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="scroll-reveal-row relative border-y border-white/10 bg-white/5 py-12 backdrop-blur-md sm:py-14">
        <div className="relative mx-auto mb-10 flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:mb-12">
          <div className="flex items-center gap-3">
            <p className="text-base font-semibold sm:text-lg">
              Trusted By 1000+ Clients
            </p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-brand-gold text-brand-gold"
                />
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            They Trust Us
          </h2>
        </div>

        <ClientLogoCarousel />
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <div className="scroll-reveal-row max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Our Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {service.cardsHeading ? (
                <>
                  {service.cardsHeading.before}
                  {service.cardsHeading.highlight && (
                    <span className="gradient-text-animated">
                      {service.cardsHeading.highlight}
                    </span>
                  )}
                  {service.cardsHeading.after}
                </>
              ) : (
                <>
                  Comprehensive{" "}
                  <span className="gradient-text-animated">{displayTitle}</span>{" "}
                  Solutions
                </>
              )}
            </h2>
          </div>

          <div className="stagger-children mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature) => (
              <article
                key={feature.title}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-brand-teal/40"
              >
                <div className="flex items-start justify-between">
                  <feature.icon
                    className="h-9 w-9 text-brand-teal-light"
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-gold" />
                </div>

                <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.02em] text-brand-teal-light">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="up" className="text-center">
            <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-0.03em] sm:text-3xl lg:text-5xl">
              {service.overviewHeading ? (
                <>
                  {service.overviewHeading.before}
                  {service.overviewHeading.highlight && (
                    <span className="gradient-text-animated">
                      {service.overviewHeading.highlight}
                    </span>
                  )}
                  {service.overviewHeading.after}
                </>
              ) : (
                <>
                  Building High-Performance{" "}
                  <span className="gradient-text-animated">{displayTitle}</span>
                  <br className="hidden sm:block" /> Backed by Industry Experience
                </>
              )}
            </h2>
          </Reveal>

          <Reveal
            variant="up"
            delay={0.1}
            className="mt-10 grid gap-8 rounded-3xl border border-brand-teal/30 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center"
          >
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              {service.overviewParagraph ?? (
                <>
                  The Social Nexus stands as a trusted {service.overviewFocus}{" "}
                  agency with over 10+ years of collective experience delivering
                  tailored solutions to businesses of all sizes. Our team of
                  expert {service.overviewTeam} craft solutions using modern
                  tools, agile methodologies, and industry best practices. We
                  focus on building products that are intuitive, efficient, and
                  optimised for real-world use. Serving clients across the UK,
                  USA, and Pakistan, we combine deep technical expertise with a
                  genuine partnership approach to help your business grow with
                  confidence.
                </>
              )}
            </p>

            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={service.image}
                alt={`${displayTitle} illustration`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY CHOOSE US / STATS ================= */}
      <section className="relative px-5 py-8 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal variant="up">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-brand-teal-light sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/60">
              Choosing The Social Nexus means partnering with a team dedicated
              to delivering exceptional results. Our commitment to innovation
              and quality ensures that each project aligns with your vision
              and meets the highest standards.
            </p>
          </Reveal>

          <Reveal
            variant="scale"
            delay={0.1}
            className="stagger-children mt-10 grid grid-cols-2 gap-6 rounded-3xl bg-linear-to-r from-brand-teal-dark to-brand-navy-light p-8 sm:p-10 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/70 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal variant="up">
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-5xl max-w-3xl mx-auto">
              Industries We Serve with Custom{" "}
              <span className="gradient-text-animated">
                {displayTitle} Solutions
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              The Social Nexus creates powerful solutions across diverse
              industries, helping businesses enhance engagement, streamline
              operations, and deliver exceptional experiences.
            </p>
          </Reveal>

          <IndustriesCarousel />
        </div>
      </section>
    </main>
  );
}

export default ServiceDetailPage;
