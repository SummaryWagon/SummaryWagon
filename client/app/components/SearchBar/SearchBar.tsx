"use client";
import styles from "./page.module.css";
import { useRef } from "react";
import { useSession } from "next-auth/react";

export default function SearchBar({session} ) {
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = async (e: any) => {
    if (e.key !== "Enter" && e.type !== "click") return;
    if (!inputRef?.current?.value) {
      alert("no input");
      return;
    }
    console.log("searchHandler", inputRef.current.value);
    const result = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: inputRef.current.value, email: session?.email}),
    }).then((res) => res.json());


  };

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
