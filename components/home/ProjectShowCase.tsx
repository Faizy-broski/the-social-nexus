"use client";

import ProductCard from "./ProductCard";
import { useReveal } from "@/hooks/use-reveal";

const products = [
  {
    slug: "pos",
    eyebrowTitle: "Point-of-Sale",
    highlight: "(POS)",
    description:
      "A point-of-sale system that handles checkout, inventory and reporting in one place — built for retail and hospitality teams who need speed at the counter, not a learning curve.",
    bullets: [
      "Fast checkout, offline-ready",
      "Live inventory & stock alerts",
      "Sales reports in real time",
    ],
    ctaLabel: ["Explore", "POS"],
    href: "/products/pos",
    previewImage: "/repairbooking-co-uk.png",
    previewHeadline: "The All-in-One POS for repair shops & retail",
  },
  {
    slug: "lms",
    eyebrowTitle: "Learning Management System",
    highlight: "(LMS)",
    description:
      "A learning management platform for training staff, onboarding new hires, or selling courses online — track progress without juggling spreadsheets.",
    bullets: [
      "Custom courses & quizzes",
      "Progress tracking per learner",
      "Certificates on completion",
    ],
    ctaLabel: ["Explore", "LMS"],
    href: "/products/lms",
    previewImage: "/repairbooking-co-uk.png",
    previewHeadline: "The All-in-One POS for repair shops & retail",
  },
];

export function ProductShowcaseSection() {
  const introRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Intro */}
        <div ref={introRef} className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-teal-dark">
            Products
          </p>
          <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-3xl lg:text-5xl">
            Software built to <br /> run your <span className="gradient-text">business</span>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Beyond websites and apps, we build the everyday tools your team
            actually uses — ready to deploy, easy to manage.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="reveal stagger-children mt-10 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2"
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductShowcaseSection;