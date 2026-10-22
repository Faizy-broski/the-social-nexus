"use client";

import { useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlanCard } from "@/components/pricing/PlanCard";
import {
  PRICING_CURRENCIES,
  pricingPlanSchema,
  type PricingPlanInput,
  type PricingPlanValues,
} from "@/lib/validations/pricing";
import type { PricingPlanRow } from "@/lib/types/content";

function toLines(values: string[]) {
  return values.join("\n");
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

/** Empty input → null so a cleared price field means "Custom quote". */
function toPriceValue(e: React.ChangeEvent<HTMLInputElement>) {
  return e.target.value === "" || Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
}

export function PlanForm({
  plan,
  mode,
  categories,
  nextSortOrder,
  onSuccess,
  onCancel,
}: {
  plan?: PricingPlanRow;
  mode: "new" | "edit" | "duplicate";
  categories: string[];
  nextSortOrder: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const categoryListId = useId();
  const [formError, setFormError] = useState<string | null>(null);
  const isDuplicate = mode === "duplicate";

  const form = useForm<PricingPlanInput, unknown, PricingPlanValues>({
    resolver: zodResolver(pricingPlanSchema),
    defaultValues: {
      category: plan?.category ?? categories[0] ?? "Websites",
      name: plan ? (isDuplicate ? `${plan.name} (copy)` : plan.name) : "",
      tagline: plan?.tagline ?? "",
      badge: plan?.badge ?? "",
      highlighted: isDuplicate ? false : (plan?.highlighted ?? false),
      currency: (plan?.currency as PricingPlanInput["currency"]) ?? "GBP",
      price: plan?.price != null ? Number(plan.price) : null,
      originalPrice: plan?.original_price != null ? Number(plan.original_price) : null,
      pricePeriod: plan?.price_period ?? "",
      priceNote: plan?.price_note ?? "",
      features: plan?.features ?? [],
      ctaLabel: plan?.cta_label ?? "Get started",
      ctaHref: plan?.cta_href ?? "/contact-us",
      sortOrder: mode === "edit" && plan ? plan.sort_order : nextSortOrder,
      published: isDuplicate ? false : (plan?.published ?? true),
    },
  });

  const watched = useWatch({ control: form.control });

  async function onSubmit(values: PricingPlanValues) {
    setFormError(null);
    const isEdit = mode === "edit" && plan;
    const endpoint = isEdit ? `/api/admin/pricing/plans/${plan.id}` : "/api/admin/pricing/plans";

    try {
      const response = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error ?? "Something went wrong.");
        return;
      }

      toast.success(isEdit ? "Package updated." : "Package created.");
      onSuccess?.();
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold">Basics</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package name</FormLabel>
                    <FormControl>
                      <Input placeholder="Business" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Websites" list={categoryListId} {...field} />
                    </FormControl>
                    <datalist id={categoryListId}>
                      {categories.map((category) => (
                        <option key={category} value={category} />
                      ))}
                    </datalist>
                    <FormDescription>Becomes a tab on the page when there&apos;s more than one.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="For growing businesses" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="badge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Badge</FormLabel>
                    <FormControl>
                      <Input placeholder="Most popular" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>Optional label above the card.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="highlighted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highlight this package</FormLabel>
                    <div className="flex h-8 items-center">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </div>
                    <FormDescription>Teal border, raised card and a solid button.</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold">Price</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRICING_CURRENCIES.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="Custom quote"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(toPriceValue(e))}
                      />
                    </FormControl>
                    <FormDescription>Leave blank for &ldquo;Custom quote&rdquo;.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Was price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="Optional"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(toPriceValue(e))}
                      />
                    </FormControl>
                    <FormDescription>Shown struck through.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="pricePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing period</FormLabel>
                    <FormControl>
                      <Input placeholder="/month, one-off, /project" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price note</FormLabel>
                    <FormControl>
                      <Input placeholder="For the first 3 months, then £99/month" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder={"Up to 15 pages\nCustom design\nGoogle Analytics setup"}
                    defaultValue={toLines(field.value)}
                    onChange={(e) => field.onChange(fromLines(e.target.value))}
                  />
                </FormControl>
                <FormDescription>One feature per line, shown as a checklist on the card.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="space-y-4">
            <h2 className="text-sm font-semibold">Button</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="ctaLabel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Get started" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaHref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="/contact-us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription>Lower numbers appear first (left to right).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published</FormLabel>
                  <div className="flex h-8 items-center">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </div>
                  <FormDescription>Drafts are hidden from /pricing.</FormDescription>
                </FormItem>
              )}
            />
          </div>

          {formError && <p className="text-sm text-destructive">{formError}</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "edit" ? "Save changes" : "Create package"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>

      {/* Live preview — the exact card component /pricing renders */}
      <aside className="order-first lg:order-last">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Live preview</p>
        <div className="rounded-xl bg-brand-navy p-5 pt-7 lg:sticky lg:top-0">
          <PlanCard
            className="pointer-events-none lg:translate-y-0"
            plan={{
              name: watched.name ?? "",
              tagline: watched.tagline ?? "",
              badge: watched.badge || null,
              highlighted: watched.highlighted ?? false,
              currency: watched.currency ?? "GBP",
              price: watched.price ?? null,
              original_price: watched.originalPrice ?? null,
              price_period: watched.pricePeriod || null,
              price_note: watched.priceNote || null,
              features: (watched.features ?? []).filter((f): f is string => Boolean(f)),
              cta_label: watched.ctaLabel ?? "",
              cta_href: watched.ctaHref ?? "",
            }}
          />
        </div>
      </aside>
    </div>
  );
}
