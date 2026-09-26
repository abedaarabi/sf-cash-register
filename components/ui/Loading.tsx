import React from "react";

type SpinnerProps = {
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ className = "h-6 w-6" }) => (
  <span
    role="status"
    aria-label="Loading"
    className={`inline-block animate-spin rounded-full border-2 border-brand-100 border-t-brand-600 ${className}`}
  />
);

type PageLoaderProps = {
  label?: string;
};

export const PageLoader: React.FC<PageLoaderProps> = ({
  label = "Loading…",
}) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
    <Spinner className="h-9 w-9" />
    <p className="text-sm font-medium text-ink-muted">{label}</p>
  </div>
);
