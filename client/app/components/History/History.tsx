"use client";
import styles from "./History.module.css";
import Link from "next/link";
import SimpleArticleListItem from "../SimpleArticleListItem/SimpleArticleListItem/SimpleArticleListItem";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import HistoryIcon from "@/public/icon/HistoryIcon.svg";
import RightArrowIcon from "@/public/icon/RightArrowIcon.svg";
import Image from "next/image";
import { Article } from "@/types/Article";

interface HistoryProps {
  userEmail: string;
}

const History = ({ userEmail }: HistoryProps) => {
  console.log(userEmail);
  const [historys, setHistorys] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      const data = await fetchData();
      setHistorys(data);

      console.log('히스토리',data);
    };
    fetchDatas();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/?email=${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.title_main_container}>
        <div>
          <Link href={"/myHistory"} className={styles.title_container}>
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
        <Link href={"/myHistory"}>
          <Image
            className={styles.arrowIcon}
            src={RightArrowIcon}
            height={20}
            width={20}
            alt=""
          ></Image>
        </Link>
      </div>
      {userEmail ? (
        historys.length > 0 ? (
          <ul className={styles.ul}>
            {historys.map((item: Article) => (
              <Link key={item.title} href={`detail/${item._id}`}>
                <SimpleArticleListItem
                  imageSrc={item.image}
                  title={item.title}
                ></SimpleArticleListItem>
              </Link>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>삐비비빅.. 히스토리가 비어있습니다.</p>
            <p>지금 바로 SummaryWagon을 이용해보세요🤖</p>
          </div>
        )
      ) : (
        <div className={styles.login} onClick={() => signIn()}>
          <p> 로그인이 필요한 서비스입니다 😅</p>
        </div>
      )}
    </div>
  );
};

export default History;
