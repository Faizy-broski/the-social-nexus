import Link from "next/link";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceThumbnail } from "@/components/home/ServiceThumbnail";
import { getPublishedServices } from "@/lib/data/services";

export default async function Page() {
  const rows = await getPublishedServices();
  const services = rows.map((row) => ({
    slug: row.slug,
    number: row.number,
    title: row.title.join("\n"),
    description: row.hero_description,
    image: row.image_path,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,.13)_68%,rgba(0,0,0,.28)_100%)]" />
      <section className="relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:pl-20 lg:pr-10 xl:pl-25 xl:pr-12 pb-24">
        <NetworkLines />
        <Reveal
          variant="up"
          richer
          className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[.9fr_1.4fr] lg:gap-24 lg:py-24"
        >
          <div className="uppercase">
            <p className="mb-4 text-lg font-semibold sm:mb-5 sm:text-xl">
              Services
            </p>
            <h1 className="max-w-145 text-4xl font-semibold leading-[.98] tracking-tighter sm:text-5xl lg:text-6xl">
              Solution we
              <br />
              <span className="gradient-text-animated">provide</span>
            </h1>
          </div>
          <p className="max-w-md text-base font-medium leading-[1.45] tracking-tight text-white/50 sm:text-lg">
            With every single one of our clients we bring forth a deep passion
            for{" "}
            <strong className="font-semibold text-white">
              creative problem solving innovations
            </strong>{" "}
            forward thinking brands boundaries
          </p>
        </Reveal>

        <div className="border-t border-white/15">
          {services.map((service, index) => (
            <article
              id={`service-${index}`}
              key={service.slug}
              className="scroll-reveal-row group relative grid grid-cols-[36px_1fr_auto] gap-x-4 border-b border-white/15 py-8 sm:grid-cols-[90px_1fr_auto] sm:gap-x-5 sm:py-10 lg:grid-cols-[100px_1.1fr_1.5fr_auto] lg:items-center lg:gap-8 px-4 sm:px-6"
            >
              {/* left-to-right highlight sweep on hover, same treatment as
                  ServicesSection's service list on the homepage */}
              <span className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-0 bg-linear-to-r from-brand-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full" />

              {/* `contents` makes this Link invisible to the grid layout —
                  its children (number/title/description) still land in
                  their normal grid columns, but the whole row is now a
                  real, clickable/navigable link instead of static
                  spans/headings. The arrow button stays OUTSIDE this Link
                  as a sibling (not nested inside it), since a link inside
                  a link — or a button inside a link — is invalid HTML. */}
              <Link href={`/services/${service.slug}`} className="contents">
                <span className="text-xl font-semibold text-white/35 transition-colors duration-300 group-hover:text-brand-gold sm:text-2xl lg:text-3xl">
                  {service.number}
                </span>
                <h2 className="whitespace-pre-line text-2xl font-semibold leading-tight tracking-[-.03em] transition-colors duration-300 group-hover:text-brand-teal-light sm:text-3xl">
                  {service.title}
                </h2>
                <p className="col-start-2 mt-5 line-clamp-3 max-w-172.5 text-base font-medium leading-relaxed text-white/50 sm:mt-6 sm:text-lg lg:col-start-auto lg:mt-0 lg:text-base">
                  {service.description}
                </p>
              </Link>

              {/* Hover-reveal thumbnail — same treatment as ServicesSection
                  on the homepage: pointer-events-none so it never intercepts
                  clicks (the row Link handles navigation), floats in from the
                  right on group-hover, desktop only. */}
              <div className="pointer-events-none absolute right-24 top-1/2 z-10 hidden h-40 w-56 -translate-y-1/2 translate-x-6 overflow-hidden rounded-2xl border border-white/10 opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                <ServiceThumbnail
                  src={service.image}
                  alt={`${service.title.replace("\n", " ")} thumbnail`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
