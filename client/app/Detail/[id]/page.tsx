import Image from "next/image";
import { ObjectId } from "mongodb";
import styles from "./page.module.css";
import BackButton from "@/app/components/BackButton";
import KeywordTag from "@/app/components/KeywordTag/KeywordTag";
import QuickLink from "@/app/components/QuickLink/QuickLink";
import { clientDB } from "@/util/database";
import { Key } from "react";
import NotFound from "@/app/not-found";
interface Article {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  link: string;
  summary: string[];
  categories: string[];
}

interface DetailProps {
  params: {
    id: string;
  };
}
export default async function Detail(props: DetailProps) {
  let db = (await clientDB).db("dbEarlyDev");
  const result = await db
    .collection("articles")
    .findOne({ _id: new ObjectId(props.params.id) });
  if (result === null) {
    return NotFound();
  }
  const article: Article | null = result
    ? {
        _id: result._id,
        title: result.title,
        description: result.description,
        image: result.image,
        link: result.link,
        summary: result.summary,
        categories: result.categories,
      }
    : null;
  return (
    <main className={styles.main}>
      {/* <BackButton></BackButton> */}
      <div>
        <h1 className={styles.title}>{result?.title}</h1>
        <ul className={styles.keyword_container}>
          {article?.categories.map((item, idx) => (
            <KeywordTag keyword={item} key={idx}></KeywordTag>
          ))}
        </ul>
        <img src={article?.image} alt="" height="400"></img>
        <h2>description</h2>
        <p>{article?.description}</p>
        <h2>Summary</h2>
        <ul className={styles.summary_container}>
          {article?.summary.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p>
          source : <QuickLink link={article?.link || ""}></QuickLink>
        </p>
      </div>
    </main>
  );
}
