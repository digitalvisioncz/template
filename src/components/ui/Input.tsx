import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, id, ...props }: Props) {
  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <input id={id} className={styles.input} {...props} />
    </label>
  );
}
