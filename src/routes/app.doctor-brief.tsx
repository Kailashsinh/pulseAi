import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Pencil, Printer, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { Disclaimer, GlassCard, PageHeader } from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/doctor-brief")({
  head: () => ({
    meta: [
      { title: "Doctor Brief — PulseAI" },
      {
        name: "description",
        content:
          "Prepare a concise, printable summary of your health history for your next appointment.",
      },
      { property: "og:title", content: "Doctor Brief — PulseAI" },
      {
        property: "og:description",
        content: "A one-page appointment summary generated from your stored records.",
      },
    ],
  }),
  component: DoctorBriefPage,
});

function DoctorBriefPage() {
  const { user, reports, medications, briefGenerated, setBriefGenerated } = usePulse();
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [concern, setConcern] = useState(
    "Persistent cough for 3 weeks, with occasional fever and reduced energy in the afternoons.",
  );

  const generate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1400));
    setGenerating(false);
    setBriefGenerated(true);
    toast.success("Doctor Brief generated");
  };

  return (
    <>
      <PageHeader
        icon={<Stethoscope className="h-5 w-5" />}
        title="Doctor Brief"
        subtitle="Prepare a concise summary for your healthcare appointment."
        actions={
          briefGenerated ? (
            <>
              <Button variant="outline" className="rounded-xl" onClick={() => setEditing((e) => !e)}>
                <Pencil className="mr-2 h-4 w-4" /> {editing ? "Done" : "Edit"}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => toast.success("Download started (simulated)")}
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button className="rounded-xl" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
            </>
          ) : (
            <Button className="rounded-xl" onClick={generate} disabled={generating}>
              {generating ? "Generating…" : "Generate brief"}
            </Button>
          )
        }
      />

      {!briefGenerated && (
        <GlassCard className="p-6">
          <h2 className="text-base font-semibold">What will be included</h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Main complaint: persistent cough",
              "Duration: 3 weeks",
              "Relevant history: previous respiratory episodes",
              `Recent reports: ${reports.length}`,
              "Detected trend: persistent symptom pattern",
              "Questions generated from your stored history",
            ].map((l) => (
              <li key={l} className="rounded-xl bg-muted/70 px-3 py-2">
                {l}
              </li>
            ))}
          </ul>
          {generating && (
            <div className="mt-4 space-y-2" aria-live="polite">
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-muted" />
            </div>
          )}
        </GlassCard>
      )}

      {briefGenerated && (
        <>
          {editing && (
            <GlassCard className="p-5">
              <label htmlFor="concern" className="text-sm font-medium">
                Main concern
              </label>
              <Textarea
                id="concern"
                className="mt-2 rounded-xl"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              />
            </GlassCard>
          )}

          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10 rise-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <PulseLogo />
              <div className="text-right">
                <p className="text-sm font-semibold">Doctor Brief</p>
                <p className="text-xs text-muted-foreground">
                  Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-1 text-sm">
              <p>
                <span className="text-muted-foreground">Patient:</span> {user.name}
              </p>
              <p>
                <span className="text-muted-foreground">Age:</span> {user.age}
              </p>
            </div>

            <Section title="Main concern">{concern}</Section>
            <Section title="Symptom history">
              Cough first recorded 28 Aug 2026, repeated entries on 04 Sep and 12 Sep. Fatigue
              recorded in February 2026.
            </Section>
            <Section title="Relevant health history">
              Previous respiratory episode reported last winter. No hospital admissions recorded in
              PulseAI.
            </Section>
            <Section title="Recent reports">
              <ul className="list-disc space-y-1 pl-5">
                {reports.slice(0, 3).map((r) => (
                  <li key={r.id}>
                    {r.title} — {r.date} ({r.lab})
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Important measurements">
              <ul className="list-disc space-y-1 pl-5">
                <li>Blood glucose: 95 → 99 → 105 → 111 mg/dL (Jan–Sep 2026)</li>
                <li>Hemoglobin: 12.4 → 12.0 → 11.8 → 11.2 g/dL</li>
                <li>Resting heart rate: 68–74 BPM, one reading of 112 BPM on 22 Aug</li>
              </ul>
            </Section>
            <Section title="Detected trends">
              Persistent upward glucose pattern across four records. Resting heart rate otherwise
              close to personal baseline.
            </Section>
            <Section title="Current medications">
              <ul className="list-disc space-y-1 pl-5">
                {medications.map((m) => (
                  <li key={m.id}>
                    {m.name} {m.dosage} — {m.frequency} ({m.status})
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Questions for healthcare professional">
              <ul className="list-disc space-y-1 pl-5">
                <li>Does the gradual glucose increase warrant further screening?</li>
                <li>Should the persistent cough be investigated further?</li>
                <li>Is the downward hemoglobin trend relevant to my symptoms?</li>
                <li>Are my current medications appropriate together?</li>
              </ul>
            </Section>

            <p className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
              Generated from information entered or stored in PulseAI. Verify information with
              original medical records.
            </p>
          </div>
        </>
      )}

      <Disclaimer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</h2>
      <div className="mt-1.5 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
