
import styles from "./css/NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.heading}>404</h1>
      <h2 className={styles.subheading}>
        Oops! The page you requested could not be found
      </h2>
      <p className={styles.message}>Please check the URL and try again.</p>
      <a href="/" className={styles.link}>
        Go to homepage
      </a>
    </div>
  );
}