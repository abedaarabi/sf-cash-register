import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

type SectionCardProps = CardProps & {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  bodyClassName?: string;
};

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  action,
  children,
  className = "",
  bodyClassName = "",
}) => (
  <section className={`card overflow-hidden ${className}`}>
    <header className="flex items-center justify-between gap-3 border-b border-line bg-surface-muted/70 px-4 py-3">
      <h2 className="section-title">
        {icon ? <span className="text-brand-600">{icon}</span> : null}
        {title}
      </h2>
      {action}
    </header>
    <div className={`p-4 ${bodyClassName}`}>{children}</div>
  </section>
);
