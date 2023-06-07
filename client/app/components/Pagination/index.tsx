import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import RightArrowIcon from "@/public/icon/RightArrowIcon.svg";
import LeftArrowIcon from "@/public/icon/LeftArrowIcon.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 6,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? `${styles.active}` : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className={styles.pagination}>
      <Image
        className={styles.leftArrowIcon}
        src={LeftArrowIcon}
        height={15}
        width={15}
        alt=""
      ></Image>
      {renderPageNumbers()}
      <Image
        className={styles.rightArrowIcon}
        src={RightArrowIcon}
        height={15}
        width={15}
        alt=""
      ></Image>
    </ul>
  );
};

export default Pagination;
