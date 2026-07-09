import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "FILL UP THE DETAIL",
      description:
        "Tell us about your business, goals and timeline through a short form. No jargon, no long calls—just the essentials we need to get started.",
      image: "/images/process/form.png",
    },
    {
      number: "02",
      title: "MEET WITH OUR TEAM",
      description:
        "We schedule a short call to walk through your requirements, scope the project properly, and answer any questions you have.",
      image: "/images/process/meeting.png",
    },
    {
      number: "03",
      title: "WE BUILD, LAUNCH & SUPPORT",
      description:
        "Our team designs, develops and ships your project, then stays on for support and updates long after launch day.",
      image: "/images/process/launch.png",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight text-[#121212] md:text-6xl">
            Your Project, Delivered
            <br />
            In 3 Steps.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            No long contracts, no confusing process—just a clear path from idea
            to launch.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20 grid gap-14 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center md:text-left">
              <p className="text-3xl font-bold text-gray-300">{step.number}</p>

              <img
                src={step.image}
                alt={step.title}
                className="mx-auto mt-6 h-28 object-contain md:mx-0"
              />

              <h3 className="mt-8 text-xl font-bold uppercase text-[#121212]">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {step.description}
              </p>

              {/* Arrow */}
              {index < 2 && (
                <div className="absolute -right-14 top-20 hidden lg:block">
                  <svg
                    width="110"
                    height="70"
                    viewBox="0 0 110 70"
                    fill="none"
                  >
                    <path
                      d="M5 60C40 10 80 10 100 35"
                      stroke="#D5D5D5"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M88 20L100 35L82 38"
                      stroke="#D5D5D5"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/contact-us"
            className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#39B7C4] text-center font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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