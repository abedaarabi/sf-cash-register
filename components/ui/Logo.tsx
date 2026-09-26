import React from "react";

type LogoMarkProps = {
  className?: string;
  /** Use on dark chrome (nav) so the mark doesn’t blend into the background. */
  variant?: "default" | "onDark";
};

/** Brand mark: literal “black square” (Sorte Firkant). Mirrors /public/logo.svg. */
export const LogoMark: React.FC<LogoMarkProps> = ({
  className = "h-10 w-10",
  variant = "default",
}) => {
  const onDark = variant === "onDark";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Sorte Firkant — Black Square"
    >
      {onDark ? (
        <>
          <rect width="64" height="64" rx="14" fill="#F8FAFC" />
          <rect
            x="1.25"
            y="1.25"
            width="61.5"
            height="61.5"
            rx="12.75"
            stroke="#0F172A"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />
          <rect x="16" y="16" width="32" height="32" fill="#030712" />
          <rect
            x="16"
            y="16"
            width="32"
            height="1.5"
            fill="#FFFFFF"
            fillOpacity="0.22"
          />
          <rect x="40" y="40" width="6" height="6" fill="#6366F1" />
        </>
      ) : (
        <>
          <rect width="64" height="64" rx="14" fill="#0B1120" />
          <rect
            x="1.25"
            y="1.25"
            width="61.5"
            height="61.5"
            rx="12.75"
            stroke="#FFFFFF"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />
          <rect x="16" y="16" width="32" height="32" fill="#030712" />
          <rect
            x="16"
            y="16"
            width="32"
            height="1.5"
            fill="#FFFFFF"
            fillOpacity="0.14"
          />
          <rect
            x="16"
            y="16"
            width="1.5"
            height="32"
            fill="#FFFFFF"
            fillOpacity="0.08"
          />
          <rect x="40" y="40" width="6" height="6" fill="#6366F1" />
        </>
      )}
    </svg>
  );
};

type LogoProps = LogoMarkProps & {
  /** Renders the wordmark next to the mark. */
  subtitle?: string;
  tone?: "light" | "dark";
};

export const Logo: React.FC<LogoProps> = ({
  className = "h-10 w-10",
  subtitle,
  tone = "dark",
  variant,
}) => {
  const markVariant = variant ?? (tone === "light" ? "onDark" : "default");

  return (
    <span className="flex items-center gap-3">
      <LogoMark className={className} variant={markVariant} />
      <span className="leading-tight">
        <span
          className={`block text-sm font-bold tracking-tight sm:text-base ${
            tone === "light" ? "text-white" : "text-ink"
          }`}
        >
          Sorte Firkant
        </span>
        {subtitle ? (
          <span
            className={`hidden text-xs sm:block ${
              tone === "light" ? "text-slate-400" : "text-ink-muted"
            }`}
          >
            {subtitle}
          </span>
        ) : (
          <span
            className={`hidden text-xs sm:block ${
              tone === "light" ? "text-slate-500" : "text-ink-subtle"
            }`}
          >
            Black Square
          </span>
        )}
      </span>
    </span>
  );
};
