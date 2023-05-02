import styles from "./page.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <form method="POST" action="/api/auth/signup">
        <input
          className={styles.input}
          name="name"
          type="text"
          placeholder="nickname"
        />
        <input
          className={styles.input}
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="password"
        />
        <button className={styles.submit} type="submit">
          done 😎
        </button>
      </form>
    </div>
  );
}
