import React from "react";
import styles from "./page.module.css";

const PopularKeywords = () => {
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
      <h1 className={styles.title}>⭐️ hits </h1>
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

export default PopularKeywords;
