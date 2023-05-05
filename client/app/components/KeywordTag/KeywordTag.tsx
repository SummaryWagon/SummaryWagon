import styles from "./KeywordTag.module.css";
interface KeywordTagProps {
  keyword: string;
}

const KeywordTag = ({ keyword }: KeywordTagProps) => {
  return <li className={styles.keyword}>{keyword}</li>;
};

export default KeywordTag;
