"use client";
import React, { useState } from "react";
import styles from "./KeywordTag.module.css";
import CardList from "../CardList";
import Pagination from "../Pagination";

interface KeywordTagProps {
  keyword: string;
}

const dummy = ["AI", "Frontend", "Backend", "JavaScript"];

const KeywordTag = () => {
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const [page , setPage] = useState<number>(1);
  const onClickKeyword = (keyword: string) => {
    console.log("key:", keyword);
    setCurrentKeyword(keyword);
  };

  const onPageChange = (page: number) => {
    console.log("page:", page);
    setPage(page);
  }
  return (
    <div className={styles.keywordTagContainer}>
      <div>
        <p className={styles.textMute}>*최근 많이 검색된 키워드 순</p>
      </div>
      <ul className={styles.keywordList}>
        {dummy.map((search, idx) => {
          const isFocused = currentKeyword === search;
          return (
            <li
              key={idx}
              className={`${styles.keywordItem}`}
              onClick={() => {
                onClickKeyword(search);
              }}
            >
              {idx !== 0 && <span className={styles.divide}>/</span>}
              <span
                className={`${styles.keyword} ${
                  isFocused ? styles.focused : ""
                }`}
              >
                {search}
              </span>
            </li>
          );
        })}
      </ul>
      <CardList keyword={currentKeyword}></CardList>
      <Pagination currentPage={page} totalPages={6} onPageChange={onPageChange}></Pagination>
    </div>
  );
};

export default KeywordTag;
