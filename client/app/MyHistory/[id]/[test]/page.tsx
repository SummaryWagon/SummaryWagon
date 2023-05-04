import Image from "next/image";
import styles from "./page.module.css";
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
      <div>
        <h1>{dummy.title}</h1>
        <p>{dummy.description}</p>
        <p>{dummy.url}</p>
        <p>{dummy.summary}</p>
        <p>{dummy.keywords}</p>
        
        {/* <Image src={dummy.image} width={100} height={100} alt=""></Image> */}

      </div>
    </main>
  );
}
