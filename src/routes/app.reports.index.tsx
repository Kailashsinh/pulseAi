import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, GitCompare, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Disclaimer,
  EmptyState,
  GlassCard,
  PageHeader,
} from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePulse } from "@/lib/pulse/store";
import { mockReportService } from "@/lib/pulse/services";

export const Route = createFileRoute("/app/reports/")({
  head: () => ({
    meta: [
      { title: "Medical Reports — PulseAI" },
      {
        name: "description",
        content:
          "Upload lab reports and blood panels, then review the health values PulseAI extracted.",
      },
      { property: "og:title", content: "Medical Reports — PulseAI" },
      {
        property: "og:description",
        content: "Your reports, extracted values and comparisons over time.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { reports, addReport, addTimelineEvent, pushNotification } = usePulse();
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [dragging, setDragging] = useState(false);

  const runUpload = async (fileName = "New blood panel.pdf") => {
    setStepIndex(0);
    for (let i = 0; i < mockReportService.steps.length; i++) {
      setStepIndex(i);
      await new Promise((r) => setTimeout(r, 900));
    }
    const report = await mockReportService.process(fileName);
    addReport(report);
    addTimelineEvent({
      id: `tl-${Date.now()}`,
      date: report.date,
      type: "report",
      title: `${report.title} uploaded`,
      description: "New report added and values extracted.",
      detail: report.values.map((v) => `${v.name} ${v.value} ${v.unit}`).join(" · "),
    });
    pushNotification({
      id: `n-${Date.now()}`,
      type: "report",
      title: "New report processed",
      body: `${report.title} has been processed.`,
      date: report.date,
      read: false,
    });
    toast.success("Report uploaded successfully");
    setTimeout(() => {
      setOpen(false);
      setStepIndex(-1);
    }, 700);
  };

  return (
    <>
      <PageHeader
        icon={<FileText className="h-5 w-5" />}
        title="Medical Reports"
        subtitle="Blood reports, lab reports, prescriptions and discharge summaries."
        actions={
          <>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/app/reports/compare">
                <GitCompare className="mr-2 h-4 w-4" /> Compare
              </Link>
            </Button>
            <Button className="rounded-xl" onClick={() => setOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Upload report
            </Button>
          </>
        }
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          setOpen(true);
          runUpload(e.dataTransfer.files[0]?.name);
        }}
        className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging ? "border-primary bg-primary-soft" : "border-border bg-card/60"
        }`}
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary float-slow">
          <Upload className="h-6 w-6" />
        </span>
        <p className="mt-3 text-sm font-medium">Drag & drop your report here</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Upload PDF, JPG or PNG — blood reports, lab reports, prescriptions, discharge summaries
        </p>
        <Button variant="outline" className="mt-4 rounded-xl" onClick={() => setOpen(true)}>
          Choose a file
        </Button>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-7 w-7" />}
          title="No medical reports yet"
          description="Upload your first report to start building your health timeline."
          action={
            <Button className="rounded-xl" onClick={() => setOpen(true)}>
              Upload report
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((r, i) => (
            <GlassCard key={r.id} className="flex flex-col p-5" delay={i * 60} interactive>
              <div className="flex items-start justify-between gap-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-medium text-success">
                  Processed
                </span>
              </div>
              <h2 className="mt-3 truncate text-base font-semibold">{r.title}</h2>
              <p className="text-xs text-muted-foreground">
                {r.type} · {r.date} · {r.lab}
              </p>
              <ul className="mt-3 flex-1 space-y-1 text-sm">
                {r.values.slice(0, 3).map((v) => (
                  <li key={v.name} className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">{v.name}</span>
                    <span className="shrink-0 tabular-nums">
                      {v.value} {v.unit}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="ghost" size="sm" className="mt-3 h-8 self-start px-2 text-primary">
                <Link to="/app/reports/$reportId" params={{ reportId: r.id }}>
                  Open report <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </GlassCard>
          ))}
        </div>
      )}

      <Disclaimer text="Extracted information should always be verified against the original report." />

      <Dialog open={open} onOpenChange={(o) => stepIndex < 0 && setOpen(o)}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Upload medical report</DialogTitle>
            <DialogDescription>
              This prototype simulates upload and value extraction.
            </DialogDescription>
          </DialogHeader>

          {stepIndex < 0 ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                Select a PDF, JPG or PNG from your device
              </div>
              <Button className="w-full rounded-xl" onClick={() => runUpload()}>
                Start upload
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {mockReportService.steps.map((s, i) => (
                <div key={s} className="flex items-center gap-3 text-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      i < stepIndex ? "bg-success" : i === stepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span className={i <= stepIndex ? "" : "text-muted-foreground"}>{s}</span>
                </div>
              ))}
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full gradient-brand transition-[width] duration-700"
                  style={{ width: `${((stepIndex + 1) / mockReportService.steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
