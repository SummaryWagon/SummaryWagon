import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./components/PopularKeywords/PopularKeywords";
import SearchBar from "./components/SearchBar/SearchBar";
import RealtimeSearch from "./components/RealtimeSearch/RealtimeSearch";
import History from "./components/History/History";
const myDummy = {};

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar></SearchBar>
      <PopularKeywords></PopularKeywords>
      <div className={styles.categories}>
        <History></History>
        <div>
          <h1>🔥 hot topic</h1>
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
