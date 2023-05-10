import Image from "next/image";
import styles from "./page.module.css";
import ArticleListItem from "../../components/ArticleListItem/";
const dummy = {
  title: "Ai",
  description: "Ai is the future",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRqbGDnW4-4a8vOkIQlCqvs3vYqscD3Ky1KMfe6tjiQ&s",
  url: "https://www.google.com",
  summary: ["Ai is the future", "Ai is t", "gpt"],
  keywords: ["ai", "artificial intelligence", "machine learning"],
};
export default function FavoriteTech() {
  return (
    <main className={styles.main}>
      {/* <ArticleListItem
        imageSrc={dummy.image}
        title={dummy.title}
        description={dummy.description}
      ></ArticleListItem>
      <ArticleListItem
        imageSrc={dummy.image}
        title={dummy.title}
        description={dummy.description}
      ></ArticleListItem> */}
    </main>
  );
}
