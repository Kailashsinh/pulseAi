import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ChartLine,
  FileText,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Disclaimer,
  GlassCard,
  PageHeader,
  SeverityBadge,
  useCountUp,
} from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePulse } from "@/lib/pulse/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Health Analytics — PulseAI" },
      {
        name: "description",
        content:
          "Trends, personal baselines, unusual measurements and patterns across your health records.",
      },
      { property: "og:title", content: "Health Analytics — PulseAI" },
      {
        property: "og:description",
        content: "Interactive trend analysis built from your stored health data.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const ranges = ["7 days", "30 days", "3 months", "6 months", "1 year"] as const;

function AnalyticsPage() {
  const { metrics, anomalies, patterns, correlationData, reports, insights } = usePulse();
  const [metricId, setMetricId] = useState("glucose");
  const [range, setRange] = useState<(typeof ranges)[number]>("1 year");
  const [xVar, setXVar] = useState<"weight" | "sleep" | "hr">("weight");

  const metric = metrics.find((m) => m.id === metricId) ?? metrics[0]!;
  const data = metric.points.map((p) => ({ label: p.label, value: p.value }));

  const stats = [
    { label: "Tracked measurements", value: metrics.length * 4, icon: Activity },
    { label: "Reports", value: reports.length, icon: FileText },
    { label: "Detected trends", value: patterns.length, icon: TrendingUp },
    { label: "Unusual measurements", value: anomalies.length, icon: AlertTriangle },
    { label: "Insights", value: insights.length, icon: Sparkles },
  ];

  return (
    <>
      <PageHeader
        icon={<ChartLine className="h-5 w-5" />}
        title="Health Analytics"
        subtitle="How your measurements move, and what sits outside your usual range."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map((s, i) => (
          <StatTile key={s.label} {...s} delay={i * 60} />
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-xl bg-muted/70 p-1">
          <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg">Trends</TabsTrigger>
          <TabsTrigger value="baseline" className="rounded-lg">Baseline</TabsTrigger>
          <TabsTrigger value="anomalies" className="rounded-lg">Unusual</TabsTrigger>
          <TabsTrigger value="correlations" className="rounded-lg">Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {metrics.slice(0, 4).map((m, i) => (
              <GlassCard key={m.id} className="p-5" delay={i * 60}>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">{m.name}</h2>
                  <span className="text-xs text-muted-foreground">{m.unit}</span>
                </div>
                <div className="mt-3 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={m.points.map((p) => ({ label: p.label, value: p.value }))}>
                      <defs>
                        <linearGradient id={`g-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
                      <XAxis dataKey="label" fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" domain={["dataMin - 4", "dataMax + 4"]} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fill={`url(#g-${m.id})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{m.trendNote}</p>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-4 space-y-4">
          <GlassCard className="p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
              <h2 className="truncate text-sm font-semibold">Trend analysis</h2>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Select value={metricId} onValueChange={setMetricId}>
                  <SelectTrigger className="w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    range === r
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
                  <XAxis dataKey="label" fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" domain={["dataMin - 6", "dataMax + 6"]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <ReferenceArea y1={metric.baselineLow} y2={metric.baselineHigh} fill="var(--mint)" fillOpacity={0.15} />
                  <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Shaded band shows your personal typical range ({metric.baselineLow}–{metric.baselineHigh} {metric.unit}).
            </p>
          </GlassCard>

          <div className="grid gap-3 md:grid-cols-3">
            {patterns.map((p, i) => (
              <GlassCard key={p.id} className="flex flex-col p-5" delay={i * 60}>
                <div className="flex items-start justify-between gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <SeverityBadge severity={p.severity} />
                </div>
                <h3 className="mt-3 text-sm font-semibold">{p.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.evidence}</p>
                <p className="mt-2 text-xs text-muted-foreground">{p.range}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Confidence indicator</span>
                    <span>{p.confidence}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full gradient-brand" style={{ width: `${p.confidence}%` }} />
                  </div>
                </div>
                <p className="mt-3 rounded-xl bg-success/12 px-3 py-2 text-xs">{p.nextStep}</p>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="baseline" className="mt-4 space-y-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Your personal baseline</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              PulseAI uses your historical records to understand your typical range.
            </p>
            <div className="mt-4 space-y-4">
              {metrics.map((m) => {
                const current = m.points[m.points.length - 1]?.value ?? 0;
                const within = current >= m.baselineLow && current <= m.baselineHigh;
                const span = m.baselineHigh - m.baselineLow;
                const pos = Math.min(Math.max(((current - (m.baselineLow - span)) / (span * 3)) * 100, 2), 98);
                return (
                  <div key={m.id} className="rounded-xl border border-border/70 bg-card/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium">{m.name}</span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          within ? "bg-success/12 text-success" : "bg-warning/20 text-warning-foreground",
                        )}
                      >
                        {within ? "Within personal baseline" : "Outside personal baseline"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Typical range {m.baselineLow}–{m.baselineHigh} {m.unit} · Current {current} {m.unit}
                    </p>
                    <div className="relative mt-3 h-2.5 rounded-full bg-muted">
                      <span className="absolute inset-y-0 left-1/3 w-1/3 rounded-full bg-mint/60" />
                      <span
                        className="absolute -top-1 h-4.5 w-1.5 -translate-x-1/2 rounded-full bg-primary"
                        style={{ left: `${pos}%`, height: "1.125rem" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="anomalies" className="mt-4 space-y-3">
          {anomalies.map((a, i) => (
            <GlassCard key={a.id} className="flex flex-wrap items-start gap-4 p-5" delay={i * 60}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-warning/20 text-warning-foreground">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold">{a.metric}</h3>
                <p className="mt-0.5 text-2xl font-semibold tabular-nums">{a.value}</p>
                <p className="text-xs text-muted-foreground">
                  Usual range {a.usualRange} · Recorded {a.date}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{a.note}</p>
              </div>
              <Button variant="outline" className="rounded-xl">
                View context
              </Button>
            </GlassCard>
          ))}
        </TabsContent>

        <TabsContent value="correlations" className="mt-4 space-y-4">
          <GlassCard className="p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
              <h2 className="truncate text-sm font-semibold">Blood glucose vs selected value</h2>
              <Select value={xVar} onValueChange={(v) => setXVar(v as typeof xVar)}>
                <SelectTrigger className="w-36 shrink-0 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="hr">Heart rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" />
                  <XAxis dataKey={xVar} type="number" fontSize={12} stroke="var(--muted-foreground)" domain={["dataMin - 1", "dataMax + 1"]} />
                  <YAxis dataKey="glucose" type="number" fontSize={12} stroke="var(--muted-foreground)" domain={["dataMin - 4", "dataMax + 4"]} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "4 4" }} />
                  <Scatter data={correlationData} fill="var(--primary)" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <Disclaimer text="Correlation shown here describes a pattern in available data and does not establish causation." />
          </GlassCard>
        </TabsContent>
      </Tabs>

      <Disclaimer />
    </>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 12,
};

function StatTile({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) {
  const animated = useCountUp(value);
  return (
    <GlassCard className="p-4" delay={delay}>
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-2 text-2xl font-semibold tabular-nums">{Math.round(animated)}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </GlassCard>
  );
}
