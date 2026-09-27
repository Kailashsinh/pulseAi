import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DISCLAIMER } from "@/lib/pulse/demo-data";
import type { Severity } from "@/lib/pulse/types";

export function GlassCard({
  className,
  children,
  delay = 0,
  interactive = false,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl rise-in",
        interactive && "hover-lift",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
  icon,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold sm:text-2xl">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

const severityStyles: Record<Severity, string> = {
  info: "bg-primary-soft text-primary",
  low: "bg-accent text-accent-foreground",
  moderate: "bg-warning/20 text-warning-foreground",
  high: "bg-destructive/12 text-destructive",
};

const severityLabel: Record<Severity, string> = {
  info: "Informational",
  low: "Low",
  moderate: "Moderate",
  high: "Needs attention",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const Icon = severity === "high" || severity === "moderate" ? AlertTriangle : Info;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        severityStyles[severity],
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {severityLabel[severity]}
    </span>
  );
}

export function Disclaimer({
  text = DISCLAIMER,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-xl border border-border/70 bg-muted/60 px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary float-slow">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information right now.",
  onRetry,
  onBack,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-destructive/25 bg-destructive/5 px-6 py-10 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Retry
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
          >
            Go back
          </button>
        )}
      </div>
    </div>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="glass space-y-3 rounded-2xl p-5">
      <Skeleton className="h-5 w-1/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-3.5 w-full" />
      ))}
      <Skeleton className="h-3.5 w-2/3" />
    </div>
  );
}

export function useCountUp(target: number, duration = 1100, decimals = 0) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, decimals]);
  return value;
}

export function ProgressRing({
  value,
  size = 168,
  label,
  caption,
}: {
  value: number;
  size?: number;
  label?: string;
  caption?: string;
}) {
  const animated = useCountUp(value);
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (animated / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${label ?? "Score"} ${value} out of 100`}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--muted)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-semibold tabular-nums">{Math.round(animated)}</span>
        {caption && <span className="text-xs text-muted-foreground">{caption}</span>}
      </div>
    </div>
  );
}

export function Sparkline({
  points,
  tone = "primary",
}: {
  points: number[];
  tone?: "primary" | "success" | "warning";
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 32 - ((p - min) / span) * 26 - 3;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const color =
    tone === "success"
      ? "var(--success)"
      : tone === "warning"
        ? "var(--warning)"
        : "var(--primary)";
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-10 w-full" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className="draw-line" />
    </svg>
  );
}

export function Waveform({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={cn("w-full", className)} aria-hidden="true">
      <path
        d="M0 20h30l6-13 9 26 8-19 7 13 6-7h34l6-11 9 22 8-16 7 11 6-6h54"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-line"
      />
    </svg>
  );
}
