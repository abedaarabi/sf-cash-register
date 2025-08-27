import Link from "next/link";
import classes from "./button.module.css";
export const Button = ({
  children,
  href,
  onClick,
  disabled,
  style,
  className,
  ...props
}: any) => {
  const mergedClassName = `${classes.btn}${className ? ` ${className}` : ""}`;
  if (href) {
    return (
      <button className={mergedClassName} style={{ ...style }}>
        <Link href={href}>{children}</Link>
      </button>
    );
  }
  return (
    <button
      style={{ ...style }}
      className={mergedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
