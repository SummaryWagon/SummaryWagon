import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./PopularKeywords/PopularKeywords";
import SearchBar from "./SearchBar/SearchBar";
import RealtimeSearch from "./RealtimeSearch/RealtimeSearch";
export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar></SearchBar>
      <div>
        <PopularKeywords></PopularKeywords>
      </div>
      <div className={styles.categories}>
        <div>
          <h1>🚀 favorite tech</h1>
          <ul>
            <li>React</li>
            <li>Vue</li>
            <li>Angular</li>
          </ul>
        </div>
        <div>
          <h1>🔥 hot tech</h1>
          <ul>
            <li>ai</li>
            <li>web design</li>
            <li>ui/ux</li>
          </ul>
        </div>
      </div>
      <RealtimeSearch></RealtimeSearch>
    </main>
  );
}
