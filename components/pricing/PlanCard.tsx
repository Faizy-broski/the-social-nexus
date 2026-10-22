import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import type { PricingPlanRow } from "@/lib/types/content";

export type PlanCardData = Pick<
  PricingPlanRow,
  | "name"
  | "tagline"
  | "badge"
  | "highlighted"
  | "currency"
  | "price"
  | "original_price"
  | "price_period"
  | "price_note"
  | "features"
  | "cta_label"
  | "cta_href"
>;

/**
 * One package card on /pricing. Also rendered as the live preview inside
 * the admin package form, so it takes plain data and has no client hooks.
 */
export function PlanCard({ plan, className }: { plan: PlanCardData; className?: string }) {
  const isExternal = /^https?:\/\//.test(plan.cta_href);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border p-6 text-white transition-all duration-300 ease-out sm:p-7",
        plan.highlighted
          ? "border-brand-teal/70 bg-linear-to-b from-brand-teal/15 via-brand-navy-light/80 to-brand-navy-light/60 shadow-[0_0_60px_-15px] shadow-brand-teal/50 lg:-translate-y-3"
          : "border-white/10 bg-brand-navy-light/60 hover:-translate-y-1 hover:border-white/25",
        className,
      )}
    >
      {plan.badge && (
        <span className="brand-cta-accent absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
          {plan.badge}
        </span>
      )}

      <h3 className="text-xl font-semibold tracking-tight">{plan.name || "Package name"}</h3>
      {plan.tagline && <p className="mt-1.5 text-sm text-white/55">{plan.tagline}</p>}

      <div className="mt-6 min-h-24">
        {plan.price == null ? (
          <p className="text-3xl font-bold tracking-tight sm:text-4xl">Custom quote</p>
        ) : (
          <>
            {plan.original_price != null && (
              <p className="text-sm text-white/40 line-through">{formatPrice(plan.original_price, plan.currency)}</p>
            )}
            <p className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                {formatPrice(plan.price, plan.currency)}
              </span>
              {plan.price_period && <span className="text-sm text-white/50">{plan.price_period}</span>}
            </p>
          </>
        )}
        {plan.price_note && <p className="mt-2 text-xs text-white/50">{plan.price_note}</p>}
      </div>

      <Link
        href={plan.cta_href || "/contact-us"}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        className={cn(
          "press-scale mt-6 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors",
          plan.highlighted
            ? "brand-cta"
            : "border border-white/20 text-white hover:border-brand-teal hover:text-brand-teal-light",
        )}
      >
        {plan.cta_label || "Get started"}
      </Link>

      {plan.features.length > 0 && (
        <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
          {plan.features.map((feature, index) => (
            <li key={`${feature}-${index}`} className="flex items-start gap-3 text-sm text-white/75">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default PlanCard;
