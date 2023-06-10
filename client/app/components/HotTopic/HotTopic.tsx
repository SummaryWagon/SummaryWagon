"use client";
import styles from "./HotTopic.module.css";
import Link from "next/link";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import Image from "next/image";
import HotTopicIcon from "@/public/icon/HotTopicIcon.svg";
import RightArrowIcon from "@/public/icon/RightArrowIcon.svg";
import useMainTopic from "@/app/hooks/useMainTopic";
import { Article } from "@/types/Article";
import Spinner from "../Spinner";

const HotTopic = () => {
  const { data: topics, isLoading, isError } = useMainTopic();
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
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={styles.ul}>
          {topics.map((item: Article, idx: number) => {
            if (idx > 3) return;
            return (
              <SimpleArticleListItem
                key={item._id.toString()}
                _id={item._id.toString()}
                imageSrc={item.image}
                title={item.title}
                date={item.datetime}
              ></SimpleArticleListItem>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HotTopic;
