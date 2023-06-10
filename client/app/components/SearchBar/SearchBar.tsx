"use client";
import Link from "next/link";
import Spinner from "../Spinner";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import GotoArticle from "./components/GoToArticle";
import RemainingCount from "../RemainingCount";
import Image from "next/image";
import PasteIcon from "@/public/icon/PasteIcon.svg";
import SummarizeIcon from "@/public/icon/SummarizeIcon.svg";
interface SearchBarProps {
  userEmail: string;
}

export default function SearchBar({ userEmail }: SearchBarProps) {
  console.log('이메일확인', userEmail)
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [url, setUrl] = useState("");
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
    if (!userEmail) return alert("로그인이 필요한 서비스입니다.");
    console.log("입력된 링크:", inputValue);
    if (e.key !== "Enter" && e.type !== "click") return;
    if (!inputValue) {
      alert("no input");
      return;
    }
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles`, {
      method: "POST",
      body: JSON.stringify({
        link: inputValue,
        email: userEmail,
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
  };
  if (isLoading) return <Spinner />;

  return (
    <>
      {isDone ? (
        <GotoArticle url={url} />
      ) : (
        <>
          <div className={styles.buttonContainer}>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ctrl + v 하거나 옆에 버튼을 클릭하세요 📎"
            />

            {!inputValue ? (
              <Image
                className={styles.paste_button}
                src={PasteIcon}
                onClick={handleButtonClick}
                height={40}
                width={40}
                alt=""
              ></Image>
            ) : (
              <div className={styles.summary_button}>
                <Image
                  src={SummarizeIcon}
                  onClick={searchHandler}
                  className={styles.summary_logo}
                  height={20}
                  width={20}
                  alt=""
                ></Image>
              </div>
            )}
          </div>
          <RemainingCount></RemainingCount>
        </>
      )}
    </>
  );
}
