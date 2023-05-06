import Image from "next/image";
import styles from "./page.module.css";
import { clientDB } from "@/util/database";
import ArticleListItem from "../components/ArticleListItem/ArticleListItem";
export const dynamic = "force-dynamic";

export default async function MyHistory() {
  let db = (await clientDB).db("dbEarlyDev");
  let result = await db.collection("articles").find({}).toArray();
  return (
    <main className={styles.main}>
      {result &&
        result.map((article) => {
          return (
            <ArticleListItem
              key={article._id.toString()}
              id={article._id.toString()}
              title={article.title}
              description={article.description}
              imageSrc={article.image}
            />
          );
        })}
    </main>
  );
}
