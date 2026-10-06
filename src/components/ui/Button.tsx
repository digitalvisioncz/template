import { Link } from "react";
import type { ReactNode } from "react";
import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  href,
  children,
  ...props
}: Props) {
  if (href) {
    return (
      <Link to={href} className={`${styles.button} ${styles[variant]}`}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
