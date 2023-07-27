"use client";
import React, { useEffect, useMemo } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import useIntersect from "../../hooks/useIntersect";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import Spinner from "../Spinner";
import { useFetchHotArticles } from "@/app/hooks/useFetchHotArticles";
import Ranking from "../Ranking";
const PAGE_SIZE = 30;

function HotArticleList() {
  const {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getNextPageIsPossible,
    isFetching,
  } = useFetchHotArticles(PAGE_SIZE);

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
            <Ranking idx={idx} key={idx}>
              <SimpleArticleListItem
                imageSrc={article.image}
                title={article.title}
                date={article.datetime}
                _id={article._id}
              ></SimpleArticleListItem>
            </Ranking>
          ))
        : null}
      {isFetching && <Spinner></Spinner>}
      <div ref={ref} className={styles.target}></div>
    </div>
  );
}

export default HotArticleList;
