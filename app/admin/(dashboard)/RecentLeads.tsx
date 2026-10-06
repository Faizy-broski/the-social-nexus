import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LeadRow } from "@/lib/types/content";

export type RecentLead = Pick<LeadRow, "id" | "source" | "name" | "email" | "status" | "created_at">;

const SOURCE_LABELS: Record<LeadRow["source"], string> = {
  contact: "Contact form",
  contact_hero: "Quick enquiry",
  web_brief: "Web brief",
  logo_brief: "Logo brief",
};

export function RecentLeads({ items }: { items: RecentLead[] }) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
        <p className="text-sm font-medium text-muted-foreground">Recent leads</p>
        <Link
          href="/admin/leads"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            No submissions yet.
          </p>
        ) : (
          <ul className="divide-y">
            {items.map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {lead.name}
                    {lead.status === "new" && (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-brand-teal align-middle" aria-label="New" />
                    )}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{lead.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{SOURCE_LABELS[lead.source] ?? lead.source}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
