import React from "react";
import { LogoMark } from "../ui/Logo";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const AuthShell: React.FC<AuthShellProps> = ({
  title,
  subtitle,
  badge = "Sorte Firkant",
  children,
  footer,
}) => (
  <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-80 w-80 rounded-full bg-sky-300/25 blur-3xl"
    />

    <div className="relative w-full max-w-md animate-slide-up">
      <div className="card p-6 sm:p-8">
        <div className="mb-7 flex flex-col items-center text-center">
          <LogoMark className="h-14 w-14" />
          <span className="mt-4 pill bg-brand-50 text-brand-700">{badge}</span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>
          ) : null}
        </div>

        {children}
      </div>

      {footer ? (
        <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>
      ) : null}
    </div>
  </div>
);
