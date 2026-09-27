import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, FileText, GitCompare } from "lucide-react";
import { toast } from "sonner";
import {
  Disclaimer,
  EmptyState,
  GlassCard,
  PageHeader,
} from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/reports/$reportId")({
  head: () => ({
    meta: [
      { title: "Report detail — PulseAI" },
      {
        name: "description",
        content: "Document preview and the health values extracted from this report.",
      },
      { property: "og:title", content: "Report detail — PulseAI" },
      {
        property: "og:description",
        content: "Extracted health values, reference ranges and next steps.",
      },
    ],
  }),
  component: ReportDetail,
});

const statusStyles = {
  within: "bg-success/12 text-success",
  above: "bg-warning/20 text-warning-foreground",
  below: "bg-destructive/12 text-destructive",
};

const statusLabel = {
  within: "Within reference",
  above: "Above reference",
  below: "Below reference",
};

function ReportDetail() {
  const { reportId } = useParams({ from: "/app/reports/$reportId" });
  const { reports, addTimelineEvent } = usePulse();
  const report = reports.find((r) => r.id === reportId);

  if (!report) {
    return (
      <EmptyState
        icon={<FileText className="h-7 w-7" />}
        title="Report not found"
        description="This report is no longer available in your records."
        action={
          <Button asChild className="rounded-xl">
            <Link to="/app/reports">Back to reports</Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-2 h-8 px-2 text-muted-foreground">
        <Link to="/app/reports">
          <ArrowLeft className="mr-1 h-4 w-4" /> All reports
        </Link>
      </Button>

      <PageHeader
        icon={<FileText className="h-5 w-5" />}
        title={report.title}
        subtitle={`${report.type} · ${report.date} · ${report.lab}`}
        actions={
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/app/reports/compare">
              <GitCompare className="mr-2 h-4 w-4" /> Compare report
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold">Document preview</h2>
          <div className="mt-3 aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-semibold">{report.lab}</span>
              <span className="text-xs text-muted-foreground">{report.date}</span>
            </div>
            <p className="mt-4 text-sm font-medium">{report.title}</p>
            <div className="mt-4 space-y-2.5">
              {report.values.map((v) => (
                <div key={v.name} className="flex justify-between border-b border-dashed border-border pb-1.5 text-xs">
                  <span className="text-muted-foreground">{v.name}</span>
                  <span className="tabular-nums">
                    {v.value} {v.unit}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${90 - i * 9}%` }} />
              ))}
            </div>
            <p className="mt-6 text-[10px] text-muted-foreground">
              Simulated document preview · page 1 of {report.pages}
            </p>
          </div>
          <Button variant="outline" className="mt-3 w-full rounded-xl">
            View original
          </Button>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Extracted health data</h2>
              <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-medium text-success">
                Extracted successfully
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {report.values.map((v) => (
                <li key={v.name} className="rounded-xl border border-border/70 bg-card/70 p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium">{v.name}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[v.status]}`}>
                      {statusLabel[v.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">
                    {v.value}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">{v.unit}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Reference: {v.reference}</p>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-4 w-full rounded-xl"
              onClick={() => {
                addTimelineEvent({
                  id: `tl-${Date.now()}`,
                  date: report.date,
                  type: "report",
                  title: `${report.title} added to timeline`,
                  description: "Report linked to your health timeline.",
                  detail: report.values.map((v) => `${v.name} ${v.value} ${v.unit}`).join(" · "),
                });
                toast.success("Added to your health timeline");
              }}
            >
              <Clock className="mr-2 h-4 w-4" /> Add to timeline
            </Button>
          </GlassCard>

          <Disclaimer text="Extracted values should be verified against the original report before being relied upon." />
        </div>
      </div>
    </>
  );
}
