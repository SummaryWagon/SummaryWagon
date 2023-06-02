"use client";
import React, { useEffect, useMemo } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { useFetchArticles } from "../../hooks/useFetchArticles";
import useIntersect from "../../hooks/useIntersect";
import ArticleListItem from "../ArticleListItem";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import Spinner from "../Spinner";

const PAGE_SIZE = 30;

function ArticleList() {
  console.log("드개재~~~");
  const {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getNextPageIsPossible,
    isFetching,
  } = useFetchArticles({
    size: PAGE_SIZE,
  });
  console.log(getBoard);

  // const articles = useMemo(
  //   () =>
  //     getBoard?.pages[0]
  //       ? getBoard.pages[0]!.board_page.flatMap(({ data }: any) => data.name)
  //       : [],
  //   [getBoard]
  // );

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (getNextPageIsPossible && !isFetching) {
      getNextPage();
    }
  });
  // useEffect(() => {
  //   console.log("ArticleList");
  //   const fetchData = async () => {
  //     const res = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon?limit=${10}&offset=${10 * 2}`,
  //       {
  //         method: "get",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      {getBoardIsSuccess && getBoard!.pages
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
        : null}
      {isFetching && <Spinner></Spinner>}
      <div ref={ref} className={styles.target}></div>
    </div>
  );
}

export default ArticleList;
