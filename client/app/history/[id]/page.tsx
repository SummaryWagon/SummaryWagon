import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ArticleListItem from "../components/ArticleListItem/ArticleListItem";
const dummy = [
  {
    title: "Ai",
    description: "Ai is the future",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRqbGDnW4-4a8vOkIQlCqvs3vYqscD3Ky1KMfe6tjiQ&s",
    url: "https://www.google.com",
    summary: ["Ai is the future", "Ai is t", "gpt"],
    keywords: ["ai", "artificial intelligence", "machine learning"],
  },
  {
    title: "Ai 2",
    description: "Ai is the future",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRqbGDnW4-4a8vOkIQlCqvs3vYqscD3Ky1KMfe6tjiQ&s",
    url: "https://www.google.com",
    summary: ["Ai is the future", "Ai is t", "gpt"],
    keywords: ["ai", "artificial intelligence", "machine learning"],
  },
];
export default function FavoriteTech() {
  return (
    <main className={styles.main}>
      {dummy.map((item, idx) => (
        <Link href={`detail/${idx}`} key={idx}>
          <ArticleListItem
            imageSrc={item.image}
            title={item.title}
            description={item.description}
          ></ArticleListItem>
        </Link>
      ))}
    </main>
  );
}
