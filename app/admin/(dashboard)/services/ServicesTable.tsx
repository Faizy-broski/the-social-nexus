"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import type { ServiceRow } from "@/lib/types/content";
import { FadeIn } from "@/components/admin/FadeIn";
import { TablePagination } from "@/components/admin/TablePagination";

const PAGE_SIZE = 8;

export function ServicesTable({
  items,
  onEdit,
}: {
  items: ServiceRow[];
  onEdit: (item: ServiceRow) => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingDelete, setPendingDelete] = useState<ServiceRow | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(
    () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [items, page],
  );

  function handleDelete() {
    if (!pendingDelete) return;
    const item = pendingDelete;
    startTransition(async () => {
      const response = await fetch(`/api/admin/services/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Failed to delete service.");
      } else {
        toast.success(`"${item.title.join(" ")}" deleted.`);
        router.refresh();
      }
      setPendingDelete(null);
    });
  }

  if (items.length === 0) {
    return (
      <FadeIn className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
        No services yet.
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((item) => (
              <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                <TableCell>
                  <div className="relative h-10 w-14 overflow-hidden rounded-md bg-muted">
                    {item.image_path && (
                      <Image src={item.image_path} alt="" fill sizes="56px" className="object-cover" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.title.join(" ")}</TableCell>
                <TableCell className="text-muted-foreground">{item.service_features?.length ?? 0}</TableCell>
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
            <AlertDialogTitle>Delete &quot;{pendingDelete?.title.join(" ")}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the service and its features. This can&apos;t be undone.
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
