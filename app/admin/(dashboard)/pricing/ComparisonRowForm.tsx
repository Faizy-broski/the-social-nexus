"use client";

import { useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  pricingComparisonRowSchema,
  type PricingComparisonRowValues,
} from "@/lib/validations/pricing";
import type { ComparisonValue, PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";

type CellMode = "yes" | "no" | "text";

const CELL_MODES = [
  { value: "yes", label: "Included ✓" },
  { value: "no", label: "Not included —" },
  { value: "text", label: "Custom text" },
];

function modeOf(value: ComparisonValue | undefined): CellMode {
  if (value === true) return "yes";
  if (typeof value === "string") return "text";
  return "no";
}

function CellEditor({ value, onChange }: { value: ComparisonValue | undefined; onChange: (v: ComparisonValue) => void }) {
  const mode = modeOf(value);

  return (
    <div className="flex flex-1 gap-2">
      <Select
        items={CELL_MODES}
        value={mode}
        onValueChange={(next) => onChange(next === "yes" ? true : next === "text" ? "" : false)}
      >
        <SelectTrigger className="w-40 shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CELL_MODES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {mode === "text" && (
        <Input
          autoFocus
          placeholder="e.g. Up to 10"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export function ComparisonRowForm({
  row,
  plans,
  categories,
  groupNames,
  nextSortOrder,
  onSuccess,
  onCancel,
}: {
  row?: PricingComparisonRow;
  plans: PricingPlanRow[];
  categories: string[];
  groupNames: string[];
  nextSortOrder: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const groupListId = useId();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<PricingComparisonRowValues>({
    resolver: zodResolver(pricingComparisonRowSchema),
    defaultValues: {
      category: row?.category ?? categories[0] ?? "",
      groupName: row?.group_name ?? groupNames[0] ?? "",
      label: row?.label ?? "",
      values: row?.values ?? {},
      sortOrder: row?.sort_order ?? nextSortOrder,
    },
  });

  const category = useWatch({ control: form.control, name: "category" });
  const values = useWatch({ control: form.control, name: "values" });
  const categoryPlans = plans.filter((plan) => plan.category === category);
  const categoryItems = categories.map((c) => ({ value: c, label: c }));

  async function onSubmit(submitted: PricingComparisonRowValues) {
    setFormError(null);

    // Only keep cells for packages in this row's category; a missing cell
    // renders as "not included", so default unset ones to false explicitly.
    const cleaned: Record<string, ComparisonValue> = {};
    for (const plan of categoryPlans) {
      const cell = submitted.values[plan.id];
      cleaned[plan.id] = typeof cell === "string" ? cell.trim() : (cell ?? false);
    }

    const endpoint = row ? `/api/admin/pricing/comparison/${row.id}` : "/api/admin/pricing/comparison";
    try {
      const response = await fetch(endpoint, {
        method: row ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submitted, values: cleaned }),
      });
      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error ?? "Something went wrong.");
        return;
      }

      toast.success(row ? "Row updated." : "Row created.");
      onSuccess?.();
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select items={categoryItems} value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Matches a package category.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group</FormLabel>
                <FormControl>
                  <Input placeholder="Design & build" list={groupListId} {...field} />
                </FormControl>
                <datalist id={groupListId}>
                  {groupNames.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
                <FormDescription>Rows with the same group sit under one heading.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feature</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile-responsive design" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold">Value per package</h2>
          <div className="mt-3 space-y-3">
            {categoryPlans.map((plan) => (
              <div key={plan.id} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center">
                <div className="flex w-40 shrink-0 items-center gap-2 text-sm font-medium">
                  {plan.name}
                  {!plan.published && (
                    <Badge variant="outline" className="font-normal">
                      Draft
                    </Badge>
                  )}
                </div>
                <CellEditor
                  value={values?.[plan.id]}
                  onChange={(next) =>
                    form.setValue("values", { ...form.getValues("values"), [plan.id]: next }, { shouldDirty: true })
                  }
                />
              </div>
            ))}
            {categoryPlans.length === 0 && (
              <p className="text-sm text-muted-foreground">No packages in this category yet.</p>
            )}
          </div>
        </div>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {row ? "Save changes" : "Create row"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
