"use client";

import { useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
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
import { serviceSchema, type ServiceValues } from "@/lib/validations/service";
import type { ServiceRow } from "@/lib/types/content";
import { ADMIN_ICON_NAMES, ADMIN_ICONS } from "@/lib/admin-icons";

function toLines(values: string[]) {
  return values.join("\n");
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function ServiceForm({
  service,
  onSuccess,
  onCancel,
}: {
  service?: ServiceRow;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ServiceValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      slug: service?.slug ?? "",
      number: service?.number ?? "",
      title: service?.title ?? [""],
      heroDescription: service?.hero_description ?? "",
      imagePath: service?.image_path ?? "",
      overviewFocus: service?.overview_focus ?? "",
      overviewTeam: service?.overview_team ?? "",
      overviewParagraph: service?.overview_paragraph ?? undefined,
      sortOrder: service?.sort_order ?? 0,
      published: service?.published ?? true,
      features:
        service?.service_features
          ?.slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((f) => ({ id: f.id, icon: f.icon, title: f.title, description: f.description, sortOrder: f.sort_order })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "features" });
  const imagePath = form.watch("imagePath");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "services");
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

  async function onSubmit(values: ServiceValues) {
    setFormError(null);
    const endpoint = service ? `/api/admin/services/${service.id}` : "/api/admin/services";
    const method = service ? "PATCH" : "POST";

    try {
      const payload = { ...values, overviewParagraph: values.overviewParagraph?.trim() || undefined };
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

      toast.success(service ? "Service updated." : "Service created.");
      onSuccess?.();
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display number</FormLabel>
                <FormControl>
                  <Input placeholder="01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="software-development" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={"Software\nDevelopment"}
                  rows={2}
                  defaultValue={toLines(field.value)}
                  onChange={(e) => field.onChange(fromLines(e.target.value))}
                />
              </FormControl>
              <FormDescription>One line per line break in the hero title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero description</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagePath"
          render={() => (
            <FormItem>
              <FormLabel>Hero image</FormLabel>
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
            name="overviewFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overview focus phrase</FormLabel>
                <FormControl>
                  <Input placeholder="software development" {...field} />
                </FormControl>
                <FormDescription>Plugged into the generic overview heading/paragraph.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overviewTeam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overview team phrase</FormLabel>
                <FormControl>
                  <Input placeholder="engineers, architects, and QA specialists" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="overviewParagraph"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overview paragraph override</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} value={field.value ?? ""} />
              </FormControl>
              <FormDescription>Optional — overrides the generic overview paragraph when set.</FormDescription>
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

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Features</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ icon: ADMIN_ICON_NAMES[0], title: "", description: "", sortOrder: fields.length })}
            >
              <Plus className="h-4 w-4" />
              Add feature
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {fields.map((fieldItem, index) => {
              const IconPreview = ADMIN_ICONS[form.watch(`features.${index}.icon`)];
              return (
                <div key={fieldItem.id} className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <FormField
                      control={form.control}
                      name={`features.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Icon</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="w-14 justify-center">
                                {IconPreview ? <IconPreview className="h-4 w-4" /> : <SelectValue />}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-72">
                              {ADMIN_ICON_NAMES.map((name) => (
                                <SelectItem key={name} value={name}>
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="flex-1 space-y-3">
                      <FormField
                        control={form.control}
                        name={`features.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Feature title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`features.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea placeholder="Feature description" rows={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">No features yet — add at least one.</p>
            )}
          </div>
        </div>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting || isUploading}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {service ? "Save changes" : "Create service"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
