import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Pencil, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { Disclaimer, GlassCard, PageHeader } from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — PulseAI" },
      {
        name: "description",
        content: "Your PulseAI profile, health preferences and notification choices.",
      },
      { property: "og:title", content: "Profile — PulseAI" },
      {
        property: "og:description",
        content: "Manage your details, health focus areas and preferences.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser, prefs, setPref, signOut } = usePulse();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <>
      <PageHeader
        icon={<User className="h-5 w-5" />}
        title="Profile"
        subtitle="Your account details and health preferences."
        actions={
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              if (editing) {
                updateUser({ name, email });
                toast.success("Profile updated");
              }
              setEditing((e) => !e);
            }}
          >
            <Pencil className="mr-2 h-4 w-4" /> {editing ? "Save profile" : "Edit profile"}
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-6 text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-2xl gradient-brand text-2xl font-semibold text-primary-foreground">
            {user.avatarInitials}
          </span>
          <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>
          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" /> {user.email}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Age {user.age} · Demo account
          </p>
          <Button variant="ghost" className="mt-4 w-full rounded-xl text-destructive" onClick={() => {
            signOut();
            navigate({ to: "/login" });
          }}>
            Sign out
          </Button>
        </GlassCard>

        <div className="space-y-4 lg:col-span-2">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Basic information</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="p-name">Full name</Label>
                <Input
                  id="p-name"
                  className="mt-1.5 rounded-xl"
                  value={name}
                  disabled={!editing}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="p-email">Email</Label>
                <Input
                  id="p-email"
                  className="mt-1.5 rounded-xl"
                  value={email}
                  disabled={!editing}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="p-dob">Date of birth</Label>
                <Input id="p-dob" className="mt-1.5 rounded-xl" value={user.dob} disabled />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Health preferences</h2>
            <p className="mt-1 text-sm text-muted-foreground">What you asked PulseAI to focus on.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {user.focusAreas.map((f) => (
                <span key={f} className="rounded-full bg-primary-soft px-3 py-1 text-xs text-primary">
                  {f}
                </span>
              ))}
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {user.goals.map((g) => (
                <li key={g} className="rounded-xl bg-muted/70 px-3 py-2">
                  {g}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Notification preferences</h2>
            <div className="mt-3 space-y-3">
              {(
                [
                  ["alerts", "Health alerts"],
                  ["trendInsights", "Trend insights"],
                  ["reportProcessing", "Report processing"],
                  ["appointmentReminders", "Appointment reminders"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <Label htmlFor={`pref-${key}`} className="text-sm font-normal">
                    {label}
                  </Label>
                  <Switch
                    id={`pref-${key}`}
                    checked={prefs[key]}
                    onCheckedChange={(v) => setPref(key, v)}
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Connected data</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {["Wearable device", "Lab portal", "Pharmacy records", "Clinic exports"].map((c) => (
                <div key={c} className="flex items-center justify-between rounded-xl border border-border bg-card/70 px-3 py-2.5 text-sm">
                  <span>{c}</span>
                  <span className="text-xs text-muted-foreground">Not connected</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/app/privacy">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Privacy settings
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/app/privacy">Consent settings</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>

      <Disclaimer />
    </>
  );
}
