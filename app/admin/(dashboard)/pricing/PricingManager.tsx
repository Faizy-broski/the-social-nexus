"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from "@/components/admin/FadeIn";
import { getCategories } from "@/lib/pricing";
import type { PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";
import { PlanForm } from "./PlanForm";
import { PlansTable } from "./PlansTable";
import { ComparisonRowForm } from "./ComparisonRowForm";
import { ComparisonRowsTable } from "./ComparisonRowsTable";

type PlanTarget = { mode: "new" } | { mode: "edit" | "duplicate"; plan: PricingPlanRow } | null;
type RowTarget = "new" | PricingComparisonRow | null;

const PLAN_DIALOG_COPY = {
  new: { title: "New package", description: "Add a package card to the pricing page." },
  edit: { title: "Edit package", description: "Changes go live on /pricing as soon as you save." },
  duplicate: { title: "Duplicate package", description: "Saved as a draft copy — publish it when it's ready." },
};

export function PricingManager({ plans, rows }: { plans: PricingPlanRow[]; rows: PricingComparisonRow[] }) {
  const router = useRouter();
  const [tab, setTab] = useState("plans");
  const [planTarget, setPlanTarget] = useState<PlanTarget>(null);
  const [rowTarget, setRowTarget] = useState<RowTarget>(null);

  const categories = getCategories(plans);
  const groupNames = [...new Set(rows.map((row) => row.group_name))];
  const publishedCount = plans.filter((plan) => plan.published).length;

  function handleSuccess() {
    setPlanTarget(null);
    setRowTarget(null);
    router.refresh();
  }

  const planCopy = planTarget ? PLAN_DIALOG_COPY[planTarget.mode] : PLAN_DIALOG_COPY.new;

  return (
    <div>
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pricing</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {plans.length} package{plans.length === 1 ? "" : "s"} · {publishedCount} published · {rows.length}{" "}
              comparison row{rows.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" render={<a href="/pricing" target="_blank" rel="noreferrer" />}>
              <ExternalLink />
              View page
            </Button>
            {tab === "plans" ? (
              <Button className="brand-cta" onClick={() => setPlanTarget({ mode: "new" })}>
                <Plus />
                New package
              </Button>
            ) : (
              <Button className="brand-cta" onClick={() => setRowTarget("new")} disabled={plans.length === 0}>
                <Plus />
                New row
              </Button>
            )}
          </div>
        </div>
      </FadeIn>

      <Tabs value={tab} onValueChange={(value) => setTab(String(value))} className="mt-6">
        <TabsList>
          <TabsTrigger value="plans">Packages</TabsTrigger>
          <TabsTrigger value="comparison">Comparison table</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="mt-4">
          <PlansTable
            items={plans}
            onEdit={(plan) => setPlanTarget({ mode: "edit", plan })}
            onDuplicate={(plan) => setPlanTarget({ mode: "duplicate", plan })}
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <p className="mb-4 text-sm text-muted-foreground">
            The table under the package cards. Each row belongs to a category and has a value per package in that
            category: included, not included, or custom text.
          </p>
          <ComparisonRowsTable items={rows} plans={plans} onEdit={setRowTarget} />
        </TabsContent>
      </Tabs>

      <Dialog open={planTarget !== null} onOpenChange={(open) => !open && setPlanTarget(null)}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>{planCopy.title}</DialogTitle>
            <DialogDescription>{planCopy.description}</DialogDescription>
          </DialogHeader>
          {planTarget && (
            <PlanForm
              key={planTarget.mode === "new" ? "new" : `${planTarget.mode}-${planTarget.plan.id}`}
              plan={planTarget.mode === "new" ? undefined : planTarget.plan}
              mode={planTarget.mode}
              categories={categories}
              nextSortOrder={plans.length}
              onSuccess={handleSuccess}
              onCancel={() => setPlanTarget(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={rowTarget !== null} onOpenChange={(open) => !open && setRowTarget(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{rowTarget === "new" ? "New comparison row" : "Edit comparison row"}</DialogTitle>
            <DialogDescription>Set what each package gets for this feature.</DialogDescription>
          </DialogHeader>
          {rowTarget && (
            <ComparisonRowForm
              key={rowTarget === "new" ? "new" : rowTarget.id}
              row={rowTarget === "new" ? undefined : rowTarget}
              plans={plans}
              categories={categories}
              groupNames={groupNames}
              nextSortOrder={rows.length}
              onSuccess={handleSuccess}
              onCancel={() => setRowTarget(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
