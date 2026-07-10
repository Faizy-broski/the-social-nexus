import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import ProductCard from "./ProductCard";

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
    previewImage: "/products/pos-preview.png",
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
    previewImage: "/products/lms-preview.png",
    previewHeadline: "The All-in-One POS for repair shops & retail",
  },
];

export function ProductShowcaseSection() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-[#121212] sm:text-3xl lg:text-4xl">
            Software built to run your business.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">
            Beyond websites and apps, we build the everyday tools your team
            actually uses — ready to deploy, easy to manage.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-2 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductShowcaseSection;