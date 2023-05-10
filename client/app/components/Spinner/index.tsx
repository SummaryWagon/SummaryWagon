import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.styled_spinner}></div>
    </div>
  );
}
