import styles from "./index.module.css";
import Image from "next/image";
interface TagProps {
  content: string;
}

function Tag({ content }: TagProps) {
  return (
    <div className={styles.tag}>
      <p className={styles.tag_content}>{content}</p>
    </div>
  );
}

export default Tag;
