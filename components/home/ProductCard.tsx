"use client";

import { Check, Mouse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/home/MagneticButton";

type Product = {
  slug: string;
  eyebrowTitle: string;
  highlight: string;
  description: string;
  bullets: string[];
  ctaLabel: string[];
  href: string;
  previewImage: string;
  previewHeadline: string;
  /** How far (as % of the image's own height) it pans up on hover.
   *  Taller full-page screenshots want a bigger number. Defaults to 65. */
  previewScrollPercent?: number;
};

const ProductCard = ({ product }: { product: Product }) => {
  const shift = product.previewScrollPercent ?? 65;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-brand-cyan-accent hover:shadow-xl">
      {/* Browser-chrome preview */}
      <div className="relative overflow-hidden rounded-t-2xl bg-[#0B0E13]">
        {/* Fixed-height viewport that clips the tall screenshot.
            `group/image` scopes the hover trigger to just this box —
            hovering the card body/button won't trigger the pan. */}
        <div className="group/image relative h-48 overflow-hidden sm:h-56 lg:h-64">
          <Image
            src={product.previewImage}
            alt={`${product.eyebrowTitle} product preview`}
            width={1200}
            height={3000}
            style={{ "--shift": shift } as CSSProperties}
            className="h-auto w-full origin-top translate-y-0 transition-transform ease-in-out will-change-transform duration-4000 group-hover/image:translate-y-[calc(var(--shift)*-1%)]"
          />

          {/* Bouncing scroll/pointer hint — centered on the image, cues that
              hovering pans the screenshot. Fades out once hovered so it
              doesn't sit on top of the panned content. */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover/image:opacity-0">
            <div className="flex h-11 w-11 animate-bounce items-center justify-center rounded-full sm:h-12 sm:w-12">
              <Mouse
                className="h-5 w-5 text-white sm:h-9 sm:w-9"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-base font-extrabold uppercase tracking-tight text-[#121212] sm:text-lg">
          {product.eyebrowTitle}{" "}
          <span className="gradient-text">{product.highlight}</span>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a]">
          {product.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {product.bullets.map((bullet: string) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm text-[#3a3a3a]"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#3AB5C0]"
                strokeWidth={3}
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className={cn("flex flex-1 items-end pt-6 sm:justify-start")}>
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-brand-gold"
            className="mt-10 h-32 w-32 flex-col rounded-full bg-brand-teal text-center text-base font-semibold leading-tight text-white sm:mt-2 sm:h-40 sm:w-40 sm:text-lg"
          >
            {product.ctaLabel[0]}
            <br />
            {product.ctaLabel[1]}
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
