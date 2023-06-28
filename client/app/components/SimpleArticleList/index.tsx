import styles from "./index.module.css";
import Link from "next/link";
import { Article } from "@/types/Article";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import Spinner from "../Spinner";

interface SimpleArticleListProps {
  articles: Article[];
}

function SimpleArticleList({ articles = [] }: SimpleArticleListProps) {
  return (
    <>
      {articles.length === 0 ? (
        <div className={styles.empty}>
          <p>삐비비빅.. 현재 카테고리가 비어있습니다.</p>
          <p>지금 바로 SummaryWagon을 이용해보세요🤖</p>
        </div>
      ) : (
        <ul className={styles.ul}>
          {articles.map((item: Article) => (
            <Link key={item.title} href={`detail/${item._id}`}>
              <SimpleArticleListItem
                key={item._id.toString()}
                _id={item._id.toString()}
                imageSrc={item.image}
                title={
                  item.title.length > 25
                    ? item.title.slice(0, 25) + "..."
                    : item.title
                }
                date={item.datetime}
              ></SimpleArticleListItem>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}

export default SimpleArticleList;
