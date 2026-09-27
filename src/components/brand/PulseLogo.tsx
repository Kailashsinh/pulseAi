import { cn } from "@/lib/utils";

export function PulseMark({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative grid place-items-center rounded-xl gradient-brand shadow-[var(--shadow-soft)]",
        animated && "pulse-ring",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="h-[62%] w-[62%]" fill="none">
        <path
          d="M3 17h5.2l2.6-6.4 3.6 12.2 3-8.4 2.1 2.6H29"
          stroke="currentColor"
          className="text-primary-foreground"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="25.5"
          cy="8.5"
          r="2.6"
          className="fill-primary-foreground/90"
        />
      </svg>
    </span>
  );
}

export function PulseLogo({
  className,
  size = "md",
  showTagline = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}) {
  const mark = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const text =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PulseMark className={mark} />
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn("font-semibold tracking-tight", text)}>
          Pulse<span className="gradient-text">AI</span>
        </span>
        {showTagline && (
          <span className="mt-1 truncate text-xs text-muted-foreground">
            Understand your health over time
          </span>
        )}
      </span>
    </span>
  );
}
