"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { GalleryImageRow } from "@/lib/types/content";
import { TablePagination } from "@/components/admin/TablePagination";

const PAGE_SIZE = 8;

/** Simple upload + grid manager for image-only galleries (logo/social media
 *  designs) — no separate new/[id] pages since the only fields are the
 *  image, sort order, and published state. */
export function GalleryManager({
  items,
  apiPath,
  uploadFolder,
}: {
  items: GalleryImageRow[];
  apiPath: string;
  uploadFolder: string;
}) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(
    () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [items, page],
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", uploadFolder);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body });
      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadResult.error ?? "Upload failed.");

      const createRes = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath: uploadResult.url,
          sortOrder: items.length,
          published: true,
        }),
      });
      const createResult = await createRes.json();
      if (!createRes.ok) throw new Error(createResult.error ?? "Failed to save image.");

      toast.success("Image added.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  function updateItem(id: string, patch: { sortOrder?: number; published?: boolean }) {
    startTransition(async () => {
      const response = await fetch(`${apiPath}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!response.ok) {
        toast.error("Failed to update image.");
        return;
      }
      router.refresh();
    });
  }

  function deleteItem(id: string) {
    startTransition(async () => {
      const response = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Failed to delete image.");
        return;
      }
      toast.success("Image deleted.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-dashed px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {isUploading ? "Uploading..." : "Upload image"}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
      </label>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          No images yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((item) => (
            <div key={item.id} className="space-y-2 rounded-lg border p-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
                <Image src={item.image_path} alt="" fill sizes="200px" className="object-cover" />
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  defaultValue={item.sort_order}
                  className="h-8 text-xs"
                  onBlur={(e) => {
                    const value = Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
                    if (value !== item.sort_order) updateItem(item.id, { sortOrder: value });
                  }}
                  disabled={isPending}
                />
                <Switch
                  checked={item.published}
                  onCheckedChange={(checked) => updateItem(item.id, { published: checked })}
                  disabled={isPending}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => deleteItem(item.id)}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
