import MagneticButton from "@/components/home/MagneticButton";

const LetsMake = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:pl-17">
        <p className="scroll-reveal-row text-base font-medium text-[#555555] sm:text-2xl lg:text-3xl">
          Have a project in mind?
        </p>

        <h2
          className="scroll-reveal-row mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#121212] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          Let&apos;s make <span className="gradient-text-animated">something</span>
          <br />
           great together!
        </h2>

        <div className="mt-8 sm:mt-12" style={{ animationDelay: "260ms" }}>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-brand-gold"
            className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-brand-teal text-center text-sm font-semibold leading-tight text-white shadow-lg sm:h-36 sm:w-36 sm:text-base md:h-40 md:w-40 md:text-lg"
          >
            Connect
            <br />
            With Us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default LetsMake;