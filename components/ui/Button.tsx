import Link from "next/link";
import classes from "./button.module.css";
export const Button = ({
  children,
  href,
  onClick,
  disabled,
  style,
  ...props
}: any) => {
  if (href) {
    return (
      <div className={classes.btn}>
        <Link href={href}>{children}</Link>
      </div>
    );
  }
  return (
    <button
      style={style}
      className={classes.btn}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
