"use client";
import React, { useEffect, useState } from "react";
import styles from "./KeywordTag.module.css";
import CardList from "../CardList";
import Pagination from "../Pagination";
import { getKeyword } from "@/app/api/getKeyword";
import useFetchKeywordArticles from "@/app/hooks/useFetchKeywordArticles";
import Spinner from "../Spinner";

const CARDLIST_SIZE = 15;

interface KeywordTagProps {
  keywords: string[];
}

const KeywordTag = ({ keywords }: KeywordTagProps) => {
  const [currentKeyword, setCurrentKeyword] = useState<string>(
    Object.keys(keywords)[0]
  );
  const [page, setPage] = useState<number>(1);

  const {
    data: cardList,
    isLoading,
    isError,
  } = useFetchKeywordArticles(currentKeyword, CARDLIST_SIZE, page);

  console.log("카드 리스트", cardList);
  const onClickKeyword = (keyword: string) => {
    setCurrentKeyword(keyword);
    setPage(1);
  };

  const onPageChange = (page: number) => {
    console.log("page:", page);
    if (page < 1 || page > 6) {
      return;
    }
    setPage(page);
  };

  useEffect(() => {
    const fetchKeywordArticles = async () => {};
    fetchKeywordArticles();
  }, []);

  return (
    <div className={styles.keywordTagContainer}>
      <div>
        <p className={styles.textMute}>*최근 많이 검색된 키워드 순</p>
      </div>
      <ul className={styles.keywordList}>
        {Object.keys(keywords).map((search, idx) => {
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
      {isLoading ? (
        <Spinner />
      ) : (
        <CardList cardList={cardList}></CardList>
      )}
      <Pagination
        currentPage={page}
        totalPages={6}
        onPageChange={onPageChange}
      ></Pagination>
    </div>
  );
};

export default KeywordTag;
