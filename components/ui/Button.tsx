import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-card hover:bg-brand-700 hover:shadow-card-hover",
  secondary:
    "border border-line bg-surface text-ink hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700",
  subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  ghost: "text-ink-muted hover:bg-surface-sunken hover:text-ink",
  danger: "bg-rose-600 text-white shadow-card hover:bg-rose-700",
  success: "bg-emerald-600 text-white shadow-card hover:bg-emerald-700",
};

const sizes: Record<Size, string> = {
  sm: "min-h-[2.25rem] px-3 text-xs",
  md: "min-h-[2.75rem] px-4 text-sm",
  lg: "min-h-[3rem] px-5 text-base",
};

type ButtonProps = {
  children?: React.ReactNode;
  href?: any;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  [key: string]: any;
};

export const Button = ({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  fullWidth,
  className,
  style,
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const classes = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon}
      {children}
      {trailingIcon}
    </>
  );

  if (href) {
    return (
      <Link href={href}>
        <a className={classes} style={style} onClick={onClick} {...props}>
          {content}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};
