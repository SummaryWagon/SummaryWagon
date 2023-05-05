import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./components/PopularKeywords/PopularKeywords";
import SearchBar from "./components/SearchBar/SearchBar";
import RealtimeSearch from "./components/RealtimeSearch";
import History from "./components/History/History";
import HotTopic from "./components/HotTopic/HotTopic";
const myDummy = {};

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar></SearchBar>
      <PopularKeywords></PopularKeywords>
      <div className={styles.categories}>
        <History/>
        <HotTopic/>
      </div>
      <RealtimeSearch></RealtimeSearch>
    </main>
  );
}
