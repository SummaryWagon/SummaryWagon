import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./PopularKeywords/PopularKeywords";
import SearchBar from "./SearchBar/SearchBar";
export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar></SearchBar>
      <div>
        <PopularKeywords></PopularKeywords>
      </div>
      <div className={styles.description}>
        <h1>
          🚀 favorite tech <span>-&gt;</span>
        </h1>
      </div>
    </main>
  );
}
