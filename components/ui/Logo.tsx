import React from "react";

type LogoMarkProps = {
  className?: string;
};

/** Brand mark: the "black square" holding a cocktail glass. Mirrors /public/logo.svg. */
export const LogoMark: React.FC<LogoMarkProps> = ({
  className = "h-10 w-10",
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    role="img"
    aria-label="Sorte Firkant"
  >
    <defs>
      <linearGradient
        id="sfTile"
        x1="4"
        y1="2"
        x2="60"
        y2="62"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1F2937" />
        <stop offset="1" stopColor="#030712" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="15" fill="url(#sfTile)" />
    <rect
      x="1.25"
      y="1.25"
      width="61.5"
      height="61.5"
      rx="13.75"
      stroke="#FFFFFF"
      strokeOpacity="0.14"
      strokeWidth="1.5"
    />
    <path d="M15.5 17h33L34 34.8V44h-4v-9.2z" fill="#FFFFFF" />
    <rect x="21.5" y="43.5" width="21" height="4.5" rx="2.25" fill="#FFFFFF" />
    <path d="M15.5 17h33l-5.2 5H20.7z" fill="#6366F1" />
  </svg>
);

type LogoProps = LogoMarkProps & {
  /** Renders the wordmark next to the mark. */
  subtitle?: string;
  tone?: "light" | "dark";
};

export const Logo: React.FC<LogoProps> = ({
  className = "h-10 w-10",
  subtitle,
  tone = "dark",
}) => (
  <span className="flex items-center gap-3">
    <LogoMark className={className} />
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
      ) : null}
    </span>
  </span>
);
