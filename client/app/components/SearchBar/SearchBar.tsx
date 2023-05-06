"use client";
import Spinner from "../Spinner";
import styles from "./page.module.css";
import { useRef, useState } from "react";

interface SearchBarProps {
  session: any;
}

export default function SearchBar({ session }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = async (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") return;
    if (!inputRef?.current?.value) {
      alert("no input");
      return;
    }
    setIsLoading(true);
    console.log("searchHandler", inputRef.current.value, session);
    if (session) {
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "www.google.com";
      }, 10000);
    }
  };
  if (isLoading) return <Spinner />;
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
