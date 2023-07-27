import Image from "next/image";
import styles from "./page.module.css";
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


export default async function Hot() {
  return <main className={styles.main}>{<HotArticleList />}</main>;
}
