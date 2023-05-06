import styles from "./HotTopic.module.css";
import Link from "next/link";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import { clientDB } from "@/util/database";

const HotTopic = async () => {
  let db = (await clientDB).db("dbEarlyDev");
  let result = await db.collection("articles").find({}).toArray();
  return (
    <div>
      <Link href="/hot">
        <h1> 🔥 Hot Topic </h1>
      </Link>
      <ul className={styles.ul}>
        {result.map((item) => (
          <Link href={`Detail/${item._id.toString()}`} key={item._id.toString()}>
            <SimpleArticleListItem
              imageSrc={item.image}
              title={item.title}
            ></SimpleArticleListItem>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HotTopic;
