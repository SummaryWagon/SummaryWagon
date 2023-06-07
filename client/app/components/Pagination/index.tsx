import React from "react";
import styles from "./index.module.css";
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

  return <ul className={styles.pagination}>
    {renderPageNumbers()}</ul>;
};

export default Pagination;
