import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./PopularKeywords/PopularKeywords";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <PopularKeywords></PopularKeywords>
      </div>
      <div className={styles.description}>
        <h1>
          🔥 hits <span>-&gt;</span>
        </h1>
      </div>
    </main>
  );
}
