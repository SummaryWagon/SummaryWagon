"use client";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";
function BackButton() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={styles.backButton}>
      {/* ">" */}
    </button>
  );
}

export default BackButton;
