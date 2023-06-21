"use client";
import styles from "./index.module.css";
import Link from "next/link";
import { clientDB } from "@/util/database";
import Card from "../Card";
import { useEffect, useState } from "react";
import { getKeywordArticle } from "@/app/api/getKeywordArticle";
import useFetchKeywordArticles from "@/app/hooks/useFetchKeywordArticles";
import { Article } from "@/types/Article";

const CARDLIST_SIZE = 15;
interface CardListProps {
  cardList: Article[];
}

const CardList = ({ cardList = [] }: CardListProps) => {
  console.log("카드리스트 시점", cardList);
  if (cardList === undefined) {
    console.log("이렇게해도 안되는디?");
    return <div>로딩중</div>;
  }
  return (
    <div className={styles.cardContainer}>
      {cardList.length > 0 &&
        cardList.map((item, idx) => {
          return (
            <Link href={`detail/${item._id.toString()}`} key={idx}>
              <Card imageSrc={item.image} title={item.title}></Card>
            </Link>
          );
        })}
    </div>
  );
};

export default CardList;
