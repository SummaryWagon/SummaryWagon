"use client";
import styles from "./index.module.css";
function RemainingCount() {
  return (
    <div>
      <p className={styles.general_text}>
        오늘 <span className={styles.remain_text}>남은</span> 기회 : &nbsp;
        <span className={styles.remain_text}>{3}</span> / {5} 🤖
      </p>
    </div>
  );
}

export default RemainingCount;
