import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

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
        {/* Chrome bar sits outside the hover/scroll zone on purpose —
            only the screenshot itself should react to hover. */}
        <div className="relative z-10 flex items-center gap-1.5 bg-[#12161d] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 h-4 w-32 rounded-sm bg-white/10 sm:w-40" />
        </div>

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
            className="h-auto w-full origin-top transition-transform duration-4000 ease-in-out will-change-transform transform:[translateY(0%)] group-hover/image:transform-[translateY(calc(var(--shift)*-1%))]"
          />
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
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3AB5C0]" strokeWidth={3} />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-end  pt-6 sm:justify-start">
          <Link
            href={product.href}
            className="inline-flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#3AB5C0] text-center text-sm font-semibold leading-tight text-white transition-transform hover:scale-105 sm:h-28 sm:w-28 sm:text-base lg:h-30 lg:w-30 lg:text-md"
          >
            {product.ctaLabel[0]}
            <br />
            {product.ctaLabel[1]}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;