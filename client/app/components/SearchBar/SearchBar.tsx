"use client";
import Link from "next/link";
import Spinner from "../Spinner";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import GotoArticle from "./components/GoToArticle";
import RemainingCount from "../RemainingCount";

interface SearchBarProps {
  session: any;
}

export default function SearchBar({ session }: SearchBarProps) {
  console.log(session);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [url, setUrl] = useState("");
  const userEmail = session ? session.email : undefined;
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text);
    });
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const searchHandler = async (e: any) => {
    if (!userEmail) return alert('로그인이 필요한 서비스입니다.')
    console.log("입력된 링크:", inputValue);
    if (e.key !== "Enter" && e.type !== "click") return;
    if (!inputValue) {
      alert("no input");
      return;
    }
    setIsLoading(true);
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles`, {
        method: "POST",
        body: JSON.stringify({
          link: inputValue,
          email: session.user.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setIsDone(true);
          setUrl(data.data.id);

          alert("Success: " + data.message);
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  };
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.searchBox}>
      {isDone ? (
        <GotoArticle url={url} />
      ) : (
        <>
          <h1 className={styles.title}>
            {` 혹시 `}
            <span className={styles.emphasize}>세줄 요약</span>
            {` 필요하신가요? 링크만 가져오세요🤖`}
          </h1>
          <div className={styles.buttonContainer}>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ctrl + v 하거나 옆에 버튼을 클릭하세요 📎"
            />

            {!inputValue ? (
              <button
                className={styles.paste_button}
                onClick={handleButtonClick}
              >
                붙여넣기
              </button>
            ) : (
              <button className={styles.summary_button} onClick={searchHandler}>
                요약하기
              </button>
            )}
          </div>
          <RemainingCount></RemainingCount>
        </>
      )}
    </div>
  );
}
