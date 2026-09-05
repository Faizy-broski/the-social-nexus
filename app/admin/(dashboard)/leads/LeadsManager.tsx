"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FadeIn } from "@/components/admin/FadeIn";
import type { LeadRow } from "@/lib/types/content";
import { LeadsTable } from "./LeadsTable";
import { LeadDetails } from "./LeadDetails";

const SOURCE_LABELS: Record<LeadRow["source"], string> = {
  contact: "Contact form",
  contact_hero: "Quick enquiry",
  web_brief: "Web brief",
  logo_brief: "Logo brief",
};

const STATUS_LABELS: Record<LeadRow["status"], string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export function LeadsManager({ items }: { items: LeadRow[] }) {
  const router = useRouter();
  const [target, setTarget] = useState<LeadRow | null>(null);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("all");
  const [status, setStatus] = useState("all");

  function handleChanged() {
    router.refresh();
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (source !== "all" && item.source !== source) return false;
      if (status !== "all" && item.status !== status) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        (item.phone ?? "").toLowerCase().includes(query) ||
        (item.company ?? "").toLowerCase().includes(query)
      );
    });
  }, [items, search, source, status]);

  return (
    <div>
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} submission{items.length === 1 ? "" : "s"} from the site&apos;s forms
          </p>
        </div>
      </FadeIn>

      <FadeIn className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search by name, email, phone, or company..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-xs"
        />
        <Select value={source} onValueChange={(value) => setSource(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {Object.entries(SOURCE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(value) => setStatus(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FadeIn>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {items.length} shown
        </p>
      </div>

      <div className="mt-2">
        <LeadsTable
          items={filtered}
          onView={setTarget}
          onChanged={handleChanged}
          emptyMessage={
            items.length === 0
              ? undefined
              : "No leads match your filters."
          }
        />
      </div>

      <Dialog open={target !== null} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission details</DialogTitle>
            <DialogDescription>Full data submitted with this form.</DialogDescription>
          </DialogHeader>
          {target && <LeadDetails lead={target} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
