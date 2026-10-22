"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, Eye, EyeOff, MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
import { formatPrice } from "@/lib/pricing";
import type { PricingPlanRow } from "@/lib/types/content";

export function PlansTable({
  items,
  onEdit,
  onDuplicate,
}: {
  items: PricingPlanRow[];
  onEdit: (item: PricingPlanRow) => void;
  onDuplicate: (item: PricingPlanRow) => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingDelete, setPendingDelete] = useState<PricingPlanRow | null>(null);

  function handleDelete() {
    if (!pendingDelete) return;
    const item = pendingDelete;
    startTransition(async () => {
      const response = await fetch(`/api/admin/pricing/plans/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Failed to delete package.");
      } else {
        toast.success(`"${item.name}" deleted.`);
        router.refresh();
      }
      setPendingDelete(null);
    });
  }

  function handleTogglePublished(item: PricingPlanRow) {
    const published = !item.published;
    startTransition(async () => {
      const response = await fetch(`/api/admin/pricing/plans/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
      if (!response.ok) {
        toast.error(published ? "Failed to publish package." : "Failed to move package to draft.");
      } else {
        toast.success(published ? `"${item.name}" is now live on /pricing.` : `"${item.name}" moved to draft.`);
        router.refresh();
      }
    });
  }

  if (items.length === 0) {
    return (
      <FadeIn className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
        No packages yet. Add one to start building the pricing page.
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
              <TableHead>Package</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                <TableCell className="text-muted-foreground">{item.sort_order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 font-medium">
                    {item.highlighted && (
                      <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" aria-label="Highlighted" />
                    )}
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="font-normal">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.tagline && <p className="mt-0.5 text-xs text-muted-foreground">{item.tagline}</p>}
                </TableCell>
                <TableCell className="text-muted-foreground">{item.category}</TableCell>
                <TableCell>
                  {item.price == null ? (
                    <span className="text-muted-foreground">Custom quote</span>
                  ) : (
                    <span>
                      {formatPrice(item.price, item.currency)}
                      {item.price_period && <span className="text-muted-foreground"> {item.price_period}</span>}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{item.features.length}</TableCell>
                <TableCell>
                  <Badge variant={item.published ? "default" : "outline"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
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
                      <DropdownMenuItem onClick={() => handleTogglePublished(item)} disabled={isPending}>
                        {item.published ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                        {item.published ? "Move to draft" : "Publish"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(item)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => setPendingDelete(item)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FadeIn>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{pendingDelete?.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the package from the pricing page and its column from the comparison table. This
              can&apos;t be undone — switch it to Draft instead if you might bring it back.
            </AlertDialogDescription>
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
