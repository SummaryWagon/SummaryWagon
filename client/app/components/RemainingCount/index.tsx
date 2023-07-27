"use client";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { getRemainCnt } from "@/app/api/getRemainCnt";
import { makeApiRequest } from "@/services/api-service";

const LIMIT_COUNT = 5;
interface RemainingCountProps {
  userEmail: string;
}
const RemainingCount = ({ userEmail }: RemainingCountProps) => {
  const [count, setCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchRemainCnt = async () => {
      const result = await getRemainCnt(userEmail);
      if (result === -1) {
        setErrorMsg("로그인이 필요합니다.");
        return
      }
      setCount(result);
    };
    fetchRemainCnt();
  }, []);

  return (
    <div>
      <p className={styles.general_text}>
        오늘 <span className={styles.remain_text}>남은</span> 기회 : &nbsp;
        <span className={styles.remain_text}>{count}</span> / {LIMIT_COUNT} 🤖
      </p>
      <p className={styles.textMute}>*과금 문제로 횟수 제한이 있습니다.</p>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default RemainingCount;
