import * as React from "react";
import {
  IconCheckCircle,
  IconClose,
  IconInfo,
  IconWarning,
  IconXCircle,
} from "./ui/icons";

type Severity = "success" | "error" | "warning" | "info";

interface Props {
  severity: any;
  msg: string;
  onClose?: () => void;
  className?: string;
}

const tones: Record<Severity, { box: string; icon: React.ReactNode }> = {
  success: {
    box: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: <IconCheckCircle className="h-5 w-5 text-emerald-600" />,
  },
  error: {
    box: "border-rose-200 bg-rose-50 text-rose-800",
    icon: <IconXCircle className="h-5 w-5 text-rose-600" />,
  },
  warning: {
    box: "border-amber-200 bg-amber-50 text-amber-800",
    icon: <IconWarning className="h-5 w-5 text-amber-600" />,
  },
  info: {
    box: "border-brand-200 bg-brand-50 text-brand-800",
    icon: <IconInfo className="h-5 w-5 text-brand-600" />,
  },
};

export const Alerts: React.FC<Props> = ({
  severity,
  msg,
  onClose,
  className = "",
}) => {
  const tone = tones[(severity as Severity) in tones ? (severity as Severity) : "info"];

  return (
    <div
      role="alert"
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-card ${tone.box} ${className}`}
    >
      <span className="shrink-0">{tone.icon}</span>
      <p className="min-w-0 flex-1 break-words">{msg}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 rounded-lg p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100"
        >
          <IconClose className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
