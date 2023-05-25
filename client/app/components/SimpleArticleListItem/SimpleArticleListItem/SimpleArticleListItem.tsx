import styles from "./SimpleArticleListItem.module.css";
import Link from "next/link";
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
          <p>{title.length > 20 ? title.substring(0,20) + '...' : title}</p>
        </div>

    </li>
  );
}

export default SimpleArticleListItem;
