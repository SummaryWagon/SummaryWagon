"use client";
import React, { useState, useEffect } from "react";
import styles from "./KeywordTag.module.css";
interface KeywordTagProps {
  keyword: string;
}

async function fetchData(params: any) {
  console.log("fetch in", params);
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params}`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("res", res);
  const data = await res.json();
  console.log(data);
  return data;
}

const dummy = ["AI", "Frontend", "Backend", "JavaScript"];
const KeywordTag = () => {
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  // const data = fetchData("6454fa571d3bfee7230729d9");
  // console.log(data);
  return (
    <div className={styles.keywordTag}>
      <div>
        <p className={styles.textMute}>*최근 많이 검색된 키워드 순</p>
      </div>
      <ul className={styles.keywordList}>
        {dummy.map((search, idx) => {
          if (idx === 0)
            return (
              <li key={idx} className={styles.keywordItem}>
                <span className={styles.keyword}>{search}</span>
              </li>
            );
          return (
            <li key={idx} className={styles.keywordItem}>
              <span className={styles.divide}>/</span>
              <span className={styles.keyword}>{search}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default KeywordTag;
