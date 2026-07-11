"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import NetworkLines from "@/components/contact/network-lines";

const slugify = (title: string) =>
  title
    .replace(/\n/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const services = [
  {
    number: "1",
    title: "Software\nDevelopment",
    description:
      "We are a leading software development agency delivering custom...",
    image: "/services/1.jpg",
  },
  {
    number: "2",
    title: "Web\nDevelopment",
    description:
      "We provide end-to-end custom web development solutions designed...",
    image: "/services/2.jpg",
  },
  {
    number: "3",
    title: "Mobile App\nDevelopment",
    description:
      "We are a leading mobile app development agency delivering...",
    image: "/services/3.jpg",
  },
  {
    number: "4",
    title: "Generative AI\nDevelopment",
    description:
      "The Social Nexus is a forward-thinking AI development agency delivering...",
    image: "/services/4.jpg",
  },
  {
    number: "5",
    title: "Digital\nMarketing",
    description:
      "The Social Nexus delivers powerful digital marketing and SEO services...",
    image: "/services/5.jpg",
  },
  {
    number: "6",
    title: "Social Media\nDesign",
    description:
      "The Social Nexus creates stunning social media visuals, branded templates...",
    image: "/services/6.jpg",
  },
  {
    number: "7",
    title: "Automation",
    description:
      "The Social Nexus delivers intelligent business automation solutions that...",
    image: "/services/7.jpg",
  },
  {
    number: "8",
    title: "Voicebots",
    description:
      "The Social Nexus builds sophisticated voicebot and conversational AI systems...",
    image: "/services/8.jpg",
  },
  {
    number: "9",
    title: "Chatbots",
    description:
      "The Social Nexus builds intelligent, conversational chatbots that engage customers...",
    image: "/services/9.jpg",
  },
  {
    number: "10",
    title: "ERP & CRM Implementation",
    description:
      "The Social Nexus delivers expert ERP and CRM implementation services that transform...",
    image: "/services/10.jpg",
  },
  {
    number: "11",
    title: "Brand Identity & Logo\nDesign",
    description:
      "We craft brand identities that communicate purpose, personality, and positioning...",
    image: "/services/11.jpg",
  },
  {
    number: "12",
    title: "Saas\nDevelopment",
    description:
      "We are a leading SaaS development agency delivering custom SaaS products...",
    image: "/services/12.jpg",
  },
  {
    number: "13",
    title: "Maintenance and Support",
    description:
      "We are a leading software maintenance and support agency delivering...",
    image: "/services/13.jpg",
  },
  {
    number: "14",
    title: "Salesforce Development &\nConsulting",
    description:
      "We are a leading Salesforce development and consulting agency...",
    image: "/services/14.jpg",
  },
  {
    number: "15",
    title: "Cloud Migration & Cloud\nOperations",
    description:
      "We are a leading cloud migration and cloud operations agency delivering...",
    image: "/services/15.jpg",
  },
];

export default function Page() {
  const introRef = useReveal<HTMLDivElement>();

  const goNext = (index: number) =>
    document
      .getElementById(`service-${index}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,.13)_68%,rgba(0,0,0,.28)_100%)]" />
      <section className="relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12 pb-24">
        <NetworkLines />
        <div
          ref={introRef}
          className="reveal grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[.9fr_1.4fr] lg:gap-24 lg:py-24"
        >
          <div className="uppercase">
            <p className="mb-4 text-lg font-semibold sm:mb-5 sm:text-xl">
              Services
            </p>
            <h1 className="max-w-[580px] text-4xl font-semibold leading-[.98] tracking-[-.05em] sm:text-5xl lg:text-6xl">
              Solution we
              <br />
              <span className="gradient-text-animated">provide</span>
            </h1>
          </div>
          <p className="max-w-md text-base font-medium leading-[1.45] tracking-[-.025em] text-white/50 sm:text-lg">
            With every single one of our clients we bring forth a deep passion
            for{" "}
            <strong className="font-semibold text-white">
              creative problem solving innovations
            </strong>{" "}
            forward thinking brands boundaries
          </p>
        </div>

        <div className="border-t border-white/15">
          {services.map((service, index) => (
            <article
              id={`service-${index}`}
              key={service.title}
              className="scroll-reveal-row group relative grid grid-cols-[36px_1fr_auto] gap-x-4 border-b border-white/15 py-8 sm:grid-cols-[90px_1fr_auto] sm:gap-x-5 sm:py-10 lg:grid-cols-[100px_1.1fr_1.5fr_auto] lg:items-center lg:gap-8 px-4 sm:px-6"
            >
              {/* left-to-right highlight sweep on hover, same treatment as
                  ServicesSection's service list on the homepage */}
              <span className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-0 bg-gradient-to-r from-brand-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full" />

              {/* `contents` makes this Link invisible to the grid layout —
                  its children (number/title/description) still land in
                  their normal grid columns, but the whole row is now a
                  real, clickable/navigable link instead of static
                  spans/headings. The arrow button stays OUTSIDE this Link
                  as a sibling (not nested inside it), since a link inside
                  a link — or a button inside a link — is invalid HTML. */}
              <Link
                href={`/services/${slugify(service.title)}`}
                className="contents"
              >
                <span className="text-xl font-semibold text-white/35 transition-colors duration-300 group-hover:text-brand-gold sm:text-2xl lg:text-3xl">
                  {service.number}
                </span>
                <h2 className="whitespace-pre-line text-2xl font-semibold leading-tight tracking-[-.03em] transition-colors duration-300 group-hover:text-brand-teal-light sm:text-3xl">
                  {service.title}
                </h2>
                <p className="col-start-2 mt-5 max-w-[690px] text-base font-medium leading-relaxed text-white/50 sm:mt-6 sm:text-lg lg:col-start-auto lg:mt-0 lg:text-md">
                  {service.description}
                </p>
              </Link>

              {/* Hover-reveal thumbnail — same treatment as ServicesSection
                  on the homepage: pointer-events-none so it never intercepts
                  clicks (the row Link handles navigation), floats in from the
                  right on group-hover, desktop only. */}
              <div className="pointer-events-none absolute right-24 top-1/2 z-10 hidden h-40 w-56 -translate-y-1/2 translate-x-6 overflow-hidden rounded-2xl border border-white/10 opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                <Image
                  src={service.image}
                  alt={`${service.title.replace("\n", " ")} thumbnail`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* thin brand-accent border wash on top of the thumbnail */}
                <div className="absolute inset-0 gradient-accent opacity-10" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}