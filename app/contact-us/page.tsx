import type { Metadata } from "next";
import { Phone, Mail, MapPin, 
  // Facebook, Instagram, Linkedin 
} from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import NetworkLines from "@/components/contact/network-lines";

export const metadata: Metadata = {
  title: "Contact Us | The Social Nexus",
  description:
    "Get in touch with The Social Nexus — tell us about your project and we'll get back to you within one business day.",
};

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "+44 7462 254013",
    href: "tel:+447462254013",
  },
  {
    icon: Mail,
    label: "connect@thesocialnexus.co.uk",
    href: "mailto:connect@thesocialnexus.co.uk",
  },
  {
    icon: MapPin,
    label: "Operating across the UK, Pakistan & USA",
    href: undefined,
  },
];

// const SOCIALS = [
//   { icon: Facebook, href: "#", label: "Facebook" },
//   { icon: Instagram, href: "#", label: "Instagram" },
//   { icon: Linkedin, href: "#", label: "LinkedIn" },
// ];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-brand-navy">
      {/* ambient network glow — nods to "Nexus" without being a literal icon */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div
          className="animate-float absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
          style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
        />
        <NetworkLines />
      </div>

      <div className="container-section relative py-14 sm:py-20 lg:py-28">
        <div className="scroll-reveal-row mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-20">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-teal sm:text-sm">
            Get in touch
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s build something{" "}
            <span className="gradient-text-animated">worth talking about</span>
          </h1>
          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Tell us about your project and the team behind The Social Nexus
            will get back to you within one business day.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-0">
          {/* Contact info panel — full rounded corners at every size; only
              flattens the shared inner edge at lg: where it sits flush
              against the form panel. Previously `rounded-b-none` applied
              unconditionally, which left a flat, cut-off-looking bottom
              edge floating above the gap on mobile/tablet, where the two
              panels stack with visible spacing instead of touching. */}
          <div className="scroll-reveal-row relative flex flex-col justify-between rounded-2xl bg-brand-navy-light/60 p-6 ring-1 ring-white/10 sm:p-8 lg:rounded-2xl lg:rounded-r-none lg:p-10 xl:p-12">
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Contact information
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Say something to start a conversation — we read every message
                and reply from a real person on the team, not a ticket queue.
              </p>

              <ul className="stagger-children mt-8 space-y-5 sm:mt-10 sm:space-y-6">
                {CONTACT_DETAILS.map(({ icon: Icon, label, href }) => {
                  const content = (
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal transition-transform duration-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-white/85 break-words">{label}</span>
                    </div>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="group flex items-center transition-opacity hover:opacity-80"
                        >
                          <span className="contents [&_span:first-child]:group-hover:scale-110">
                            {content}
                          </span>
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Form card — same fix: full corners by default, only flattens
              the shared edge at lg: */}
          <div className="glass-panel scroll-reveal-row rounded-2xl p-6 sm:p-8 lg:rounded-2xl lg:rounded-l-none lg:p-10 xl:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

/** Faint node-and-line motif — a quiet nod to "Nexus" in the background. */