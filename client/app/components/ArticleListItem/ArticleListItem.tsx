import React from "react";
import styles from "./ArticleListItem.module.css";
import Link from "next/link";
interface ArticleListItemProps {
  imageSrc: string;
  title: string;
  description: string;
  id: string;
}

function ArticleListItem({
  imageSrc,
  title,
  description,
  id
}: ArticleListItemProps) {
  return (
    <Link href={`Detail/${id}`}>
      <div className={styles.article_list_item}>
        <img src={imageSrc} alt="" className={styles.article_list_item_img} />
        <div className={styles.article_list_item_text}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ArticleListItem;
