import React from "react";
import styles from "./ArticleListItem.module.css";

function ArticleListItem({ imageSrc, title, description }) {
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
