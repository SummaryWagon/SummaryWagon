"use client";
import Link from "next/link";
import Spinner from "../Spinner";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import GotoArticle from "./components/GoToArticle";

interface SearchBarProps {
  session: any;
}

export default function SearchBar({ session }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [url, setUrl] = useState("");
  const searchHandler = async (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") return;
    if (!inputRef?.current?.value) {
      alert("no input");
      return;
    }
    setIsLoading(true);
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          link: inputRef.current.value,
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
  if (isDone) return <GotoArticle url={url} />;
  return (
    <div className={styles.searchBox}>
      <h1 className={styles.title}>
        {`🤖 "Which link would you like me to summarize for you?"`}
      </h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search.."
          ref={inputRef}
          onKeyDown={searchHandler}
        />
        <button className={styles.searchButton} onClick={searchHandler}>
          <span role="img" aria-label="Search">
            🔍
          </span>
        </button>
      </div>
      <div id="related-keywords"></div>
    </div>
  );
}
