"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type LeadsTrendPoint = { date: string; label: string; count: number };

export function LeadsTrendChart({ data }: { data: LeadsTrendPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  const total = data.reduce((sum, point) => sum + point.count, 0);
  const max = Math.max(1, ...data.map((point) => point.count));
  const active = hovered !== null ? data[hovered] : null;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Leads, last 14 days</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">
            {active ? active.count : total}
            <span className="ml-1.5 text-xs font-normal text-muted-foreground">
              {active ? active.label : "total submissions"}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowTable((value) => !value)}
          className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          {showTable ? "View chart" : "View as table"}
        </button>
      </CardHeader>
      <CardContent>
        {showTable ? (
          <div className="max-h-40 overflow-y-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-1.5 text-left font-medium">Date</th>
                  <th className="px-3 py-1.5 text-right font-medium">Leads</th>
                </tr>
              </thead>
              <tbody>
                {data.map((point) => (
                  <tr key={point.date} className="border-t">
                    <td className="px-3 py-1.5">{point.label}</td>
                    <td className="px-3 py-1.5 text-right tabular-nums">{point.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="flex h-36 items-end gap-0.75"
            role="img"
            aria-label={`Leads received per day over the last 14 days, totalling ${total}`}
          >
            {data.map((point, index) => {
              const heightPct = Math.max(3, (point.count / max) * 100);
              const isHovered = hovered === index;
              return (
                <button
                  key={point.date}
                  type="button"
                  className="group flex h-full flex-1 flex-col items-center justify-end outline-none"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${point.label}: ${point.count} lead${point.count === 1 ? "" : "s"}`}
                >
                  <span
                    style={{ height: `${heightPct}%` }}
                    className={`w-full min-w-0.75 rounded-t-lg transition-colors duration-150 ${
                      isHovered ? "bg-brand-teal" : "bg-brand-teal/60 group-hover:bg-brand-teal/80"
                    }`}
                  />
                  <span className="mt-1.5 h-px w-full bg-border" />
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
