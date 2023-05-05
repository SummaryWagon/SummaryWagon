import Image from "next/image";
import styles from "./page.module.css";
import BackButton from "@/app/components/BackButton";
import KeywordTag from "@/app/components/KeywordTag/KeywordTag";
const dummy = {
  title: "Ai",
  description: "Ai is the future",
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
        <h1>{dummy.title}</h1>
        <ul>
          {dummy.keywords.map((item, idx) => (
            <KeywordTag keyword={item} key={idx}></KeywordTag>
          ))}
        </ul>
        <img src={dummy.image} alt=""></img>
        <p>{dummy.description}</p>
        <p>{dummy.url}</p>
        <ul>
          {dummy.summary.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* <Image src={dummy.image} width={100} height={100} alt=""></Image> */}
      </div>
    </main>
  );
}
