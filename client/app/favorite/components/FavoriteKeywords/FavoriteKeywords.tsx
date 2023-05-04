import React from "react";
import styles from "./FavoriteKeywords.module.css";

const FavoriteKeywords = () => {
  const keywords = [
    "FrontEnd",
    "BackEnd",
    "AI",
    "Web design",
    "UI/UX",
    "Mobile",
    "Data science",
    "Machine learning",
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.keywords}>
        {keywords.map((keyword) => (
          <li key={keyword} className={styles.keyword}>
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteKeywords;
