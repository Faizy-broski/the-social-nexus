"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import type { LeadRow } from "@/lib/types/content";
import { FadeIn } from "@/components/admin/FadeIn";
import { TablePagination } from "@/components/admin/TablePagination";

const PAGE_SIZE = 10;

const SOURCE_LABELS: Record<LeadRow["source"], string> = {
  contact: "Contact form",
  contact_hero: "Quick enquiry",
  web_brief: "Web brief",
  logo_brief: "Logo brief",
};

const STATUS_OPTIONS: LeadRow["status"][] = ["new", "contacted", "closed"];

export function LeadsTable({
  items,
  onView,
  onChanged,
  emptyMessage = "No leads yet — submissions from the site's forms will show up here.",
}: {
  items: LeadRow[];
  onView: (item: LeadRow) => void;
  onChanged: () => void;
  emptyMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [pendingDelete, setPendingDelete] = useState<LeadRow | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(
    () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [items, page],
  );

  function handleStatusChange(item: LeadRow, status: LeadRow["status"]) {
    startTransition(async () => {
      const response = await fetch(`/api/admin/leads/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        toast.error("Failed to update status.");
      } else {
        onChanged();
      }
    });
  }

  function handleDelete() {
    if (!pendingDelete) return;
    const item = pendingDelete;
    startTransition(async () => {
      const response = await fetch(`/api/admin/leads/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Failed to delete submission.");
      } else {
        toast.success("Submission deleted.");
        onChanged();
      }
      setPendingDelete(null);
    });
  }

  if (items.length === 0) {
    return (
      <FadeIn className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((item) => (
              <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <div>{item.email}</div>
                  {item.phone && <div>{item.phone}</div>}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{SOURCE_LABELS[item.source] ?? item.source}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    value={item.status}
                    onValueChange={(value) => handleStatusChange(item, value as LeadRow["status"])}
                  >
                    <SelectTrigger className="h-8 w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status[0].toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(item)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
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

      <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{pendingDelete?.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the submission. This can&apos;t be undone.
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
