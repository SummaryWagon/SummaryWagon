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
  const maxPageToShow = 5;
  const halfMaxPageToShow = Math.floor(maxPageToShow / 2);
  let startPage = currentPage - halfMaxPageToShow;
  let endPage = currentPage + halfMaxPageToShow;

  // Adjust startPage and endPage if they go beyond the valid range
  if (startPage < 1) {
    startPage = 1;
    endPage = maxPageToShow;
  } else if (endPage > totalPages) {
    startPage = totalPages - maxPageToShow + 1;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
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
        onClick={() => handlePageChange(currentPage - 1)}
        alt=""
      ></Image>
      {renderPageNumbers()}
      <Image
        className={styles.rightArrowIcon}
        src={RightArrowIcon}
        height={15}
        width={15}
        onClick={() => handlePageChange(currentPage + 1)}
        alt=""
      ></Image>
    </ul>
  );
};

export default Pagination;
