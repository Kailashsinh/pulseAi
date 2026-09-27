import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PulseMark } from "@/components/brand/PulseLogo";
import { mockAIService } from "@/lib/pulse/services";
import { Disclaimer } from "@/components/common/pulse-ui";

const quickActions = [
  "Analyze recent trend",
  "Explain my report",
  "Review my timeline",
  "Prepare doctor brief",
];

export function AssistantDock() {
  const [open, setOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    {
      from: "ai",
      text: "Hi Aarav — I can summarise anything in your stored health records. What would you like to look at?",
    },
  ]);

  const ask = async (prompt: string) => {
    if (!prompt.trim()) return;
    setMessages((m) => [...m, { from: "user", text: prompt }]);
    setInput("");
    setThinking(true);
    const reply = await mockAIService.assistant(prompt);
    setThinking(false);
    setMessages((m) => [...m, { from: "ai", text: reply }]);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl glass rise-in md:bottom-24 md:right-6">
          <div className="flex items-center gap-2.5 border-b border-border/60 px-4 py-3">
            <PulseMark className="h-8 w-8" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">PulseAI Assistant</p>
              <p className="text-xs text-muted-foreground">AI-assisted, informational only</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "user"
                    ? "ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground"
                    : "max-w-[92%] text-sm leading-relaxed text-foreground"
                }
              >
                {m.text}
              </div>
            ))}
            {thinking && (
              <p className="text-sm text-muted-foreground">PulseAI is thinking…</p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {quickActions.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border/60 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your records…"
              aria-label="Ask the PulseAI assistant"
              className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" size="icon" className="shrink-0 rounded-xl">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <div className="px-3 pb-3">
            <Disclaimer text="Simulated assistant responses in this prototype." />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open PulseAI assistant"
        className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-primary-foreground shadow-[var(--shadow-glass)] transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    </>
  );
}
