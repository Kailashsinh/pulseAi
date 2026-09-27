import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Activity,
  Bell,
  ChartLine,
  Clock,
  FileText,
  MessageCircle,
  Pill,
  ScanLine,
  Settings,
  Sparkles,
  Stethoscope,
  Upload,
} from "lucide-react";

const actions = [
  { label: "Go to Dashboard", to: "/app/dashboard", icon: Activity, group: "Navigate" },
  { label: "Start AI Health Chat", to: "/app/chat", icon: MessageCircle, group: "Navigate" },
  { label: "View Health Timeline", to: "/app/timeline", icon: Clock, group: "Navigate" },
  { label: "Upload Report", to: "/app/reports", icon: Upload, group: "Actions" },
  { label: "View Analytics", to: "/app/analytics", icon: ChartLine, group: "Navigate" },
  { label: "Open Insights", to: "/app/insights", icon: Sparkles, group: "Navigate" },
  { label: "Add Medication", to: "/app/medications", icon: Pill, group: "Actions" },
  { label: "Generate Doctor Brief", to: "/app/doctor-brief", icon: Stethoscope, group: "Actions" },
  { label: "Medical Image Analysis", to: "/app/image-analysis", icon: ScanLine, group: "Navigate" },
  { label: "Notifications", to: "/app/notifications", icon: Bell, group: "Navigate" },
  { label: "Open Settings", to: "/app/settings", icon: Settings, group: "Navigate" },
  { label: "Search: glucose trend", to: "/app/analytics", icon: ChartLine, group: "Health records" },
  { label: "Search: blood report — September", to: "/app/reports", icon: FileText, group: "Health records" },
] as const;

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const groups = ["Navigate", "Actions", "Health records"];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, reports, health values…" />
      <CommandList>
        <CommandEmpty>No matching results.</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g} heading={g}>
            {actions
              .filter((a) => a.group === g)
              .map((a) => (
                <CommandItem
                  key={a.label}
                  value={a.label}
                  onSelect={() => {
                    onOpenChange(false);
                    navigate({ to: a.to });
                  }}
                >
                  <a.icon className="mr-2 h-4 w-4 text-primary" />
                  {a.label}
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
