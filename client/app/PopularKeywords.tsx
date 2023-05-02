import React from "react";
import styles from "./PopularKeywords.module.css";

const PopularKeywords = () => {
  const keywords = [
    "프론트엔드 개발자",
    "리액트",
    "자바스크립트",
    "웹 디자인",
    "UI/UX",
    "모바일 앱 개발",
    "데이터 분석",
    "인공지능",
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>인기 검색어</h2>
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
