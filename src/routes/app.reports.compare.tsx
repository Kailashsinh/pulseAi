import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, GitCompare, Minus } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Disclaimer, GlassCard, PageHeader } from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/reports/compare")({
  head: () => ({
    meta: [
      { title: "Compare reports — PulseAI" },
      {
        name: "description",
        content: "Place two reports side by side and see how each value changed.",
      },
      { property: "og:title", content: "Compare reports — PulseAI" },
      {
        property: "og:description",
        content: "Side-by-side report values with change-over-time context.",
      },
    ],
  }),
  component: CompareReports,
});

function CompareReports() {
  const { reports, metrics } = usePulse();
  const [prevId, setPrevId] = useState(reports[1]?.id ?? reports[0]?.id ?? "");
  const [currId, setCurrId] = useState(reports[0]?.id ?? "");

  const prev = reports.find((r) => r.id === prevId);
  const curr = reports.find((r) => r.id === currId);

  const rows = (curr?.values ?? []).map((v) => {
    const before = prev?.values.find((p) => p.name === v.name);
    const delta = before ? Number((v.value - before.value).toFixed(2)) : null;
    return { name: v.name, unit: v.unit, before: before?.value ?? null, after: v.value, delta };
  });

  const glucose = metrics.find((m) => m.id === "glucose");
  const chartData = glucose?.points.map((p) => ({ label: p.label, value: p.value })) ?? [];

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-2 h-8 px-2 text-muted-foreground">
        <Link to="/app/reports">
          <ArrowLeft className="mr-1 h-4 w-4" /> All reports
        </Link>
      </Button>

      <PageHeader
        icon={<GitCompare className="h-5 w-5" />}
        title="Compare Reports"
        subtitle="See how the same values moved between two of your reports."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <GlassCard className="p-4">
          <label className="text-xs font-medium text-muted-foreground">Previous report</label>
          <Select value={prevId} onValueChange={setPrevId}>
            <SelectTrigger className="mt-2 w-full rounded-xl">
              <SelectValue placeholder="Select report" />
            </SelectTrigger>
            <SelectContent>
              {reports.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.title} · {r.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </GlassCard>
        <GlassCard className="p-4">
          <label className="text-xs font-medium text-muted-foreground">Current report</label>
          <Select value={currId} onValueChange={setCurrId}>
            <SelectTrigger className="mt-2 w-full rounded-xl">
              <SelectValue placeholder="Select report" />
            </SelectTrigger>
            <SelectContent>
              {reports.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.title} · {r.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </GlassCard>
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-border/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-4 py-3 font-medium">Previous</th>
                <th className="px-4 py-3 font-medium">Current</th>
                <th className="px-4 py-3 font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const Icon = r.delta === null || r.delta === 0 ? Minus : r.delta > 0 ? ArrowUpRight : ArrowDownRight;
                return (
                  <tr key={r.name} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">
                      {r.before === null ? "—" : `${r.before} ${r.unit}`}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.after} {r.unit}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs">
                        <Icon className="h-3.5 w-3.5" />
                        {r.delta === null ? "No earlier value" : `${r.delta > 0 ? "+" : ""}${r.delta} ${r.unit}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold">Change over time — Blood Glucose</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 8", "dataMax + 8"]} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              />
              <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <Disclaimer text="Changes between reports describe your recorded values only and do not establish a diagnosis." />
    </>
  );
}
