"use client";
import styles from "./index.module.css";
import Link from "next/link";
import Card from "../Card";
import { Article } from "@/types/Article";

interface CardListProps {
  cardList: Article[];
}

const CardList = ({ cardList = [] }: CardListProps) => {
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
