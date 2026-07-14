"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import NetworkLines from "@/components/contact/network-lines";
import { Reveal } from "@/components/motion/Reveal";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * FaqSection
 * ------------------------------------------------------------------
 * Dark FAQ section: big centered "FAQ" title, a left-hand intro column
 * (label + circular Contact Us button) and a single-open accordion on
 * the right — first question expanded by default, matching your
 * screenshot. All 13 Q&As pulled from your Elementor markup.
 *
 * Background/tokens now match the rest of the site instead of the
 * local #0B0E13 / #2FD4C9 hex pair this file used before: bg-brand-navy
 * + the same ambient network glow (NetworkLines + teal/gold blobs)
 * used in ServicesSection and PortfolioSection, so this reads as the
 * same "Nexus" dark theme rather than a slightly different dark panel.
 */

const faqs = [
  {
    question: "What services does The Social Nexus specialize in?",
    answer:
      "The Social Nexus specializes in AI solutions, web and mobile development, automation, branding, digital marketing, ERP/CRM systems, chatbots, and modern business growth strategies tailored for startups and enterprises.",
  },
  {
    question: "How does The Social Nexus help businesses grow digitally?",
    answer:
      "We combine creative design, advanced technology, and data-driven marketing strategies to help businesses increase visibility, improve customer engagement, and scale efficiently.",
  },
  {
    question: "What industries does The Social Nexus work with?",
    answer:
      "We work with startups, eCommerce brands, healthcare, real estate, finance, education, SaaS businesses, and enterprises looking for innovative digital solutions.",
  },
  {
    question: "What technologies does The Social Nexus use?",
    answer:
      "Our team works with modern technologies including React, Next.js, Node.js, MongoDB, Firebase, Shopify, WordPress, AI tools, and cloud-based platforms.",
  },
  {
    question:
      "Can The Social Nexus handle both small and large-scale projects?",
    answer:
      "Absolutely. Whether you need a startup website, enterprise software, AI automation, or a complete digital transformation, our team can scale solutions according to your requirements.",
  },
  {
    question: "Do you offer AI automation and chatbot solutions?",
    answer:
      "Yes, we develop AI-powered chatbots, voicebots, and automation systems that streamline workflows, improve customer support, and increase efficiency.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines depend on complexity and scope. Smaller projects may take a few weeks, while larger custom platforms and enterprise solutions can take several months.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes, we offer ongoing support, maintenance, updates, performance optimization, and technical assistance after project deployment.",
  },
  {
    question: "Can you redesign or upgrade an existing website or application?",
    answer:
      "Definitely. We can modernize outdated websites, improve performance, redesign user interfaces, and add new features to existing platforms.",
  },
  {
    question: "How does The Social Nexus ensure quality and security?",
    answer:
      "We follow industry best practices for development, testing, scalability, and data security to ensure every solution is reliable, secure, and high-performing.",
  },
  {
    question: "Do you offer digital marketing and SEO services?",
    answer:
      "Yes, we provide SEO, social media marketing, branding, paid advertising, and growth strategies to help businesses increase online reach and conversions.",
  },
  {
    question: "What makes The Social Nexus different from other agencies?",
    answer:
      "We blend creativity, AI innovation, and scalable technology solutions to deliver impactful digital experiences focused on measurable business growth.",
  },
  {
    question: "How can I get started with The Social Nexus?",
    answer:
      "Simply contact us through our website or schedule a consultation with our team to discuss your project goals and business requirements.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy py-20 sm:py-24">
        {/* ambient network glow — same "Nexus" treatment as Services/Portfolio */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-[120px]" />
          <div
            className="animate-float absolute right-0 bottom-1/4 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"
            style={{ animationDelay: "1.2s", animationDuration: "5.5s" }}
          />
          <NetworkLines />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal
            as="h2"
            variant="up"
            richer
            className="text-center text-4xl font-extrabold tracking-tight gradient-text sm:text-7xl"
          >
            FAQ
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left intro column */}
            <Reveal variant="right" richer className="lg:col-span-3">
              <h3 className="text-2xl font-bold leading-tight text-white">
                Explore Frequently Asked Questions
              </h3>

              <MagneticButton
                href="/contact-us"
                fillClassName="bg-brand-teal/15"
                magneticStrength={0.2}
                className="mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-white/25 text-center text-sm font-medium text-white transition-colors hover:border-brand-teal hover:text-brand-teal-light"
              >
                Contact Us
              </MagneticButton>
            </Reveal>

            {/* Accordion */}
            <Reveal variant="left" className="lg:col-span-9">
              <div className="stagger-children border-t border-white/15">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="group relative border-b border-white/15 pl-6"
                    >
                      {/* left-to-right highlight sweep on hover */}
                      <span className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-0 bg-linear-to-r from-brand-teal/10 to-transparent transition-all duration-500 ease-out group-hover:w-full" />

                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal-light sm:text-base">
                          {faq.question}
                        </span>

                        {/* Plus/Minus morph — rotates + cross-fades instead
                            of an instant icon swap */}
                        <span className="relative h-4 w-4 shrink-0 text-white/70">
                          <Plus
                            className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${
                              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                            }`}
                          />
                          <Minus
                            className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${
                              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 pr-10 text-sm leading-relaxed text-white/55">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* <LetsMake /> */}
    </>
  );
}

export default FaqSection;