import Link from "next/link";

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
  // step 1 → 2, arrow-2 bridges step 2 → 3. Previously both images
  // rendered, stacked, in both slots — this maps index → its own arrow.
  const arrowByIndex = ["/arrow-1.png", "/arrow-2.png"];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#121212] sm:text-4xl md:text-5xl lg:text-6xl">
            Your Project, Delivered
            <br />
            In 3 Steps.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:mt-5 sm:text-base">
            No long contracts, no confusing process—just a clear path from idea
            to launch.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 grid gap-10 sm:mt-16 sm:gap-12 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-14">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center md:text-left">
              <p className="text-2xl font-bold text-gray-300 sm:text-3xl">{step.number}</p>

              <img
                src={step.image}
                alt={step.title}
                width={200}
                height={200}
                className="mx-auto mt-5 h-20 w-auto object-contain sm:mt-6 sm:h-24 md:mx-0 lg:h-32 xl:h-38"
              />

              <h3 className="mt-6 text-lg font-bold uppercase text-[#121212] sm:mt-8 sm:text-xl">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:leading-7">
                {step.description}
              </p>

              {/* Connector arrow — one graphic per slot, explicitly
                  sized so it can't blow out the layout at native res */}
              {index < 2 && (
                <div className="absolute -right-9 top-14 hidden w-20 lg:block xl:-right-12 xl:top-16 xl:w-38">
                  <img
                    src={arrowByIndex[index]}
                    alt=""
                    aria-hidden="true"
                    width={110}
                    height={70}
                    className="h-auto w-full object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center sm:mt-16 md:mt-20">
          <Link
            href="/contact-us"
            className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#39B7C4] text-center text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:h-36 sm:w-36 sm:text-base md:h-40 md:w-40"
          >
            Discuss Your
            <br />
            Website
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;