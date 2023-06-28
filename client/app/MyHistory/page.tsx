import Image from "next/image";
import styles from "./page.module.css";
import {Metadata} from "next";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  return {
    title: "히스토리",
    description: "지금까지 SummaryWagon에서 요약한 기사들을 확인해보세요!",
  };
};
export default function MyHistory() {
  return (
    <main className={styles.main}>
      
    </main>
  );
}
