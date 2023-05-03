"use client";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";

export default function LoginBtn() {
  return (
    <button
      className={styles.login}
      onClick={() => {
        signIn();
      }}
    >
      Login
    </button>
  );
}
