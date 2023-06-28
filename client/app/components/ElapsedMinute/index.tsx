"use client";
import styles from "./index.module.css";

interface ElapsedTimeProps {
  date: string;
}

const ElapsedTime = ({ date }: ElapsedTimeProps) => {
  const articleDateTime = new Date(date);
  const currentTime = new Date();

  const timeDifference: number =
    currentTime.getTime() - articleDateTime.getTime();
  const elapsedMinutes = Math.floor(timeDifference / (1000 * 60)); // 분 단위로 변환

  const elapsedSeconds = Math.floor(timeDifference / 1000); // 초 단위로 변환

  const elapsedTime = () => {
    if (elapsedSeconds < 60) {
      return `${elapsedSeconds}초 전`;
    } else if (elapsedMinutes < 60) {
      return `${elapsedMinutes}분 전`;
    } else if (elapsedMinutes < 24 * 60) {
      const elapsedHours = Math.floor(elapsedMinutes / 60);
      return `${elapsedHours}시간 전`;
    } else {
      const elapsedDays = Math.floor(elapsedMinutes / (24 * 60));
      return `${elapsedDays}일 전`;
    }
  };

  return <p className={styles.elapsedTime}>{elapsedTime()}</p>;
};

export default ElapsedTime;
