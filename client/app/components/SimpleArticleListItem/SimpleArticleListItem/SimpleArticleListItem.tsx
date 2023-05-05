import React from "react";
import styles from "./SimpleArticleListItem.module.css";

interface SimpleArticleListItemProps {
  imageSrc: string;
  title: string;
}

function SimpleArticleListItem({
  imageSrc,
  title,
}: SimpleArticleListItemProps) {
  return (
    <li className={styles.article_list_item}>
      <img src={imageSrc} alt="" className={styles.article_list_item_img} />
      <div className={styles.article_list_item_text}>
        <h3>{title}</h3>
      </div>
    </li>
  );
}

export default SimpleArticleListItem;