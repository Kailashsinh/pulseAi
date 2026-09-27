import { createFileRoute } from "@tanstack/react-router";
import { Database, FileText, Bell, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Disclaimer, GlassCard, PageHeader } from "@/components/common/pulse-ui";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Consent — PulseAI" },
      {
        name: "description",
        content: "Control how PulseAI uses your stored health records and what it analyses.",
      },
      { property: "og:title", content: "Privacy & Consent — PulseAI" },
      {
        property: "og:description",
        content: "Clear, explained controls over your health data and AI processing.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { prefs, setPref, reports, timeline, medications } = usePulse();

  const toggles = [
    {
      key: "aiAnalysis" as const,
      label: "Allow AI-assisted health analysis",
      help: "PulseAI can read the records you store here to produce assessments and summaries.",
    },
    {
      key: "historicalInsights" as const,
      label: "Allow health insights based on historical records",
      help: "Older measurements are compared with newer ones to detect trends and personal baselines.",
    },
    {
      key: "alerts" as const,
      label: "Allow notification alerts",
      help: "You'll be notified when something unusual or newly processed appears.",
    },
    {
      key: "shareAnonymised" as const,
      label: "Share anonymised usage statistics",
      help: "Optional. Helps improve the product. No health values are included.",
    },
  ];

  return (
    <>
      <PageHeader
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Privacy & Consent"
        subtitle="You decide what PulseAI stores and analyses."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: FileText, label: "Uploaded documents", value: reports.length },
          { icon: Database, label: "Health records", value: timeline.length + medications.length },
          { icon: Sparkles, label: "AI processing", value: prefs.aiAnalysis ? "On" : "Off" },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4">
            <s.icon className="h-4 w-4 text-primary" />
            <p className="mt-2 text-xl font-semibold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold">Consent</h2>
        <div className="mt-4 space-y-4">
          {toggles.map((t) => (
            <div key={t.key} className="flex items-start justify-between gap-4 rounded-xl bg-muted/50 px-4 py-3">
              <div className="min-w-0">
                <Label htmlFor={t.key} className="text-sm">
                  {t.label}
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">{t.help}</p>
              </div>
              <Switch
                id={t.key}
                checked={prefs[t.key]}
                onCheckedChange={(v) => {
                  setPref(t.key, v);
                  toast.success("Privacy setting updated");
                }}
              />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">What PulseAI never does</h2>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>• It does not diagnose conditions or prescribe medication.</li>
          <li>• It does not share your records with third parties.</li>
          <li>• It does not replace a conversation with a healthcare professional.</li>
        </ul>
      </GlassCard>

      <Disclaimer />
    </>
  );
}
