"use client";
import styles from "./page.module.css";

export default function Register() {
  const submitHandler = async (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    alert("success");
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <form method="POST" onSubmit={submitHandler}>
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
