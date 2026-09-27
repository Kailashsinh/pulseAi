import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronDown,
  FileText,
  Mic,
  Send,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer, GlassCard, SeverityBadge } from "@/components/common/pulse-ui";
import { PulseMark } from "@/components/brand/PulseLogo";
import { mockAIService } from "@/lib/pulse/services";
import { usePulse } from "@/lib/pulse/store";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title: "AI Health Chat — PulseAI" },
      {
        name: "description",
        content:
          "An adaptive, AI-assisted symptom conversation that builds on your health history.",
      },
      { property: "og:title", content: "AI Health Chat — PulseAI" },
      {
        property: "og:description",
        content: "Describe what you're experiencing and get an AI-assisted summary.",
      },
    ],
  }),
  component: ChatPage,
});

interface Msg {
  id: number;
  from: "ai" | "user";
  text: string;
  time: string;
  quickReplies?: string[];
}

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const urgentWords = ["severe chest pain", "can't breathe", "cannot breathe", "fainted"];

interface Assessment {
  indicator: string;
  level: string;
  supporting: string[];
  factors: string[];
  urgency: string;
}

function ChatPage() {
  const { pushNotification, addTimelineEvent } = usePulse();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: "ai",
      text: "Hi Aarav. Tell me what you're experiencing and I'll ask a few follow-up questions based on your answers and your stored records.",
      time: now(),
      quickReplies: [
        "Start symptom assessment",
        "Upload a report",
        "Ask about a health trend",
      ],
    },
  ]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, assessment]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    setInput("");
    setMessages((m) => [...m, { id: m.length, from: "user", text, time: now() }]);

    if (urgentWords.some((w) => text.toLowerCase().includes(w))) {
      setUrgent(true);
      return;
    }

    setTyping(true);
    const turn = await mockAIService.reply(step);
    setTyping(false);

    if (turn) {
      setStep((s) => s + 1);
      setMessages((m) => [
        ...m,
        {
          id: m.length,
          from: "ai",
          text: turn.question,
          time: now(),
          quickReplies: turn.quickReplies,
        },
      ]);
      return;
    }

    setTyping(true);
    setMessages((m) => [
      ...m,
      {
        id: m.length,
        from: "ai",
        text: "PulseAI is analyzing your responses…",
        time: now(),
      },
    ]);
    const result = await mockAIService.assess();
    setTyping(false);
    setAssessment(result);
    addTimelineEvent({
      id: `tl-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      type: "assessment",
      title: "AI-assisted assessment completed",
      description: "Symptom conversation summarised into an assessment.",
      detail: `${result.indicator} — ${result.level}. ${result.urgency}`,
    });
    pushNotification({
      id: `n-${Date.now()}`,
      type: "assessment",
      title: "Assessment summary ready",
      body: "Your symptom conversation has been summarised.",
      date: new Date().toISOString().slice(0, 10),
      read: false,
    });
    toast.success("Assessment summary generated");
  };

  const collected = Math.min(step + 1, 7);

  if (urgent) {
    return (
      <GlassCard className="mx-auto max-w-2xl border-destructive/40 p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-destructive/12 text-destructive">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-xl font-semibold">
          Your responses may indicate a situation that needs prompt professional attention
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please seek appropriate professional or emergency care. PulseAI has paused the
          assessment so nothing distracts from that.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button className="rounded-xl">Emergency guidance</Button>
          <Button variant="outline" className="rounded-xl" onClick={() => setUrgent(false)}>
            Return to chat
          </Button>
        </div>
        <Disclaimer className="mt-5 text-left" />
      </GlassCard>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <GlassCard className="flex min-h-[70vh] flex-col overflow-hidden p-0">
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
          <PulseMark className="h-9 w-9" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold">AI Health Chat</h1>
            <p className="flex items-center gap-1.5 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> PulseAI is ready
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((m) => (
            <div key={m.id} className="rise-in">
              {m.from === "ai" ? (
                <div className="flex gap-2.5">
                  <PulseMark className="h-8 w-8 shrink-0" animated={false} />
                  <div className="min-w-0">
                    <div className="max-w-[46rem] rounded-2xl rounded-tl-sm border border-border/60 bg-card/80 px-4 py-2.5 text-sm leading-relaxed">
                      {m.text}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">PulseAI · {m.time}</p>
                    {m.quickReplies && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.quickReplies.map((q) => (
                          <button
                            key={q}
                            onClick={() => send(q)}
                            className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="max-w-[80%]">
                    <div className="rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                      {m.text}
                    </div>
                    <p className="mt-1 text-right text-[11px] text-muted-foreground">You · {m.time}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-2.5">
              <PulseMark className="h-8 w-8" />
              <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-card/80 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: `${i * 140}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {assessment && <AssessmentSummary a={assessment} />}
          <div ref={endRef} />
        </div>

        <form
          className="flex items-center gap-2 border-t border-border/60 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-xl" aria-label="Voice input">
            <Mic className="h-4 w-4" />
          </Button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you're experiencing…"
            aria-label="Describe what you're experiencing"
            className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-xl" disabled={typing}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </GlassCard>

      {/* Side panel */}
      <aside className="space-y-4">
        <GlassCard className="p-4">
          <h2 className="text-sm font-semibold">Assessment progress</h2>
          <div className="mt-3 space-y-3 text-sm">
            <ProgressRow label="Symptoms collected" value={`${collected} / 7`} pct={(collected / 7) * 100} />
            <ProgressRow
              label="Information confidence"
              value={collected > 4 ? "Good" : "Moderate"}
              pct={collected > 4 ? 78 : 52}
            />
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Relevant history</span>
              <span className="text-foreground">2 items</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h2 className="text-sm font-semibold">Quick actions</h2>
          <div className="mt-3 space-y-2">
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link to="/app/reports">
                <FileText className="mr-2 h-4 w-4" /> Upload a report
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link to="/app/analytics">
                <Sparkles className="mr-2 h-4 w-4" /> Ask about a health trend
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link to="/app/doctor-brief">
                <Stethoscope className="mr-2 h-4 w-4" /> Prepare doctor brief
              </Link>
            </Button>
          </div>
        </GlassCard>

        <Disclaimer />
      </aside>
    </div>
  );
}

function ProgressRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full gradient-brand transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function AssessmentSummary({ a }: { a: Assessment }) {
  return (
    <GlassCard className="border-primary/30 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Assessment Summary</h2>
        <SeverityBadge severity="moderate" />
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <Block label="Your information" tone="muted">
          {a.supporting.join(" · ")}
        </Block>
        <Block label="AI analysis" tone="primary">
          Pattern associated with respiratory symptoms across your recent entries.
        </Block>
        <Block label="Health indicator" tone="warning">
          {a.indicator} — {a.level}
        </Block>
        <Block label="Suggested next step" tone="success">
          {a.urgency}
        </Block>
      </div>

      <Collapsible className="mt-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl bg-muted/70 px-3.5 py-2.5 text-sm font-medium">
          How did PulseAI reach this result?
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-1 pt-3 text-sm text-muted-foreground">
          <p>
            The summary combines what you described in this conversation with related entries
            already stored in your timeline. These are the factors that influenced it most:
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {a.factors.map((f) => (
              <span key={f} className="rounded-full bg-primary-soft px-2.5 py-1 text-xs text-primary">
                {f}
              </span>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Disclaimer
        className="mt-4"
        text="AI-assisted assessment — not a confirmed diagnosis. Consider discussing persistent symptoms with a healthcare professional."
      />
    </GlassCard>
  );
}

function Block({
  label,
  children,
  tone,
}: {
  label: string;
  children: React.ReactNode;
  tone: "muted" | "primary" | "warning" | "success";
}) {
  const tones = {
    muted: "bg-muted/70",
    primary: "bg-primary-soft",
    warning: "bg-warning/15",
    success: "bg-success/12",
  };
  return (
    <div className={`rounded-xl px-3.5 py-2.5 ${tones[tone]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5">{children}</p>
    </div>
  );
}
