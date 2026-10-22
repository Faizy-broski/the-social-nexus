import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { groupComparisonRows } from "@/lib/pricing";
import type { ComparisonValue, PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";

function Cell({ value }: { value: ComparisonValue | undefined }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-brand-teal" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (typeof value === "string" && value.trim()) {
    return <span className="text-sm text-white/80">{value}</span>;
  }
  return (
    <>
      <Minus className="mx-auto h-4 w-4 text-white/25" aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );
}

/**
 * Grouped feature-by-package grid under the cards. Scrolls sideways
 * inside its own box on narrow screens, with the feature column pinned.
 */
export function ComparisonTable({
  plans,
  rows,
}: {
  plans: PricingPlanRow[];
  rows: PricingComparisonRow[];
}) {
  const groups = groupComparisonRows(rows);
  if (plans.length === 0 || groups.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-brand-navy-light/40">
      <table className="w-full min-w-160 border-collapse text-left">
        <caption className="sr-only">Compare packages</caption>
        <thead>
          <tr className="border-b border-white/10">
            <th scope="col" className="sticky left-0 z-10 bg-brand-navy-light px-5 py-5 text-sm font-medium text-white/50">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className={cn(
                  "px-4 py-5 text-center text-base font-semibold text-white",
                  plan.highlighted && "bg-brand-teal/10 text-brand-teal-light",
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.name}>
            <tr>
              <th
                scope="colgroup"
                colSpan={plans.length + 1}
                className="sticky left-0 bg-white/4 px-5 pb-3 pt-6 text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold"
              >
                {group.name}
              </th>
            </tr>
            {group.items.map((row) => (
              <tr key={row.id} className="border-b border-white/5 transition-colors hover:bg-white/3">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-brand-navy-light px-5 py-4 text-sm font-normal text-white/75"
                >
                  {row.label}
                </th>
                {plans.map((plan) => (
                  <td key={plan.id} className={cn("px-4 py-4 text-center", plan.highlighted && "bg-brand-teal/5")}>
                    <Cell value={row.values[plan.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default ComparisonTable;
