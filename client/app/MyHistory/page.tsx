import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import HistoryArticleList from "../components/HistoryArticleList";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  return {
    title: "히스토리",
    description: "지금까지 SummaryWagon에서 요약한 기사들을 확인해보세요!",
  };
};
export default async function MyHistory() {
   let session = await getServerSession(authOptions);
  return (
    <main className={styles.main}>
      <HistoryArticleList email={session?.user.email}/>
    </main>
  );
}
