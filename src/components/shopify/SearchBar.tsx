import styles from "./SearchBar.module.css";

type Props = {
  initialQuery?: string;
};

export default function SearchBar({ initialQuery = "" }: Props) {
  return (
    <form action="/search" method="get" className={styles.searchBar}>
      <input
        type="text"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search products..."
        className={styles.input}
      />
      <button type="submit" className={styles.submit}>
        Search
      </button>
    </form>
  );
}
