"use client";
import React, { useEffect, useMemo } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { useFetchArticles } from "../../hooks/useFetchArticles";
import useIntersect from "../../hooks/useIntersect";
import ArticleListItem from "../ArticleListItem";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import Spinner from "../Spinner";
import { access } from "fs";

const PAGE_SIZE = 30;

function ArticleList() {
  // console.log("드개재~~~");
  const {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getNextPageIsPossible,
    isFetching,
  } = useFetchArticles({
    size: PAGE_SIZE,
  });

  const articles = useMemo(() => {
    console.log("articles");
    console.log(getBoard?.pages);
    if (getBoard?.pages) {
      return getBoard.pages!.flatMap(({ board_page }: any) => board_page);
    }
    return [];
  }, [getBoard]);

  console.log('useMemo',articles)
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (getNextPageIsPossible && !isFetching) {
      getNextPage();
    }
  });


  return (
    <div>
      {/* {getBoardIsSuccess && getBoard!.pages
        ? getBoard!.pages.map((page_data, page_num) => {
            const board_page = page_data!.board_page;
            return board_page.map((article, idx) => (
              <SimpleArticleListItem
                key={article.name}
                imageSrc={article.url}
                title={article.name}
                // id={article._id}\
              ></SimpleArticleListItem>
            ));
          })
        : null} */}
      {/* {getBoardIsSuccess && articles.length > 0
        ? articles.map((article, idx) => (
          <SimpleArticleListItem
            key={article.name}
            imageSrc={article.url}
            title={article.name}
            // id={article._id}
          ></SimpleArticleListItem>
        ))
        : null} */}
      {isFetching && <Spinner></Spinner>}
      <div ref={ref} className={styles.target}></div>
    </div>
  );
}

export default ArticleList;
