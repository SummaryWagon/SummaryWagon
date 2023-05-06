import styles from "./HotTopic.module.css";
import Link from "next/link";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import { clientDB } from "@/util/database";

export const dynamic = "force-dynamic";

type HotTopicProps = {};

const HotTopic = async (props: HotTopicProps): Promise<JSX.Element> => {
  let db = (await clientDB).db("dbEarlyDev");
  let result = await db.collection("articles").find({}).toArray();
  return (
    <div>
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
    </div>
  );
};

export default HotTopic;
