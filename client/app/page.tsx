import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          🔥 hits <span>-&gt;</span>
        </h1>
      </div>


      <div className={styles.grid}>
        인기 검색어
      </div>
    </main>
  );
}
