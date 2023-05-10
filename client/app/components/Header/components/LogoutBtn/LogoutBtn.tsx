"use client";
import { signOut } from "next-auth/react";
import styles from "./LogoutBtn.module.css";
export default function LogoutBtn() {
  return (
    <button
      className={styles.logout}
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
