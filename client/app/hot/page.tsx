import Image from "next/image";
import styles from "./page.module.css";
import ArticleList from "../components/ArticleList";
import RightArrowIcon from "@/public/icon/RightArrowIcon.svg";
import HotArticleList from "../components/HotArticleList";
import { Metadata } from "next";


export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  return {
    title: '트렌드 토픽',
    description: 'SummaryWagon에서 가장 인기있는 토픽을 확인해보세요!',
  };
};

async function fetchData() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${10}&offset=${10 * 2}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export default async function Hot() {
  return <main className={styles.main}>{<HotArticleList />}</main>;
}
