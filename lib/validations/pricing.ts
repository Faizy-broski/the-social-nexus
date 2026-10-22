import { z } from "zod";

export const PRICING_CURRENCIES = ["GBP", "USD", "EUR", "PKR"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, "Too long.")
    .optional()
    .transform((value) => (value ? value : undefined));

const optionalPrice = z
  .number()
  .nonnegative("Price can't be negative.")
  .max(10_000_000, "Price is too large.")
  .nullable();

export const pricingPlanSchema = z
  .object({
    category: z.string().trim().min(1, "Enter a category.").max(60, "Category is too long."),
    name: z.string().trim().min(1, "Enter a package name.").max(80, "Name is too long."),
    tagline: z.string().trim().max(160, "Tagline is too long."),
    badge: optionalText(40),
    highlighted: z.boolean(),
    currency: z.enum(PRICING_CURRENCIES),
    price: optionalPrice,
    originalPrice: optionalPrice,
    pricePeriod: optionalText(40),
    priceNote: optionalText(160),
    features: z.array(z.string().trim().min(1).max(200)).max(40, "Too many features."),
    ctaLabel: z.string().trim().min(1, "Enter a button label.").max(40, "Label is too long."),
    ctaHref: z
      .string()
      .trim()
      .min(1, "Enter a button link.")
      .refine((v) => /^(\/|https?:\/\/|mailto:|tel:)/.test(v), "Use a path like /contact-us or a full URL."),
    sortOrder: z.number().int(),
    published: z.boolean(),
  })
  .refine((v) => v.originalPrice == null || (v.price != null && v.originalPrice > v.price), {
    message: "The 'was' price must be higher than the price.",
    path: ["originalPrice"],
  });

export type PricingPlanInput = z.input<typeof pricingPlanSchema>;
export type PricingPlanValues = z.output<typeof pricingPlanSchema>;

export const comparisonValueSchema = z.union([z.boolean(), z.string().trim().max(80, "Cell text is too long.")]);

export const pricingComparisonRowSchema = z.object({
  category: z.string().trim().min(1, "Enter a category.").max(60, "Category is too long."),
  groupName: z.string().trim().min(1, "Enter a group name.").max(80, "Group name is too long."),
  label: z.string().trim().min(1, "Enter a feature label.").max(120, "Label is too long."),
  values: z.record(z.string(), comparisonValueSchema),
  sortOrder: z.number().int(),
});

export type PricingComparisonRowValues = z.infer<typeof pricingComparisonRowSchema>;

/** Maps validated form values to pricing_plans column names. */
export function toPricingPlanRecord(values: PricingPlanValues) {
  return {
    category: values.category,
    name: values.name,
    tagline: values.tagline,
    badge: values.badge ?? null,
    highlighted: values.highlighted,
    currency: values.currency,
    price: values.price,
    original_price: values.originalPrice,
    price_period: values.pricePeriod ?? null,
    price_note: values.priceNote ?? null,
    features: values.features,
    cta_label: values.ctaLabel,
    cta_href: values.ctaHref,
    sort_order: values.sortOrder,
    published: values.published,
  };
}

/** Maps validated form values to pricing_comparison_rows column names. */
export function toComparisonRowRecord(values: PricingComparisonRowValues) {
  return {
    category: values.category,
    group_name: values.groupName,
    label: values.label,
    values: values.values,
    sort_order: values.sortOrder,
  };
}
