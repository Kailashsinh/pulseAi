import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  FileText,
  Settings,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import {
  Disclaimer,
  EmptyState,
  GlassCard,
  PageHeader,
} from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePulse } from "@/lib/pulse/store";
import type { AppNotification } from "@/lib/pulse/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — PulseAI" },
      {
        name: "description",
        content: "Health trends, processed reports, unusual measurements and reminders.",
      },
      { property: "og:title", content: "Notifications — PulseAI" },
      {
        property: "og:description",
        content: "Everything PulseAI wants to bring to your attention.",
      },
    ],
  }),
  component: NotificationsPage,
});

const icons = {
  trend: Sparkles,
  report: FileText,
  anomaly: AlertTriangle,
  assessment: Stethoscope,
  system: Settings,
  reminder: CalendarClock,
};

function NotificationsPage() {
  const { notifications, markAllRead, markRead, unreadCount } = usePulse();
  const [selected, setSelected] = useState<AppNotification | null>(null);

  return (
    <>
      <PageHeader
        icon={<Bell className="h-5 w-5" />}
        title="Notifications"
        subtitle={`${unreadCount} unread of ${notifications.length}`}
        actions={
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              markAllRead();
              toast.success("All notifications marked as read");
            }}
          >
            Mark all as read
          </Button>
        }
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-7 w-7" />}
          title="No notifications yet"
          description="PulseAI will let you know when something in your records changes."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => {
            const Icon = icons[n.type];
            return (
              <button
                key={n.id}
                onClick={() => {
                  markRead(n.id);
                  setSelected(n);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl glass px-4 py-3.5 text-left transition-transform hover:-translate-y-0.5 rise-in",
                  !n.read && "border-primary/40",
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{n.title}</span>
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{n.body}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{n.date}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <Disclaimer />

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="glass">
          <SheetHeader>
            <SheetTitle>{selected?.title}</SheetTitle>
            <SheetDescription>{selected?.date}</SheetDescription>
          </SheetHeader>
          <div className="space-y-3 p-4 pt-0">
            <p className="text-sm text-muted-foreground">{selected?.body}</p>
            <p className="rounded-xl bg-muted/70 p-3 text-sm">
              This notification was generated from information already stored in your PulseAI
              records. Open the related page to see the full context.
            </p>
            <Disclaimer />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
