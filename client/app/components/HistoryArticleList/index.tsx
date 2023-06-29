"use client";
import React, { useEffect, useMemo } from "react";
import styles from "./index.module.css";
import useIntersect from "../../hooks/useIntersect";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import Spinner from "../Spinner";
import { useFetchHistoryArticles } from "@/app/hooks/useFetchHistoryArticles";
import Ranking from "../Ranking";
const PAGE_SIZE = 30;
interface HistoryArticleListProps {
  email: string;
}

function HistoryArticleList({ email }: HistoryArticleListProps) {
  const {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getNextPageIsPossible,
    isFetching,
  } = useFetchHistoryArticles(PAGE_SIZE, email);

  const articles = useMemo(() => {
    if (getBoard?.pages) {
      return getBoard.pages!.flatMap(({ board_page }: any) => board_page);
    }
    return [];
  }, [getBoard]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (getNextPageIsPossible && !isFetching) {
      getNextPage();
    }
  });

  return (
    <div>
      {getBoardIsSuccess && articles.length > 0
        ? articles.map((article, idx) => (
            <SimpleArticleListItem
              key={article._id}
              imageSrc={article.image}
              title={article.title}
              date={article.datetime}
              _id={article._id}
            ></SimpleArticleListItem>
          ))
        : null}
      {isFetching && <Spinner></Spinner>}
      <div ref={ref} className={styles.target}></div>
    </div>
  );
}

export default HistoryArticleList;
