import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock,
  FileText,
  Minus,
  Sparkles,
} from "lucide-react";
import {
  CardSkeleton,
  Disclaimer,
  GlassCard,
  PageHeader,
  ProgressRing,
  SeverityBadge,
  Sparkline,
} from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PulseAI" },
      {
        name: "description",
        content:
          "Your health snapshot, recent insights, trends and reports in one calm overview.",
      },
      { property: "og:title", content: "Dashboard — PulseAI" },
      {
        property: "og:description",
        content: "Health snapshot, insights and trends from your stored records.",
      },
    ],
  }),
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { user, metrics, insights, reports, timeline } = usePulse();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const openInsights = insights.filter((i) => !i.reviewed);

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <CardSkeleton lines={5} />
        <CardSkeleton lines={5} />
        <CardSkeleton lines={5} />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${user.name.split(" ")[0]}`}
        subtitle="Here's what PulseAI found in your health history."
        actions={
          <Button asChild className="rounded-xl">
            <Link to="/app/chat">Start AI chat</Link>
          </Button>
        }
      />

      {/* Alerts first */}
      <div className="grid gap-3 md:grid-cols-2">
        <GlassCard className="flex items-start gap-3 border-warning/40 p-4" delay={40}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/20 text-warning-foreground">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Attention</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Several recent measurements differ from your usual personal range.
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-2 h-8 px-2 text-primary">
              <Link to="/app/analytics">Review</Link>
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="flex items-start gap-3 border-destructive/30 p-4" delay={80}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destructive/12 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Symptom pattern worth prompt review</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              A persistent cough has been recorded for three weeks.
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-2 h-8 px-2 text-primary">
              <Link to="/app/chat">Review safety guidance</Link>
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Snapshot + trends */}
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center p-6 text-center" delay={120}>
          <p className="text-sm font-semibold">Health Snapshot</p>
          <p className="text-xs text-muted-foreground">Based on available personal records</p>
          <div className="my-4">
            <ProgressRing value={72} caption="out of 100" label="Health snapshot" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Stable based on available records
          </span>
          <p className="mt-3 text-sm text-muted-foreground">
            Your recent records show stable measurements with one trend worth monitoring.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Updated today</p>
          <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
            <Link to="/app/analytics">View analysis</Link>
          </Button>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:content-start">
          {metrics.slice(0, 4).map((m, i) => {
            const vals = m.points.map((p) => p.value);
            const first = vals[0] ?? 0;
            const last = vals[vals.length - 1] ?? 0;
            const delta = last - first;
            const Icon = m.trend === "up" ? ArrowUpRight : m.trend === "down" ? ArrowDownRight : Minus;
            const tone = m.trend === "up" ? "warning" : m.trend === "down" ? "success" : "primary";
            return (
              <GlassCard key={m.id} className="p-4" delay={160 + i * 60} interactive>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-muted-foreground">{m.name}</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums">
                      {last}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">{m.unit}</span>
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                    <Icon className="h-3.5 w-3.5" />
                    {delta > 0 ? "+" : ""}
                    {Number(delta.toFixed(1))}
                  </span>
                </div>
                <Sparkline points={vals} tone={tone as "primary" | "success" | "warning"} />
                <p className="text-xs text-muted-foreground">{m.trendNote}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {vals.join(" → ")} {m.unit}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Health Insights</h2>
          <Link to="/app/insights" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {openInsights.slice(0, 3).map((insight, i) => (
            <GlassCard key={insight.id} className="flex flex-col p-4" delay={i * 60} interactive>
              <div className="flex items-center justify-between gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <SeverityBadge severity={insight.severity} />
              </div>
              <h3 className="mt-3 text-sm font-semibold">{insight.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{insight.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{insight.date}</p>
              <Button asChild variant="ghost" size="sm" className="mt-2 h-8 self-start px-2 text-primary">
                <Link to="/app/insights">
                  View details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Reports + timeline */}
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent Reports</h2>
            <Link to="/app/reports" className="text-sm text-primary hover:underline">
              All reports
            </Link>
          </div>
          <ul className="mt-3 space-y-2">
            {reports.slice(0, 3).map((r) => (
              <li key={r.id}>
                <Link
                  to="/app/reports/$reportId"
                  params={{ reportId: r.id }}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/70 px-3 py-2.5 transition-colors hover:border-primary/40"
                >
                  <FileText className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{r.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {r.date} · {r.lab}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Latest timeline activity</h2>
            <Link to="/app/timeline" className="text-sm text-primary hover:underline">
              Open timeline
            </Link>
          </div>
          <ol className="mt-3 space-y-3">
            {[...timeline].slice(-3).reverse().map((e) => (
              <li key={e.id} className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Clock className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{e.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {e.date} · {e.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>

      <Disclaimer />
    </>
  );
}
