import React from "react";
import styles from "./FavoriteKeywords.module.css";
import Link from "next/link";
const FavoriteKeywords = ({}) => {
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
          <Link key={keyword} href={`${MyHistory}/${keyword}`}>
            <li className={styles.keyword}>{keyword}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteKeywords;
