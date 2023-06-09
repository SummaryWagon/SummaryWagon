// 'use client'
import styles from "./HotTopic.module.css";
import Link from "next/link";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import { clientDB } from "@/util/database";
import Image from "next/image";
import HotTopicIcon from "@/public/icon/HotTopicIcon.svg";
import RightArrowIcon from "@/public/icon/RightArrowIcon.svg";

// export const dynamic = "force-dynamic";

type HotTopicProps = {};

const HotTopic = async (props: HotTopicProps) => {
  let db = (await clientDB).db("dbEarlyDev");
  let result = await db.collection("articles").find({}).toArray();
  return (
    <div className={styles.main_container}>
      <div className={styles.title_main_container}>
        <div>
          <Link href={"/hot"} className={styles.title_container}>
            <Image
              className={styles.logo}
              src={HotTopicIcon}
              height={30}
              width={30}
              alt=""
            ></Image>
            <h2 className={styles.title}>트렌드 토픽</h2>
          </Link>
        </div>
        <Link href={"/hot"}>
          <Image
            className={styles.arrowIcon}
            src={RightArrowIcon}
            height={20}
            width={20}
            alt=""
          ></Image>
        </Link>
      </div>
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

// async function fetchData(params:any) {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
// }
