import Link from "next/link";
import { Images, Wrench, HelpCircle, Inbox, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { FadeIn } from "@/components/admin/FadeIn";
import { SupabaseErrorBanner } from "@/components/admin/SupabaseErrorBanner";
import { LeadsTrendChart, type LeadsTrendPoint } from "./LeadsTrendChart";

const TREND_DAYS = 14;

async function getCounts() {
  try {
    const supabase = getSupabaseAdmin();
    const [portfolio, services, faqs, leads] = await Promise.all([
      supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("faqs").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }),
    ]);
    return {
      portfolio: portfolio.count ?? 0,
      services: services.count ?? 0,
      faqs: faqs.count ?? 0,
      leads: leads.count ?? 0,
      error: portfolio.error || services.error || faqs.error || leads.error ? true : false,
    };
  } catch {
    return { portfolio: 0, services: 0, faqs: 0, leads: 0, error: true };
  }
}

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function getLeadsTrend(): Promise<LeadsTrendPoint[]> {
  const days: LeadsTrendPoint[] = [];
  const counts = new Map<string, number>();

  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - (TREND_DAYS - 1));
  start.setHours(0, 0, 0, 0);

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .select("created_at")
      .gte("created_at", start.toISOString());

    if (!error && data) {
      for (const row of data) {
        const key = dayKey(new Date(row.created_at));
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  } catch {
    // Supabase not configured — fall through and render an all-zero trend.
  }

  for (let i = 0; i < TREND_DAYS; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const key = dayKey(date);
    days.push({
      date: key,
      label: date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      count: counts.get(key) ?? 0,
    });
  }

  return days;
}

export default async function AdminDashboardPage() {
  const [counts, leadsTrend] = await Promise.all([getCounts(), getLeadsTrend()]);

  const cards = [
    {
      href: "/admin/leads",
      label: "Leads",
      value: counts.leads,
      icon: Inbox,
      gradient: "from-brand-teal-dark to-brand-navy",
    },
    {
      href: "/admin/portfolio",
      label: "Portfolio items",
      value: counts.portfolio,
      icon: Images,
      gradient: "from-brand-teal to-brand-teal-dark",
    },
    {
      href: "/admin/services",
      label: "Services",
      value: counts.services,
      icon: Wrench,
      gradient: "from-brand-navy to-brand-navy-light",
    },
    {
      href: "/admin/faqs",
      label: "FAQs",
      value: counts.faqs,
      icon: HelpCircle,
      gradient: "from-brand-gold-dark to-brand-gold",
    },
  ];

  const quickActions = [
    { href: "/admin/portfolio?new=1", label: "New project" },
    { href: "/admin/services?new=1", label: "New service" },
    { href: "/admin/faqs?new=1", label: "New FAQ" },
  ];

  return (
    <div>
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="gradient-text-animated">Dashboard</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the portfolio, services, and FAQs shown on the public site.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button key={action.href} variant="outline" size="sm" render={<Link href={action.href} />}>
                <Plus className="h-3.5 w-3.5" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </FadeIn>

      {counts.error && <SupabaseErrorBanner />}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <FadeIn key={card.href} delay={0.06 * (index + 1)}>
            <Link href={card.href} className="group block">
              <Card className="group relative overflow-hidden border-border/60 py-0 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${card.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <CardContent className="flex items-start justify-between p-5">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight">{card.value}</p>
                    <p className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      Manage
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${card.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.06 * (cards.length + 1)} className="mt-6">
        <LeadsTrendChart data={leadsTrend} />
      </FadeIn>
    </div>
  );
}
