import { Children } from "react";
import styles from "./index.module.css";

interface RankingProps {
  idx: number;
  children: React.ReactNode;
}

const Ranking = ({ idx, children }: RankingProps) => {
  return (
    <div className={styles.ranking_container}>
      <div className={styles.ranking}>{idx + 1}</div>
      {children}
    </div>
  );
};

export default Ranking;
