import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, Sun } from "lucide-react";
import { toast } from "sonner";
import { Disclaimer, GlassCard, PageHeader } from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PulseAI" },
      {
        name: "description",
        content: "Account, appearance, notification, AI and data settings for PulseAI.",
      },
      { property: "og:title", content: "Settings — PulseAI" },
      {
        property: "og:description",
        content: "Manage how PulseAI looks and behaves for you.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, prefs, setPref, resetDemo } = usePulse();

  return (
    <>
      <PageHeader
        icon={<SettingsIcon className="h-5 w-5" />}
        title="Settings"
        subtitle="Account, appearance, notifications, AI preferences and data."
      />

      <Tabs defaultValue="account">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-xl bg-muted/70 p-1">
          <TabsTrigger value="account" className="rounded-lg">Account</TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg">Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">Notifications</TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg">AI preferences</TabsTrigger>
          <TabsTrigger value="data" className="rounded-lg">Data & security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Account</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-name">Name</Label>
                <Input id="s-name" className="mt-1.5 rounded-xl" defaultValue={user.name} />
              </div>
              <div>
                <Label htmlFor="s-email">Email</Label>
                <Input id="s-email" className="mt-1.5 rounded-xl" defaultValue={user.email} />
              </div>
            </div>
            <Button className="mt-4 rounded-xl" onClick={() => toast.success("Profile updated")}>
              Save changes
            </Button>
          </GlassCard>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Appearance</h2>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-primary/40 bg-primary-soft px-4 py-3">
              <Sun className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Light theme</p>
                <p className="text-xs text-muted-foreground">
                  PulseAI uses a single calm light theme in this release.
                </p>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Notifications</h2>
            <div className="mt-3 space-y-3">
              {(
                [
                  ["alerts", "Health alerts"],
                  ["trendInsights", "Trend insights"],
                  ["reportProcessing", "Report processing"],
                  ["appointmentReminders", "Appointment reminders"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-3">
                  <Label htmlFor={`s-${key}`} className="text-sm font-normal">
                    {label}
                  </Label>
                  <Switch id={`s-${key}`} checked={prefs[key]} onCheckedChange={(v) => setPref(key, v)} />
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">AI preferences</h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-3">
                <Label htmlFor="s-ai" className="text-sm font-normal">
                  Allow AI-assisted health analysis
                </Label>
                <Switch id="s-ai" checked={prefs.aiAnalysis} onCheckedChange={(v) => setPref("aiAnalysis", v)} />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-3">
                <Label htmlFor="s-hist" className="text-sm font-normal">
                  Use historical records for insights
                </Label>
                <Switch
                  id="s-hist"
                  checked={prefs.historicalInsights}
                  onCheckedChange={(v) => setPref("historicalInsights", v)}
                />
              </div>
            </div>
            <Disclaimer className="mt-4" />
          </GlassCard>
        </TabsContent>

        <TabsContent value="data" className="mt-4 space-y-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Data</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All demo data lives in this browser only. Nothing is sent anywhere.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Export started (simulated)")}>
                Export my data
              </Button>
              <Button
                variant="destructive"
                className="rounded-xl"
                onClick={() => {
                  resetDemo();
                  toast.success("Demo data reset");
                }}
              >
                Reset demo data
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Security & privacy</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review what PulseAI is allowed to analyse.
            </p>
            <Button asChild variant="outline" className="mt-3 rounded-xl">
              <Link to="/app/privacy">Open privacy settings</Link>
            </Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
