import React from "react";
import styles from "./ArticleListItem.module.css";

interface ArticleListItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

function ArticleListItem({
  imageSrc,
  title,
  description,
}: ArticleListItemProps) {
  return (
    <div className={styles.article_list_item}>
      <img src={imageSrc} alt="" className={styles.article_list_item_img} />
      <div className={styles.article_list_item_text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ArticleListItem;
