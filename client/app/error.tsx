"use client";
import styles from "./Error.module.css";

type ErrorProps = {
  error: string;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Error !</h4>
      <p className={styles.message}>detail: {error}</p>
      <button className={styles.button} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
