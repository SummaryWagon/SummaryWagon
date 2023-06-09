import styles from "./index.module.css";
import Image from "next/image";
interface CardProps {
  imageSrc: string;
  title: string;
}

function Card({ imageSrc, title }: CardProps) {
  return (
    <div className={styles.card}>
      <Image
        src={imageSrc}
        alt=""
        width={150}
        height={100}
        className={styles.cardImg}
      />
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
  );
}

export default Card;
