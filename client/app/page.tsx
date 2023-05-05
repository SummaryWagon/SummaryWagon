import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./components/PopularKeywords/PopularKeywords";
import SearchBar from "./components/SearchBar/SearchBar";
import RealtimeSearch from "./components/RealtimeSearch";
import History from "./components/History/History";
import HotTopic from "./components/HotTopic/HotTopic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  let session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      <SearchBar session={session}></SearchBar>
      <PopularKeywords></PopularKeywords>
      <div className={styles.categories}>
        {session && <History />}
        <HotTopic />
      </div>
      <RealtimeSearch></RealtimeSearch>
    </main>
  );
}
