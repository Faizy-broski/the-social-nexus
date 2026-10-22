"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCategories } from "@/lib/pricing";
import { Reveal } from "@/components/motion/Reveal";
import type { PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";
import { PlanCard } from "./PlanCard";
import { ComparisonTable } from "./ComparisonTable";

const GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1 lg:max-w-md",
  2: "lg:grid-cols-2 lg:max-w-4xl",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Category tabs (only shown when there's more than one category), the
 * package cards, and the comparison table for the active category.
 */
export function PricingView({
  plans,
  comparisonRows,
}: {
  plans: PricingPlanRow[];
  comparisonRows: PricingComparisonRow[];
}) {
  const categories = getCategories(plans);
  const [active, setActive] = useState(categories[0]);

  const visiblePlans = plans.filter((plan) => plan.category === active);
  const visibleRows = comparisonRows.filter((row) => row.category === active);

  return (
    <>
      {categories.length > 1 && (
        <div
          role="tablist"
          aria-label="Package categories"
          className="mx-auto mb-12 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={category === active}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                category === active ? "brand-cta" : "text-white/65 hover:text-white",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div
        key={active}
        className={cn(
          "stagger-children mx-auto grid grid-cols-1 gap-6 pt-3 sm:grid-cols-2 lg:gap-5",
          GRID_COLS[visiblePlans.length] ?? "lg:grid-cols-4",
        )}
      >
        {visiblePlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      {visibleRows.length > 0 && (
        <section className="mt-24 sm:mt-28" aria-labelledby="compare-heading">
          <Reveal variant="up" className="mb-10 text-center">
            <h2 id="compare-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Compare <span className="gradient-text">packages</span>
            </h2>
            <p className="mt-3 text-sm text-white/55 sm:text-base">
              Everything included in each {active.toLowerCase()} package, side by side.
            </p>
          </Reveal>
          <ComparisonTable plans={visiblePlans} rows={visibleRows} />
        </section>
      )}
    </>
  );
}

export default PricingView;
