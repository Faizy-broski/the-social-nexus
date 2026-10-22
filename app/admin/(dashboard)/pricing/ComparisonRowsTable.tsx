"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FadeIn } from "@/components/admin/FadeIn";
import type { ComparisonValue, PricingComparisonRow, PricingPlanRow } from "@/lib/types/content";

function CellSummary({ value }: { value: ComparisonValue | undefined }) {
  if (value === true) return <Check className="h-3.5 w-3.5 text-emerald-600" aria-label="Included" />;
  if (typeof value === "string" && value.trim()) return <span>{value}</span>;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground/60" aria-label="Not included" />;
}

export function ComparisonRowsTable({
  items,
  plans,
  onEdit,
}: {
  items: PricingComparisonRow[];
  plans: PricingPlanRow[];
  onEdit: (item: PricingComparisonRow) => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingDelete, setPendingDelete] = useState<PricingComparisonRow | null>(null);

  function handleDelete() {
    if (!pendingDelete) return;
    const item = pendingDelete;
    startTransition(async () => {
      const response = await fetch(`/api/admin/pricing/comparison/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Failed to delete row.");
      } else {
        toast.success(`"${item.label}" deleted.`);
        router.refresh();
      }
      setPendingDelete(null);
    });
  }

  if (items.length === 0) {
    return (
      <FadeIn className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
        {plans.length === 0
          ? "Add a package first, then build its comparison table here."
          : "No comparison rows yet. The table is hidden on the page until you add one."}
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-14">Order</TableHead>
              <TableHead>Feature</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Values</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const rowPlans = plans.filter((plan) => plan.category === item.category);
              return (
                <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                  <TableCell className="text-muted-foreground">{item.sort_order}</TableCell>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell className="text-muted-foreground">{item.group_name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      {rowPlans.map((plan) => (
                        <span key={plan.id} className="inline-flex items-center gap-1.5">
                          <span className="text-muted-foreground">{plan.name}:</span>
                          <CellSummary value={item.values[plan.id]} />
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => setPendingDelete(item)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FadeIn>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{pendingDelete?.label}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>This removes the row from the comparison table. This can&apos;t be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
