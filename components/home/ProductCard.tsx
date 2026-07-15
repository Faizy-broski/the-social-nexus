"use client";

import { Check, Mouse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/home/MagneticButton";
import { TiltCard } from "@/components/motion/TiltCard";

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
  previewScrollPercent?: number;
};

const ProductCard = ({ product }: { product: Product }) => {
  const shift = product.previewScrollPercent ?? 65;

  return (
    <TiltCard className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-brand-teal/40 hover:shadow-[0_16px_32px_-12px_rgba(11,14,19,0.18)]">
      {/* Browser-chrome preview */}
      <div className="relative overflow-hidden rounded-t-xl bg-[#0B0E13]">
        <div className="group/image relative h-36 overflow-hidden sm:h-40 lg:h-44">
          <Image
            src={product.previewImage}
            alt={`${product.eyebrowTitle} product preview`}
            width={1200}
            height={3000}
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ "--shift": shift } as CSSProperties}
            className="h-auto w-full origin-top translate-y-0 transition-transform ease-in-out will-change-transform duration-4000 group-hover/image:translate-y-[calc(var(--shift)*-1%)]"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover/image:opacity-0">
            <div className="flex h-8 w-8 animate-float items-center justify-center rounded-full bg-black/20 backdrop-blur-sm sm:h-9 sm:w-9">
              <Mouse
                className="h-4 w-4 text-brand-teal-light sm:h-4.5 sm:w-4.5"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* subtle top fade so the screenshot edge doesn't feel clipped-hard */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-[#0B0E13]/60 to-transparent" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[13px] font-extrabold uppercase tracking-tight text-[#121212] sm:text-sm">
          {product.eyebrowTitle}{" "}
          <span className="gradient-text">{product.highlight}</span>
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-[#3a3a3a]">
          {product.description}
        </p>

        {/* thin gold accent divider — token-only, ~20% accent role */}
        <span className="mt-4 h-px w-8 bg-brand-gold/60" aria-hidden />

        <ul className="mt-3 space-y-1.5">
          {product.bullets.map((bullet: string) => (
            <li
              key={bullet}
              className="flex items-start gap-2 text-[13px] text-[#3a3a3a]"
            >
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3AB5C0]"
                strokeWidth={3}
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-1 items-end">
          <MagneticButton
            href="/contact-us"
            fillClassName="bg-brand-gold"
            className="h-10 w-full rounded-full bg-brand-teal px-5 text-center text-[13px] font-semibold text-white transition-colors sm:h-11 sm:text-sm"
          >
            {product.ctaLabel.join(" ")}
          </MagneticButton>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProductCard;