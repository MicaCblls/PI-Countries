import React from "react";
import styles from "./Pagination.module.css";
export default function Pagination({
  totalPages,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.containerPagination}>
      {currentPage > 1 && (
        <li className={styles.previous}>
          <a href="#" onClick={() => paginate(-1)}>
            Prev
          </a>
        </li>
      )}
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={
            number === currentPage ? styles.active : styles.liContainer
          }
        >
          <a href="#" onClick={() => setCurrentPage(number)}>
            {number}
          </a>
        </li>
      ))}
      {currentPage !== pageNumbers.length && (
        <li className={styles.next}>
          <a href="#" onClick={() => paginate(1)}>
            Next
          </a>
        </li>
      )}
    </div>
  );
}
