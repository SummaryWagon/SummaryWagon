import React from "react";
import styles from "./HotKeywords.module.css";
import Link from "next/link";
const HotKeywords = () => {
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
          <Link key={keyword} href={`hot/${keyword}`}>
            <li className={styles.keyword}>{keyword}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HotKeywords;
