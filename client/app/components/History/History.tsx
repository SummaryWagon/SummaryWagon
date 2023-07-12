"use client";
import styles from "./History.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import HistoryIcon from "@/public/icon/HistoryIcon.svg";
import RightArrowIcon from "@/public/icon/RightArrowIcon.svg";
import Image from "next/image";
import useMainHistory from "@/app/hooks/useMainHistory";
import SimpleArticleList from "../SimpleArticleList";
import Spinner from "../Spinner";
interface HistoryProps {
  userEmail: string;
}

const History = ({ userEmail }: HistoryProps) => {
  const { data: historys, isLoading, isError } = useMainHistory(userEmail);

  return (
    <div className={styles.main_container}>
      <div className={styles.title_main_container}>
        <div>
          <Link href={"/history"} className={styles.title_container}>
            <Image
              className={styles.logo}
              src={HistoryIcon}
              height={30}
              width={30}
              alt=""
            ></Image>
            <h2 className={styles.title}>히스토리</h2>
          </Link>
        </div>
        <Link href={"/history"}>
          <Image
            className={styles.arrowIcon}
            src={RightArrowIcon}
            height={20}
            width={20}
            alt=""
          ></Image>
        </Link>
      </div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : userEmail ? (
        <SimpleArticleList articles={historys}></SimpleArticleList>
      ) : (
        <div className={styles.login} onClick={() => signIn()}>
          <p> 로그인이 필요한 서비스입니다 😅</p>
        </div>
      )}
    </div>
  );
};

export default History;
