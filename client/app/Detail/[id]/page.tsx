import Image from "next/image";
import styles from "./page.module.css";
import BackButton from "@/app/components/BackButton";
import KeywordTag from "@/app/components/KeywordTag/KeywordTag";
import QuickLink from "@/app/components/QuickLink/QuickLink";
const dummy = {
  title: "Ai is the future",
  description:
    "Artificial Intelligence (AI) has become one of the most exciting and rapidly developing fields in recent years. It is the science and engineering of creating intelligent machines that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. The concept of AI has been around for many years, but recent advancements in computing power, data storage, and algorithms have brought it to the forefront of modern technology",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRqbGDnW4-4a8vOkIQlCqvs3vYqscD3Ky1KMfe6tjiQ&s",
  url: "https://www.google.com",
  summary: ["Ai is the future", "Ai is t", "gpt"],
  keywords: ["ai", "artificial intelligence", "machine learning"],
};
export default function Detail() {
  return (
    <main className={styles.main}>
      {/* <BackButton></BackButton> */}
      <div>
        <h1 className={styles.title}>{dummy.title}</h1>
        <ul className={styles.keyword_container}>
          {dummy.keywords.map((item, idx) => (
            <KeywordTag keyword={item} key={idx}></KeywordTag>
          ))}
        </ul>
        <img src={dummy.image} alt="" height="400"></img>
        <h2>description</h2>
        <p>{dummy.description}</p>
        <h2>Summary</h2>
        <ul className={styles.summary_container}>
          {dummy.summary.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p>
          source : <QuickLink link={dummy.url}></QuickLink>
        </p>
        {/* <Image src={dummy.image} width={100} height={100} alt=""></Image> */}
      </div>
    </main>
  );
}
