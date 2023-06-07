import Image from "next/image";
import styles from "./page.module.css";
import PopularKeywords from "./components/PopularKeywords/PopularKeywords";
import SearchBar from "./components/SearchBar/SearchBar";
import RealtimeSearch from "./components/RealtimeSearch";
import History from "./components/History/History";
import HotTopic from "./components/HotTopic/HotTopic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import KeywordTag from "./components/KeywordTag/KeywordTag";
import Summary from "./components/Summary/Summary";
export default async function Home() {
  let session = await getServerSession(authOptions);
  // 세션가져올때 정보에 있어야하나? ㅇㅇ 그럴듯
  let userEmail;
  if (session) {
    userEmail = session.user.email;
  }
  console.log("메인", userEmail);
  return (
    <main className={styles.main}>
      <Summary session={session}></Summary>
      <div className={styles.categories}>
        <History userEmail={userEmail} />
        {/* <HotTopic /> */}
      </div>
      {/* <KeywordTag></KeywordTag> */}
    </main>
  );
}
