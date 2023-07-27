"use client";
import React, { useState, useEffect } from "react";
import styles from "./RealtimeSearch.module.css";
const dummy = ["React", "Vue", "Angular", "JavaScript"];
function RealtimeSearch() {
  const [searches, setSearches] = useState<String[]>([]);

  useEffect(() => {
    // API 호출하여 실시간 검색어 가져오기
    const data = fetchData("6454fa571d3bfee7230729d9");
    setSearches(dummy);
  }, []);

  async function fetchData(params: any) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  }
  return (
    <div className={styles.realtimeSearch}>
      <h1>📈 Popular Searches</h1>
      <ul>
        {searches.map((search, idx) => (
          <li key={idx}>
            {idx + 1}. {search}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RealtimeSearch;
