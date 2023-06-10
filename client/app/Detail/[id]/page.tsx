import Image from "next/image";
import styles from "./page.module.css";
import QuickLink from "@/app/components/QuickLink/QuickLink";
import Tag from "@/app/components/Tag";
import { Metadata } from "next";
import { getArticleDetails } from "@/app/api/getArticleDetails";
interface DetailProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const data = await getArticleDetails(params.id);
  return {
    title: data.title,
    description: data.description,
  };
};

export default async function Detail(props: DetailProps) {
  const result = await getArticleDetails(props.params.id);

  return (
    <>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>{result?.title}</h1>
          <ul className={styles.keyword_container}>
            {result?.categories.map((item: string, idx: number) => (
              <Tag content={item} key={idx}></Tag>
            ))}
          </ul>
          <img src={result?.image} alt="" height="400"></img>
          <h2>🔎 설명</h2>
          <p>{result?.description}</p>
          <h2>요약</h2>
          <ul className={styles.summary_container}>
            {result?.summary.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <p>
            링크 : <QuickLink link={result?.link || ""}></QuickLink>
          </p>
        </div>
      </main>
    </>
  );
}
