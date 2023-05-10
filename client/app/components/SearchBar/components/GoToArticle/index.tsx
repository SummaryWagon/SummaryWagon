import Link from "next/link";
import styles from "./GotoArticle.module.css";
interface GotoArticleProps {
    url: string;
}

export default function GotoArticle({ url }: GotoArticleProps) {
  return (
    <div className={styles.link}>
      <Link href={`Detail/${url}`}> 💫 Go to Article</Link>
    </div>
  );
}
