import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Pill, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Disclaimer,
  EmptyState,
  GlassCard,
  PageHeader,
} from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePulse } from "@/lib/pulse/store";
import { mockMedicationService, uid } from "@/lib/pulse/services";

export const Route = createFileRoute("/app/medications")({
  head: () => ({
    meta: [
      { title: "Medications — PulseAI" },
      {
        name: "description",
        content:
          "Keep your medication information organised and check combinations for known interaction information.",
      },
      { property: "og:title", content: "Medications — PulseAI" },
      {
        property: "og:description",
        content: "Medication information tracking and interaction checks.",
      },
    ],
  }),
  component: MedicationsPage,
});

interface InteractionResult {
  severity: string;
  title: string;
  description: string;
  guidance: string;
}

function MedicationsPage() {
  const { medications, addMedication, removeMedication, addTimelineEvent } = usePulse();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    notes: "",
  });
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<InteractionResult | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const save = () => {
    if (!form.name.trim()) {
      toast.error("Please add a medication name");
      return;
    }
    const med = {
      id: uid("med"),
      name: form.name,
      dosage: form.dosage || "—",
      frequency: form.frequency || "As needed",
      startDate: form.startDate || new Date().toISOString().slice(0, 10),
      notes: form.notes,
      status: "active" as const,
    };
    addMedication(med);
    addTimelineEvent({
      id: `tl-${Date.now()}`,
      date: med.startDate,
      type: "medication",
      title: "Medication information added",
      description: `${med.name} ${med.dosage} added to your medication list.`,
      detail: `${med.frequency}. ${med.notes || "No additional notes."}`,
    });
    toast.success("Medication added");
    setForm({ name: "", dosage: "", frequency: "", startDate: "", notes: "" });
    setOpen(false);
  };

  const check = async () => {
    setChecking(true);
    setResult(null);
    const r = await mockMedicationService.checkInteraction(a, b);
    setChecking(false);
    if (!r) {
      toast.error("Choose two different medications");
      return;
    }
    setResult(r);
  };

  return (
    <>
      <PageHeader
        icon={<Pill className="h-5 w-5" />}
        title="Medications"
        subtitle="Medication information you track — PulseAI never prescribes."
        actions={
          <Button className="rounded-xl" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add medication
          </Button>
        }
      />

      {medications.length === 0 ? (
        <EmptyState
          icon={<Pill className="h-7 w-7" />}
          title="No medications yet"
          description="Add medications to keep your medication information organized."
          action={
            <Button className="rounded-xl" onClick={() => setOpen(true)}>
              Add medication
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {medications.map((m, i) => (
            <GlassCard key={m.id} className="p-5" delay={i * 60} interactive>
              <div className="flex items-start justify-between gap-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Pill className="h-5 w-5" />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    m.status === "active"
                      ? "bg-success/12 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {m.status === "active" ? "Active" : "Paused"}
                </span>
              </div>
              <h2 className="mt-3 text-base font-semibold">{m.name}</h2>
              <p className="text-sm text-muted-foreground">
                {m.dosage} · {m.frequency}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Started {m.startDate}</p>
              {m.notes && <p className="mt-2 rounded-xl bg-muted/70 px-3 py-2 text-xs">{m.notes}</p>}
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-8 px-2 text-destructive"
                onClick={() => setConfirmId(m.id)}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" /> Remove
              </Button>
            </GlassCard>
          ))}
        </div>
      )}

      <GlassCard className="p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold">Medication interaction checker</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Select two medications to see whether known interaction information exists.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <Select value={a} onValueChange={setA}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Medication A" />
            </SelectTrigger>
            <SelectContent>
              {medications.map((m) => (
                <SelectItem key={m.id} value={m.name}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={b} onValueChange={setB}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Medication B" />
            </SelectTrigger>
            <SelectContent>
              {medications.map((m) => (
                <SelectItem key={m.id} value={m.name}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="rounded-xl" onClick={check} disabled={checking}>
            {checking ? "Checking…" : "Check"}
          </Button>
        </div>

        {checking && (
          <div className="mt-4 h-20 animate-pulse rounded-xl bg-muted/70" aria-hidden="true" />
        )}

        {result && (
          <div className="mt-4 rounded-xl border border-warning/40 bg-warning/10 p-4 rise-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning-foreground" />
              <p className="text-sm font-semibold">{result.title}</p>
              <span className="ml-auto rounded-full bg-warning/25 px-2.5 py-1 text-xs">
                Severity: {result.severity}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{result.description}</p>
            <p className="mt-2 text-sm">{result.guidance}</p>
          </div>
        )}
      </GlassCard>

      <Disclaimer text="PulseAI shows medication information only. It does not prescribe, adjust or recommend medication." />

      {/* Add medication modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Add medication</DialogTitle>
            <DialogDescription>
              Stored locally in this prototype for your own tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="med-name">Medication name</Label>
              <Input
                id="med-name"
                className="mt-1.5 rounded-xl"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="med-dose">Dosage</Label>
                <Input
                  id="med-dose"
                  placeholder="500 mg"
                  className="mt-1.5 rounded-xl"
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="med-freq">Frequency</Label>
                <Input
                  id="med-freq"
                  placeholder="Once daily"
                  className="mt-1.5 rounded-xl"
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="med-start">Start date</Label>
              <Input
                id="med-start"
                type="date"
                className="mt-1.5 rounded-xl"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="med-notes">Notes</Label>
              <Textarea
                id="med-notes"
                className="mt-1.5 rounded-xl"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-xl" onClick={save}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Remove this medication?</DialogTitle>
            <DialogDescription>
              It will be removed from your medication list in this prototype.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl"
              onClick={() => {
                if (confirmId) removeMedication(confirmId);
                setConfirmId(null);
                toast.success("Medication removed");
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
