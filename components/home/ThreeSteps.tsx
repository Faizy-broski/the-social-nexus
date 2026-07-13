import Image from "next/image";
import MagneticButton from "@/components/home/MagneticButton";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "FILL UP THE DETAIL",
      description:
        "Tell us about your business, goals and timeline through a short form. No jargon, no long calls—just the essentials we need to get started.",
      image: "/boy-is-working.jpg",
    },
    {
      number: "02",
      title: "MEET WITH OUR TEAM",
      description:
        "We schedule a short call to walk through your requirements, scope the project properly, and answer any questions you have.",
      image: "/flat-illustration-business.png",
    },
    {
      number: "03",
      title: "WE BUILD, LAUNCH & SUPPORT",
      description:
        "Our team designs, develops and ships your project, then stays on for support and updates long after launch day.",
      image: "/Tiny-character-launching.jpg",
    },
  ];

  // One distinct arrow graphic per connector slot: arrow-1 bridges
  // step 1 → 2, arrow-2 bridges step 2 → 3.
  const arrowByIndex = ["/arrow-1.png", "/arrow-2.png"];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="scroll-reveal-row text-center">
          <p className="text-sm font-semibold text-brand-teal-dark">Process</p>

          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Your Project, <span className="gradient-text">Delivered</span>
            <br />
            <span className="gradient-text">In</span> 3 Steps.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:mt-5 sm:text-base">
            No long contracts, no confusing process—just a clear path from idea
            to launch.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 grid gap-10 sm:mt-16 sm:gap-12 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-14">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="scroll-reveal-row group relative text-center md:text-left"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <p className="text-2xl font-bold text-muted-foreground/40 sm:text-3xl">
                {step.number}
              </p>

              <Image
                src={step.image}
                alt={step.title}
                width={200}
                height={200}
                loading="lazy"
                className="mx-auto mt-5 h-36 w-auto object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 sm:mt-6 sm:h-34 md:mx-0 md:h-30 lg:h-32 xl:h-38"
              />

              <h3 className="mt-6 text-lg font-bold uppercase text-foreground sm:mt-8 sm:text-xl">
                {step.title}
              </h3>

              {/* Fixed: max-w block needs mx-auto to actually center on
                  mobile/tablet (text-center on the parent only centers
                  inline content, not a width-constrained block). Reverts
                  to mx-0 at md where the column itself goes left-aligned.
                  Width also now scales up gradually instead of jumping
                  straight to a fixed 270px on every screen ≥0px. */}
              <p className="mx-auto mt-3 max-w-xs text-sm text-justify leading-6 text-muted-foreground sm:mt-4 sm:max-w-sm sm:leading-7 md:mx-0 md:max-w-67.5">
                {step.description}
              </p>

              {/* Connector arrow — one graphic per slot. Only shown from
                  lg up, since at md the 3-column grid is already tight
                  and an arrow there tends to collide with the text. */}
              {index < 2 && (
                <div
                  className="scroll-reveal-row absolute -right-9 top-14 hidden w-20 origin-left lg:block xl:-right-12 xl:top-16 xl:w-28"
                  style={{ animationDelay: `${index * 120 + 220}ms` }}
                >
                  <Image
                    src={arrowByIndex[index]}
                    alt=""
                    aria-hidden="true"
                    width={110}
                    height={70}
                    loading="lazy"
                    className="h-auto w-full object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="scroll-reveal-row mt-14 flex justify-center sm:mt-16 md:mt-20">
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-brand-gold"
            magneticStrength={0.2}
            className="h-28 w-28 flex-col rounded-full bg-brand-teal text-center text-sm font-semibold text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:h-36 sm:w-36 sm:text-base md:h-40 md:w-40"
          >
            Discuss Your
            <br />
            Website
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;