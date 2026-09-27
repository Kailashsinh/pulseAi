import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  ChartLine,
  ChevronLeft,
  Clock,
  FileText,
  HelpCircle,
  MessageCircle,
  MoreHorizontal,
  Pill,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PulseLogo, PulseMark } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "./BackgroundDecor";
import { CommandPalette } from "./CommandPalette";
import { AssistantDock } from "./AssistantDock";
import { usePulse } from "@/lib/pulse/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const mainNav = [
  { to: "/app/dashboard", label: "Dashboard", icon: Activity },
  { to: "/app/chat", label: "AI Health Chat", icon: MessageCircle },
  { to: "/app/timeline", label: "Health Timeline", icon: Clock },
  { to: "/app/reports", label: "Medical Reports", icon: FileText },
  { to: "/app/image-analysis", label: "Image Analysis", icon: ScanLine },
  { to: "/app/analytics", label: "Analytics", icon: ChartLine },
  { to: "/app/medications", label: "Medications", icon: Pill },
  { to: "/app/insights", label: "Insights", icon: Sparkles },
  { to: "/app/doctor-brief", label: "Doctor Brief", icon: Stethoscope },
] as const;

const bottomNav = [
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/privacy", label: "Privacy", icon: ShieldCheck },
  { to: "/app/settings", label: "Settings", icon: Settings },
  { to: "/app/profile", label: "Profile", icon: User },
] as const;

const mobileNav = [
  { to: "/app/dashboard", label: "Home", icon: Activity },
  { to: "/app/chat", label: "AI Chat", icon: MessageCircle },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/analytics", label: "Analytics", icon: ChartLine },
] as const;

const moreNav = [
  { to: "/app/timeline", label: "Health Timeline", icon: Clock },
  { to: "/app/insights", label: "Insights", icon: Sparkles },
  { to: "/app/medications", label: "Medications", icon: Pill },
  { to: "/app/image-analysis", label: "Image Analysis", icon: ScanLine },
  { to: "/app/doctor-brief", label: "Doctor Brief", icon: Stethoscope },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/privacy", label: "Privacy", icon: ShieldCheck },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, unreadCount } = usePulse();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <BackgroundDecor />

      {/* Sidebar — desktop / tablet */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300 md:flex",
          collapsed ? "w-[72px]" : "w-[264px]",
        )}
      >
        <div className="flex h-16 items-center justify-between px-3">
          {collapsed ? (
            <PulseMark className="mx-auto h-9 w-9" />
          ) : (
            <Link to="/app/dashboard" className="min-w-0">
              <PulseLogo />
            </Link>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2.5 py-2" aria-label="Main">
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} active={pathname === item.to} />
          ))}
        </nav>

        <div className="space-y-1 border-t border-sidebar-border px-2.5 py-3">
          {bottomNav.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              collapsed={collapsed}
              active={pathname === item.to}
              badge={item.to === "/app/notifications" ? unreadCount : 0}
            />
          ))}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn("h-4 w-4 shrink-0 transition-transform", collapsed && "rotate-180")}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className={cn("transition-[padding] duration-300", collapsed ? "md:pl-[72px]" : "md:pl-[264px]")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Link to="/app/dashboard" className="md:hidden">
                <PulseMark className="h-9 w-9" animated={false} />
              </Link>
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card/70 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 sm:max-w-md"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="truncate">Search symptoms, reports, insights…</span>
                <kbd className="ml-auto hidden shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] sm:block">
                  ⌘K
                </kbd>
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-success/12 px-2.5 py-1 text-xs font-medium text-success lg:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Stable
              </span>
              <Link
                to="/app/notifications"
                aria-label={`Notifications, ${unreadCount} unread`}
                className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link to="/app/profile" className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-muted">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full gradient-brand text-xs font-semibold text-primary-foreground">
                  {user.avatarInitials}
                </span>
                <span className="hidden text-sm font-medium lg:block">{user.name}</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="page-enter px-4 pb-28 pt-5 sm:px-6 md:pb-12" key={pathname}>
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl md:hidden"
        aria-label="Mobile"
      >
        <div className="grid grid-cols-5">
          {mobileNav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px]",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground">
              <MoreHorizontal className="h-5 w-5" />
              More
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>More</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                {moreNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-sm"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
                <Link
                  to="/login"
                  className="col-span-2 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-sm"
                >
                  <HelpCircle className="h-4 w-4 shrink-0 text-primary" /> Help & about PulseAI
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <AssistantDock />
    </div>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  collapsed,
  active,
  badge = 0,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed: boolean;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary-soft text-primary"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full gradient-brand" />
      )}
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && badge > 0 && (
        <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}
