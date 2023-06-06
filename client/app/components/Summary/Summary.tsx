"use client";
import Link from "next/link";
import Spinner from "../Spinner";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import GotoArticle from "./components/GoToArticle";
import RemainingCount from "../RemainingCount";
import { signIn } from "next-auth/react";
import SearchBar from "../SearchBar/SearchBar";

interface SummaryProps {
  session: any;
}

export default function Summary({ session }: SummaryProps) {
  const userEmail = session ? session.email : undefined;
  console.log(userEmail);
  return (
    <div className={styles.searchBox}>
      <h1 className={styles.title}>
        {` 혹시 `}
        <span className={styles.emphasize}>세줄 요약</span>
        {` 필요하신가요? 링크만 가져오세요🤖`}
      </h1>
      {!session ? (
        <div className={styles.login} onClick={() => signIn()}>
          <p> 로그인이 필요한 서비스입니다 😅</p>
        </div>
      ) : (
        <SearchBar userEmail={userEmail}></SearchBar>
      )}
    </div>
  );
}
