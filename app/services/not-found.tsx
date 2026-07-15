import Link from "next/link";
import NetworkLines from "@/components/contact/network-lines";
import MagneticButton from "@/components/home/MagneticButton";

export const metadata = {
  title: "Service Not Found | The Social Nexus",
  description: "The service you're looking for doesn't exist.",
};

export default function ServiceNotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-navy px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="text-[90px] font-extrabold leading-none tracking-tight sm:text-[130px]">
          <span className="gradient-text-animated">404</span>
        </h1>

        <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          Service Not Found
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          We couldn&rsquo;t find the service you&rsquo;re looking for. It may
          have moved or never existed — take a look at everything we offer
          instead.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <MagneticButton
            href="/services"
            fillClassName="bg-brand-gold"
            className="brand-cta h-12 rounded-full px-7 text-sm font-semibold sm:text-base"
          >
            View All Services
          </MagneticButton>

          <Link
            href="/contact-us"
            className="press-scale group flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:border-brand-teal hover:text-brand-teal-light sm:text-base"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
