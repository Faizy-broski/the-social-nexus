"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { portfolioItemSchema, type PortfolioItemValues } from "@/lib/validations/portfolio";
import type { PortfolioRow } from "@/lib/types/content";

function toCsv(values: string[]) {
  return values.join(", ");
}

function fromCsv(value: string) {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function PortfolioForm({
  item,
  onSuccess,
  onCancel,
}: {
  item?: PortfolioRow;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<PortfolioItemValues>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      slug: item?.slug ?? "",
      title: item?.title ?? "",
      categories: item?.categories ?? [],
      stack: item?.stack ?? [],
      previewHref: item?.preview_href ?? undefined,
      imagePath: item?.image_path ?? "",
      sortOrder: item?.sort_order ?? 0,
      published: item?.published ?? true,
    },
  });

  const imagePath = form.watch("imagePath");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "portfolio");
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Upload failed.");
      form.setValue("imagePath", result.url, { shouldValidate: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  async function onSubmit(values: PortfolioItemValues) {
    setFormError(null);
    const endpoint = item ? `/api/admin/portfolio/${item.id}` : "/api/admin/portfolio";
    const method = item ? "PATCH" : "POST";

    try {
      const payload = { ...values, previewHref: values.previewHref?.trim() || undefined };
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error ?? "Something went wrong.");
        return;
      }

      toast.success(item ? "Project updated." : "Project created.");
      onSuccess?.();
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Matlock Motors" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="matlock-motors" {...field} />
                </FormControl>
                <FormDescription>Lowercase, hyphenated — used in the project URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Input
                  placeholder="E-commerce, WordPress"
                  defaultValue={toCsv(field.value)}
                  onChange={(e) => field.onChange(fromCsv(e.target.value))}
                />
              </FormControl>
              <FormDescription>Comma-separated.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech stack</FormLabel>
              <FormControl>
                <Input
                  placeholder="Elementor, WooCommerce, WordPress"
                  defaultValue={toCsv(field.value)}
                  onChange={(e) => field.onChange(fromCsv(e.target.value))}
                />
              </FormControl>
              <FormDescription>Comma-separated, optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previewHref"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live preview URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormDescription>Optional — leave blank if there&apos;s no live site to link to.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagePath"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div className="flex items-center gap-4">
                {imagePath && (
                  <div className="relative h-16 w-24 overflow-hidden rounded-md border bg-muted">
                    <Image src={imagePath} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                )}
                <FormControl>
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {isUploading ? "Uploading..." : "Upload image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
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
                <FormDescription>Lower numbers appear first.</FormDescription>
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
              </FormItem>
            )}
          />
        </div>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting || isUploading}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {item ? "Save changes" : "Create project"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
