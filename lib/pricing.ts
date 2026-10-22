import type { PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";

/** "£499", "£1,299.50" — drops the pence when the price is a whole number. */
export function formatPrice(amount: number | string, currency: string) {
  const value = Number(amount);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Categories in the order their first package appears (plans arrive sorted by sort_order). */
export function getCategories(plans: PricingPlanRow[]) {
  return [...new Set(plans.map((plan) => plan.category))];
}

/** Comparison rows bucketed by group_name, keeping first-seen group order. */
export function groupComparisonRows(rows: PricingComparisonRow[]) {
  const groups = new Map<string, PricingComparisonRow[]>();
  for (const row of rows) {
    const bucket = groups.get(row.group_name) ?? [];
    bucket.push(row);
    groups.set(row.group_name, bucket);
  }
  return [...groups.entries()].map(([name, items]) => ({ name, items }));
}
