// 'use client'
import styles from "./HotTopic.module.css";
import Link from "next/link";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import { clientDB } from "@/util/database";

// export const dynamic = "force-dynamic";

type HotTopicProps = {};

const HotTopic = async (props: HotTopicProps) => {
  let db = (await clientDB).db("dbEarlyDev");
  let result = await db.collection("articles").find({}).toArray();
  return (
    <div className={styles.main_container}>
      <Link href="/hot">
        <h1> 🔥 Hot Topic </h1>
      </Link>
      <ul className={styles.ul}>
        {result.map((item, idx) => {
          if (idx > 3) return;
          return (
            <Link
              href={`Detail/${item._id.toString()}`}
              key={item._id.toString()}
            >
              <SimpleArticleListItem
                imageSrc={item.image}
                title={item.title}
              ></SimpleArticleListItem>
            </Link>
          );
        })}
      </ul>
      <div className={styles.scrollButtonContainer}>
        <button className={styles.scrollButton}>
          <Link href="/hot">🔎</Link>
        </button>
      </div>
    </div>
  );
};

export default HotTopic;


// async function fetchData(params:any) {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
// }