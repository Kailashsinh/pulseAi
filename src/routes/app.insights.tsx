import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Disclaimer,
  EmptyState,
  GlassCard,
  PageHeader,
  SeverityBadge,
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
import type { Insight } from "@/lib/pulse/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/insights")({
  head: () => ({
    meta: [
      { title: "Health Insights — PulseAI" },
      {
        name: "description",
        content:
          "Patterns, trends and unusual measurements PulseAI found across your health records.",
      },
      { property: "og:title", content: "Health Insights — PulseAI" },
      {
        property: "og:description",
        content: "AI-assisted health insights based on your stored records.",
      },
    ],
  }),
  component: InsightsPage,
});

const categories = ["All", "Trends", "Anomalies", "Reports", "Symptoms", "Risk"] as const;

function InsightsPage() {
  const { insights, markInsightReviewed } = usePulse();
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Insight | null>(null);

  const list = insights.filter(
    (i) => cat === "All" || i.category === cat.toLowerCase(),
  );

  return (
    <>
      <PageHeader
        icon={<Sparkles className="h-5 w-5" />}
        title="Health Insights"
        subtitle="What PulseAI noticed across your reports, measurements and symptoms."
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              cat === c
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-card/70 text-muted-foreground hover:border-primary/40",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="h-7 w-7" />}
          title="No insights in this category"
          description="Your health insights will appear here as PulseAI analyzes your records."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {list.map((i, idx) => (
            <GlassCard key={i.id} className="flex flex-col p-5" delay={idx * 60} interactive>
              <div className="flex items-start justify-between gap-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="flex items-center gap-2">
                  {i.reviewed && (
                    <span className="inline-flex items-center gap-1 text-xs text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Reviewed
                    </span>
                  )}
                  <SeverityBadge severity={i.severity} />
                </div>
              </div>
              <h2 className="mt-3 text-base font-semibold">{i.title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{i.description}</p>
              <p className="mt-2 rounded-xl bg-muted/70 px-3 py-2 text-xs">
                <span className="font-medium">Evidence:</span> {i.evidence}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">{i.date}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto h-8 px-2 text-primary"
                  onClick={() => setSelected(i)}
                >
                  View details
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <Disclaimer />

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
            <DialogDescription>{selected?.date}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{selected?.description}</p>
          <p className="rounded-xl bg-muted/70 p-3 text-sm">
            <span className="font-medium">Evidence:</span> {selected?.evidence}
          </p>
          <p className="rounded-xl bg-success/12 p-3 text-sm">
            <span className="font-medium">Suggested next step:</span> Consider discussing this
            observation with a healthcare professional at your next appointment.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/app/analytics">View in Analytics</Link>
            </Button>
            <Button
              className="rounded-xl"
              onClick={() => {
                if (selected) markInsightReviewed(selected.id);
                toast.success("Insight marked as reviewed");
                setSelected(null);
              }}
            >
              Mark as reviewed
            </Button>
          </div>
          <Disclaimer />
        </DialogContent>
      </Dialog>
    </>
  );
}
