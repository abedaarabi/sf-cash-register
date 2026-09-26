import React from "react";

type Tone = "brand" | "amber" | "emerald" | "rose" | "sky" | "neutral";

const tones: Record<Tone, { wrap: string; icon: string; value: string }> = {
  brand: {
    wrap: "border-brand-100 bg-brand-50/70",
    icon: "bg-brand-100 text-brand-700",
    value: "text-brand-800",
  },
  amber: {
    wrap: "border-amber-200 bg-amber-50/80",
    icon: "bg-amber-100 text-amber-700",
    value: "text-amber-900",
  },
  emerald: {
    wrap: "border-emerald-200 bg-emerald-50/80",
    icon: "bg-emerald-100 text-emerald-700",
    value: "text-emerald-800",
  },
  rose: {
    wrap: "border-rose-200 bg-rose-50/80",
    icon: "bg-rose-100 text-rose-700",
    value: "text-rose-800",
  },
  sky: {
    wrap: "border-sky-200 bg-sky-50/80",
    icon: "bg-sky-100 text-sky-700",
    value: "text-sky-800",
  },
  neutral: {
    wrap: "border-line bg-surface",
    icon: "bg-surface-sunken text-ink-muted",
    value: "text-ink",
  },
};

type StatTileProps = {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  tone?: Tone;
  hint?: string;
  action?: React.ReactNode;
};

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  icon,
  tone = "neutral",
  hint,
  action,
}) => {
  const style = tones[tone];

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 shadow-card ${style.wrap}`}
    >
      {icon ? (
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {label}
        </p>
        <p
          className={`truncate text-lg font-bold tabular-nums sm:text-xl ${style.value}`}
        >
          {value}
        </p>
        {hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};
