import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Clock,
  FileText,
  HeartPulse,
  Pill,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import {
  Disclaimer,
  EmptyState,
  GlassCard,
  PageHeader,
} from "@/components/common/pulse-ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePulse } from "@/lib/pulse/store";
import type { TimelineEvent } from "@/lib/pulse/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/timeline")({
  head: () => ({
    meta: [
      { title: "Health Timeline — PulseAI" },
      {
        name: "description",
        content:
          "A chronological view of your symptoms, reports, measurements and insights.",
      },
      { property: "og:title", content: "Health Timeline — PulseAI" },
      {
        property: "og:description",
        content: "See how your health information changes over time.",
      },
    ],
  }),
  component: TimelinePage,
});

const filters = [
  "All",
  "Symptoms",
  "Reports",
  "Vitals",
  "Medications",
  "Insights",
  "Assessments",
] as const;

const typeOf: Record<string, TimelineEvent["type"]> = {
  Symptoms: "symptom",
  Reports: "report",
  Vitals: "vital",
  Medications: "medication",
  Insights: "insight",
  Assessments: "assessment",
};

const icons: Record<TimelineEvent["type"], React.ComponentType<{ className?: string }>> = {
  symptom: Activity,
  report: FileText,
  vital: HeartPulse,
  medication: Pill,
  insight: Sparkles,
  assessment: Stethoscope,
};

function TimelinePage() {
  const { timeline } = usePulse();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  const items = [...timeline]
    .filter((e) => filter === "All" || e.type === typeOf[filter])
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHeader
        icon={<Clock className="h-5 w-5" />}
        title="Health Timeline"
        subtitle="Everything PulseAI knows about your health, in order."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              filter === f
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-card/70 text-muted-foreground hover:border-primary/40",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-7 w-7" />}
          title="Nothing recorded in this category yet"
          description="Your health timeline will grow as you add symptoms, reports and measurements."
        />
      ) : (
        <ol className="relative space-y-4 pl-8">
          <span className="absolute left-3.5 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/40 via-cyan/40 to-transparent" />
          {items.map((e, i) => {
            const Icon = icons[e.type];
            return (
              <li key={e.id} className="relative rise-in" style={{ animationDelay: `${i * 70}ms` }}>
                <span className="absolute -left-8 top-3 grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-primary shadow-[var(--shadow-soft)]">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <button
                  onClick={() => setSelected(e)}
                  className="w-full rounded-2xl glass px-4 py-3.5 text-left transition-transform hover:-translate-y-0.5"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{e.title}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] capitalize text-muted-foreground">
                      {e.type}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{e.description}</span>
                  <span className="mt-1.5 block text-xs text-muted-foreground">{e.date}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <Disclaimer />

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
            <DialogDescription>{selected?.date}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{selected?.description}</p>
          <p className="rounded-xl bg-muted/70 p-3 text-sm">{selected?.detail}</p>
          <Disclaimer text="Recorded information should be verified against your original medical records." />
        </DialogContent>
      </Dialog>
    </>
  );
}
