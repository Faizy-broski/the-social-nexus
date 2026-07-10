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
    label: "+44 7402 843322",
    href: "tel:+447402843322",
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
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]" />
        <NetworkLines />
      </div>

      <div className="container-section relative py-20 sm:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-teal">
            Get in touch
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white lg:text-5xl">
            Let&apos;s build something worth talking about
          </h1>
          <p className="mt-4 text-base text-white/70">
            Tell us about your project and the team behind The Social Nexus
            will get back to you within one business day.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-0">
          {/* Contact info panel */}
          <div className="relative flex flex-col justify-between rounded-2xl rounded-b-none bg-brand-navy-light/60 p-8 ring-1 ring-white/10 sm:p-10 lg:rounded-2xl lg:rounded-r-none lg:p-12">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Contact information
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Say something to start a conversation — we read every message
                and reply from a real person on the team, not a ticket queue.
              </p>

              <ul className="mt-10 space-y-6">
                {CONTACT_DETAILS.map(({ icon: Icon, label, href }) => {
                  const content = (
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-white/85">{label}</span>
                    </div>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="transition-opacity hover:opacity-80"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* <div className="mt-12 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-teal/50 hover:text-brand-teal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Form card */}
          <div className="glass-panel rounded-2xl rounded-t-none p-8 sm:p-10 lg:rounded-2xl lg:rounded-l-none lg:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

/** Faint node-and-line motif — a quiet nod to "Nexus" in the background. */
