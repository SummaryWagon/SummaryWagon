import Link from "next/link";
import styles from "./GotoArticle.module.css";
import QuickLink from "@/app/components/QuickLink/QuickLink";
interface GotoArticleProps {
  url: string;
}

export default function GotoArticle({ url }: GotoArticleProps) {
  return (
    <div className={styles.link}>
      <h2> 요약 완료 🤖 </h2>
      <p className={styles.quickLink}>
        source : <QuickLink link={`detail/${url}`}></QuickLink>
      </p>
    </div>
  );
}
