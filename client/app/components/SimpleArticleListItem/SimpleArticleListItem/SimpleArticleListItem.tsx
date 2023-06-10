import styles from "./SimpleArticleListItem.module.css";
import Link from "next/link";
import Image from "next/image";
import ElapsedTime from "../../ElapsedMinute";
interface SimpleArticleListItemProps {
  imageSrc: string;
  title: string;
  date: string;
  _id: string;
}

function SimpleArticleListItem({
  imageSrc,
  title,
  date,
  _id,
}: SimpleArticleListItemProps) {
  return (
    <li className={styles.item_container}>
      <Link href={`/detail/${_id}`}>
        <div className={styles.article_list_item}>
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
        </div>
      </Link>
      <ElapsedTime date={date}></ElapsedTime>
    </li>
  );
}

export default SimpleArticleListItem;
