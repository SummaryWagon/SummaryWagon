import Image from "next/image";
import styles from "./page.module.css";
import { clientDB } from "@/util/database";
import ArticleList from "../components/ArticleList";
export const dynamic = "force-dynamic";

export default async function Hot() {
  // let db = (await clientDB).db("dbEarlyDev");
  // let result = await db.collection("articles").find({}).toArray();
  return (
    <main className={styles.main}>
      <ArticleList></ArticleList>
    </main>
  );
}
