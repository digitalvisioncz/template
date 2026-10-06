import styles from "./Badge.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: Props) {
  return <span className={`${styles.badge} ${className || ""}`}>{children}</span>;
}
