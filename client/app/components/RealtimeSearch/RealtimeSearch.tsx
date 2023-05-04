"use client";
import React, { useState, useEffect } from "react";
import styles from "./RealtimeSearch.module.css";
const dummy = ["React", "Vue", "Angular", "JavaScript"];
function RealtimeSearch() {
  const [searches, setSearches] = useState<String[]>([]);

  useEffect(() => {
    // API 호출하여 실시간 검색어 가져오기
    setSearches(dummy);
  }, []);

  return (
    <div className={styles.realtimeSearch}>
      <h1>📈 Popular Searches</h1>
      <ul>
        {searches.map((search, idx) => (
          <li key={search}>
            {idx + 1}. {search}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RealtimeSearch;
