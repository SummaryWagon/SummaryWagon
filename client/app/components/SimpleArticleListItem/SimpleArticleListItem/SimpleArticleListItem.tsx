import styles from "./SimpleArticleListItem.module.css";
import Link from "next/link";
import Image from "next/image";
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
      {/* */}
      <img
        src={imageSrc}
        alt=""
        className={styles.article_list_item_img}
        height={50}
        width={50}
      />
      <div className={styles.article_list_item_text}>
        <p>{title.length > 20 ? title.substring(0, 20) + "..." : title}</p>
      </div>
    </li>
  );
}

export default SimpleArticleListItem;
